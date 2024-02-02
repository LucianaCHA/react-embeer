import { render, screen, } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';
import VimeoPlayer from './vimeo-player';



describe('VimeoPlayer component', () => {
  // mockear url falsa a la que se le hace fetch
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = originalFetch;
  });

  it('should render loading component while fetching video data', async () => {

    await act(async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: () => Promise.resolve({}), 
      });
    })
    render(<VimeoPlayer link="https://vimeo.com/123456789" />);

    const loadingElement = screen.getByText(/LOADING/i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render error component with invalid URL', async ()=> {
    
    await act(async () => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error('Invalid URL'));
    }
    );
    render(<VimeoPlayer link="invalid-url" />);
    const errorElement = screen.getByText(/ERROR/i);
    expect(errorElement).toBeInTheDocument();
  })
  
  it('should render video component with valid URL', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      "type": "video",
      "version": "1.0",
      "provider_name": "Vimeo",
      "provider_url": "https://vimeo.com/",
      "title": "My video",
      "author_name": "Sara Author",
      "author_url": "https://vimeo.com/techuser",
      "is_plus": "0",
      "account_type": "live_business",
      "html": "<iframe src=\"https://player.vimeo.com/video/286898202?h=fd61acd044\" width=\"480\" height=\"360\" frameborder=\"0\" title=\"My video\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>",
      "width": 480,
      "height": 360,
      "duration": 23,
      "description": "This is my video.",
      "thumbnail_url": "https://i.vimeocdn.com/video/721904228_295x166",
      "thumbnail_width": 295,
      "thumbnail_height": 221,
      "thumbnail_url_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F721904228_295x166&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png",
      "upload_date": "2020-10-20 10:00:00",
      "video_id": 286898202,
      "uri": "/videos/286898202"
    }));
  
    render(<VimeoPlayer link="https://vimeo.com/286898202" />);
    const iframeElement = await screen.findByTitle(/My video/i);
    expect(iframeElement).toBeInTheDocument();
  });
})
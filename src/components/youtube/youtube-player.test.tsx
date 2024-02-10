import { act, render, screen } from '@testing-library/react';
import { YoutubePlayer } from './youtube-player';

describe('YoutubePlayer', () => {
  it('renders error component when error is true',async () => {
    await act(async () => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error('Invalid URL'));
    }
    );
    render(<YoutubePlayer link="invalid-url" />);
    const errorComponent = screen.getByTestId('error-component');
    expect(errorComponent).toBeInTheDocument();
  });

  it('renders iframe when loading and error are false', () => {
    render(<YoutubePlayer link="https://www.youtube.com/watch?v=VIDEO_ID" />);
    const iframe = screen.getByTitle('Youtube video player');
    expect(iframe).toBeInTheDocument();
  });
});
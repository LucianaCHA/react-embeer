import { IUrlData } from 'interfaces/interfaces';
import { setVimeoLink } from './utils';
const mockHost = {
  vimeo: 'https://vimeo.com'
};
describe('setVimeoLink function test', () => {
  it('should return the correct Vimeo link with valid pathname and search', () => {

  const mockUrl = new URL('https://vimeo.com/video/123?h=abc');
  
    const result = setVimeoLink(mockHost, mockUrl);

    expect(result).toBe('https://vimeo.com/video/123?h=abc');
  });

  it('should throw an error with invalid pathname URL', () => {
    const mockInvalidUrl = 'https://vimeo.com/1234'

    expect(() => {
      setVimeoLink(mockHost, mockInvalidUrl as unknown as IUrlData);// even force cast even should throw an error
    }).toThrow('Invalid pathname URL');
  });
});
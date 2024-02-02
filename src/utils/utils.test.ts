import { setUrlData } from './utils';

describe('setUrlData function test', () => {
  it('should return the correct URL data', () => {
    const url = 'https://www.example.com/path?param1=value1&param2=value2#section';

    const result = setUrlData(url);

    expect(result.hostname).toBe('www.example.com');
    expect(result.pathname).toBe('/path');
    expect(result.search).toBe('?param1=value1&param2=value2');
    expect(result.hash).toBe('#section');
    expect(result.href).toBe(url);
  });

  it('should throw an error for an invalid URL', () => {
    const url = 'invalid-url';

    expect(() => setUrlData(url)).toThrow('Invalid URL');
  });
});
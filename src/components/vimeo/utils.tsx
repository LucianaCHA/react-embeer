import { IUrlData, IUrlDataKeys } from "interfaces/interfaces";

export const setVimeoLink = (host :IUrlDataKeys, url: IUrlData) => {

    const pathnameRegex = /^\/(?:video\/(\d+)$)|\/(\d+)$|(?:video|album|channels|groups|ondemand)\/(?:\d+)(\/video[s])?\/(\d+)$/;
    const isValidPathname = pathnameRegex.test(url.pathname);

    const searchParams = new URLSearchParams(url.search);
    const isValidSearch = searchParams.get('h') ? searchParams.get('h') : '';

    if(!isValidPathname) throw new Error('Invalid pathname URL');

    return host.vimeo + url.pathname +'?h=' +isValidSearch;

    // return <VimeoPlayer link={theUrl} width={width} height={height} config={config}/>
  }
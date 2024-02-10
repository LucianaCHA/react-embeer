
import { ErrorComponent } from "components/error/error";
import { LoadingComponent } from "components/loading/loading";
import { IUrlData, IUrlDataKeys } from "interfaces/interfaces";
import { useEffect, useState } from "react";
import { setUrlData } from "utils/utils";
import { URLS_BASE } from 'constants/constants';

import './styles.scss'

type ConfigProps = {
    autoplay: boolean;
    controls: boolean;
    loop: boolean;
    muted: boolean;
    responsive: boolean;
}
type YoutubePlayerProps = {
    link: string;
    config?: Partial<ConfigProps>;
    width?: number;
    height?: number;
};

const defaultConfig = {
    autoplay: 0,
    controls: 1,
    loop: 0,
    muted: 0,
    responsive: 0,
}

export const YoutubePlayer = ({ link, config, width, height }: YoutubePlayerProps) => {

  const [video,setVideo ] = useState<any>(null)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const iframeStyle = {
    width: '100%',
    height: '100%', 
  };

  const mergeConfig = { ...defaultConfig, ...config }
  const parseConfig = {
    autoplay: mergeConfig?.autoplay ? 1 : 0,
    controls: mergeConfig?.controls ? 1 : 0,
    loop: mergeConfig?.loop ? 1 : 0,
    muted: mergeConfig?.muted ? 1 : 0,
    responsive: mergeConfig?.responsive ? 1 : 0,
  }

  const setYTLink = (host: IUrlDataKeys, url: IUrlData) => {
    const pathnameRegex = /(?:watch\?v=)?([^&\n?#]+)/gm;    
    const isValidPathname = pathnameRegex.test(url.pathname);
    const urlPathname = url.pathname.replace(/\/(embed|watch|live\/|shorts)/g, '');

    const urlParams = `?autoplay=${parseConfig.autoplay}&controls=${parseConfig.controls}&loop=${parseConfig.loop}&mute=${parseConfig.muted}`

    const searchParams = new URLSearchParams(url.search);
    const isValidSearch = searchParams.get('v') ? searchParams.get('v') : '';
    console.log('isValidSearch',isValidSearch, 'para el url', searchParams.get('v'))

    if(!isValidPathname) throw new Error('Invalid pathname URL');
    return host.youtube + (urlPathname ? urlPathname : isValidSearch) + urlParams;
  }
console.log('loading', loading)
  useEffect(() => {
    try {
        const videoLink = setYTLink(URLS_BASE, setUrlData(link));
        setVideo(videoLink)
        setLoading(false);
    } catch (error: any) {
        setError(true);
        setLoading(false);
    }
}, [link]);

  return (
    <>
        {
            loading
                ? <LoadingComponent />
                : error
                    ? <ErrorComponent />
                    : (<div style={parseConfig.responsive 
                      ? {width:width ? width : 480, 
                        height:height ? height : (width ? width * 0.5625: 270) }: {}}>
                      <iframe
                        src={video}
                        title={'Youtube video player'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={parseConfig.responsive ? iframeStyle : {}}
                        height={height ? height : (width ? width * 0.5625: 270)}
                        width={width ? width : 480}
                      ></iframe>
                    </div>)
        }
    </>
)
}

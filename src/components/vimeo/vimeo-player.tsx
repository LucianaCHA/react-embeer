import { URLS_BASE } from 'constants/constants';
import { useEffect, useState } from 'react';
import { setUrlData } from 'utils/utils';
import { SRC_REGEX, setVimeoLink } from './utils/utils';

import './styles.scss';

type ConfigProps = {
    autoplay: boolean;
    avatar: boolean;
    controls: boolean;
    logo: boolean;
    loop: boolean;
    muted: boolean;
    responsive: boolean;
    title: boolean;
    author: boolean;
}
type VimeoPlayerProps = {
    link: string;
    config?: Partial<ConfigProps>;
    width?: number;
    height?: number;
};

const defaultConfig = {
    autoplay: false,
    author: true,// muestra el nombre del owner del video
    avatar: true,// muestra el avatar del owner del video
    controls: true,
    logo: true,// muestra el logo de vimeo
    loop: false,
    muted: false,
    responsive: false,
    title: true,
}

const VimeoPlayer = ({
    link, width, height, config }: VimeoPlayerProps) => {
    const [video, setVideo] = useState<any>(null)
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const finalConfig = { ...defaultConfig, ...config }

    const getUrlData = async (url: string) => {
        const urlParams = `&autoplay=${finalConfig.autoplay}&loop=${finalConfig.loop}&muted=${finalConfig.muted}&controls=${finalConfig.controls}&responsive=${finalConfig.responsive}&width=${width}&height=${height}&title=${finalConfig.title}&byline=${finalConfig.author}&portrait=${finalConfig.avatar}&vimeo_logo=${finalConfig.logo}`
        try {
            const parsed = new URL(url + urlParams);
            const data = await fetch(`https://vimeo.com/api/oembed.json?url=${parsed.href}`).then((response) => {
                return response.json()
            })
            setLoading(false)
            return data
        } catch (error) {
            setError(true)
            setLoading(false)
            throw new Error('Invalid URL');
        }
    }

    useEffect(() => {
        setLoading(true);
        try {
            const vimeoLink = setVimeoLink(URLS_BASE, setUrlData(link));
            getUrlData(vimeoLink).then((data) => {
                setVideo(data);
                setLoading(false);
            });
        } catch (error: any) {
            setError(true);
            setLoading(false);
        }
    }, [link]);


    //TODO add loading and error components
    const loadingComponent = (<div >
        <h1>LOADING</h1></div>)

    const errorComponent = (<div >
        <h1>ERROR</h1></div>)

    return (
        <>
            {
                loading
                    ? loadingComponent
                    : error
                        ? errorComponent
                        : video && <iframe key={video.video_id} src={video?.html.match(SRC_REGEX)[1]} width={video?.width} height={video?.height} title={video?.title} ></iframe>
            }
        </>
    )
};

export default VimeoPlayer;
import VimeoPlayer from "components/vimeo/vimeo-player";
import { YoutubePlayer } from "components/youtube/youtube-player";

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
type IFrameProps = {
    url: string;
    config?: Partial<ConfigProps>;
    width?: number;
    height?: number;
};

export const Frame = ({url, width = undefined, height=undefined, config = {}  }: IFrameProps) => {
   
    const checkLink = (link: string):JSX.Element => {
        switch (true) {
            case link.includes('youtube.com'):
            case link.includes('youtu.be'):
                return <YoutubePlayer link={link} width={width} height={height} config={config}/>
            // vimeo
            case link.includes('vimeo'):
                return <VimeoPlayer link={link} width={width} height={height} config={config}/>
            default:
                return <><h1>Not supported</h1></>
        }
    }

    const link = checkLink(url);
  return (
    <div>
      {link}
    </div>
  )
}



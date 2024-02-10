import './styles.scss';

interface IFrameProps {
    url: string;
}

const blocks = {
    youtube: 'https://www.youtube.com/embed/',
    vimeo: 'https://player.vimeo.com/video/',
}

export const Frame = ({url}: IFrameProps) => {
    const getUrlData = (url: string) => {
        
        try{
            const parsed = new URL(url);
            const { hostname , pathname, search, hash} = parsed;

            return {
                hostname,
                pathname,
                search,
                hash,
            }
        } catch (error) {
            throw new Error('Invalid URL');
        }
    }

    const parsed = getUrlData(url);
//?autoplay=1 0 = 
//?controls=0  
// 0 = El reproductor se carga inmediatamente y los controles no se muestran
// 1 = El reproductor y los controles se muestran inmediatamente (valor por defecto)
// 2 = Los controles se muestran y el reproductor carga una vez que el usuario inicie el vídeo
    // autoplay
    // Puedes reproducir automáticamente el vídeo utilizando esto:

    // 0 = No se reproduce automáticamente el vídeo (valor por defecto)
    // 1 = Se reproduce automáticamente el vídeo
    const setYouTubeLink = (blocks :any, parsed: any) => {
        const searchMatch = parsed.search.match(/v=([^\&]+)(&|$)/);
        const urlMatch = parsed.pathname.replace('/', '');
        if (searchMatch) {
          return `${blocks.youtube}${searchMatch[1]}?controls=2&showinfo=1&modestbranding=0&end=10&rel=0`;
        } else if (urlMatch) {
          return `${blocks.youtube}${urlMatch}?controls=2&showinfo=1&modestbranding=0&end=10&rel=0`; // ?rel=0 evita que digan videos relacionados 
        } else {
          return undefined;
        }
      };

    const setVimeoLink = (blocks :any, parsed: any) => {
        const urlMatch = parsed.pathname.replace('/', '').replace('shortlink', '');
        if (urlMatch) {
            console.log(`${blocks.vimeo}${urlMatch}`);
          return `${blocks.vimeo}${urlMatch}`;
        } else {
          return undefined;
        }
      };

    const checkLink = (link: string) => {
        switch (true) {
            case link.includes('youtube.com'):
            case link.includes('youtu.be'):
                return setYouTubeLink(blocks, parsed);
            // vimeo
            case link.includes('vimeo'):
                return setVimeoLink(blocks, parsed); 
            default:
                return link;
        }
    }

    const link = checkLink(url);
    return (
            <div className="frame__content__preview">
            <iframe 
            className="youtube-video"
            src={link}
            title="YouTube video player"
            // max-width="100%"            
            // width="640" height="360"
            // title="YouTube video player" 
            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            </div>
    )
}

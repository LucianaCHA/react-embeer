import VimeoPlayer from 'components/vimeo/vimeo-player';
import { YoutubePlayer } from 'components/youtube/youtube-player';
import { Frame } from 'feature/frame/frame';
function App() {

  // const link = "https://vimeo.com/770832505"
  // const link2 = "https://player.vimeo.com/709120687?h=123"
  const link3 = "https://vimeo.com/video/901485325 "// NO SE VE PORQUE HAY QUE AGREGAR DOMINIOS EN VIMEO
  const link4 = "https://player.vimeo.com/video/368778256?h=8f7b353e18&color=ff9933&title=0&byline=0&portrait=0"


  return (
    <div >
      <h3>Youtube</h3>
      <YoutubePlayer link="https://www.youtube.com/live/sZ71zKj0MvA?feature=shared2" />
        <Frame 
        url={"https://www.youtube.com/watch?v=JwBf_9M1S7k"} 
        width={500} 
       />
      <h3>Vimeo</h3>
      <VimeoPlayer link={link3} width={300} />
      <Frame url={link4} width={500} />

    </div>
  );
}

export default App;

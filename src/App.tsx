import VimeoPlayer from 'components/vimeo/vimeo-player';
import { Frame } from 'feature/frame/frame';
function App() {

  // const link = "https://vimeo.com/770832505"
  const link2 = "https://player.vimeo.com/709120687?h=123"
  const link3 = "https://vimeo.com/video/901485325 "// NO SE VE PORQUE HAY QUE AGREGAR DOMINIOS EN VIMEO
  const link4 = "https://player.vimeo.com/video/368778256?h=8f7b353e18&color=ff9933&title=0&byline=0&portrait=0"


  return (
    <div >
        {/* <VimeoPlayer link={link} />
        <VimeoPlayer link={link2} width={300} />
         <VimeoPlayer link={link3} width={900}/> */}
        <VimeoPlayer link={link4} width={300}/>
        <Frame url={link4} />
         <Frame url={link2}  />
       <Frame url={link3} />

    </div>
  );
}

export default App;

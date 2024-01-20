import { useSelector } from "@xstate/react";

import { FileSelector } from "./components/FileSelector";
import { ImageGallery } from "./components/ImageGallery";
import { Settings } from "./components/Settings";
import { DataContext } from "./context/DataContext";
import { Slideshow } from "./components/Slideshow";

function App() {
  const actorRef = DataContext.useActorRef();

  const state = useSelector(actorRef, (s) => s); // identity

  const isSldeshow = state.matches("SlideShow");

  return (
    <div className=" min-h-screen flex flex-col">
      {isSldeshow ? (
        <Slideshow />
      ) : (
        <>
          <FileSelector />
          <ImageGallery />
          <Settings />
        </>
      )}
    </div>
  );
}

export default App;

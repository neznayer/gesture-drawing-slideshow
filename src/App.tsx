import { useSelector } from "@xstate/react";

import { FileSelector } from "./components/FileSelector";
import { ImageGallery } from "./components/ImageGallery";
import { Settings } from "./components/Settings";
import { DataContext } from "./context/DataContext";
import { Slideshow } from "./components/Slideshow";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

function App() {
  const actorRef = DataContext.useActorRef();

  const state = useSelector(actorRef, (s) => s); // identity

  const isSldeshow = state.matches("SlideShow");

  return (
    <div className="h-screen flex flex-col p-5">
      <header className="flex justify-between items-center gap-2 text-sm h-5 mb-3">
        <img src="/icon.svg" className="w-12 h-12" />
        <a href="https://github.com/neznayer/gesture-drawing-slideshow">
          <GitHubLogoIcon className=" text-gray-300 inline mr-1" />
          <span className="text-gray-300">Neznayer</span>
        </a>
      </header>
      {isSldeshow ? (
        <Slideshow />
      ) : (
        <div className="flex flex-1 flex-col gap-4">
          <FileSelector />
          <div className="flex gap-4 flex-1">
            <ImageGallery />
            <Settings />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

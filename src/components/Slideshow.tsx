import { useEffect, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export function Slideshow() {
  const { send } = DataContext.useActorRef();
  const imageURLs = DataContext.useSelector((state) => state.context.images);
  const settings = DataContext.useSelector((state) => state.context.settings);
  const currentIndex = DataContext.useSelector(
    (state) => state.context.currentImageIndex || 0
  );

  const currentIndexRef = useRef(currentIndex);

  currentIndexRef.current = currentIndex;

  const [currentTimeProgress, setCurrentTimeProgress] = useState(0);

  const currentTimeProgressRef = useRef(currentTimeProgress);

  currentTimeProgressRef.current = currentTimeProgress;

  const currentImage = imageURLs[currentIndex];

  const timeProgress = useRef<NodeJS.Timeout>();

  const currentProgress =
    (currentTimeProgress / (settings.timeIntervalSeconds * 1000)) * 100;

  function setIntervals() {
    if (settings.timeIntervalSeconds <= 0) return;

    timeProgress.current = setInterval(() => {
      setCurrentTimeProgress((prev) => {
        if (
          (currentTimeProgressRef.current /
            (settings.timeIntervalSeconds * 1000)) *
            100 <
          100
        ) {
          return prev + 100;
        } else {
          if (currentIndexRef.current === imageURLs.length - 1) {
            send({
              type: "END_SLIDESHOW",
            });
          } else {
            send({
              type: "NEXT_IMAGE",
            });
          }

          return 0;
        }
      });
    }, 100);
  }

  const isThereNextImage = currentIndex < imageURLs.length - 1;

  function clearIntervals() {
    clearInterval(timeProgress.current);
  }

  useEffect(() => {
    setIntervals();
    return () => {
      clearIntervals();
    };
  }, []);

  if (!currentImage) return null;

  return (
    <section className=" flex-1 h-full">
      <img className=" max-h-full" src={currentImage} alt="" />
      <div className="flex justify-between">
        <Button
          className=" absolute bottom-0 right-0"
          disabled={!isThereNextImage}
          onClick={() => {
            setCurrentTimeProgress(0);
            clearIntervals();
            setIntervals();
            send({
              type: "NEXT_IMAGE",
            });
          }}
        >
          Next
        </Button>
      </div>
      <Button
        className=" absolute top-0 right-0"
        variant={"ghost"}
        onClick={() => {
          send({
            type: "END_SLIDESHOW",
          });
        }}
      >
        End session
      </Button>
      <Progress className="" value={currentProgress} />
    </section>
  );
}

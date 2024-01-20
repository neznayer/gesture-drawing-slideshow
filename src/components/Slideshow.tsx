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

  const [currentTimeProgress, setCurrentTimeProgress] = useState(0);

  const currentImage = imageURLs[currentIndex];

  const timer = useRef<NodeJS.Timeout>();

  const timeProgress = useRef<NodeJS.Timeout>();

  const currentIndexRef = useRef(currentIndex);

  currentIndexRef.current = currentIndex;

  useEffect(() => {
    if (settings.timeIntervalSeconds <= 0) return;

    timeProgress.current = setInterval(() => {
      setCurrentTimeProgress((prev) => prev + 100);
    }, 100);

    timer.current = setInterval(() => {
      setCurrentTimeProgress(0);

      if (currentIndexRef.current === imageURLs.length - 1) {
        send({
          type: "END_SLIDESHOW",
        });
      } else {
        send({
          type: "NEXT_IMAGE",
        });
      }
    }, settings.timeIntervalSeconds * 1000);
    return () => {
      clearInterval(timer.current);
      clearInterval(timeProgress.current);
    };
  }, []);

  if (!currentImage) return null;

  return (
    <section className=" flex-1">
      <img className=" h-full" src={currentImage} alt="" />
      <div className="flex justify-between">
        <Button
          className=" absolute bottom-0 right-0"
          onClick={() => {
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
      <Progress
        className=""
        value={Math.ceil(
          (currentTimeProgress / (settings.timeIntervalSeconds * 1000)) * 100
        )}
      />
    </section>
  );
}

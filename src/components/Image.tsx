import { DataContext } from "@/context/DataContext";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

export function Image({ src }: { src: string }) {
  const { send } = DataContext.useActorRef();

  const [hovered, setHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("mouseenter", () => {
        setHovered(true);
      });
      container.addEventListener("mouseleave", () => {
        setHovered(false);
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", () => {
          setHovered(true);
        });
        container.removeEventListener("mouseleave", () => {
          setHovered(false);
        });
      }
    };
  }, []);

  return (
    <div ref={containerRef} className=" relative min-h-10">
      {hovered ? (
        <Button
          className=" absolute top-1 right-1 w-[8px] h-[8px] rounded-full"
          variant={"destructive"}
          onClick={() => {
            send({
              type: "REMOVE_IMAGE",
              payload: src,
            });
          }}
        >
          x
        </Button>
      ) : null}
      <img src={src} alt="" />
    </div>
  );
}

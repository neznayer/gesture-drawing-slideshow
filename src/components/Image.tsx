import { DataContext } from "@/context/DataContext";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

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
          className=" absolute top-1 right-1 w-5 h-5 p-0 rounded-full"
          variant={"destructive"}
          onClick={() => {
            send({
              type: "REMOVE_IMAGE",
              payload: src,
            });
          }}
        >
          <Cross2Icon />
        </Button>
      ) : null}
      <img src={src} alt="" />
    </div>
  );
}

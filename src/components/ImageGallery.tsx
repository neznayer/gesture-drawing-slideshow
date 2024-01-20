import { DataContext } from "../context/DataContext";
import { Button } from "./ui/button";

export function ImageGallery() {
  const imageURLs = DataContext.useSelector((state) => state.context.images);

  const { send } = DataContext.useActorRef();

  function handleClearAll() {
    send({
      type: "SET_IMAGES",
      payload: [],
    });
  }
  return (
    <section className=" ">
      <p>{imageURLs.length}</p>
      <ul className=" flex gap-2 flex-wrap">
        {imageURLs.map((file) => (
          <li className="w-10" key={file}>
            <img src={file} alt="" />
          </li>
        ))}
      </ul>
      <Button
        variant={"outline"}
        onClick={() => {
          send({
            type: "SHUFFLE_IMAGES",
          });
        }}
      >
        Shuffle
      </Button>
      <Button variant={"destructive"} onClick={handleClearAll}>
        Clear all
      </Button>
      <Button
        variant={"default"}
        onClick={() => {
          send({
            type: "START_SLIDESHOW",
          });
        }}
      >
        Start slideshow
      </Button>
    </section>
  );
}

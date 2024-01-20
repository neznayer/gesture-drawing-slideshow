import { DataContext } from "../context/DataContext";
import { Image } from "./Image";

export function ImageGallery() {
  const imageURLs = DataContext.useSelector((state) => state.context.images);

  return (
    <section className=" relative flex-1">
      <div className="absolute inset-0 overflow-auto">
        <ul className=" flex gap-2 flex-wrap ">
          {imageURLs.map((file) => (
            <li className="w-20" key={file}>
              <Image src={file} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

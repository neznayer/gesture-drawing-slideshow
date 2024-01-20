import { useCallback } from "react";
import { DataContext } from "../context/DataContext";
import { useDropzone } from "react-dropzone";

const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

export function FileSelector() {
  const { send } = DataContext.useActorRef();

  const imageURLS = DataContext.useSelector((state) => state.context.images);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      console.log(acceptedFiles);
      send({
        type: "SET_IMAGES",
        payload: [
          ...imageURLS,
          ...acceptedFiles
            .filter((file) => allowedFileTypes.includes(file.type))
            .map((file) => URL.createObjectURL(file)),
        ],
      });
    },
    [imageURLS, send]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className=" h-[100px] border-[1px] border-slate-400 rounded"
    >
      <input
        type="file"
        {...getInputProps()}
        {...{ webkitdirectory: "", mozdirectory: "", directory: "" }}
      />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

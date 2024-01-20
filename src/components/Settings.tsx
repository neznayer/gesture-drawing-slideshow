import { RocketIcon, ShuffleIcon, TrashIcon } from "@radix-ui/react-icons";
import { DataContext } from "../context/DataContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Settings() {
  const { send } = DataContext.useActorRef();
  const settings = DataContext.useSelector((state) => state.context.settings);

  const thereAreImages = DataContext.useSelector(
    (state) => state.context.images.length > 0
  );

  function handleClearAll() {
    send({
      type: "SET_IMAGES",
      payload: [],
    });
  }

  return (
    <section className=" flex flex-col gap-4 flex-1 items-start">
      <Label className=" flex gap-2 items-center">
        <span>Interval, seconds</span>
        <Input
          type="number"
          className=" w-20"
          value={settings.timeIntervalSeconds}
          onChange={(e) => {
            e.preventDefault();
            const value = parseFloat(e.target.value);
            if (isNaN(value)) return;
            if (value <= 0) return;

            send({
              type: "CHANGE_TIME_INTERVAL",
              payload: value,
            });
          }}
        />
      </Label>
      <div className=" flex flex-col gap-4">
        <Button
          disabled={!thereAreImages}
          variant={"outline"}
          onClick={() => {
            send({
              type: "SHUFFLE_IMAGES",
            });
          }}
        >
          <ShuffleIcon />
          <span>Shuffle</span>
        </Button>
        <Button
          variant={"destructive"}
          onClick={handleClearAll}
          disabled={!thereAreImages}
        >
          <TrashIcon />
          <span>Clear all </span>
        </Button>
        <Button
          variant={"default"}
          onClick={() => {
            send({
              type: "START_SLIDESHOW",
            });
          }}
          disabled={!thereAreImages}
        >
          <RocketIcon />
          <span>Start slideshow</span>
        </Button>
      </div>
    </section>
  );
}

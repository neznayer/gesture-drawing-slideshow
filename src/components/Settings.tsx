import { DataContext } from "../context/DataContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Settings() {
  const { send } = DataContext.useActorRef();
  const settings = DataContext.useSelector((state) => state.context.settings);

  return (
    <section className=" flex-1 items-start">
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
    </section>
  );
}

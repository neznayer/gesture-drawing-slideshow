import { createActorContext } from "@xstate/react";
import { PropsWithChildren } from "react";
import { machine } from "../state/machine";
// import { createBrowserInspector } from "@statelyai/inspect";

// const { inspect } = createBrowserInspector();

export const DataContext = createActorContext(machine);

interface StateProviderProps extends PropsWithChildren {}

export function StateProvider(props: StateProviderProps) {
  return <DataContext.Provider>{props.children}</DataContext.Provider>;
}

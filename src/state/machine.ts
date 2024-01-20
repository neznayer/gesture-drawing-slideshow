import { assign, setup } from "xstate";

export const machine = setup({
  types: {
    context: {} as {
      images: string[];
      currentImageIndex: number | null;
      settings: {
        timeIntervalSeconds: number;
      };
    },

    events: {} as
      | {
          type: "START_SLIDESHOW";
        }
      | {
          type: "END_SLIDESHOW";
        }
      | {
          type: "SET_IMAGES";
          payload: string[];
        }
      | {
          type: "CHANGE_TIME_INTERVAL";
          payload: number;
        }
      | {
          type: "NEXT_IMAGE";
        }
      | {
          type: "SHUFFLE_IMAGES";
        }
      | {
          type: "REMOVE_IMAGE";
          payload: string;
        },
  },

  guards: {
    isThereFiles: ({ context }) => context.images.length > 0,
    isTimeIntervalValid: ({ context }) =>
      context.settings.timeIntervalSeconds > 0,
    isImagesLeft: ({ context }) =>
      (context.currentImageIndex || 0) < context.images.length - 1,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDoBlMAGzHQBc8oAxbc2AYiIBUBBAJVYH0iAZAJIARAKJEAEgHkA6gG0ADAF1EoAA4B7WNmobcqkAA9EAWgAcATgIKATAFYFjgIxOFZgGwAWAOw2ANCAAnqb2ngTenjZOFk423i4udnYAvskBaFh4hCTkVDT0jCyivIIAsuwA4uKKKkggmtq6+nXGCCY2AMx2BBZRnXbu3nbeXh3uAcFtTpEEnu42Ck5mHS5xZuup6Rg4+MRkFNS4dAxwTADCEuwAclU8rGWiPIJXrKKcAGrs-DUGDTrYegMrRMPis6zsNgsFhW7lcZgmiCh4U6UN6KIUFk8HU2IAyO2ypGwEDAREwGgA7kxRFdhHwhGJJLIfnU-k0gaYOgQnBELO5YQpYe4Bp4nAiEGYwuDMQoOnNMU4Oti0rjtlliITiaSKUwrqIABolcpVZnqLT-QEtRCyzmORXeXrRVZOcZBUwuKzeDreWwKOwdBSeP3uJXK3AaYnwOp4rK-M1sy1tCHeAjgyHQ51wsUmWVOFNddMDGxmAYWHHR3Y5A75E6R02NAHNUDA1w2AjuCVe+Jmeye-yuqbuAg2TqeEW+9sdGyDMuqisaklk8mx+sWpuIKKckUWCVmX0BgZeLPOocjscDZZT7ypVJAA */

  id: "machine",
  context: {
    images: [],
    currentImageIndex: null,
    settings: {
      timeIntervalSeconds: 1,
    },
  },

  states: {
    SelectingFiles: {
      on: {
        START_SLIDESHOW: {
          target: "SlideShow",
          guard: "isThereFiles",
        },

        SET_IMAGES: {
          target: "SelectingFiles",
          actions: assign({
            images: ({ event }) => event?.payload || [],
          }),
        },
        REMOVE_IMAGE: {
          target: "SelectingFiles",
          actions: assign({
            images: ({ context, event }) => {
              const images = [...context.images];
              const index = images.indexOf(event?.payload);
              if (index > -1) {
                images.splice(index, 1);
              }
              return images;
            },
          }),
        },
        SHUFFLE_IMAGES: {
          target: "SelectingFiles",
          actions: assign({
            images: ({ context }) => {
              const images = [...context.images];
              for (let i = images.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [images[i], images[j]] = [images[j], images[i]];
              }
              return images;
            },
          }),
        },
        CHANGE_TIME_INTERVAL: {
          target: "SelectingFiles",
          guard: "isTimeIntervalValid",
          actions: assign({
            settings: ({ context, event }) => ({
              ...context.settings,
              timeIntervalSeconds: event?.payload,
            }),
          }),
        },
      },
    },

    SlideShow: {
      on: {
        END_SLIDESHOW: {
          target: "SelectingFiles",
          actions: assign({
            currentImageIndex: null,
          }),
        },
        NEXT_IMAGE: {
          target: "SlideShow",
          guard: "isImagesLeft",

          actions: assign({
            currentImageIndex: ({ context }) => {
              if (context.images.length === 0) return 0;
              return (context.currentImageIndex || 0) + 1;
            },
          }),
        },
      },
    },
  },

  initial: "SelectingFiles",
});

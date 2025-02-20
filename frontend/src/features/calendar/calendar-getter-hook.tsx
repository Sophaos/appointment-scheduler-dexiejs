/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from "moment";
import { useCallback } from "react";

export const useCalendarGetter = () => {
  const dayPropGetter = useCallback(
    (date: Date) => ({
      ...(moment(date).day() === 1 && {
        style: {
          background: "repeating-linear-gradient(60deg, #F3F1F2, #F3F1F2 4px, #EBE8E9 4px, #EBE8E9 8px)",
          color: "transparent",
        },
      }),
    }),
    []
  );

  const slotPropGetter = useCallback((date: any) => {
    const day = moment(date).day();

    if (day === 1) {
      return {
        ...(moment(date).day() === 1 && {
          style: {
            background: "repeating-linear-gradient(60deg, #F3F1F2, #F3F1F2 4px, #EBE8E9 4px, #EBE8E9 8px)",
            color: "transparent",
          },
        }),
      };
    }

    const hour = moment(date).hour();
    const intervalStart = Math.floor(hour);
    const backgroundColor = intervalStart % 2 === 0 ? "lightgray" : "white";

    return {
      className: "slotDefault",
      style: {
        backgroundColor,
        color: "black",
      },
    };
  }, []);

  const eventPropGetter = useCallback(
    (event: any) => ({
      ...(event?.status === "IN_PROGRESS" && {
        style: {
          borderLeft: "6px green solid",
        },
      }),
      ...(event?.status === "ARRIVED" && {
        style: {
          borderLeft: "6px GoldenRod solid",
        },
      }),
      ...(event?.status === "" && {
        style: {
          borderLeft: "6px gray solid",
        },
      }),
      ...(event?.status === "NO_SHOW" && {
        style: {
          borderLeft: "6px red solid",
        },
      }),
      ...(event?.status === "DONE" && {
        style: {
          opacity: "0.5",
        },
      }),
    }),
    []
  );

  const slotGroupPropGetter = useCallback(
    () => ({
      style: {
        minHeight: 40,
      },
    }),
    []
  );

  return {
    dayPropGetter,
    slotPropGetter,
    eventPropGetter,
    slotGroupPropGetter,
  };
};

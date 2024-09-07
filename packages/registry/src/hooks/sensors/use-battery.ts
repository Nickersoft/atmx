import { useEffect, useState } from "react";

import type { Nullable } from "@/types/utility/nullable.js";

interface BatteryState {
  level: Nullable<number>;
  charging: Nullable<boolean>;
  chargingTime: Nullable<number>;
  dischargingTime: Nullable<number>;
}

interface BatteryManager extends Readonly<BatteryState>, EventTarget {
  onchargingchange: () => void;
  onchargingtimechange: () => void;
  ondischargingtimechange: () => void;
  onlevelchange: () => void;
}

interface NavigatorWithPossibleBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

type UseBatteryState =
  | { isSupported: false } // Battery API is not supported
  | { isSupported: true; loading: true } // battery API supported but not fetched yet
  | (BatteryState & { isSupported: true; loading: false }); // battery API supported and fetched

const nav: NavigatorWithPossibleBattery | undefined =
  typeof navigator !== "undefined" ? navigator : undefined;

const isBatteryApiSupported = nav && typeof nav.getBattery === "function";

/**
 * Returns the device's current battery state if available via the Navigator API.
 */
function useBattery(): UseBatteryState {
  const [state, setState] = useState<UseBatteryState>({
    isSupported: true,
    loading: true,
  });

  useEffect(() => {
    if (!nav?.getBattery) {
      setState((s) => ({ ...s, isSupported: false, loading: false }));
      return;
    }

    let battery: BatteryManager | null = null;

    const handleChange = () => {
      if (!battery) return;

      const { level, charging, chargingTime, dischargingTime } = battery;

      setState({
        isSupported: true,
        loading: false,
        level,
        charging,
        chargingTime,
        dischargingTime,
      });
    };

    nav.getBattery().then((b) => {
      battery = b;
      handleChange();

      b.addEventListener("levelchange", handleChange);
      b.addEventListener("chargingchange", handleChange);
      b.addEventListener("chargingtimechange", handleChange);
      b.addEventListener("dischargingtimechange", handleChange);
    });

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", handleChange);
        battery.removeEventListener("chargingchange", handleChange);
        battery.removeEventListener("chargingtimechange", handleChange);
        battery.removeEventListener("dischargingtimechange", handleChange);
      }
    };
  }, []);

  return state;
}

const useBattery_ = isBatteryApiSupported
  ? useBattery
  : (): UseBatteryState => ({ isSupported: false });

export { useBattery_ as useBattery };

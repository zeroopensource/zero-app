import { Capacitor } from "@capacitor/core";
import { useEffect, useState } from "react";

export const PLATFORMS = {
  WEB: { versionSuffix: "web" },
  WINDOWS: { versionSuffix: "win" },
  MAC: { versionSuffix: "mac" },
  LINUX: { versionSuffix: "lin" },
  ANDROID: { versionSuffix: "and" },
  IOS: { versionSuffix: "ios" },
  UNKNOWN: { versionSuffix: "unk" },
};

type Platform = keyof typeof PLATFORMS;

export const usePlatform = (): Platform => {
  const [platform, setPlatform] = useState<Platform>("UNKNOWN");

  useEffect(() => {
    const electronVersion = window.electronApi?.electronVersion;
    const electronPlatform =
      electronVersion != null ? window.electronApi?.electronPlatform : null;
    if (typeof window === "undefined") {
      setPlatform("UNKNOWN");
    } else if (electronPlatform === "win32") {
      setPlatform("WINDOWS");
    } else if (electronPlatform === "linux") {
      setPlatform("LINUX");
    } else if (electronPlatform === "darwin") {
      setPlatform("MAC");
    } else if (Capacitor.getPlatform() === "android") {
      setPlatform("ANDROID");
    } else if (Capacitor.getPlatform() === "ios") {
      setPlatform("IOS");
    } else {
      setPlatform("WEB");
    }
  }, []);

  return platform;
};

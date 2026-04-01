import { useEffect, useState } from "react";

export const useDeviceOrientation = () => {
  const getOrientation = () =>
    window.matchMedia("(orientation: landscape)").matches
      ? "landscape"
      : "portrait";
  const [orientation, setOrientation] = useState(getOrientation);
  const [heigth, setHeigth] = useState(window.innerHeight);

  useEffect(() => {
    const handleOrientationChange = () => {
      console.log("в handleOrientationChange");
      setOrientation(getOrientation());
      setHeigth(window.innerHeight);
    };
    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.addEventListener("orientationchange", handleOrientationChange);
    };
  }, []);
  return {
    orientation,
    heigth,
  };
};

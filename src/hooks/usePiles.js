import { useLayoutEffect, useState } from "react";

export function usePiles(zoneRefs) {
  const [piles, setPiles] = useState({});

  useLayoutEffect(() => {
    function measure() {
      const next = {};
      for (const [id, ref] of Object.entries(zoneRefs)) {
        console.log('id, ref', id, ref);
        
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          next[id] = rect;
        }
      }
      setPiles(next);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [zoneRefs]);

  return piles;
}
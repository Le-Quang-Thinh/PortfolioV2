"use client";

import { useEffect, useState } from "react";
import { isIntroDone, onIntroDone } from "@/lib/introSignal";

export function useIntroDone() {
  const [done, setDone] = useState(isIntroDone);

  useEffect(() => {
    if (done) return;
    return onIntroDone(() => setDone(true));
  }, [done]);

  return done;
}

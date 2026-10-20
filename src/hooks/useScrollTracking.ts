"use client";

import { useEffect, useRef } from "react";
import { trackScrollTo } from "@/lib/analytics";

export function useScrollTracking(sectionName: string) {
  const ref = useRef<HTMLDivElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackScrollTo(sectionName);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionName]);

  return ref;
}

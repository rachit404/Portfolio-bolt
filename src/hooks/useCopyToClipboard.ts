import { useCallback, useEffect, useState } from "react";

export type CopyStatus = "idle" | "copied" | "error";

export function useCopyToClipboard(resetAfterMs = 2000): [CopyStatus, (text: string) => Promise<void>] {
  const [status, setStatus] = useState<CopyStatus>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), resetAfterMs);
    return () => window.clearTimeout(timer);
  }, [status, resetAfterMs]);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }, []);

  return [status, copy];
}

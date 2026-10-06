import { useCallback, useState } from "react";
import { LoveLetter } from "@/components/love-letter";
import { PinLock } from "@/components/pin-lock";

type Phase = "locked" | "unlocking" | "open";

export function SurprisePage() {
  const [phase, setPhase] = useState<Phase>("locked");

  const onUnlock = useCallback(() => {
    setPhase("unlocking");
    window.setTimeout(() => setPhase("open"), 520);
  }, []);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <div className="grain" />
      {phase !== "open" ? <div className="vignette" /> : null}

      {phase === "open" ? (
        <LoveLetter />
      ) : (
        <div className="flex min-h-dvh items-center justify-center">
          <PinLock breaking={phase === "unlocking"} onUnlock={onUnlock} />
        </div>
      )}
    </main>
  );
}

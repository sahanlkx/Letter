import { useEffect, useMemo, useRef, useState } from "react";
import { Delete } from "lucide-react";
import { EnvelopeSeal } from "@/components/envelope-seal";
import { cn } from "@/lib/utils";

const PIN = "0318";
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "back", "0", "pad"] as const;

type PinLockProps = {
  breaking: boolean;
  onUnlock: () => void;
};

export function PinLock({ breaking, onUnlock }: PinLockProps) {
  const [digits, setDigits] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(0);
  const checking = useRef(false);
  const breakingRef = useRef(breaking);
  breakingRef.current = breaking;

  const slots = useMemo(() => Array.from({ length: 4 }, (_, i) => digits[i] ?? ""), [digits]);

  function pushDigit(d: string) {
    if (breakingRef.current || checking.current) return;
    setError(null);
    setDigits((prev) => (prev.length >= 4 ? prev : prev + d));
  }

  function popDigit() {
    if (breakingRef.current || checking.current) return;
    setError(null);
    setDigits((prev) => prev.slice(0, -1));
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        pushDigit(e.key);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        popDigit();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (digits.length !== 4 || checking.current) return;
    checking.current = true;
    const id = window.setTimeout(() => {
      if (digits === PIN) {
        onUnlock();
      } else {
        setShake((n) => n + 1);
        setError("Not that one.");
        setDigits("");
        checking.current = false;
      }
    }, 220);
    return () => window.clearTimeout(id);
  }, [digits, onUnlock]);

  return (
    <div className="mx-auto w-full max-w-sm px-5 py-10 sm:py-14">
      <p className="enter-rise text-center font-sans text-sm font-medium tracking-wide text-muted">
        A sealed letter
      </p>
      <h1 className="enter-rise enter-rise-delay-1 mt-2 text-center font-display text-5xl font-medium leading-tight tracking-tight text-fg sm:text-6xl">
        For you.
      </h1>
      <p className="enter-rise enter-rise-delay-2 mx-auto mt-3 max-w-xs text-center text-sm leading-relaxed text-muted">
        I could not say this out loud. The code is four digits you already know.
      </p>

      <div className="enter-rise enter-rise-delay-3 mt-8">
        <EnvelopeSeal breaking={breaking} />
      </div>

      <div
        key={shake}
        className={cn("enter-rise enter-rise-delay-4 mt-8 flex justify-center gap-3", shake > 0 && "shake")}
        role="group"
        aria-label="Four-digit code"
      >
        {slots.map((slot, i) => (
          <span
            key={i}
            className={cn(
              "pin-slot flex h-14 w-11 items-center justify-center rounded-md bg-bg-elevated outline outline-1 -outline-offset-1 outline-fg/10",
              slot && "bg-rose/20 outline-rose/40",
            )}
          >
            <span
              className={cn(
                "size-2.5 rounded-full bg-transparent transition-transform duration-150 ease-out",
                slot && "scale-100 bg-rose",
                !slot && "scale-75",
              )}
            />
          </span>
        ))}
      </div>

      <p
        className={cn(
          "mt-3 min-h-5 text-center text-sm text-rose-soft transition-opacity duration-150",
          error ? "opacity-100" : "opacity-0",
        )}
        aria-live="polite"
      >
        {error ?? "placeholder"}
      </p>

      <div className="enter-rise enter-rise-delay-5 mt-2 grid grid-cols-3 gap-2">
        {KEYS.map((key) => {
          if (key === "pad") {
            return <span key={key} className="h-14" aria-hidden="true" />;
          }
          if (key === "back") {
            return (
              <button
                key={key}
                type="button"
                className="pin-key flex h-14 items-center justify-center rounded-md bg-bg-elevated text-muted outline outline-1 -outline-offset-1 outline-fg/10"
                aria-label="Delete last digit"
                onClick={popDigit}
              >
                <Delete className="size-5" strokeWidth={1.75} />
              </button>
            );
          }
          return (
            <button
              key={key}
              type="button"
              className="pin-key flex h-14 items-center justify-center rounded-md bg-bg-elevated font-sans text-xl font-medium tabular-nums text-fg outline outline-1 -outline-offset-1 outline-fg/10"
              onClick={() => pushDigit(key)}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

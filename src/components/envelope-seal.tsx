import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function EnvelopeSeal({ breaking }: { breaking?: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-xs">
      <div className="relative aspect-[5/3] overflow-hidden rounded-lg bg-paper-deep">
        <div className="absolute inset-0 bg-paper" />
        <div
          className="absolute inset-x-0 top-0 h-[58%] bg-paper-deep"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-paper"
          style={{ clipPath: "polygon(0 100%, 50% 8%, 100% 100%)" }}
        />
        <div className="absolute inset-x-6 top-[42%] h-px bg-ink/10" />
        <div
          className={cn(
            "wax-glow absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-wax",
            breaking && "seal-break",
          )}
        >
          <Heart className="size-6 fill-paper text-paper" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}

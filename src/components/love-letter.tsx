import { useState } from "react";
import { Heart } from "lucide-react";
import { FallingPetals } from "@/components/falling-petals";
import { cn } from "@/lib/utils";

export function LoveLetter() {
  const [felt, setFelt] = useState(false);
  const [burst, setBurst] = useState(0);

  function receive() {
    setFelt(true);
    setBurst((n) => n + 1);
  }

  return (
    <div className="relative min-h-dvh bg-paper text-ink">
      <FallingPetals />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8 px-5 py-10 sm:py-14 lg:flex-row lg:items-center lg:justify-center lg:gap-16 lg:px-10 lg:py-16">
        <div className="enter-rise mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md">
          <CatBouquet onPoke={receive} />
        </div>

        <article className="mx-auto w-full max-w-lg lg:mx-0">
          <p className="enter-rise enter-rise-delay-1 font-display text-sm italic text-ink-soft">A letter, finally.</p>
          <h1 className="enter-rise enter-rise-delay-2 mt-2 font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
            I like you.
          </h1>
          <div className="enter-rise enter-rise-delay-3 mt-6 space-y-4 font-display text-lg leading-relaxed text-ink-soft sm:text-xl">
            <p>I have been carrying this around like a secret in my pocket.</p>
            <p>
              You make ordinary hours feel like they are leaning toward something warmer. I notice the way a room
              changes when you are in it. I replay small things you said. I catch myself smiling at my phone, then
              pretending I was not.
            </p>
            <p>
              So here it is, without a clever way out: I like you. Not in a maybe way. In a I-hope-you-open-this-and-smile
              way.
            </p>
            <p>
              The flowers are from a very serious cat. The feelings are from me. If you want, we can pretend the cat
              did all the brave parts.
            </p>
            <p className="italic text-ink">Always — if you will have me.</p>
          </div>

          <div className="enter-rise enter-rise-delay-4 mt-8 flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={receive}
              className={cn(
                "pin-key inline-flex min-h-12 items-center gap-2 rounded-md bg-rose px-5 py-3 font-sans text-sm font-medium text-paper",
                felt && "bg-rose-deep",
              )}
            >
              <Heart className={cn("size-4", felt && "fill-paper")} strokeWidth={1.75} />
              {felt ? "Then this was worth making." : "If you felt this too"}
            </button>
            {felt ? (
              <p className="font-display text-base italic text-ink-soft">Good. I was hoping you would tap that.</p>
            ) : null}
          </div>
        </article>
      </div>
      {burst > 0 ? <HeartBurst key={burst} /> : null}
    </div>
  );
}

function CatBouquet({ onPoke }: { onPoke: () => void }) {
  return (
    <button
      type="button"
      onClick={onPoke}
      className="cat-float paper-card block w-full rounded-xl bg-paper-deep p-2 pb-8 text-left"
      aria-label="A kitten offering a bouquet of white lilies. Tap for extra hearts."
    >
      <div className="cat-shine relative aspect-[3/4] overflow-hidden rounded-md bg-slot outline outline-1 -outline-offset-1 outline-ink/10">
        <img
          src="/cat-bouquet.jpg"
          alt="A ginger kitten offering a bouquet of white lilies"
          className="cat-photo h-full w-full object-cover"
        />
      </div>
      <p className="mt-3 text-center font-display text-sm italic text-ink-soft">delivered with both paws</p>
    </button>
  );
}

function HeartBurst() {
  return (
    <div
      className="heart-burst pointer-events-none absolute inset-x-0 bottom-28 z-20 flex justify-center gap-6"
      aria-hidden="true"
    >
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} style={{ animationDelay: `${i * 40}ms` }}>
          <Heart className="size-4 fill-rose text-rose" strokeWidth={0} />
        </span>
      ))}
    </div>
  );
}

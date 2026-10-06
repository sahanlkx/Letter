const PETALS = [
  { left: "6%", delay: "0s", duration: "9.5s", size: 9, rotate: 12 },
  { left: "18%", delay: "1.2s", duration: "11s", size: 12, rotate: -20 },
  { left: "29%", delay: "0.4s", duration: "8.4s", size: 8, rotate: 8 },
  { left: "41%", delay: "2.1s", duration: "10.2s", size: 11, rotate: -14 },
  { left: "53%", delay: "0.8s", duration: "12s", size: 10, rotate: 22 },
  { left: "64%", delay: "1.7s", duration: "9s", size: 13, rotate: -6 },
  { left: "74%", delay: "0.2s", duration: "10.8s", size: 8, rotate: 16 },
  { left: "85%", delay: "2.6s", duration: "8.8s", size: 11, rotate: -18 },
  { left: "12%", delay: "3.4s", duration: "11.4s", size: 9, rotate: 4 },
  { left: "92%", delay: "1.5s", duration: "9.8s", size: 10, rotate: -10 },
];

export function FallingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PETALS.map((petal, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size + 4,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            transform: `rotate(${petal.rotate}deg)`,
            background:
              i % 3 === 0 ? "var(--color-rose)" : i % 3 === 1 ? "var(--color-rose-soft)" : "var(--color-paper)",
          }}
        />
      ))}
    </div>
  );
}

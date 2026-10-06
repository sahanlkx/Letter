import { createFileRoute } from "@tanstack/react-router";
import { SurprisePage } from "@/components/surprise-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SurprisePage />;
}

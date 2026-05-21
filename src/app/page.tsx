import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Sidebar tone="dark" />
      <Hero
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2400&q=80&auto=format&fit=crop"
        alt="Warm wood-paneled interior of The Social Solitude bistro, lit by hanging lamps and intimate banquette seating."
        objectPosition="center"
      />
    </>
  );
}

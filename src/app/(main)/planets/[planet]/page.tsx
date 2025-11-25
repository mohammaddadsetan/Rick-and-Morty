import PlanetContainer from "@/components/layouts/planet/PlanetContainer";

import { notFound } from "next/navigation";

interface ParamsProps {
  params: Promise<{ planet: string }>;
}

export default async function Page({ params }: ParamsProps) {
  const { planet } = await params;

  const match = planet.match(/^([A-Za-z'\-\s]+)_(\d+)$/);
  if (!match) {
    notFound();
  }

  const [, namePart, idPart] = match;
  const planetId = Number(idPart);

  if (planetId < 1 || planetId > 15) {
    notFound();
  }

  return <PlanetContainer planetId={planetId} namePart={namePart} />;
}

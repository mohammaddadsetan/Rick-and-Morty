import React from "react";
import Character from "@/components/layouts/character/Character";

interface CharacterPageProps {
  params: {
    character: string;
  };
}

export default function Page({ params }: CharacterPageProps) {
  return <Character params={params} />;
}

import React from "react";
import Character from "@/components/layouts/character/Character";

interface CharacterPageProps {
  params: {
    character: string;
  };
}

const Page: React.FC<CharacterPageProps> = ({ params }) => {
  return <Character params={params} />;
};

export default Page;

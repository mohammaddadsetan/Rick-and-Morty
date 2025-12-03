"use client";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function CharactersFilter() {
  const statusOption = [
    { value: "alive", label: "Alive" },
    { value: "dead", label: "Dead" },
    { value: "unknown", label: "unknown" },
  ];

  const speciesOption = [
    { value: "alien", label: "Alien" },
    { value: "human", label: "Human" },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updatedFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-center gap-5 ">
      <Input
        defaultValue={searchParams.get("name") || ""}
        placeholder="search by name"
        onChange={(value) => updatedFilter("name", value)}
        className="w-[700px]"
      />
      <Select
        defaultValue={searchParams.get("status") || ""}
        options={statusOption}
        label="status"
        onChange={(value) => updatedFilter("status", value)}
        fullSelect
        className="max-w-[200px]"
      />
      <Select
        defaultValue={searchParams.get("species") || ""}
        options={speciesOption}
        label="species"
        onChange={(value) => updatedFilter("species", value)}
        fullSelect
        className="max-w-[200px]"
      />
    </div>
  );
}

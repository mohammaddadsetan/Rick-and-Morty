"use client";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";

export default function CharactersFilter() {
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const statusOption = [
    { value: "alive", label: "Alive" },
    { value: "dead", label: "Dead" },
    { value: "unknown", label: "unknown" },
  ];

  const speciesOption = [
    { value: "alien", label: "Alien" },
    { value: "human", label: "Human" },
    { value: "robot", label: "Robot" },
    { value: "animal", label: "Animal" },
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
    setIsLoading(false);
  };

  const handleNameChange = (value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsLoading(true);

    timerRef.current = setTimeout(() => {
      updatedFilter("name", value.trim());
    }, 800);
  };

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center gap-5 max-md:flex-col max-md:max-w-[500px] w-full px-5">
      <Input
        defaultValue={searchParams.get("name") || ""}
        placeholder="search by name"
        onChange={handleNameChange}
        className="md:w-[600px] w-full h-11"
      />
      <Select
        defaultValue={searchParams.get("status") || ""}
        options={statusOption}
        label="status"
        onChange={(value) => {
          updatedFilter("status", value);
        }}
        fullSelect
        className="md:max-w-[200px]"
      />
      <Select
        defaultValue={searchParams.get("species") || ""}
        options={speciesOption}
        label="species"
        onChange={(value) => {
          updatedFilter("species", value);
        }}
        fullSelect
        className="md:max-w-[200px]"
      />

      <div
        className={
          isLoading
            ? "size-8 border-4 border-t-transparent border-(--text) rounded-full animate-spin"
            : "size-8"
        }
      />
    </div>
  );
}

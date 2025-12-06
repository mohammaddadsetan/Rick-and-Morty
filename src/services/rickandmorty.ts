import { unstable_cache } from "next/cache";

const API = "https://rickandmortyapi.com/api";
const ONE_MONTH_IN_SECONDS = 30 * 24 * 60 * 60;

export interface CharacterType {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
export interface EpisodeType {
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export interface LocationType {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

type RickAndMortyApiResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: CharacterType[];
};
type RickAndMortyEpisodeApiResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: EpisodeType[];
};

export const getCharacters = unstable_cache(
  async (): Promise<CharacterType[]> => {
    const allCharacters: CharacterType[] = [];
    let nextUrl: string | null = `${API}/character`;

    while (nextUrl) {
      const res = await fetch(nextUrl, {
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch characters: ${res.status}`);
      }

      const data = (await res.json()) as RickAndMortyApiResponse;

      allCharacters.push(...data.results);
      nextUrl = data.info.next;
    }

    return allCharacters;
  },
  ["rick-morty-characters"],
  {
    revalidate: ONE_MONTH_IN_SECONDS,
    tags: ["characters"],
  }
);
export const getAllEpisodes = unstable_cache(
  async (): Promise<EpisodeType[]> => {
    const allEpisodes: EpisodeType[] = [];
    let nextUrl: string | null = `${API}/episode`;

    while (nextUrl) {
      const res = await fetch(nextUrl);

      if (!res.ok) {
        throw new Error(`Failed to fetch episodes: ${res.status}`);
      }

      const data = (await res.json()) as RickAndMortyEpisodeApiResponse;

      allEpisodes.push(...data.results);
      nextUrl = data.info.next;
    }

    return allEpisodes;
  },
  ["rick-morty-episodes"],
  {
    revalidate: ONE_MONTH_IN_SECONDS,
    tags: ["episodes"],
  }
);

export const getCharactersByFilter = async (filters: {
  status?: string;
  species?: string;
  name?: string;
  page?: number;
}) => {
  const { status = "", species = "", name = "", page = 1 } = filters;

  try {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (species) params.append("species", species);
    if (name) params.append("name", name);
    if (page) params.append("page", page.toString());

    const res = await fetch(`${API}/character?${params.toString()}`);
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching characters by filter:", error);
    return null;
  }
};

export const getLocations = unstable_cache(
  async (): Promise<LocationType[]> => {
    const res = await fetch(`${API}/location`);
    const data = await res.json();
    return data.results || [];
  },
  ["rick-morty-locations"],
  {
    revalidate: ONE_MONTH_IN_SECONDS,
    tags: ["locations"],
  }
);
export const getCharacterById = (id: number) =>
  unstable_cache(
    async (): Promise<CharacterType | null> => {
      if (!id || id < 1) return null;
      try {
        const res = await fetch(`${API}/character/${id}`);
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    },
    [`character-${id}`],
    {
      revalidate: ONE_MONTH_IN_SECONDS,
      tags: [`character-${id}`, "characters"],
    }
  )();

export const getLocationById = (id: number) =>
  unstable_cache(
    async (): Promise<LocationType | null> => {
      try {
        const res = await fetch(`${API}/location/${id}`);
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    },
    [`location-${id}`],
    { tags: [`location-${id}`, "locations"] }
  )();

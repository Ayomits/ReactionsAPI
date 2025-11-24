"use client";

import { useQuery } from "@tanstack/react-query";
import { api, JsonApi } from "../api";

type TagResponse = {
  name: string;
  url: string;
  media: {
    id: string;
    url: string;
  }[];
};

export function useGetAllPublicTags() {
  return useQuery({
    queryKey: ["tags_all"],
    queryFn: async () => {
      const res = await api("/api/v1/tags");
      return (await res.json()) as JsonApi<TagResponse[]>;
    },
  });
}

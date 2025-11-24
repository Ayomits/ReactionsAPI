import { Env } from "../config/env";
import { Primitive } from "../lib/types";


type JsonApiLinks = string[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonApiRelationships<T = any> = Record<
  string,
  { links: JsonApiLinks | null; data: T | null }
>;

type JsonApiAction = {
  method: string;
  path: string;
};

export type JsonApi<T> = {
  data: T | null;
  relationships: Partial<JsonApiRelationships> | null;
  attributes: Record<string, Primitive> | null;
  meta: Record<string, Primitive | Primitive[]>;
  actions: JsonApiAction[];
};

export async function api(path: string, init?: RequestInit) {
  return await fetch(`${Env.NEXT_PUBLIC_API_URL}${path}`, init);
}

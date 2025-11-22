import { Primitive } from '../utils/types';

type JsonApiLinks = string[];

type JsonApiRelationships<T = any> = Record<
  string,
  { links: JsonApiLinks | null; data: T | null }
>;

type JsonApiAction = {
  method: string;
  path: string;
};

type JsonApi<T> = {
  data: T | null;
  relationships: Partial<JsonApiRelationships> | null;
  attributes: Record<string, Primitive> | null;
  meta: Record<string, Primitive | Primitive[]>;
  actions: JsonApiAction[];
};

export class JsonApiResponse<T = any> {
  relationships: Partial<JsonApiRelationships> | null;
  attributes: Record<string, Primitive> | null;
  data: T | null;
  meta: Record<string, Primitive | Primitive[]> | null;
  actions: JsonApiAction[] | null;

  constructor(data: Partial<JsonApi<T>>) {
    this.attributes = data.attributes ?? null;
    this.data = data.data ?? null;
    this.relationships = data.relationships ?? null;
    this.meta = data.meta ?? null;
    this.actions =
      data.actions && data.actions.length > 0 ? data.actions : null;
  }

  toJSON() {
    const data: Partial<JsonApi<T>> = {};

    if (this.data) {
      data.data = this.data;
    }

    if (this.attributes) {
      data.attributes = this.attributes;
    }

    if (this.actions) {
      data.actions = this.actions;
    }

    if (this.relationships) {
      data.relationships = this.relationships;
    }

    if (this.meta) {
      data.meta = this.meta;
    }

    return data;
  }
}

export interface Link {
  readonly href: string;
  readonly templated?: boolean;
}

export interface SelfLink {
  readonly self: Link;
}

export interface BaseEntity {
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly _links: SelfLink & Readonly<Record<string, Link | undefined>>;
}

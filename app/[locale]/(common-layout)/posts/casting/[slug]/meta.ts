import {
  CastingDocument,
  type CastingQuery,
  type CastingQueryVariables
} from '@/graphql/types/graphql';
import type { GlobalPageProps } from '@/utils/globalPageProps';

export type PageProps = GlobalPageProps & {
  params: {
    slug: string;
  };
};

export type Query = CastingQuery;
export type Variables = CastingQueryVariables;

export const query = CastingDocument;

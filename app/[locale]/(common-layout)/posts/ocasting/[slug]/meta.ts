import {
  OcastingDocument,
  type OcastingQuery,
  type OcastingQueryVariables
} from '@/graphql/types/graphql';
import type { GlobalPageProps } from '@/utils/globalPageProps';

export type PageProps = GlobalPageProps & {
  params: {
    slug: string;
  };
};

export type Query = OcastingQuery;
export type Variables = OcastingQueryVariables;

export const query = OcastingDocument;

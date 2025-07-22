import {
  NewTeamDocument,
  type NewTeamQuery,
  type NewTeamQueryVariables,
} from '@/graphql/types/graphql';
import type { GlobalPageProps } from '@/utils/globalPageProps';

export type PageProps = GlobalPageProps & {
  params: {
    slug: string;
  };
};

export type Query = NewTeamQuery;
export type Variables = NewTeamQueryVariables;

export const query = NewTeamDocument;

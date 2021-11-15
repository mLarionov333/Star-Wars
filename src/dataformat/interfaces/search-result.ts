import { IPerson } from './person';

export interface ISearchResult {
  count: number;

  next: string;

  previous: string;

  results: Array<IPerson>;
}

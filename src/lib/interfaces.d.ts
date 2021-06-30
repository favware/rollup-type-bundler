import type { URL } from 'url';

export interface Options {
  dist: URL;
  buildScript?: string;
  config?: string;
  verbose?: boolean;
  external?: string[];
}

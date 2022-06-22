import type { URL } from 'node:url';
export default undefined;

declare module 'commander' {
  export interface OptionValues {
    dist: URL;
    buildScript?: string;
    config?: string;
    verbose?: boolean;
    external?: string[];
  }
}

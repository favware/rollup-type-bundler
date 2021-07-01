import { cyan, red } from 'colorette';

/**
 * Logs an error and appends extra information if verbose is on
 * @param param See {@link LogVerboseErrorOptions}
 */
export function logVerboseError({ text, verbose = false, verboseText = [], exitAfterLog: exitOnLog = false }: LogVerboseErrorOptions) {
  let combinedText = text;

  if (verbose) {
    combinedText = combinedText.concat(verboseText);
  }

  console.error(red(combinedText.join('\n')));

  if (exitOnLog) {
    process.exit(1);
  }
}

export function logVerboseInfo(text: string[], verbose = false) {
  if (verbose) {
    console.info(cyan(text.join('\n')));
  }
}

/**
 * Options for {@link logVerboseError}
 */
interface LogVerboseErrorOptions {
  /** The text to always log, regardless of whether {@link LogVerboseErrorOptions.verbose} is `true` or `false` */
  text: string[];
  /** Whether to output {@link LogVerboseErrorOptions.verboseText} */
  verbose?: boolean;
  /** The text to log if {@link LogVerboseErrorOptions.verbose} is `true` */
  verboseText?: string[];
  /** Whether to call `process.exit(1)` after logging */
  exitAfterLog?: boolean;
}

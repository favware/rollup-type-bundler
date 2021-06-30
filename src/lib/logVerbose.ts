import { cyan, red } from 'colorette';

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

interface LogVerboseErrorOptions {
  text: string[];
  verbose?: boolean;
  verboseText?: string[];
  exitAfterLog?: boolean;
}

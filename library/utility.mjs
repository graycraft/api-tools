/**!
 * Utility methods for common application use cases.
 *
 * @typedef {Object<string, string>} Dict
 * @typedef {{
 *   aggregate?: boolean;
 *   authentication?: boolean;
 *   debug?: boolean;
 *   exit?: boolean;
 *   flow?: string;
 *   headers?: boolean;
 *   snapshot?: boolean;
 *   throw?: boolean;
 *   validate?: boolean;
 *   verbose?: boolean;
 * }} Options
 * @module library/utility
 */

const OPTIONS = {
  aggr: 'aggregate',
  auth: 'authentication',
  debu: 'debug',
  exit: 'exit',
  flow: 'flow',
  head: 'headers',
  snap: 'snapshot',
  thro: 'throw',
  vali: 'validate',
  verb: 'verbose',
};

/**
 * Obtain key name from a dictionary by value.
 * @param {string} value A dictionary entry value.
 * @param {Dict} dictionary Dictionary to search.
 * @returns {string} Key name.
 */
export const obtainName = (value, dictionary) => {
  const name = Object.entries(dictionary).find((entry) => entry[1] === value)?.[0];

  return name;
};
export const obtain = obtainName;

/**
 * Parse process argument vectors from CLI to usable handler, parameters and options.
 * @param {NodeJS.Process["argv"]} [argv] Process argument vectors from CLI.
 * @typedef Arguments
 * @prop {Dict} explicit Explicit parameters to execute API request handler with.
 * @prop {string} handler API request handler.
 * @prop {string[]} implicit Implicit parameters to execute API request handler with.
 * @prop {Options} options Options to apply while executing API request handler or flow.
 * @prop {(string | Dict)[]} params Parameters to execute API request handler with.
 * @returns {Arguments} Usable handler, parameters and options.
 */
export const parseArguments = (argv = []) => {
  const arg2 = argv[2] ?? '',
    { optionsExplicit, optionsImplicit } = parseOptions(argv),
    { paramsExplicit, paramsImplicit } = parseParameters(argv),
    params = Object.keys(paramsExplicit).length
      ? [...paramsImplicit, paramsExplicit]
      : paramsImplicit;
  let handler = arg2;

  if (arg2.includes('--')) {
    handler = '';
  }

  return {
    explicit: paramsExplicit,
    handler,
    implicit: paramsImplicit,
    options: { ...optionsExplicit, ...optionsImplicit },
    params,
  };
};

/**
 * Parse process argument vectors from CLI to usable options.
 * @param {NodeJS.Process["argv"]} argv Process argument vectors from CLI.
 * @returns {{
 *   optionsExplicit: Options,
 *   optionsImplicit: Options
 * }} Usable options.
 */
export const parseOptions = (argv) => {
  const options = argv
      .slice(2)
      .filter(
        (option) =>
          option.includes('--aggr') ||
          option.includes('--auth') ||
          option.includes('--debu') ||
          option.includes('--exit') ||
          option.includes('--flow') ||
          option.includes('--head') ||
          option.includes('--snap') ||
          option.includes('--thro') ||
          option.includes('--vali') ||
          option.includes('--verb'),
      ),
    optionsExplicit = options
      .filter((option) => option.includes('='))
      .map((option) => {
        let [key, value] = option.split('='),
          flag;

        key = OPTIONS[key.slice(2, 6)];
        if (key !== 'flow') {
          flag = value === 'off' ? false : Boolean(value);

          return { [key]: flag };
        }

        return { [key]: value };
      }, {})
      .reduce((accum, option) => Object.assign(accum, option), {}),
    optionsImplicit = options
      .filter((param) => !param.includes('='))
      .map((option) => OPTIONS[option.slice(2, 6)], {})
      .reduce((accum, option) => ((accum[option] = true), accum), {});

  return { optionsExplicit, optionsImplicit };
};

/**
 * Parse process argument vectors from CLI to usable parameters.
 * @param {NodeJS.Process["argv"]} argv Process argument vectors from CLI.
 * @returns {{
 *   paramsExplicit: Dict,
 *   paramsImplicit: string[]
 * }} Usable parameters.
 */
export const parseParameters = (argv) => {
  const params = argv.slice(3).filter((param) => !param.includes('--')),
    paramsExplicit = params
      .filter((param) => param.includes('='))
      .map((param) => {
        /**
         * Regular expression instead of '=' ensures that only first occurrence of separator splits string, e.g.:
         * `node bybit depositAll USDT cursor=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx==`
         */
        const [key, value] = param.split(/=(.*)/);

        return { [key]: value };
      })
      .reduce((accum, param) => Object.assign(accum, param), {}),
    paramsImplicit = params.filter((param) => !param.includes('='));

  return { paramsExplicit, paramsImplicit };
};

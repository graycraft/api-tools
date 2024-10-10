import { parseArguments } from '#lib/utility.mjs';

describe('parseArguments', () => {
  test('root api', () => {
    expect(parseArguments(['root', 'api'])).toEqual({
      explicit: {},
      handler: '',
      implicit: [],
      options: {},
      params: [],
    });
  });
  test('root api handler', () => {
    expect(parseArguments(['root', 'api', 'handler'])).toEqual({
      explicit: {},
      handler: 'handler',
      implicit: [],
      options: {},
      params: [],
    });
  });
  test('root api handler param', () => {
    expect(parseArguments(['root', 'api', 'handler', 'param'])).toEqual({
      explicit: {},
      handler: 'handler',
      implicit: ['param'],
      options: {},
      params: ['param'],
    });
  });
  test('root api handler param paramKey=paramValue', () => {
    expect(parseArguments(['root', 'api', 'handler', 'param', 'paramKey=paramValue'])).toEqual({
      explicit: { paramKey: 'paramValue' },
      handler: 'handler',
      implicit: ['param'],
      options: {},
      params: ['param', { paramKey: 'paramValue' }],
    });
  });
  test('root api handler param paramKey=paramValue --aggr=optionValue', () => {
    expect(
      parseArguments([
        'root',
        'api',
        'handler',
        'param',
        'paramKey=paramValue',
        '--aggr=optionValue',
      ]),
    ).toEqual({
      explicit: { paramKey: 'paramValue' },
      handler: 'handler',
      implicit: ['param'],
      options: { aggregate: true },
      params: ['param', { paramKey: 'paramValue' }],
    });
  });
  test('root api handler param paramKey=paramValue --aggr=off', () => {
    expect(
      parseArguments(['root', 'api', 'handler', 'param', 'paramKey=paramValue', '--aggr=off']),
    ).toEqual({
      explicit: { paramKey: 'paramValue' },
      handler: 'handler',
      implicit: ['param'],
      options: { aggregate: false },
      params: ['param', { paramKey: 'paramValue' }],
    });
  });
});

import { TimeUnitFull, IntervalTimeout } from './types';

type IntervalResult = {
  type: TimeUnitFull;
  number: number;
  valueOf: number;
};

export const getTypeofInterval = (str: Exclude<IntervalTimeout, number>) => {
  const result: IntervalResult = {
    type: 'second',
    number: 0,
    valueOf: 1,
  };

  if (str.indexOf('s') > -1) {
    result.type = 'second';
    result.valueOf = 1000;
  }
  if (str.indexOf('m') > -1) {
    result.type = 'minute';
    result.valueOf = 1000 * 60;
  }
  if (str.indexOf('h') > -1) {
    result.type = 'hour';
    result.valueOf = 1000 * 60 * 60;
  }
  if (str.indexOf('d') > -1) {
    result.type = 'day';
    result.valueOf = 1000 * 60 * 60 * 24;
  }
  if (str.indexOf('w') > -1) {
    result.type = 'week';
    result.valueOf = 1000 * 60 * 60 * 24 * 7;
  }

  result.number = parseInt(str);
  result.valueOf = !isNaN(result.number * result.valueOf) ? result.number * result.valueOf : 0;

  return result;
};

export const calcDatetime = (type: TimeUnitFull, value: number): number => {
  let timestamp = 0;
  switch (type) {
    case 'second':
      timestamp = value;
      break;
    case 'minute':
      timestamp = value * 60;
      break;
    case 'hour':
      timestamp = value * 60 * 60;
      break;
    case 'day':
      timestamp = value * 24 * 60 * 60;
      break;
    case 'week':
      timestamp = value * 7 * 24 * 60 * 60;
      break;
    case 'year':
      timestamp = value * 365 * 24 * 60 * 60;
      break;

    default:
      // eslint-disable-next-line no-case-declarations
      const n: never = type;
      break;
  }

  return timestamp * 1000;
};

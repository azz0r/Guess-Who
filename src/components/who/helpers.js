import arrayShuffle from 'array-shuffle';

export function pickRandomItems(collection, amount) {
  return arrayShuffle(collection).slice(0, 200);//amount);
}

export function getNumberAsString(number) {
  let returnValue;
  switch (number) {
    default:
    case 1:
      returnValue = 'first'
    break
    case 2:
      returnValue = 'second'
    break
    case 3:
      returnValue = 'third'
    break
    case 4:
      returnValue = 'fourth'
    break
    case 5:
      returnValue = 'fifth'
    break
    case 6:
      returnValue = 'sixth'
    break
    case 7:
      returnValue = 'seventh'
    break
    case 8:
      returnValue = 'eight'
    break
  }
  return returnValue;
}
export const toSlug = string => {
  return string.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')  // remove leading, trailing -
}

export function pickRandom(collection=[]) {
  return collection[(Math.random() * collection.length)| 0]
}

/*
  * Get an array of values from the peoples collection
  * @param  {string} field on the object we want to aggregate
  * @return {array} returns an array of fields
*/
export function getValues(collection, field) {
  return collection.map((object) => {
    return object[field];
  })
}

/*
  * Takes an object and generates a new array of the fields on that object
  * @return {array} returns an array of fields
*/
export function getFields(obj) {
  let fields = [];
  for (const key of Object.keys(obj)) {
    fields.push(key);
  }
  return fields;
}

export function condenseArray(data) {
  let result = [];
  if (data && data.length > 0) {
    data.forEach(function (elem) {
      if (result.indexOf(elem) === -1) {
        result.push(elem);
      }
    });
  }
  return result;
}

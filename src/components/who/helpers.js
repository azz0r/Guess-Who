import arrayShuffle from 'array-shuffle';

export function pickRandomItems(collection, amount) {
  return arrayShuffle(collection).slice(0, amount);
}

export function slugParse(string = '') {
  return string.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')  // remove leading, trailing -
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

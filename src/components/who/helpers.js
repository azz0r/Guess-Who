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

export const toSlug = (string) => {
  return string.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '')  // remove leading, trailing -
}

export const pickRandom = (collection = []) => {
  return collection[(Math.random() * collection.length)| 0]
}

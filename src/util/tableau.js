
const random = (len, gen) => {
  return Array(len).fill().map(() => gen())
}

const isSorted = (array) => {
  if (array.length === 0 || array.length === 1) {
    return true
  }

  const a = []
  for (let i = 0; i < array.length - 1; i++) {
    a.push([array[i], array[i+1]])
  }
  return a.map(([a,b])=>a <= b).reduce((acc, val) => acc && val)
}

module.exports = {
  random,
  isSorted,
}
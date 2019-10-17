const root_path = '..'

const Nombre = require(root_path + '/util/nombre')
const Tableau = require(root_path + '/util/tableau')


const getArray = a=>a.array
const setArray = (array,a)=>a.array=array

const getGetter = a=>a.getter
const setGetter = (getter,a)=>a.getter=getter

const getSetter = a=>a.setter
const setSetter = (setter,a)=>a.setter=setter

const getNumberOfLines = a=>a.numberOfLines
const setNumberOfLines = (numberOfLines,a)=>a.numberOfLines=numberOfLines

const getNumberOfColumns = a=>a.numberOfColumns
const setNumberOfColumns = (numberOfColumns,a)=>a.numberOfColumns=numberOfColumns


const create = (numLines, numCols, gen) => {
  const a = {}

  setArray(
    Tableau.random(
      numLines,
      () => Tableau.random(
        numCols,
        gen
      )
    ),
    a
  )

  setGetter((i, j, m) => getArray(m)[i][j], a)
  setSetter((val, i, j, m) => {getArray(m)[i][j] = val}, a)
  setNumberOfLines((m) => getArray(m).length, a)
  setNumberOfColumns((m) => getArray(m)[0].length, a)

  return a
}

const createRef = (i_ref, len_i, j_ref, len_j, ref) => {
  const a = {}

  setGetter((i, j, m) => {
    if (
      0 <= i && i <= len_i - 1 &&
      0 <= j && j <= len_j - 1
    ) {
      return get(i_ref + i, j_ref + j, ref)
    }
  }, a)
  setSetter((val, i, j, m) => {
    if (
      0 <= i && i <= len_i - 1 &&
      0 <= j && j <= len_j - 1
    ) {
      set(val, i_ref + i, j_ref + j, ref)
    }
  }, a)
  setNumberOfLines((m) => len_i, a)
  setNumberOfColumns((m) => len_j, a)

  return a
}

const get = (i, j, m) => getGetter(m)(i, j, m)
const set = (val, i, j, m) => getSetter(m)(val, i, j, m)
const numberOfLines = (m) => getNumberOfLines(m)(m)
const numberOfColumns = (m) => getNumberOfColumns(m)(m)


const empty = (numLines, numCols) => create(numLines, numCols, () => 0)
const emptySquare = (n) => create(n, n, () => 0)

const random = (numLines, numCols) => create(numLines, numCols, () => Math.floor(Nombre.random(-100, 100)))
const randomSquare = (n) => create(n, n, () => Math.floor(Nombre.random(-10, 10)))

const update = (updater, i, j, m) => set(updater(get(i, j, m)), i, j, m)


const forEachCell = (f, m) => {
  for (let i = 0; i < numberOfLines(m); i++) {
    for (let j = 0; j < numberOfColumns(m); j++) {
      f(get(i, j, m), i, j, m)
    }
  }
}

const map = (f, m) => {
  const ans = empty(numberOfLines(m), numberOfColumns(m))
  forEachCell(
    (elem, i, j) => {
      set(f(get(i, j, m)), i, j, ans)
    },
    ans
  )
  return ans
}

const add = (ma, mb) => {
  const ans = empty(numberOfLines(ma), numberOfColumns(ma))
  forEachCell(
    (elem, i, j) => {
      set(get(i, j, ma) + get(i, j, mb), i, j, ans)
    },
    ans
  )
  return ans
}

const sub = (ma, mb) => {
  const ans = empty(numberOfLines(ma), numberOfColumns(ma))
  forEachCell(
    (elem, i, j) => {
      set(get(i, j, ma) - get(i, j, mb), i, j, ans)
    },
    ans
  )
  return ans
}

const copyValue = (val_m, m) => {
  forEachCell(
    (elem, i, j) => {
      set(elem, i, j, m)
    },
    val_m
  )
}


module.exports = {
  createRef,
  empty,
  emptySquare,
  random,
  randomSquare,
  get,
  set,
  update,
  numberOfLines,
  numberOfColumns,
  add,
  sub,
  copyValue,
  getArray,
  map,
}
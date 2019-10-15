const root_path = '.'

const Nombre = require(root_path + '/util/nombre')
const Tableau = require(root_path + '/util/tableau')


const insertionSort = (array) => {
  const _shiftWhile = (f, i) => {
    if (0 <= i && f(array[i])) {
      array[i + 1] = array[i]
      return _shiftWhile(f, i - 1)
    } else {
      return i + 1
    }
  }

  const _insertSort = (i) => {
    if (i < array.length) {
      if (0 < i) {
        let elem = array[i]
        const last_shifted_index = _shiftWhile(a=>elem < a, i - 1)
        array[last_shifted_index] = elem
      }
      _insertSort(i + 1)
    }
  }

  _insertSort(0)
}


const array = Tableau.random(100, () => Nombre.random(-100, 100))

insertionSort(array)
console.log(array, Tableau.isSorted(array))



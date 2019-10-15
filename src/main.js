const root_path = '.'

const Nombre = require(root_path + '/util/nombre')
const Tableau = require(root_path + '/util/tableau')


const bubbleSort = (array) => {
  const _moveTheBubble = (len) => {
    for (let i = 0; i < len - 1; i++) {
      if (array[i + 1] < array[i]) {
        const tmp = array[i + 1]
        array[i + 1] = array[i]
        array[i] = tmp
      }
    }
  }

  const _bubbleSort = (len) => {
    if (len === 1 || len === 0) {
      return
    }
    _moveTheBubble(len)
    _bubbleSort(len - 1)
  }

  _bubbleSort(array.length)
}


const array = Tableau.random(100, () => Nombre.random(-100, 100))
// const array = [3,3,5,1,0,34,23,23,-4]

bubbleSort(array)
console.log(array, Tableau.isSorted(array))



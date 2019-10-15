
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

module.exports = bubbleSort
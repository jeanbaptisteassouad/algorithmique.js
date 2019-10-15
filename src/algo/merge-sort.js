
const mergeSort = (array) => {
  const _forEachBetween = (i, j, f) => {
    for (let x = i; x < j; x++) {
      f(x)
    }
  }

  const _mergeTwoSortedArray = (first_i, first_len, len) => {
    const first_array = []
    _forEachBetween(
      first_i,
      first_i + first_len,
      (i) => first_array.push(array[i])
    )

    const second_array = []
    _forEachBetween(
      first_i + first_len,
      first_i + len,
      (i) => second_array.push(array[i])
    )

    let first_array_index = 0
    const chooseFirst = (i) => {
      array[i] = first_array[first_array_index]
      first_array_index++
    }
    let second_array_index = 0
    const chooseSecond = (i) => {
      array[i] = second_array[second_array_index]
      second_array_index++
    }

    _forEachBetween(
      first_i,
      first_i + len,
      (i) => {
        if (first_array[first_array_index] === undefined) {
          chooseSecond(i)
        } else if (second_array[second_array_index] === undefined) {
          chooseFirst(i)
        } else if (first_array[first_array_index] <= second_array[second_array_index]) {
          chooseFirst(i)
        } else {
          chooseSecond(i)
        }
      }
    )
  }

  const _mergeSort = (i, len) => {
    if (len <= 1) {
      return
    }

    const first_i = i
    const first_len = Math.floor(len / 2)
    const second_i = first_i + first_len
    const second_len = len - first_len

    _mergeSort(first_i, first_len)
    _mergeSort(second_i, second_len)
    _mergeTwoSortedArray(first_i, first_len, len)
  }

  _mergeSort(0, array.length)
}

module.exports = mergeSort

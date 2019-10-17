
const bruteForce = (array) => {
  let ans = [null, null, -Infinity]

  const updateAns = (i, j, sum) => {
    if (ans[2] < sum) {
      ans = [i, j, sum]
    }
  }

  const allIntervalOfSize = (size) => {
    let sum = 0
    for (let i = 0; i < size; i++) {
      sum += array[i]
    }

    for (let i = 0; i <= array.length - size; i++) {
      updateAns(i, i + size - 1, sum)
      sum = sum - array[i] + array[i + size]
    }
  }

  for (let size = 1; size <= array.length; size++) {
    allIntervalOfSize(size)
  }

  return ans
}

const maximumSubarraySum = (array) => {

  const _maximumCenterarraySum = (i, mid, j) => {
    let sum_left = -Infinity
    let sum = 0
    let x_left = i
    for (let x = mid; i <= x; x--) {
      sum += array[x]
      if (sum_left < sum) {
        sum_left = sum
        x_left = x
      }
    }

    let sum_right = -Infinity
    sum = 0
    let x_right = j
    for (let x = mid + 1; x <= j; x++) {
      sum += array[x]
      if (sum_right < sum) {
        sum_right = sum
        x_right = x
      }
    }

    return [x_left, x_right, sum_left + sum_right]
  }

  const _maximumSubarraySum = (i, j) => {
    if (i === j) {
      return [i, j, array[i]]
    }

    const mid = Math.floor((i + j) / 2)
    const left = _maximumSubarraySum(i, mid)
    const right = _maximumSubarraySum(mid + 1, j)
    const center = _maximumCenterarraySum(i, mid, j)

    if (left[2] <= right[2] && center[2] <= right[2]) {
      return right
    } else if (right[2] <= left[2] && center[2] <= left[2]) {
      return left
    } else {
      return center
    }
  }

  return _maximumSubarraySum(0, array.length - 1)
}

module.exports = {
  bruteForce,
  maximumSubarraySum,
}
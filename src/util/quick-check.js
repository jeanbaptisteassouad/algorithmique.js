
const loop = (str, f) => {
  const number_of_loop = 100
  const time_limit = 10000
  it(str, () => {
    for (let i = 0; i < number_of_loop; i++) {
      f()
    }
  }).timeout(time_limit)
}

module.exports = {
  loop,
}

const root_path = '..'

const Matrix = require(root_path + '/util/matrix')


const matrixMultiplication = (ma, mb) => {
  const ma_lines = Matrix.numberOfLines(ma)
  const ma_cols = Matrix.numberOfColumns(ma)
  const mb_lines = Matrix.numberOfLines(mb)
  const mb_cols = Matrix.numberOfColumns(mb)

  if (ma_cols !== mb_lines) {
    throw ''
  }
  const n_max = ma_cols

  const ans = Matrix.empty(
    ma_lines,
    mb_cols,
  )

  for (let i = 0; i < ma_lines; i++) {
    for (let j = 0; j < mb_cols; j++) {
      for (let n = 0; n < n_max; n++) {
        Matrix.update(a=>a+Matrix.get(i, n, ma)*Matrix.get(n, j, mb), i, j, ans)
      }
    }
  }

  return ans
}

const strassenMatrixMultiplication = (ma, mb) => {
  // n must always be a power of two except for n === 1
  const n = Matrix.numberOfLines(ma)
  const ans = Matrix.emptySquare(n)
  if (n === 1) {
    Matrix.set(Matrix.get(0, 0, ma) * Matrix.get(0, 0, mb), 0, 0, ans)
    return ans
  } else {
    // n is always a power of two
    const a11 = Matrix.createRef(0, n/2, 0, n/2, ma)
    const a12 = Matrix.createRef(0, n/2, n/2, n/2, ma)
    const a21 = Matrix.createRef(n/2, n/2, 0, n/2, ma)
    const a22 = Matrix.createRef(n/2, n/2, n/2, n/2, ma)

    const b11 = Matrix.createRef(0, n/2, 0, n/2, mb)
    const b12 = Matrix.createRef(0, n/2, n/2, n/2, mb)
    const b21 = Matrix.createRef(n/2, n/2, 0, n/2, mb)
    const b22 = Matrix.createRef(n/2, n/2, n/2, n/2, mb)

    const s1 = Matrix.sub(b12, b22)
    const s2 = Matrix.add(a11, a12)
    const s3 = Matrix.add(a21, a22)
    const s4 = Matrix.sub(b21, b11)
    const s5 = Matrix.add(a11, a22)

    const s6 = Matrix.add(b11, b22)
    const s7 = Matrix.sub(a12, a22)
    const s8 = Matrix.add(b21, b22)
    const s9 = Matrix.sub(a11, a21)
    const s10 = Matrix.add(b11, b12)

    const p1 = strassenMatrixMultiplication(a11, s1)
    const p2 = strassenMatrixMultiplication(s2, b22)
    const p3 = strassenMatrixMultiplication(s3, b11)
    const p4 = strassenMatrixMultiplication(a22, s4)
    const p5 = strassenMatrixMultiplication(s5, s6)
    const p6 = strassenMatrixMultiplication(s7, s8)
    const p7 = strassenMatrixMultiplication(s9, s10)

    const c11 = Matrix.add(Matrix.sub(Matrix.add(p5, p4), p2), p6)
    const c12 = Matrix.add(p1, p2)
    const c21 = Matrix.add(p3, p4)
    const c22 = Matrix.sub(Matrix.add(p5, p1), Matrix.add(p3, p7))

    Matrix.copyValue(c11, Matrix.createRef(0, n/2, 0, n/2, ans))
    Matrix.copyValue(c12, Matrix.createRef(0, n/2, n/2, n/2, ans))
    Matrix.copyValue(c21, Matrix.createRef(n/2, n/2, 0, n/2, ans))
    Matrix.copyValue(c22, Matrix.createRef(n/2, n/2, n/2, n/2, ans))

    return ans
  }
}

module.exports = {
  matrixMultiplication,
  strassenMatrixMultiplication
}


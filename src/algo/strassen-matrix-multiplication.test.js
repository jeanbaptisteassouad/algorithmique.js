const chai = require('chai')
const expect = chai.expect

const root_path = '..'

const StrassenMatrixMultiplication = require(root_path + '/algo/strassen-matrix-multiplication')
const Nombre = require(root_path + '/util/nombre')
const Tableau = require(root_path + '/util/tableau')
const Matrix = require(root_path + '/util/matrix')
const QuickCheck = require(root_path + '/util/quick-check')

describe('strassenMatrixMultiplication', () => {
  const formate = (m) => Matrix.map(
    (cell) => {
      if (cell === 0) {
        return 0
      } else if (cell === -0) {
        return 0
      } else {
        return cell
      }
    },
    m
  )

  QuickCheck.loop('should multiply any power of two square matrix', () => {
    const n = Math.pow(2, Math.floor(Nombre.random(0, 6)))
    const ma = Matrix.randomSquare(n)
    const mb = Matrix.randomSquare(n)

    const ans1 = formate(StrassenMatrixMultiplication.matrixMultiplication(ma, mb))
    const ans2 = formate(StrassenMatrixMultiplication.strassenMatrixMultiplication(ma, mb))

    expect(Matrix.getArray(ans2)).to.deep.equal(Matrix.getArray(ans1))
    expect(Matrix.getArray(ans2)).to.not.be.undefined
  })
})


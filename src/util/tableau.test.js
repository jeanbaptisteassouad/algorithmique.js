const chai = require('chai')
const expect = chai.expect

const root_path = '..'

const mergeSort = require(root_path + '/algo/merge-sort')
const Nombre = require(root_path + '/util/nombre')
const Tableau = require(root_path + '/util/tableau')
const QuickCheck = require(root_path + '/util/quick-check')

describe('Tableau', () => {
  QuickCheck.loop('isSorted', () => {
    const array = Tableau.random(100, () => Nombre.random(-100, 100))
    const sorted_array = array.slice()
    sorted_array.sort((a, b) => {
      if (a < b) {
        return -1
      } else if (a === b) {
        return 0
      } else {
        return 1
      }
    })
    
    expect(Tableau.isSorted(sorted_array)).to.equal(true)

    if (Tableau.isSorted(array)) {
      expect(array).to.deep.equal(sorted_array)
    } else {
      expect(Tableau.isSorted(array)).to.equal(false)
    }
  })
})


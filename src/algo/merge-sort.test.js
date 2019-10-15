const chai = require('chai')
const expect = chai.expect

const root_path = '..'

const mergeSort = require(root_path + '/algo/merge-sort')
const Nombre = require(root_path + '/util/nombre')
const Tableau = require(root_path + '/util/tableau')
const QuickCheck = require(root_path + '/util/quick-check')

describe('mergeSort', () => {
  QuickCheck.loop('should sort any number array', () => {
    const array = Tableau.random(100, () => Nombre.random(-100, 100))

    mergeSort(array)

    expect(Tableau.isSorted(array)).to.equal(true)
  })
})


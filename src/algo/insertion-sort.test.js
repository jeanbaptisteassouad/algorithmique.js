const chai = require('chai')
const expect = chai.expect

const root_path = '..'

const insertionSort = require(root_path + '/algo/insertion-sort')
const Nombre = require(root_path + '/util/nombre')
const Tableau = require(root_path + '/util/tableau')
const QuickCheck = require(root_path + '/util/quick-check')

describe('insertion-sort', () => {
  QuickCheck.loop('should sort any number array', () => {
    const array = Tableau.random(100, () => Nombre.random(-100, 100))

    insertionSort(array)

    expect(Tableau.isSorted(array)).to.equal(true)
  })
})


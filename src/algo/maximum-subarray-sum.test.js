const chai = require('chai')
const expect = chai.expect

const root_path = '..'

const MaximumSubarraySum = require(root_path + '/algo/maximum-subarray-sum')
const Nombre = require(root_path + '/util/nombre')
const Tableau = require(root_path + '/util/tableau')
const QuickCheck = require(root_path + '/util/quick-check')

describe('maximumSubarraySum', () => {
  QuickCheck.loop('should find the maximum subarray sum', () => {
    const array = Tableau.random(100, () => Math.floor(Nombre.random(-100, 100)))

    const a = MaximumSubarraySum.maximumSubarraySum(array)
    const b = MaximumSubarraySum.bruteForce(array)

    if (a[2] !== b[2]) {
      expect(a).to.deep.equal(b)
    }
    expect(a[2]).to.deep.equal(b[2])
    expect(a).to.not.be.undefined
  })
})


import mean from 'lodash/mean'
import round from 'lodash/round'
import reduce from 'lodash/reduce'
import sumBy from 'lodash/sumBy'
import {
  convertUnitToSubUnit,
  ensureSeparator,
  truncateToSubUnitPrecision,
  unitDivisor,
} from './currency'
import { enumerateDaysBetweenDates, nightsBetween } from './dates';
import { types as sdkTypes } from './sdkLoader'
import config from '../config'

const { Money } = sdkTypes

export const getPriceFromSeasonalStrategy = (startDate, endDate, seasonalPricing) => {
  const allDates = enumerateDaysBetweenDates(startDate, endDate)
  // eslint-disable-next-line no-param-reassign
  const obj = reduce(seasonalPricing, (o, item) => { o[item.month] = item.price.amount; return o }, {})
  const individualPrices = allDates.map((v) => {
    return { month: v.month, price: obj[v.month] }
  })
  return {
    total: sumBy(individualPrices, 'price'),
    breakdown: individualPrices
  }
}

export const getPriceAfterDiscounts = (product, startDate, endDate) => {
  if (!product) return
  const numberOfDaysSelected = nightsBetween(startDate, endDate)
  const losDiscount = (product.losDiscount || []).map((los) => parseInt(los.days, 10))
  let losDiscountMatch
  let discount = 1
  let price = product.price.amount * numberOfDaysSelected
  // breakdown is only used when seasonal pricing is invoked
  // this is so we can show a per night breakdown on the transaction to operators/users
  let breakdown = {}
  if (product.pricing_type === 'seasonal') {
    const seasonal = getPriceFromSeasonalStrategy(startDate, endDate, product.seasonalPricing)
    price = seasonal.total
    breakdown = seasonal.breakdown
  }
  losDiscount.sort((a, b) => a - b).forEach((v) => {
    if (numberOfDaysSelected >= v) {
      losDiscountMatch = v
    }
  })
  if (losDiscountMatch) {
    const pd = product.losDiscount.find((losd) => losd.days === losDiscountMatch.toString())
    discount = (1 - parseInt(pd.percent, 10) / 100)
  }
  const discountedPrice = price * discount
  const preDiscountUnitPrice = () => {
    return price / numberOfDaysSelected
  }
  const unitPrice = () => {
    return discountedPrice / numberOfDaysSelected
  }
  return {
    preDiscountPrice: price,
    preDiscountMoneyPrice: new Money(price, config.currencyConfig.currency),
    price: discountedPrice,
    moneyPrice: new Money(discountedPrice, config.currencyConfig.currency),
    discount,
    breakdown,
    preDiscountUnitPrice: preDiscountUnitPrice(),
    unitPrice: unitPrice(),
    userCommission: new Money(discountedPrice * 0.11, config.currencyConfig.currency)
  }
}

export const getMoneyFromValue = (unformattedValue) => {
  console.log(unformattedValue)
  const { currencyConfig } = config
  const isEmptyString = unformattedValue === ''
  try {
    return isEmptyString
      ? null
      : new Money(
        convertUnitToSubUnit(unformattedValue, unitDivisor(currencyConfig.currency)),
        currencyConfig.currency
      )
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getDisplayValueFromMoney = (value, intl) => {
  const { currencyConfig } = config
  const testSubUnitFormat = intl.formatNumber('1.1', currencyConfig)
  const usesComma = testSubUnitFormat.indexOf(',') >= 0
  // whatever is passed as a default value, will be converted to currency string
  // Unformatted value is digits + localized sub unit separator ("9,99")
  return truncateToSubUnitPrecision(
    ensureSeparator((value / 100).toString(), usesComma),
    unitDivisor(currencyConfig.currency),
    usesComma
  )
}

export const setProductPricing = (product) => {
  console.log(product)
  try {
    if (product.pricing_type === 'standard') {
      return {
        price: {
          amount: product.price.amount,
          currency: product.price.currency
        }
      }
    }
    const prices = []
    const adjustedPricing = product.seasonalPricing.map((v) => {
      const { price } = v
      prices.push(price.amount)
      return {
        ...v,
        price: {
          amount: price.amount,
          currency: price.currency
        }
      }
    })
    console.log(prices)
    console.log(adjustedPricing)
    const m = getMoneyFromValue(round(mean(prices), -2))
    console.log(m)
    return {
      seasonalPricing: adjustedPricing,
      price: {
        amount: round(mean(prices), -2),
        currency: adjustedPricing[0].price.currency
      }
    }
  } catch (e) {
    console.log(e)
  }
}

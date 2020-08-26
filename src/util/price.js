export const getPrice = (product, numberOfDaysSelected) => {
  if (!product) return
  const losDiscount = (product.losDiscount || []).map((los) => parseInt(los.days, 10))
  let losDiscountMatch
  let discount = 1
  let price = product.price.amount * numberOfDaysSelected
  losDiscount.sort((a, b) => a - b).forEach((v) => {
    if (numberOfDaysSelected >= v) {
      losDiscountMatch = v
    }
  })
  if (losDiscountMatch) {
    const pd = product.losDiscount.find((losd) => losd.days === losDiscountMatch.toString())
    discount = (1 - parseInt(pd.percent, 10) / 100)
    price = product.price.amount * discount * numberOfDaysSelected
  }
  return {
    price,
    discount
  }
}

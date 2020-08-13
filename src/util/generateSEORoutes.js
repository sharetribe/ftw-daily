const a = ['coliving', 'coworking']

export const generateSEORoutes = (location) => {
  const b = a.map((s) => `${s}-in-${location}`)
  b.push(`${a[0]}-and-${a[1]}-in-${location}`)
  return b
}

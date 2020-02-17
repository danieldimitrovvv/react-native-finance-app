const capitalizeFirst = s => s.charAt(0).toUpperCase() + s.slice(1)

const capitalizeAllFirst = s => {
  let words = s.split(' ')
  if (words.length === 1) return capitalizeFirst(s)
  let capitalizeAll = ''
  for (const word of words) {
    capitalizeAll += capitalizeFirst(word) + ' '
  }
  return capitalizeAll.trim()
}

const Capitalize = (s, all = false) => {
  if (typeof s !== 'string') return ''

  if (all) {
    return capitalizeAllFirst(s)
  }

  return capitalizeFirst(s)
}

export {capitalizeFirst, capitalizeAllFirst}
export default Capitalize

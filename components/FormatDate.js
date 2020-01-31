const FormatDate = date => {
  const d = new Date(date)
  return d.toLocaleDateString()
}

export default FormatDate

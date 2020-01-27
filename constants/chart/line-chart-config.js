const labels = ['January', 'February', 'March', 'April', 'May', 'June']

const data = [
  Math.random() * 100,
  Math.random() * 100,
  Math.random() * 100,
  Math.random() * 100,
  Math.random() * 100,
  Math.random() * 100
]

const dataLine = {
  labels: labels,
  datasets: [
    {
      data: data
    }
  ]
}

export default dataLine

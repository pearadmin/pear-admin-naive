export async function fetchChartLine() {
  const data = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/terrorism.json')
    .then((res) => res.json())
    .then((data) => data)

  console.log(data)

  return data
}

export async function fetchGameChart() {
  const data = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/nintendo.json')
    .then((res) => res.json())
    .then((data) => data)

  console.log(data)

  return data
}

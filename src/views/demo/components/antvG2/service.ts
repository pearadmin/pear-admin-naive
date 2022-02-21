export async function fetchGameChart() {
  const data = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/nintendo.json')
    .then((res) => res.json())
    .then((data) => data)

  return data
}

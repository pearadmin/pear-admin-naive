export async function fetchChinaGdp() {
  const data = await fetch(
    'https://raw.githubusercontent.com/antvis/G2/master/examples/data/china-gdp.json'
  )
    .then((res) => res.json())
    .then((data) => data)

  return data
}

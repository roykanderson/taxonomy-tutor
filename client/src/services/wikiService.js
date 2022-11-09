import axios from 'axios'

const BASE_URL = 'https://en.wikipedia.org/w/api.php'

const getWikiSummary = async (url) => {
  const title = url.substring(url.lastIndexOf('/') + 1)
  const link = `${BASE_URL}?format=json&action=query&prop=extracts&explaintext=1&titles=${title}&origin=*`
  const response = await axios.get(link)
  const extract = Object.values(response.data.query.pages)[0].extract
  const [rawSummary] = extract.match(/^.*/)
  const cleanSummary = rawSummary.replace(/\(\)/g, '')

  return cleanSummary
}

const wikiService = {
  getWikiSummary
}

export default wikiService
const toTitleCase = (string) => {
  const alteredString = string
    .split(' ')
    .map((substring) => `${substring.charAt(0).toUpperCase()}${substring.slice(1)}`)
    .join(' ')

  return alteredString
}

export default toTitleCase
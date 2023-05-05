const shuffleArrayAroundIndex = (array, index) => {
  const itemToStayFixed = array[index]
  array.splice(index, 1)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  array.splice(index, 0, itemToStayFixed)
  return array
}

export default shuffleArrayAroundIndex
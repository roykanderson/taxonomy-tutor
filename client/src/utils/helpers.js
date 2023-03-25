export const getDefaultPhotoUrl = (taxon) => {
  if (taxon && taxon.default_photo) {
    const url = taxon.default_photo.url
    const pattern = /square/
    return url.replace(pattern, 'large')
  }
  return null
}

export const shuffleArrayAroundIndex = (array, index) => {
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

export const arraysContainEqualValues = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }
  return true
}
const getDefaultPhotoUrl = (taxon) => {
  if (taxon && taxon.default_photo) {
    const url = taxon.default_photo.url
    const pattern = /square/
    return url.replace(pattern, 'large')
  }
  return null
}

export default getDefaultPhotoUrl
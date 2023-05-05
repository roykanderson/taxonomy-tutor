const extractSetIdFromPathname = (pathname) => {
  const parts = pathname.split('/')
  if (parts[parts.length - 1] === 'edit') {
    return parts[parts.length - 2]
  }
  return parts[parts.length - 1]
}

export default extractSetIdFromPathname
const getEnumString = (str: string) => {
  return str.split('_')
    .map(s => {
      if (s.length > 2) {
        return s.charAt(0) + s.slice(1).toLowerCase()
      } else {
        return s
      }
    })
    .join(' ')
}

export {
  getEnumString
}

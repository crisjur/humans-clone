const getItem = key => {
  const value = localStorage.getItem(key)
  if (value) {
    return JSON.parse(value)
  } else {
    return null
  }
}
const setItem = (key, value) => localStorage.setItem(key, value)

export default {
  getItem,
  setItem
}
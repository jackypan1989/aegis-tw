import { Profile } from "../../codegen/graphql"

type Item = Pick<Profile, 'fullname' | 'email' | 'username'>

const getProfileDisplay = (item: Item) => {
  if (!item) return ''

  return item.fullname || item.email || item.username
}

export {
  getProfileDisplay
}

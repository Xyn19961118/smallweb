import Cookies from 'js-cookie'

const TokenKey = 'small_web_token'

export function GET_TOKEN() {
  return Cookies.get(TokenKey)
}

export function SET_TOKEN(token) {
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function REMOVE_TOKEN() {
  return Cookies.remove(TokenKey)
}

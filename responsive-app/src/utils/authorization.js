export function getToken() {
  if (document.cookie) {
    return document.cookie.split("token=")[1];
  }
}

export function removeToken() {
  document.cookie = "token=; Max-Age=0";
}

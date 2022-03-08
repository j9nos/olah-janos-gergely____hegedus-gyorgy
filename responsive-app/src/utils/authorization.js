export function getToken() {
  if (document.cookie) {
    return document.cookie.split("token=")[1];
  }
}

export function logout() {
  document.cookie = "token=; Max-Age=0";
  window.location.reload();
}

export function reloadOnExpiration() {
  if (!getToken()) {
    logout();
  }
}

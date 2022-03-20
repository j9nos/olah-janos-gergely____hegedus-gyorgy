export function getToken() {
  if (document.cookie) {
    return document.cookie.split("token=")[1];
  }
}

export function logout() {
  document.cookie = "token=; Max-Age=0";
  window.location.reload();
}

function reloadOnExpiration() {
  if (!getToken()) {
    logout();
  }
}

export function watchExpiration() {
  const interval = setInterval(() => {
    reloadOnExpiration();
  }, 500);
  return () => clearInterval(interval);
}

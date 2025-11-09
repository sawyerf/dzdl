// const host = import.meta.env.DEV ? `http://${url.hostname}:2130` : '.'

const host = () => {
  const url = new URL(window.location.href);
  if (import.meta.env.DEV) return `http://${url.hostname}:2130`;
  return url.origin
}

export const getApi = (path: string, params = {}) => {
  const query = new URLSearchParams(params).toString();

  return fetch(`${host()}/${path}${query ? `?${query}` : ''}`)
}
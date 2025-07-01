const host = import.meta.env.DEV ? 'http://localhost:2130' : '.'

export const getApi = (path: string, params = {}) => {
  const query = new URLSearchParams(params).toString();

  return fetch(`${host}/${path}${query ? `?${query}` : ''}`)
}
const URL = 'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/'

export const api = (path, options) => {
    return fetch(URL + path, options).then(async (res) => ({ ok: res.ok, ...await res.json() }))
}
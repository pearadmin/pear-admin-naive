import Mock from 'mockjs'
/**
 * interface Response extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}
 * @param mockList
 */
export function createFetchSever(mockList: any[]) {
  if (!window['originFetch']) {
    window['originFetch'] = window.fetch
    window.fetch = function (fetchUrl: string, init: RequestInit) {
      const currentMock = mockList.find((mi) => fetchUrl.includes(mi.url))
      if (currentMock) {
        const result = createFetchReturn(currentMock, init)
        return result
      } else {
        return window['originFetch'](fetchUrl, init)
      }
    }
  }
}

function __param2Obj__(url: string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

function __Fetch2ExpressReqWrapper__(handle: (d: any) => any) {
  return function (options: any) {
    let result = null
    if (typeof handle === 'function') {
      const { body, method, url, headers } = options

      let b = body
      try {
        b = JSON.parse(body)
      } catch {}
      result = handle({
        method,
        body: b,
        query: __param2Obj__(url),
        headers
      })
    } else {
      result = handle
    }

    return Mock.mock(result)
  }
}

function setupTimeOut(timeout = 0) {
  timeout &&
    Mock.setup({
      timeout
    })
}

function createFetchReturn(mock: Recordable, init: RequestInit) {
  const { timeout, response } = mock
  setupTimeOut(timeout)
  const mockFn = __Fetch2ExpressReqWrapper__(response)
  const data = mockFn(init)
  const result = {
    ok: true,
    status: 200,
    clone: () => {
      return result
    },
    text() {
      return Promise.resolve(data)
    },
    json() {
      return Promise.resolve(data)
    }
  }
  return result
}

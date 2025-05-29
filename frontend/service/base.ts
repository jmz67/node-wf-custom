
import { PUBLIC_API_PREFIX, API_PREFIX } from "@/config"

import { asyncRunSafe } from "@/utils"



export type IOtherOptions = {
    isPublicAPI?: boolean
    silent?: boolean
}

// 设置请求超时时间
const TIME_OUT = 100000

// 定义常见的 Content-Type 类型
const ContentType = {
    json: 'application/json',
    stream: 'text/event-stream',
    audio: 'audio/mpeg',
    form: 'application/x-www-form-urlencoded; charset=UTF-8',
    download: 'application/octet-stream', // 用于下载
    upload: 'multipart/form-data', // 用于上传
}

// 定义基础请求配置 
const baseOptions = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include', // 始终发送 cookie 和 HTTP Basic 认证信息
    headers: new Headers({
        'Content-Type': ContentType.json,
    }),
    redirect: 'follow',
}

type ResponseError = {
  code: string
  message: string
  status: number
}

function requiredWebSSOLogin() {
    globalThis.location.href = `/webapp-signin?redirect_url=${globalThis.location.pathname}`
}

function getAccessToken(isPublicAPI?: boolean) {
    if (isPublicAPI) {
        const sharedToken = globalThis.location.pathname.split('/').slice(-1)[0]
        const accessToken = localStorage.getItem('token') || JSON.stringify({ [sharedToken]: '' })
        let accessTokenJson = { [sharedToken]: '' }
        try {
            accessTokenJson = JSON.parse(accessToken)
        }
        catch (e) {

        }
        return accessTokenJson[sharedToken]
    }
    else {
        return localStorage.getItem('console_token') || ''
    }
}

type FetchOptionType = Omit<RequestInit, 'body'> & {
    params?: Record<string, any>
    body?: BodyInit | Record<string, any> | null
}

const baseFetch = <T>(
    url: string, 
    fetchOptions: FetchOptionType,
    {
        isPublicAPI = false,
        silent 
    }: IOtherOptions,
): Promise<T> => {
    const options: typeof baseOptions & FetchOptionType = Object.assign({}, baseOptions, fetchOptions)

    const access_token = getAccessToken(isPublicAPI)
    options.headers.set('Authorization', `Bearer ${access_token}`)

    const urlPrefix = isPublicAPI ? PUBLIC_API_PREFIX : API_PREFIX;
    let urlWithPrefix = (url.startsWith('http://') || url.startsWith('https://'))
        ? url
        : `${urlPrefix}${url.startsWith('/') ? url : `/${url}`}`

    const { method, params, body } = options

    // handler query 
    if (method === 'GET' && params) {
        const paramsArray: string[] = []
        Object.keys(params).forEach(key =>
            paramsArray.push(`${key}=${encodeURIComponent(params[key])}`),
        )
        if (urlWithPrefix.search(/\?/) === -1)
            urlWithPrefix += `?${paramsArray.join('&')}`
        else
            urlWithPrefix += `&${paramsArray.join('&')}`

        delete options.params
    }

    if (body)
        options.body = JSON.stringify(body) 

    return Promise.race([
        new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('request timeout'))
            }, TIME_OUT)
        }),
        // 创建主请求 Promise 处理实际的 fetch 请求
        new Promise((resolve, reject) => {
            // 发送 fetch 请求到 URL 并应用请求选项
            globalThis.fetch(urlWithPrefix, options as RequestInit)
            .then((res) => {
                // 克隆响应对象，以便后续多次读取响应对象
                const resClone = res.clone()
                // 错误处理：检查HTTP状态码是否为成功状态(2xx或3xx)
                if (!/^(2|3)\d{2}$/.test(String(res.status))) {
                    // 解析响应体 JSON
                    const bodyJson = res.json()
                    switch (res.status) {
                        case 401:
                            // 未授权状态。直接拒绝 Promise 并返回克隆体
                            return Promise.reject(resClone) 
                        case 403:
                            // 禁止访问状态，解析响应体并根据错误代码处理
                            bodyJson.then((data: ResponseError) => {
                                // 如果不是静默模式，则显示错误通知
                                if (!silent)
                                    Toast.notify({
                                        type: 'error',
                                        message: data.message
                                    })
                                if (data.code === 'aleady_setup')
                                    globalThis.location.href = `${globalThis.location.origin}/signin`
                            })
                            break 
                        default:
                            // 其他错误状态
                            bodyJson.then((data: ResponseError) => {
                                if (!silent) {
                                    Toast.notify({
                                        type: 'error',
                                        message: data.message
                                    })
                                }
                            })
                    }
                    return Promise.reject(resClone)
                }
                // 处理 delete 请求，这类请求通常不返回内容，直接返回成功结果
                if (res.status === 204) {
                    resolve({ result: 'success' })
                    return 
                }
                // 根据请求头的 Content-type 处理不同类型的响应
                if (options.headers.get('Content-type') === ContentType.download || options.headers.get('Content-type') === ContentType.audio)
                    // 对于下载或音频类型，返回响应体的 Blob 对象
                    resolve(needAllResponseContent ? resClone : res.blob())
                else 
                    // 对于其他类型，返回解析后的 JSON 数据
                    resolve(needAllResponseContent ? resClone : res.json())
            })
            .catch((err) => {
                // 捕获网络错误或其他异常
                if (!silent) 
                    // 如果不是静默模式，显示错误通知
                    Toast.notify({
                        type: 'error',
                        message: err 
                    })
                // 拒绝 promise 并传递错误对象
                reject(err)
            })
        })
    ]) as Promise<T> // 将结果强制转换为指定泛型类型的 Promise
}

// base request 
export const request = async<T>(url: string, options = {}, otherOptions?: IOtherOptions) => {
    try {
        const otherOptionsForBaseFetch = otherOptions || {}
        const [err, resp] = await asyncRunSafe<T>(baseFetch(url, options, otherOptionsForBaseFetch))
        if (err === null) 
            return resp 

        const errResp: Response = err as any 
        if (errResp.status === 401) {
            const [parseErr, errRespData] = 
        }

    }
}
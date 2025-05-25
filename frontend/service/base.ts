import { redirect } from "next/dist/server/api-utils"



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

const baseFetch = <T>(
    url: string, 
    fetchOptions: FetchOptionType,
    {
        isPublicAPI = false,
        bodyStringify = true,
        needAllResponseContent,
        deleteContentType,
        getAbortController,
        silent,
    }: IOtherOptions,
): Promise<T> => {
    const options: typeof baseOptions & FetchOptionType = Object.assign({}, baseOptions, fetchOptions)
}
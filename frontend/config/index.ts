

export let apiPrefix = ''
export let publicApiPrefix = ''

// NEXT_PUBLIC_API_PREFIX = /console/api 
// NEXT_PUBLIC_PUBLIC_API_PREFIX = /api 
// npm run start 
if (process.env.NEXT_PUBLIC_API_PREFIX && process.env.NEXT_PUBLIC_PUBLIC_API_PREFIX) {
    apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX
    publicApiPrefix = process.env.NEXT_PUBLIC_PUBLIC_API_PREFIX
}
else if (
    globalThis.document?.body?.getAttribute('data-api-prefix')
    && globalThis.document?.body?.getAttribute('data-public-api-prefix')
) {
    // Not build can not get env from process.env.NEXT_PUBLIC_ in browser https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
    apiPrefix = globalThis.document.body.getAttribute('data-api-prefix') as string
    publicApiPrefix = globalThis.document.body.getAttribute('data-public-api-prefix') as string
}

export const API_PREFIX: string = apiPrefix
export const PUBLIC_API_PREFIX: string = publicApiPrefix

export const emailRegex = /^[\w.!#$%&'*+\-/=?^{|}~]+@([\w-]+\.)+[\w-]{2,}$/m
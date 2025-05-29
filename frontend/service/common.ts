import type { Fetcher } from 'swr'
import { post } from './base'

import type { UserProfileOriginResponse } from '@/models/common'

type LoginSuccess = {
  result: 'success'
  data: { access_token: string; refresh_token: string }
}

type LoginFail = {
  result: 'fail'
  data: string
  code: string
  message: string
}

type LoginResponse = LoginSuccess | LoginFail

export const login: Fetcher<LoginResponse, { url: string; body: Record<string, any> }> = (
    {url, body}
) => {
    return post(url, { body }) as Promise<LoginResponse>
}

export const fetchUserProfile: Fetcher<UserProfileOriginResponse, { url: string; params: Record<string, any> }> = ({
  url, params
}) => {
  return get<UserProfileOriginResponse>(url, params, { needAllResponseContent: true }) 
}


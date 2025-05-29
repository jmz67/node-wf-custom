'use client'

import type { FC, ReactNode } from "react"
import { createContext, useContextSelector } from "use-context-selector"

import { fetch }

import { defaultSystemFeatures } from '@/types/feature' 
import type { SystemFeatures } from "@/types/feature"
import type { App } from "@/types/app"
import type { ICurrentWorkspace } from "@/models/common"
import type { UserProfileResponse } from "@/models/common"


import { noop } from 'lodash-es'
import useSWR from "swr"

const initialWorkspaceInfo: ICurrentWorkspace = {
  id: '',
  name: '',
  plan: '',
  status: '',
  created_at: 0,
  role: 'normal',
}

export type AppContextValue = {
    apps: App[]
    mutateApps: VoidFunction
    systemFeatures: SystemFeatures
    userProfile: UserProfileResponse
    mutateUserProfile: VoidFunction
    currentWorkspace: ICurrentWorkspace
    isCurrentWorkspaceManager: boolean
    isCurrentWorkspaceOwner: boolean
    isCurrentWorkspaceEditor: boolean
    isCurrentWorkspaceDatasetOperator: boolean
    mutateCurrentWorkspace: VoidFunction
}

const AppContext = createContext<AppContextValue>({
    systemFeatures: defaultSystemFeatures,
    apps: [],
    mutateApps: noop,
    userProfile: {
        id: '',
        name: '',
        email: '',
        avatar: '',
        avatar_url: '',
    },
    currentWorkspace: initialWorkspaceInfo,
    isCurrentWorkspaceManager: false,
    isCurrentWorkspaceOwner: false,
    isCurrentWorkspaceEditor: false,
    isCurrentWorkspaceDatasetOperator: false,
    mutateUserProfile: noop,
    mutateCurrentWorkspace: noop,
})

export function useSelector<T>(selector: (value: AppContextValue) => T): T {
    return useContextSelector(AppContext, selector)
}


export type AppContextProviderProps = {
    children: ReactNode 
}

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {

    const {
        data: UserProfileResponse,
        mutate: mutateUserProfile
    } = useSWR(
        {
            url: '/account/profile', params: {}
        }, fetchUserProfile
    )

    return (
        <AppContext.Provider value={{

        }}>

        </AppContext.Provider>
    )
}
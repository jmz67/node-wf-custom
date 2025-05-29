

export type UserProfileOriginResponse = {
    json: () => Promise<UserProfileResponse>
    bodyUsed: boolean 
    headers: any 
}

export type UserProfileResponse = {
    id: string
    name: string 
    email: string 
    avatar: string 
    avatar_url: string | null 
}

export type IWorkspace = {
    id: string
    name: string
    plan: string
    status: string
    created_at: number
    current: boolean
}

export type ICurrentWorkspace = Omit<IWorkspace, "current"> & {
    // 从 IWorkspace 中排除 current 属性，然后添加以下属性
    role: 'owner' | 'admin' | 'editor' | 'dataset_operator' | 'normal'
    // providers: Provider[]
    trial_end_reason?: string
    custom_config?: {
        remove_webapp_brand?: boolean
        replace_webapp_logo?: string
    }
}
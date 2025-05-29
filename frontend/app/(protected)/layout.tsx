
import type { ReactNode } from 'react'

import SwrInitor from '@/app/components/swr-initor'
import { AppContextProvider } from '@/context/app-context'

const ProtectedLayout = ({ children } : { children: ReactNode }) => {
    return (
        <>
            <SwrInitor>
                <AppContextProvider>
                    {children}
                </AppContextProvider>
            </SwrInitor>
        </>
    )
}
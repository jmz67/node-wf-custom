
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { SWRConfig } from 'swr'

type SwrInitorProps = {
    children: ReactNode 
}

const SwrInitor = ({
    children,
}: SwrInitorProps) => {
    const router = useRouter()

    return (
        <SWRConfig value={{
            shouldRetryOnError: false,
            revalidateOnFocus: false,
        }}>
            {children}
        </SWRConfig>
    )
}

export default SwrInitor;
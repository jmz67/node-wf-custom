'use client'

import classNames from "classnames"
import { FC } from "react"

export type LogoSize = 'large' | 'medium' | 'small'

type LogoProps = {
    size?: LogoSize,
    className?: string 
}

export const logoSizeMap: Record<LogoSize, string> = {
    large: 'w-10 h-10',
    medium: 'w-6 h-6',
    small: 'w-4 h-4',
}

const LogoSite: FC<LogoProps> = ({
    size = 'medium',
    className,
}) => {

    
    return (
        <img
            src="/logo/logo.svg"
            alt="Logo"
            className={classNames('block object-contain', logoSizeMap[size], className)}
        />
    )
}

export default LogoSite
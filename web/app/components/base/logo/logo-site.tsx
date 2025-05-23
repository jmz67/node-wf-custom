'use client'

import classNames from "classnames"
import { FC } from "react"

export type LogoSize = 'large' | 'medium' | 'small'

type LogoProps = {
    size?: LogoSize,
    className?: string 
}

export const logoSizeMap: Record<LogoSize, string> = {
    large: 'w-16 h-7',
    medium: 'w-12 h-[22px]',
    small: 'w-9 h-4',
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
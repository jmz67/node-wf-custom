import Header from './_header'
import style from './page.module.css'

import cn from '@/utils/classnames'

export default async function SignInLayout({ children }: { children: React.ReactNode }) {
    return <>
        <div className={cn(
            style.background,
            'flex w-full min-h-screen',
            'sm:p-4 lg:p-8',
            'gap-x-20',
            'justify-center lg:justify-start',
        )}>
            <div className={
                cn(
                'flex w-full flex-col bg-white shadow rounded-2xl shrink-0',
                'space-between',
                )
            }>
                <div className='px-4 py-6'>
                    <Header />
                </div>
                <div className={
                    cn(
                        'flex flex-col items-center w-full grow justify-center',
                        'px-6',
                        'md:px-[108px]',
                    )
                }>
                    <div className='flex flex-col md:w-[400px]'>
                        {children}
                    </div>
                </div>
                <div className='px-8 py-6 text-sm text-gray-900'>
                    © {new Date().getFullYear()} 积木朱工作室
                </div>
            </div>

        </div>
    </>
}
import DesktopSidebar from '@/components/DesktopSidebar';

function layout({ children }:{
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen"> 
            <DesktopSidebar />
            <div className="flex flex-col flex-1 max-h-screen bg-slate-100">
                <header>
                    头
                </header>
                <div className='overflow-auto'>
                    <div className="flex-1 container py-4 text-accent-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout
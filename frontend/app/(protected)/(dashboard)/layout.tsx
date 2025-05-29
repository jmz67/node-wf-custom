import DesktopSidebar from '@/app/components/DesktopSidebar';
import { Separator } from '@/app/components/ui/separator';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 p-4 overflow-hidden">
      <DesktopSidebar />

      <main className="flex flex-col flex-1 overflow-hidden rounded-lg bg-white shadow">
        <header className="px-6 py-4 border-b">
          头
        </header>
        <Separator />
        <section className="flex-1 overflow-auto px-6 py-4 text-accent-foreground">
          {children}
        </section>
      </main>
    </div>
  );
}

export default Layout;

import { DocsSidebarNav } from '@/components/docs/sidebar-nav';
import { getCurrentUser } from '@/lib/session';
import SiteHeader from '@/components/layout/site-header';
import { SimpleSiteFooter } from '@/components/layout/simple-site-footer';
import { docsConfig, mainNavConfig } from '@/config';
import { MobileFooter } from '@/components/layout/mobile-footer';
import MobileHeader from '@/components/layout/mobile-header';
import OneTapComponent from '@/components/google-one-tap';
import Featurebase from '@/components/featurebase';
import SidebarDesktop from '@/components/sidebar/sidebar-desktop';
import SidebarStage from '@/components/sidebar/sidebar-stage';

interface DocsLayoutProps {
    children: React.ReactNode;
}

export default async function EyaoLayout({ children }: DocsLayoutProps) {
    const user = await getCurrentUser();

    return (
        <div className="flex flex-col flex-1 min-h-screen">
            <MobileHeader user={user} />
            {!user && <OneTapComponent user={user} />}
            {user && <Featurebase user={user} />}
            <main className="relative flex h-lvh overflow-hidden">
                <SidebarDesktop />
                <SidebarStage user={user} />
                {children}
                {/* <MobileFooter /> */}
            </main>
        </div>
    );

}

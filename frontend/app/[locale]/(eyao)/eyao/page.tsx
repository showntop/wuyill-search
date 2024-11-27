import '@/styles/mdx.css';
import { type Locale, routing } from '@/i18n/routing';
import * as React from 'react';
import { SimpleSiteFooter } from '@/components/layout/simple-site-footer';
import { getCurrentUser } from '@/lib/session';
import { generateId } from '@/lib/shared-utils';
import { EyaoHeroLanding } from '@/components/layout/eyao-hero-landing';
import SearchWindowWapper from '@/app/[locale]/(eyao)/eyao/search-window-wapper';

interface Article {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
}

interface EyaoPageProps {
    params: {
        slug: string[];
        locale: Locale;
    };
}



export default async function EyaoPage({ params }: EyaoPageProps) {

    const id = generateId();
    const user = await getCurrentUser();

    return (
        <div className="group w-full flex flex-col flex-1 h-lvh mx-auto overflow-auto peer-[[data-state=open]]:lg:pl-[300px] peer-[[data-state=open]]:xl:pl-[320px]">
            <div className="grow">
                <EyaoHeroLanding />
                <SearchWindowWapper id={id} user={user} />
            </div>
            <SimpleSiteFooter />
        </div>
    );
}

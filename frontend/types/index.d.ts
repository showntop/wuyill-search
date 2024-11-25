import type { Icon } from 'lucide-react';

import { Icons } from '@/components/shared/icons';

export type NavItem = {
    title: string;
    href: string;
    disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SiteConfig = {
    name: string;
    footerDesc: string;
    url: string;
    ogImage: string;
    mailSupport: string;
    links: {
        // twitter: string;
        github: string;
        // discord: string;
        // feedback?: string;
    };
};

export type DocsConfig = {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
};

export type SidebarNavItem = {
    title: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
} & (
    | {
          href: string;
          items?: never;
      }
    | {
          href?: string;
          items: NavLink[];
      }
);

export type MarketingConfig = {
    mainNav: MainNavItem[];
};

export type SubscriptionPlan = {
    title: string;
    description: string;
    prices: {
        monthly: number;
        yearly: number;
    };
    stripeIds: {
        monthly: string | null;
        yearly: string | null;
    };
    onceIds?: {
        monthly: string | null;
        yearly: string | null;
    };
};

export type UserSubscriptionPlan = SubscriptionPlan &
    Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId' | 'stripePriceId'> & {
        stripeCurrentPeriodEnd: number;
        isPaid: boolean;
        interval: 'month' | 'year' | null;
        isCanceled?: boolean;
    };

export type InfoList = {
    icon: keyof typeof Icons;
    title: string;
    description: string;
};

export type InfoLdg = {
    title: string;
    image: string;
    description: string;
    list: InfoList[];
};

export interface FooterItem {
    title: string;
    items: {
        title: string;
        href: string;
        external?: boolean;
    }[];
}

export type SearchResult = {
    title: string;
    text: string;
    url: string;
    image: string;
    create_time: number;
};

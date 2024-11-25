import 'server-only';

import { auth } from '@/auth';

export async function getCurrentUser() {
    return { id: 'anonymous', name: 'Anonymous User', email: 'anonymous@example.com', image: null };
    // const session = await auth();
    // return session?.user;
}

import type { PageServerLoad } from './$types';

import { auth } from '$lib/server/authorization';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    if(await auth(cookies)){
        cookies.delete('username', { path: '/' });
        cookies.delete('password', { path: '/' });
    
        throw redirect(301, '/admin/login');
    }

    throw redirect(301, '/admin/login');
};
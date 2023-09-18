import type { PageServerLoad } from './$types';

import { auth } from '$lib/server/authorization';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    if(await auth(cookies)){
        return {
            username: cookies.get('username'),
            password: cookies.get('password')
        };
    }

    throw redirect(301, '/admin/login');
};
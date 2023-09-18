import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import axios, { isAxiosError } from 'axios';

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        console.log('logging in...');

        const data = await request.formData();
        const username = data.get('username')?.toString();
        const password = data.get('password')?.toString();

        let success = false;

        console.log(username);
        console.log(password);

        if(username && password && !cookies.get('username') && !cookies.get('password')){
            try{
                const result = await axios( 
                    {
                        url: 'http://localhost:8080/auth/test',
                        auth: {
                            username: username?.toString(),
                            password: password?.toString()
                        }
                    }
                );

                if(result.status == 200 && result.data === true){
                    const tomorrow = new Date();

                    tomorrow.setDate(tomorrow.getDate() + 1);

                    cookies.set('username', username, { 
                        path: '/', 
                        expires: tomorrow,
                        priority: 'high'
                    });
                    cookies.set('password', password, { 
                        path: '/', 
                        expires: tomorrow,
                        priority: 'high'
                    });

                    console.log(tomorrow);

                    success = true;
                }
            } catch(error: unknown) {
                if(isAxiosError(error)) {
                    console.log(error.response);
                } else {
                    console.error(error);
                }
            }
        }

        if(success){
            throw redirect(301, '/admin');
        }

        return { success: success };
    }
};
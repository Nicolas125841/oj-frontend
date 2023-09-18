import type { Cookies } from "@sveltejs/kit";

import axios from "axios";

export const auth = async (cookies: Cookies) => {
    const username = cookies.get('username');
    const password = cookies.get('password');

    console.log('Cookies...');
    console.log(username);
    console.log(password);

    if(username && password){
        const result = await axios( 
            {
                url: 'http://localhost:8080/auth/test',
                auth: {
                    username: username,
                    password: password
                }
            }
        );

        if(result.status == 200 && result.data === true){
            return true;
        }
    }

    return false;
};
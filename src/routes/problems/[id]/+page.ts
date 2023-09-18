import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import axios from 'axios';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev; 

export const load: PageLoad = ({ params }) => {
  try {
    return {
        metadata: axios.get(`http://127.0.0.1:8080/problemData/${params.id}/metadata.json`),
        url: `http://127.0.0.1:8080/problemData/${params.id}/statement.pdf`,
        id: params.id
    };
  } catch (e) {
    console.log(e);

    throw error(404, 'Not found');
  }  
};
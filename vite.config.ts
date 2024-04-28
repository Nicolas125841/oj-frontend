import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	optimizeDeps: {
        exclude: [
			"codemirror", 
			"@codemirror/lang-cpp", 
			"@codemirror/lang-java", 
			"@codemirror/lang-python",
			"@codemirror/language",
			"@codemirror/state",
			"@codemirror/view",
			"thememirror" 
		]
    }
});

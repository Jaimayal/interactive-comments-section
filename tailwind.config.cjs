/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"moderate-blue": "#5457b6",
				"soft-red": "#ed6468",
				"light-grayish-blue": "	#c3c4ef",
				"pale-red": "#ffb8bb",
				"dark-blue": "#324152",
				"grayish-blue": "	#67727e",
				"light-gray": "#eaecf1",
				"ultra-light-gray": "#f5f6fa",
			}
		},
	},
	plugins: [],
}

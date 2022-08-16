/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'highlight-green': '#00ce7e',
				'muted-green': '#ffffff',
				'light-blue': '#9be7f1',
				'highlight-blue': '#2f4cff',
				'bg-light': '#f6fafb',
				'bg-dark': '#0c1a2e',
				'highlight-yellow': '#ffc823',
				'grey-1': '#777',
				'grey-2': '#828282',
			},
		},
	},
	plugins: [],
};

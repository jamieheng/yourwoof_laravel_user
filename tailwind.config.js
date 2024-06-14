/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
		"path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		backgroundSize: {
			auto: "auto",
			cover: "cover",
			contain: "contain",
			"50%": "50%",
			16: "4rem",
		},
		sm: "640px", // Small screens (phones)
		md: "768px", // Medium screens (tablets)
		lg: "1024px", // Large screens (laptops)
		xl: "1280px", // Extra large screens (desktops)
		"2xl": "1536px", //
		colors: {
			white: "#fefefe",
			purple: "#e6c3fe",
			darkpurple: "#745bb1",
			grey: "#f0f0f0",
			lavender: "#BF94E4",
			pink: "#d87093",
			blue: "#7481fe",
			orange: "#ff7351",
			green: "#13ce66",
			yellow: "#ffdaa6",
			bluedark: "#232b38",
			gray: "#8492a6",
			
			black: "#000000",
			
			'purple': '#e6c3fe',
			
			'orange': '#ff7351',
			'green': '#13ce66',
			'yellow': '#ffdaa6',
			'blue-dark': '#232b38',
			'gray': '#8492a6',
			'gray-light': '#d3dce6',
			'red' : '#FF2400'
		},
		fontFamily: {
			sans: ["Graphik", "sans-serif"],
			serif: ["Merriweather", "serif"],
			raleway: ["Raleway"],
		},
		extend: {
			spacing: {
				128: "32rem",
				144: "36rem",
			},
			borderRadius: {
				"4xl": "2rem",
			},
		},
		extend: {},
	},
	variants: {
		extend: {
			backgroundColor: ["hover"],
		},
	},
	plugins: [],
});

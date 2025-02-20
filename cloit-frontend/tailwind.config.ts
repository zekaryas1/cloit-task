import type {Config} from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                'primary': {
                    '50': '#f3f6fc',
                    '100': '#e7edf7',
                    '200': '#cad8ed',
                    '300': '#9bb7de',
                    '400': '#6591cb',
                    '500': '#4173b6',
                    '600': '#305999',
                    '700': '#28487c',
                    '800': '#243e68',
                    '900': '#233657',
                    '950': '#101828',
                },
                'secondary': {
                    '50': '#ebf4ff',
                    '100': '#dbeaff',
                    '200': '#bed7ff',
                    '300': '#97bbff',
                    '400': '#6e93ff',
                    '500': '#4c6cff',
                    '600': '#253bff',
                    '700': '#2030e2',
                    '800': '#1d2cb6',
                    '900': '#202d8f',
                    '950': '#131953',
                },

            },
        },
    },
    plugins: [],
} satisfies Config;

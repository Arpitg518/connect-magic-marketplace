
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'rgb(230, 230, 230)',
				input: 'rgb(230, 230, 230)',
				ring: 'rgb(28, 28, 30)',
				background: 'rgb(255, 255, 255)',
				foreground: 'rgb(28, 28, 30)',
				primary: {
					DEFAULT: 'rgb(0, 122, 255)',
					foreground: 'rgb(255, 255, 255)'
				},
				secondary: {
					DEFAULT: 'rgb(242, 242, 247)',
					foreground: 'rgb(28, 28, 30)'
				},
				destructive: {
					DEFAULT: 'rgb(255, 59, 48)',
					foreground: 'rgb(255, 255, 255)'
				},
				muted: {
					DEFAULT: 'rgb(242, 242, 247)',
					foreground: 'rgb(110, 110, 115)'
				},
				accent: {
					DEFAULT: 'rgb(242, 242, 247)',
					foreground: 'rgb(28, 28, 30)'
				},
				popover: {
					DEFAULT: 'rgb(255, 255, 255)',
					foreground: 'rgb(28, 28, 30)'
				},
				card: {
					DEFAULT: 'rgb(255, 255, 255)',
					foreground: 'rgb(28, 28, 30)'
				},
				sidebar: {
					DEFAULT: 'rgb(250, 250, 250)',
					foreground: 'rgb(60, 60, 67)',
					primary: 'rgb(0, 122, 255)',
					'primary-foreground': 'rgb(255, 255, 255)',
					accent: 'rgb(242, 242, 247)',
					'accent-foreground': 'rgb(28, 28, 30)',
					border: 'rgb(230, 230, 230)',
					ring: 'rgb(0, 122, 255)'
				}
			},
			borderRadius: {
				lg: '16px',
				md: '12px',
				sm: '8px'
			},
			boxShadow: {
				'subtle': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
				'elevation': '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
				'card': '0 10px 15px -3px rgba(0,0,0,0.03), 0 4px 6px -2px rgba(0,0,0,0.02)',
				'prominent': '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'slide-up': {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					from: { transform: 'translateY(-20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(20px)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-left': {
					from: { transform: 'translateX(-20px)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.2s ease-in',
				'slide-up': 'slide-up 0.3s ease-out',
				'slide-down': 'slide-down 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-in',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite'
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
				'width': 'width',
				'position': 'top, right, bottom, left',
			},
			transitionTimingFunction: {
				'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'in': 'cubic-bezier(0.4, 0, 1, 1)',
				'out': 'cubic-bezier(0, 0, 0.2, 1)',
				'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			},
			backdropFilter: {
				'none': 'none',
				'blur-sm': 'blur(4px)',
				'blur': 'blur(8px)',
				'blur-md': 'blur(12px)',
				'blur-lg': 'blur(16px)',
				'blur-xl': 'blur(24px)',
				'blur-2xl': 'blur(40px)',
				'blur-3xl': 'blur(64px)',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			const newUtilities = {
				'.glass': {
					backgroundColor: 'rgba(255, 255, 255, 0.6)',
					backdropFilter: 'blur(10px)',
					WebkitBackdropFilter: 'blur(10px)',
					borderRadius: '16px',
					border: '1px solid rgba(255, 255, 255, 0.125)',
				},
				'.glass-dark': {
					backgroundColor: 'rgba(28, 28, 30, 0.7)',
					backdropFilter: 'blur(10px)',
					WebkitBackdropFilter: 'blur(10px)',
					borderRadius: '16px',
					border: '1px solid rgba(255, 255, 255, 0.08)',
				},
				'.perfect-center': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				},
			}
			addUtilities(newUtilities, ['responsive', 'hover'])
		}
	],
} satisfies Config;

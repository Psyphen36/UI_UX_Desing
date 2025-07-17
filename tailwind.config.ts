
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
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'hero-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #6366f1 100%)',
				'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
				'mesh-gradient': 'radial-gradient(at 40% 20%, hsl(14 165 233) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(220 93 70) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(250 93 70) 0px, transparent 50%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'bounce-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'50%': { transform: 'scale(1.02)', opacity: '0.8' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 15px rgba(14, 165, 233, 0.4)' },
					'50%': { boxShadow: '0 0 30px rgba(14, 165, 233, 0.8)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-15px) rotate(1deg)' },
					'66%': { transform: 'translateY(-8px) rotate(-1deg)' }
				},
				'glow-pulse': {
					'from': { boxShadow: '0 0 15px hsl(14 165 233 / 0.3), 0 0 30px hsl(14 165 233 / 0.1)' },
					'to': { boxShadow: '0 0 30px hsl(14 165 233 / 0.6), 0 0 60px hsl(14 165 233 / 0.3)' }
				},
				'slide-up': {
					'from': { opacity: '0', transform: 'translateY(40px)' },
					'to': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'from': { opacity: '0', transform: 'scale(0.9)' },
					'to': { opacity: '1', transform: 'scale(1)' }
				},
				'rotate-in': {
					'from': { opacity: '0', transform: 'rotate(-90deg) scale(0.8)' },
					'to': { opacity: '1', transform: 'rotate(0deg) scale(1)' }
				},
				'bounce-soft': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.02)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'slide-in-right': 'slide-in-right 0.4s ease-out',
				'bounce-in': 'bounce-in 0.4s ease-out',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'shimmer': 'shimmer 2s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
				'slide-up': 'slide-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
				'scale-in': 'scale-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
				'rotate-in': 'rotate-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
				'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
			},
			boxShadow: {
				'glow': '0 0 15px hsl(14 165 233 / 0.4)',
				'glow-lg': '0 0 30px hsl(14 165 233 / 0.6)',
				'inner-glow': 'inset 0 0 15px hsl(14 165 233 / 0.2)',
				'neon': '0 0 5px hsl(14 165 233), 0 0 10px hsl(14 165 233), 0 0 15px hsl(14 165 233)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};

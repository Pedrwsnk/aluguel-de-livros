 module.exports = {
  content: [
    "./index.html",
    "./pages/*.html",
    "./script.js"
  ],
  theme: {
        screens: {
            'xs': '480px',
            'sm': '600px',
            'md': '768px',
            'lg': '900px',
        },
        extend: {
            colors: {
                primary: '#3b82f6',
                success: '#22c55e',
                danger: '#ef4444',
                warning: '#f59e0b',
                dark: '#111827',
                light: '#f3f4f6',
            },
            fontFamily: {
                sans: ["'Segoe UI'", 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
            },
        }
    },
  plugins: [],
}


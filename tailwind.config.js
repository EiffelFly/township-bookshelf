module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "sdm-cg-50": "#F5F7FA",
        "sdm-cg-100": "#E4E7EB",
        "sdm-cg-200": "#CBD2D9",
        "sdm-cg-300": "#9AA5B1",
        "sdm-cg-400": "#7B8794",
        "sdm-cg-500": "#616E7C",
        "sdm-cg-600": "#52606D",
        "sdm-cg-700": "#3E4759",
        "sdm-cg-800": "#323F4B",
        "sdm-cg-900": "#1F2933",
        "sdm-bronze-900": "#DA852F",
        "sdm-bronze-700": "#E0964D",
        "sdm-bronze-500": "#E5A86A",
        "sdm-bronze-300": "#EAB988",
        "sdm-bronze-100": "#EFCB6A",
        "sdm-scarlet-900": "#ED3907",
        "sdm-scarlet-700": "#F85123",
        "sdm-scarlet-500": "#F96E47",
        "sdm-scarlet-300": "#FA8B6C",
        "sdm-scarlet-100": "#FCA891",
        "sdm-persian-green-900": "#17A99B",
        "sdm-persian-green-700": "#1DD2C0",
        "sdm-persian-green-500": "#38E4D3",
        "sdm-persian-green-300": "#60E9DC",
        "sdm-persian-green-100": "#88EFE4",
        "sdm-steel-blue-900": "#327DC3",
        "sdm-steel-blue-700": "#4A90D0",
        "sdm-steel-blue-500": "#68A2D8",
        "sdm-steel-blue-300": "#87B5E0",
        "sdm-steel-blue-100": "#A5C7E8",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

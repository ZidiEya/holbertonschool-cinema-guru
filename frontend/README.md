🚀 React + Vite Starter Template
This template provides a minimal and clean setup to get React working with Vite, including:

Fast Refresh (HMR)

ESLint configuration

Support for both Babel and SWC

Ready to extend with TypeScript

📦 Tech Stack
Vite

React

@vitejs/plugin-react (Babel)

@vitejs/plugin-react-swc (SWC)

ESLint

React Hooks Rules

React Refresh Plugin

🚀 Getting Started
bash
Copier
Modifier
# Clone the repository
git clone <your-repo-url>
cd <project-name>

# Install dependencies
npm install

# Start the development server
npm run dev
⚙️ Plugins
This project supports two official plugins for React Fast Refresh:

@vitejs/plugin-react (default)
Uses Babel under the hood for HMR and JSX transformations.

@vitejs/plugin-react-swc (optional)
Uses SWC, a Rust-based compiler. It is faster, but might lack some Babel features.

To switch to SWC:

bash
Copier
Modifier
npm remove @vitejs/plugin-react
npm install -D @vitejs/plugin-react-swc
Then update vite.config.js:

js
Copier
Modifier
import react from '@vitejs/plugin-react-swc';

export default {
  plugins: [react()],
}
🧠 ESLint
Basic ESLint setup included with:

JavaScript base rules

React Hooks best practices

React Refresh compatibility

To expand your ESLint configuration (especially for production apps), we recommend:

✅ Switching to TypeScript
✅ Adding typescript-eslint
✅ Enabling type-aware rules

Check the React + TS template for more info.


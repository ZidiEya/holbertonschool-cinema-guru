import React from 'react'; // Importe la bibliothèque React (pour créer des composants)
import ReactDOM from 'react-dom/client'; // Importe la bibliothèque pour afficher React dans le DOM
import './index.css'; // Importe les styles globaux
import App from './App'; // Importe le composant principal de l'application

// Crée une "racine" React à partir de l'élément HTML qui a l'id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rend (affiche) l'application dans le DOM
root.render(
  <React.StrictMode> 
    {/* React.StrictMode aide à détecter les problèmes potentiels dans le code */}
    <App /> {/* Composant principal qui contient toute l'application */}
  </React.StrictMode>
);

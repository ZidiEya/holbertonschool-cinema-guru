import React, { useState } from 'react'; // Import de React et du hook useState
import axios from 'axios'; // Pour effectuer des requêtes HTTP
import './auth.css'; // Fichier CSS pour les styles d'authentification
import Login from './Login'; // Composant de connexion
import Register from './Register'; // Composant d'inscription

function Authentication({ setIsLoggedIn, setUserUsername }) {
    // _switch : true = affichage du formulaire Login, false = affichage du formulaire Register
    const [_switch, setSwitch] = useState(true);

    // État pour stocker le nom d'utilisateur
    const [username, setUsername] = useState('');

    // État pour stocker le mot de passe
    const [password, setPassword] = useState('');

    // Fonction de soumission du formulaire (login ou register)
    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        try {
            // Détermine l'URL à utiliser selon si on est en login ou register
            const url = _switch ? '/api/auth/login' : '/api/auth/register';

            // Envoie la requête POST au serveur avec username et password
            const response = await axios.post(url, { username, password });

            // Récupère le token renvoyé par le serveur
            const { accessToken } = response.data;

            // Sauvegarde le token dans le localStorage pour la session
            localStorage.setItem('accessToken', accessToken);

            // Met à jour l'état global avec le nom d'utilisateur
            setUserUsername(username);

            // Passe l'application en mode "connecté"
            setIsLoggedIn(true);
        } catch (error) {
            // Affiche un message d'erreur si l'authentification échoue
            console.error('Authentication failed:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="auth-container">
            {/* Boutons pour passer de Login à Register */}
            <div className="auth-buttons">
                <button onClick={() => setSwitch(true)}>Sign In</button>
                <button onClick={() => setSwitch(false)}>Sign Up</button>
            </div>

            {/* Affiche le formulaire Login ou Register selon _switch */}
            {_switch ? (
                <Login
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserUsername={setUserUsername}
                />
            ) : (
                <Register
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserUsername={setUserUsername}
                />
            )}
        </div>
    );
}

export default Authentication;

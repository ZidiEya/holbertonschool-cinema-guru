import React from 'react';
import './auth.css'; // Styles pour les formulaires d'authentification

function Register({ username, password, setUsername, setPassword, setIsLoggedIn, setUserUsername }) {
    
    // Fonction exécutée lorsque l'utilisateur soumet le formulaire
    const handleSubmit = (event) => {
        event.preventDefault(); // Empêche le rechargement automatique de la page

        // ⚠️ Ici, il n’y a pas d’appel API → le compte est considéré "créé" immédiatement
        // Dans une vraie application, il faudrait envoyer une requête POST vers le backend
        setIsLoggedIn(true); // Change l'état global pour indiquer que l'utilisateur est connecté
        setUserUsername(username); // Stocke le nom d'utilisateur dans l'état global
    };

    return (
        // Formulaire d'inscription
        <form onSubmit={handleSubmit}>
            <p>Create new account</p>

            {/* Champ pour saisir le nom d'utilisateur */}
            <input
                type="text"
                className="underline-input"
                value={username} // Valeur contrôlée par React
                onChange={(e) => setUsername(e.target.value)} // Met à jour l'état au fur et à mesure
                placeholder="Username:"
                required // Champ obligatoire
            />

            {/* Champ pour saisir le mot de passe */}
            <input
                type="password"
                className="underline-input"
                value={password} // Valeur contrôlée par React
                onChange={(e) => setPassword(e.target.value)} // Met à jour l'état au fur et à mesure
                placeholder="Password:"
                required // Champ obligatoire
            />

            {/* Bouton pour soumettre le formulaire */}
            <button type="submit">Sign up</button>
        </form>
    );
}

export default Register;

import React from 'react';
import './auth.css'; // Styles CSS pour le formulaire d'authentification

function Login({ username, password, setUsername, setPassword, setIsLoggedIn, setUserUsername }) {
    
    // Fonction appelée lors de la soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        // Vérifie si les identifiants correspondent aux valeurs de test
        // (Ici, c'est un simple test, dans la vraie application il faudrait vérifier côté serveur)
        if (username === "Test User" && password === "pass") {
            setIsLoggedIn(true); // Change l'état global en "connecté"
            setUserUsername(username); // Enregistre le nom d'utilisateur dans l'état global
        }
    };

    return (
        // Formulaire de connexion
        <form onSubmit={handleSubmit} className='form'>
            <p>Sign in with your account</p>

            {/* Champ pour le nom d'utilisateur */}
            <input
                type="text"
                className="underline-input"
                value={username} // Valeur actuelle
                onChange={(e) => setUsername(e.target.value)} // Mise à jour de l'état à chaque saisie
                placeholder="Username:"
                required // Champ obligatoire
            />

            {/* Champ pour le mot de passe */}
            <input
                type="password"
                className="underline-input"
                value={password} // Valeur actuelle
                onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état à chaque saisie
                placeholder="Password:"
                required // Champ obligatoire
            />

            {/* Bouton pour soumettre le formulaire */}
            <button type="submit">Sign In</button>
        </form>
    );
}

export default Login;

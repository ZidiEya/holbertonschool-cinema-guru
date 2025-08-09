import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './routes/dashboard/Dashboard';
import Authentication from './routes/auth/Authentication';

const App = () => {
  // État pour savoir si l'utilisateur est connecté
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // État pour stocker le nom d'utilisateur
  const [userUsername, setUserUsername] = useState("");

  // État pour savoir si la vérification du token est en cours (évite les affichages temporaires incorrects)
  const [loading, setLoading] = useState(true);

  // useEffect s'exécute une seule fois au montage du composant
  useEffect(() => {
    // Récupère le token depuis le localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Si aucun token, on arrête ici et on affiche la page de connexion
    if (!accessToken) {
      setLoading(false); // Plus besoin d'attendre
      return;
    }

    // Facultatif : Vérifier l'expiration du token (si c'est un JWT)
    try {
      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1])); // Décoder la partie payload du JWT
      if (Date.now() >= tokenPayload.exp * 1000) { // Comparer la date actuelle avec la date d'expiration
        localStorage.removeItem('accessToken'); // Supprimer le token expiré
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.error("Format du token invalide", e);
    }

    // Vérifier la validité du token côté serveur
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Envoyer le token dans l'en-tête
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Authentification réussie → enregistrer l'état et le nom d'utilisateur
          setIsLoggedIn(true);
          setUserUsername(data.username);
        } else {
          // Échec d'authentification → réinitialiser l'état
          setIsLoggedIn(false);
          setUserUsername('');
        }
      })
      .catch(error => {
        // En cas d'erreur réseau ou serveur
        console.error('Erreur lors de l’authentification :', error);
        setIsLoggedIn(false);
      })
      .finally(() => {
        // Quoi qu'il arrive, on termine le chargement
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {loading ? (
        // Affiche un texte ou un loader pendant la vérification du token
        <p>Chargement...</p>
      ) : isLoggedIn ? (
        // Si l'utilisateur est connecté → afficher le tableau de bord
        <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        // Sinon → afficher la page d'authentification
        <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
      )}
    </div>
  );
};

export default App;

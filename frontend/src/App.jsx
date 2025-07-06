// Import du fichier CSS global de l'application
import './App.css';

// Import des hooks React pour gérer l'état (useState) et les effets secondaires (useEffect)
import { useState, useEffect } from 'react';

// Import du composant Dashboard (probablement affiché après connexion)
import Dashboard from './routes/dashboard/Dashboard';

// Import du composant Authentication (écran de connexion/inscription)
import Authentication from './routes/auth/Authentication';

const App = () => {
  // État pour vérifier si l'utilisateur est connecté ou non
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // État pour stocker le nom d'utilisateur de l'utilisateur connecté
  const [userUsername, setUserUsername] = useState("");

  // Le reste de l'application viendra ici, comme les routes, les effets ou le rendu conditionnel
};

export default App;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const fetchAuth = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/auth/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error('Server response was not ok');
          }

          const result = await response.json();
          setIsLoggedIn(true);
          setUserUsername(result.username);

        } catch (error) {
          console.error("Erreur d'authentification :", error);
          setIsLoggedIn(false);
          localStorage.removeItem('accessToken');
        }
      };

      fetchAuth();
    }
  }, []);

return (
  <div className="App">
    {isLoggedIn ? (
      <Dashboard
      userUsername={userUsername}
      setIsLoggedIn={setIsLoggedIn}>
      </Dashboard>
    ) : (
      <Authentication
      setUserUsername={setUserUsername}
      setIsLoggedIn={setIsLoggedIn}
      ></Authentication>
    )}
  </div>
);
}

export default App;

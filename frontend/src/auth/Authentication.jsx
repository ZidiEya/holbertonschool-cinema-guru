// Import du fichier CSS spécifique à l'authentification (styles pour ce module)
import './auth.css';

// Import du hook useState de React pour gérer l'état local dans le composant
import { useState } from 'react';

// Import de la bibliothèque axios pour effectuer des requêtes HTTP (API calls)
import axios from 'axios';

// Import du composant Button réutilisable, situé dans le dossier général des composants
import Button from '../../components/general/Button';

// Import des composants Login et Register spécifiques à l'authentification
import Login from './Login';
import Register from './Register';


const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
	const [_switch, set_switch] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(username, password)

		try {
			const url = _switch
				? 'http://localhost:8000/api/auth/login'
				: 'http://localhost:8000/api/auth/register';

			const response = await axios.post(url, { username, password },
			)

			const token = response.data.accessToken;
			localStorage.setItem('accessToken', token);

			setUserUsername(username);
			setIsLoggedIn(true);

			console.log("Authentification réussie :", response);
		} catch (error) {
			console.error("Erreur d'authentification :", error.response ? error.response.data : error.message);
		}
	};

	return (
		<div className="html_form">
			<form onSubmit={handleSubmit}>
				<div className='auth_buttons'>
					<Button
						label="Sign In"
						className="sign_in_button"
						onClick={() => set_switch(true)}
						type="button"
					/>
					<Button
						label="Sign Up"
						className="sign_up_button"
						onClick={() => set_switch(false)}
						type="button"
					/>
				</div>
				{_switch ? (
					<Login
						username={username}
						password={password}
						setUsername={setUsername}
						setPassword={setPassword}></Login>
				) : (<Register
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}></Register>
				)}
			</form>
		</div>
	);
};

export default Authentication;

// Import du fichier de styles CSS pour styliser les composants d'authentification
import './auth.css';

// Import du composant Input personnalisé (champ de saisie) depuis les composants généraux
import Input from '../../components/general/Input';

// Import du composant Button réutilisable pour les actions comme "Se connecter" ou "S’inscrire"
import Button from '../../components/general/Button';

// Import de l’image représentant une clé grise, probablement utilisée comme icône pour le champ mot de passe (état inactif)
import keyIcon from '../../assets/images/greykey.png';

// Import de l’image représentant un avatar par défaut, utilisé dans le formulaire de connexion ou d'inscription
import avatarIcon from '../../assets/images/avatar.png';

// Import de l’image représentant une clé blanche, probablement utilisée comme icône pour le champ mot de passe (état actif/sélectionné)
import keyWhiteIcon from '../../assets/images/whitekey.png';


const Register = ({ username, password, setUsername, setPassword }) => {
	return (
		<div className="register">
			<p>Create a new account</p>
			<Input
				label="Username:"
				type='text'
				className='username_register'
				value={username}
				setValue={setUsername}
				icon={avatarIcon}
			/>
			<Input
				label="Password:"
				type='password'
				className='password_register'
				value={password}
				setValue={setPassword}
				icon={keyIcon}
			/>
			<Button type="submit"
				label="Sign Up"
				className="sign_up_button_register"
				icon={keyWhiteIcon}>
			</Button>
		</div>
	);
};

export default Register;

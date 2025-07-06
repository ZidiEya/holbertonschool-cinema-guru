// Import des styles CSS spécifiques au module d'authentification
import './auth.css';

// Import d'un composant Input réutilisable depuis le dossier général des composants
import Input from '../../components/general/Input';

// Import d'un composant Button réutilisable depuis le dossier général des composants
import Button from '../../components/general/Button';

// Import d'une image d'avatar utilisée dans l'interface (par exemple pour le profil utilisateur)
import avatarIcon from '../../assets/images/avatar.png';

// Import d'une icône de clé grise (peut-être pour indiquer un champ mot de passe non actif)
import keyIcon from '../../assets/images/greykey.png';

// Import d'une icône de clé blanche (peut-être pour indiquer un état actif ou sélectionné du champ mot de passe)
import keyWhiteIcon from '../../assets/images/whitekey.png';


const Login = ({ username, password, setUsername, setPassword }) => {
	return (
		<div className="login">
			<p>Sign in with your account</p>
			<Input
				label="Username:"
				type='text'
				className='username_login'
				value={username}
				setValue={setUsername}
				icon={avatarIcon}>
			</Input>
			<Input
				label="Password:"
				type='password'
				className='password_login'
				value={password}
				setValue={setPassword}
				icon={keyIcon}>
			</Input>
			<Button type="submit"
				label="Sign In"
				className="sign_in_button_login"
				icon={keyWhiteIcon}>
			</Button>
		</div>
	);
};

export default Login;

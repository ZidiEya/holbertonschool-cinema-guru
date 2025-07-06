import './auth.css';
import Input from '../../components/general/Input'
import Button from '../../components/general/Button'
import keyIcon from '../../assets/images/greykey.png';
import avatarIcon from '../../assets/images/avatar.png';
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

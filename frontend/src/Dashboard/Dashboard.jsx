// Importe le fichier de styles CSS spécifique à l'interface du tableau de bord
import './dashboard.css'

// Importe le composant Header, qui est généralement la barre de navigation supérieure
import Header from '../../components/navigation/Header'

// Importe le composant SideBar, qui est la barre de navigation latérale du dashboard
import SideBar from '../../components/navigation/SideBar';

// Importe les composants nécessaires de React Router pour gérer la navigation côté client
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Importe la page principale du dashboard, affichée généralement après connexion
import HomePage from './HomePage';

// Importe la page affichant les titres ou contenus ajoutés aux favoris par l'utilisateur
import Favorites from './Favorites';

// Importe la page contenant les contenus que l'utilisateur souhaite regarder plus tard
import WatchLater from './WatchLater';

const Dashboard = ({ userUsername, setIsLoggedIn }) => {

	return (
		<BrowserRouter>
			<div className="dashboard">
				<Header
					userUsername={userUsername}
					setIsLoggedIn={setIsLoggedIn}>
				</Header>
				<div className='main-page'>
				<SideBar></SideBar>
				<Routes>
					<Route path="/home" element={<HomePage />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/watchlater" element={<WatchLater />} />
					<Route path="*" element={<Navigate to="/home" />} />
				</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default Dashboard;

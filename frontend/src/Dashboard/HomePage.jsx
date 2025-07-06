// Importe les styles CSS propres à la page dashboard
import './dashboard.css'

// Importe le composant MovieCard qui affiche les détails d’un film individuel
import MovieCard from '../../components/movies/MovieCard';

// Importe le composant Filter permettant de filtrer les films (par genre, année, etc.)
import Filter from '../../components/movies/Filter';

// Importe un composant bouton générique réutilisable dans toute l’application
import Button from '../../components/general/Button';

// Importe les hooks React pour gérer l’état local et les effets de bord (ex: appels API)
import { useState, useEffect } from 'react';

// Importe axios, une bibliothèque permettant d’effectuer des requêtes HTTP
import axios from 'axios';


	const loadMovies = async (page) => {

		const accessToken = localStorage.getItem('accessToken');

		try {
			const url = 'http://localhost:8000/api/titles/advancedsearch';
			const response = await axios.get(url, {
				params: { minYear, maxYear, genres, title, sort, page },
				headers: {
					'Authorization': `Bearer ${accessToken}`,
				},
			});

			setMovies((prevMovies) => [...prevMovies, ...response.data.titles]);
			console.log("Movies loaded:", response.data.titles);
		} catch (error) {
			console.error("Error loading movies:", error.response ? error.response.data : error.message);
		}
	};

	useEffect(() => {
		setMovies([]);
		loadMovies(page);
	}, [minYear, maxYear, genres, title, sort, page]);

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	return (
		<div className="home-page">
			<Filter
				minYear={minYear}
				setMinYear={setMinYear}
				maxYear={maxYear}
				setMaxYear={setMaxYear}
				sort={sort}
				setSort={setSort}
				genres={genres}
				setGenres={setGenres}
				title={title}
				setTitle={setTitle}>
			</Filter>

			<div className="movie-list">
			{movies.map((movie, index) => (
				<MovieCard
				key={`${movie.imdbId}-${index}`}
					movie={movie}
				/>
			))}
			</div>

			<Button
			label="Load More.."
			className="loadMore"
			onClick={() => (handleLoadMore)}
			type="button">
			</Button>
		</div>
	);
};

export default HomePage;

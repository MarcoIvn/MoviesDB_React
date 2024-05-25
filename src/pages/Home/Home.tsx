import React, { useEffect, useState } from "react";
import HomeWrapper from "./HomeWrapper";
import Carousel from "../../components/Carousel/Carousel";
import { IMovieCard } from "../../components/MovieCard/types";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getNowPlayingMovies, getPopularMovies, getRatedMovies } from "../../services";

const Home: React.FC = () => {

  const [movies, setMovies] = useState<{ [key: string]: IMovieCard[] }>({
    popular: [],
    rated: [],
    nowPlaying: []
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

  const movieTypes = ['popular', 'rated', 'nowPlaying'];

  const getMovies = async () => {
    setLoading(true);

    const requests = movieTypes.map(type => {
      switch (type) {
        case 'popular':
          return getPopularMovies();
        case 'rated':
          return getRatedMovies();
        case 'nowPlaying':
          return getNowPlayingMovies();
        default:
          return Promise.reject(new Error('Invalid movie type: ${type}'));
      }
    });

    Promise.all(requests)
      .then(results => {
        const updatedMovies: { [key: string]: IMovieCard[] } = {};
        results.forEach((res, index) => {
          if (res && res.results) {
            updatedMovies[movieTypes[index]] = res.results.map((movie: any) => ({
              title: movie.title,
              genreId: movie.genre_ids[0],
              movieId: movie.id,
              voteAverage: movie.vote_average,
              posterPath: movie.poster_path
            }));
          }
        });
        setMovies(updatedMovies);
      })
      .catch(err => {
        console.error(err);
        setErrorMovies(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="home-container">
      <HomeWrapper>
        {movieTypes.map((type, index) => (
          <div key={index} className="carousel-container">
            <Carousel title={type.toUpperCase()} movies={movies[type]} />
          </div>
        ))}
      </HomeWrapper>
    </div>
  );
};

export default Home;
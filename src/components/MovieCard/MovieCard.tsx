import React from 'react';
import { IMovieCard } from './types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import { Pill } from '../Pill';
import { useNavigate } from 'react-router-dom';
import genres from '../../constants/genres.json';
import { ROUTES } from '../../routes/constants';
import './MovieCard.css';

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,  
    posterPath
}) => {
    const poster = IMAGE_SOURCE + posterPath;
    const navigate = useNavigate();
    
    const getGenre = (genreId: number): string => {
        const key = Object.values(genres.genres).find(
          (genre) => genre.id === genreId
        );
        if (key) {
          return key.name;
        }
        return 'Not classified';
    }

    const navigateMovies = (id:number, movieName:string) => {
      navigate(`${ROUTES.SHOW.path}${id}`, {state: {movieName}})
    }

    return (
        <div className='movie-card' onClick={() => {
            navigateMovies(movieId, title)
        }}>
            <div>
                <img className='movie-card-poster'  src={poster} alt="Poster" />
            </div>
            <div className='movie-card-details'>
                <Pill title={getGenre(genreId)}/>
                <div className='movie-card-info'>
                    <p className='movie-card-title'>{title}</p>
                    <p className='movie-card-rating'> {voteAverage} / 10</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;

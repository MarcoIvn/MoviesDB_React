import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getDetails } from "../../services/movies/getDetails";
import './Show.css'; 
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import { getRecommendations } from "../../services";
import Carousel from "../../components/Carousel/Carousel";
import { IMovieCard } from "../../components/MovieCard/types";


const Show: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState<any>({});
  const [recommendation, setRecommendation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string>("");

  const goBack = () => {
    navigate(-1);
  };

  const addFavorite = () => {
    const oldFavoritesArray = localStorage.getItem("favorites");
    const favorites = oldFavoritesArray ? JSON.parse(oldFavoritesArray) : [];
    
    if (!favorites.includes(id)) {
        const newFavorites = [...favorites, id];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setIsFavorite(true);
    } else {
        console.log("El elemento ya está en la lista de favoritos.");
    }
};

  const removeFavorite = () => {
    const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
    let newFavorites = [...favs];
    newFavorites = newFavorites.filter((e) => e !== id);
    setFavorites(JSON.stringify(newFavorites));
    setIsFavorite(false);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };
  

  const getMovieDetail = async () => {
    try {
      const detailsResponse = await getDetails(String(id));
      if (detailsResponse && detailsResponse.data) {
        setShow(detailsResponse.data);
      }
      
      const recommendationsResponse = await getRecommendations(String(id));
      if (recommendationsResponse && recommendationsResponse.data && recommendationsResponse.data.results) {
        setRecommendation(recommendationsResponse.data.results);
      }
    } catch (error) {
      console.log(error, "error");
    }
    
    setLoading(false);
  };

  useEffect(() => {
    const favs = localStorage.getItem("favorites") || "";
    setFavorites(favs);
    setIsFavorite(favs.includes(id!));
    setLoading(true);
    getMovieDetail();
  }, [id]);

  const RecommendationMovies: IMovieCard[] = recommendation.map((movie: any) => ({
    title: movie.title,
    genreId: movie.genre_ids[0],
    movieId: movie.id,
    voteAverage: movie.vote_average,
    posterPath: movie.poster_path
  }));
  
  return (
    <div className="show-container">
      {loading ? (
        <span>loading...</span>
      ) : (
        <>
          <div className="movie-details">
            <img className="poster" src={`${IMAGE_SOURCE}${show.poster_path}`} alt="Poster" />
            
            <div className="info-container">
              <div className="show-title">{show.title}</div>
              <div className="genre-title">Genre:</div>
              <div className="genres-container">
                {show.genres && show.genres.map((genre: any) => (
                  <div key={genre.id} className="genre">
                    {genre.name}
                  </div>
                ))}
              </div>
              <div className="overview-title">Overview:</div>
              <div className="overview">"{show.overview}"</div>
              <div className="release-date">Release Date: {show.release_date}</div>
              <div className="rating">Adult Rating: {show.adult ? "YES" : "NO"}</div>
              <div className="button-container">
                <button className="back-button" onClick={goBack}>Go back</button>
                {isFavorite ? (
                  <button className="remove-favorite-btn" onClick={removeFavorite}>Remove from favorites</button>
                ) : (
                  <button className="add-favorite-btn" onClick={addFavorite}>Add to favorites</button>
                )}
              </div>
            </div>
          </div>
  
          <div className="carousel-container">

            <Carousel title="Recommendations" movies={RecommendationMovies} />
          </div>
        </>
      )}
    </div>
  );
  
};

export default Show;

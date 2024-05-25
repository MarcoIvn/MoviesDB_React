import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "../../services";
import { MovieCard } from "../../components/MovieCard";
import "../movies.css"; 

const NowPlaying: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<{ key: string; order: "asc" | "desc" }>({
    key: "",
    order: "asc",
  });

  const getNowPlaying = async () => {
    await getNowPlayingMovies()
      .then((res) => {
        if (res && res.results) {
          setMovies(res.results);
        }
      })
      .catch((err) => {
        console.log(err, "err");
        setErrorMovies(true);
      });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getNowPlaying();
  }, []);

  const sortByTitle = () => {
    const order = sortBy.key === "title" && sortBy.order === "asc" ? "desc" : "asc";
    const sortedMovies = [...movies].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setMovies(sortedMovies);
    setSortBy({ key: "title", order });
  };

  const sortByRating = () => {
    const order = sortBy.key === "rating" && sortBy.order === "asc" ? "desc" : "asc";
    const sortedMovies = [...movies].sort((a, b) => {
      if (order === "asc") {
        return a.vote_average - b.vote_average;
      } else {
        return b.vote_average - a.vote_average;
      }
    });
    setMovies(sortedMovies);
    setSortBy({ key: "rating", order });
  };

  return (
    <div>
        <h2 className="title">Now Playing</h2>
      <div className="buttons-container">
        <button onClick={sortByTitle}>Sort by Name</button>
        <button onClick={sortByRating}>Sort by Calification</button>
      </div>
      {loading && <div>Loading...</div>}
      {errorMovies && <div>Error...</div>}
      <div className="movies-container"> {/* Contenedor para centrar las MovieCard */}
        {movies?.length > 0 &&
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}> {/* Div para cada MovieCard */}
              <MovieCard
                movieId={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                voteAverage={movie.vote_average}
                genreId={movie.genre_ids[0]}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NowPlaying;

import React from "react";
import Slider from "react-slick";
import MovieCard from "../../components/MovieCard/MovieCard";
import { IMovieCard } from '../MovieCard/types';
import { movies } from "../../constants/moviesMock";
import './Carousel.css';


interface ICarousel {
  title: string;
  movies: IMovieCard[];
}



const Carousel: React.FC<ICarousel> = ({ title, movies }) => {
  const sliderSettings = {

    // https://react-slick.neostack.com/docs/example/

    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    className: "center",
    centerMode: true,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
};

  return (
    <div className="carousel">
      <h2 className="carousel-title">{title}</h2>
      <Slider {...sliderSettings}>
        {movies.map((movies) => (
          <MovieCard
            key={movies.movieId}
            title={movies.title}
            genreId={movies.genreId}
            movieId={movies.movieId}
            voteAverage={movies.voteAverage}
            posterPath={movies.posterPath}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

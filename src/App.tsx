import React from 'react';
import { MovieCard } from './components/MovieCard';
import { movies } from './constants/moviesMock';
import { Router, RouterProvider } from 'react-router-dom';
import { AppRouter } from './routes/router';

function App() {
  return <RouterProvider router={AppRouter()}/>;
  
}

export default App;

import './App.css';
import { MovieListComponent } from './pages/movie-list/MovieListComponent';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { MovieDetails } from './pages/movie-details/MovieDetailsComponent';
import { MovieEditComponent } from './pages/movie-edit/MovieEditComponent';
import { ShoppingCart } from './pages/cart/cart';
import { Login } from './pages/auth/Login';
import React from 'react';
import { AuthContextProvider } from './pages/auth/AuthContext';
import { PublicPage } from './pages/PublicPage';
import { CanNavigate } from './pages/auth/CanNavigate';
import { ChatApp } from './pages/chat-app/chat-app';
import { AboutUs } from './pages/about-us/about-us';
import { Homepage } from './pages/homepage/homepage';

/**
 * SPA -> Single Page Application
 */


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='public' element={<PublicPage />}></Route>
          <Route path='chat' element={<ChatApp />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='about-us' element={<AboutUs />}></Route>
          <Route path="articles" element={
            <CanNavigate>
              <MovieListComponent />
            </CanNavigate>
          }></Route>
          <Route path='/article-details/:movieId' element={
            <CanNavigate>
              <MovieDetails />
            </CanNavigate>
          }></Route>
          <Route path='/article-details/:movieId/edit' element={
            <CanNavigate>
              <MovieEditComponent />
            </CanNavigate>
          }></Route>
          <Route path='/create' element={
            <CanNavigate>
              <MovieEditComponent formType='create' />
            </CanNavigate>
          } ></Route>
          <Route path='/cart' element={
            <CanNavigate>
              <ShoppingCart />
            </CanNavigate>
          } ></Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

/**
 * 1. Retrieve movies from db.json
 * 2. Create MovieListComponent 
 * 3. Create Template -> Component -> MovieCardComponent
 * 4. MovieDetailsComponent -> Show movie details / Edit movie details / Delete movie
 * 5. Create shopping cart -> Add movies (From: MovieCardComponent, MovieDetailsComponent), Remove Movie
 * 6. AddNewMovieComponent
 * 7. Register / Login
 * 
 * 
 * + Additional suggestions: 
 * - Quantity on movies than can be purchased.
 * - Search for movies + additional filters (Genre / etc)
 * - upload image
 */

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import './details-component.css'

export function MovieDetails() {
  const movieDetailUrl = 'http://localhost:3001/movies';
  let { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  // Use effect is only called when the component is initially created
  // If we want to call this function again, we need to pass a variable in the dependency array
  // When the variable changes value the use effect gets called again.
  useEffect(() => {
    fetch(`${movieDetailUrl}/${movieId}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
      .then((response) => response.json())
      .then((movie) => setMovieDetails(movie))
  }, []);

  function deleteMovie() {
    if (auth.user.admin) {
      fetch(`${movieDetailUrl}/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })
        .then(() => {
          navigate('/');
        });
    }

  }

  function editMovie() {
    navigate('./edit');
  }

  return (
    <section className='details-section'>
      <h2>{ movieDetails.Title }</h2>
      <span>{movieDetails.Year}</span>
      <span>{movieDetails.Type}</span>
      <img src={movieDetails.Poster} alt="Movie image" />

      <p>{movieDetails.Summary}</p>
      <button onClick={editMovie}>Edit</button>
      {
        auth.user.admin ? <button onClick={deleteMovie}>Delete</button> : 'You need to be an admin in order to delete'
      }
    </section>
  )
}

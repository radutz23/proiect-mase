import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { MovieCardComponent } from './MovieCardComponent';
import './MovieListComponent.css';
import { HamburgerMenu } from '../hamburger-menu/hamburger';

export function MovieListComponent() {
  const moviesUrl = 'http://localhost:3001/movies';

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState(0);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filters, setFilters] = useState({
    animals: false,
    nature: false,
  });

  const { auth, logOut } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(moviesUrl, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          setErrorMessage('There has been a problem, please try again later.');
        } else {
          setErrorMessage(null);
          return response;
        }
      })
      .then((response) => response.json())
      .then((moviesFromServer) => {
        setMovies(moviesFromServer);
        setInitialMovies(moviesFromServer);
      });
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      const filteredMovies = initialMovies
        .filter((movie) => movie.Title.toLowerCase().includes(searchTerm))
        .filter(movie => {

          if (filters.animals && filters.nature) {
            return movie.Type === 'animals' || movie.Type === 'nature';
          } else if (filters.animals) {
            return movie.Type === 'animals';
          } else if (filters.nature) {
            return movie.Type === 'nature';
          } else {
            return true;
          }
        })
        .filter((movie) => Number(movie.Year) >= year);

      setMovies(filteredMovies);
    }, 500)

    return () => {
      clearTimeout(timeout);
    }
  }, [searchTerm, initialMovies, filters, year]);

  function searchInputHandler(event) {
    // if (timeout) {
    //   clearTimeout(timeout);
    // }

    // timeout = setTimeout(() => {
    setSearchTerm(event.target.value.toLowerCase());
    // }, 500);
  }

  function filterChangedMovies(event) {
    setFilters({
      ...filters,
      animals: event.target.checked
    });
  }

  function filterChangedDocumentaries(event) {
    setFilters({
      ...filters,
      nature: event.target.checked
    });
  }

  return (
    <section>
      <nav className='nav-header'>
<HamburgerMenu></HamburgerMenu>
        <p className='hello-user'>Hello, {auth?.user?.email}</p>
        <button onClick={logOut} className='button-24'>Log out</button>
      </nav>

      <header>
        <h1 className="movie-list--title">
          Article list
        </h1>
      </header>

      {errorMessage}

      {
        !errorMessage && (<section className='filters'>
<div>
          <label htmlFor="search">Search: </label>
          <input id="search" type="text" onChange={searchInputHandler} />
</div>

<div>
          <label htmlFor="animals">Animals</label>
          <input id="animals" type="checkbox" onChange={filterChangedMovies} />
</div>

<div>
          <label htmlFor="nature">Nature</label>
          <input id="nature" type="checkbox" onChange={filterChangedDocumentaries} />
</div>

<div>
          <label htmlFor="year">Year: </label>
          <input id="year" type="text" onChange={(event) => setYear(Number(event.target.value))} />
</div>
        </section>
        )
      }

      <ul className='movie-list'>
        {movies.map((movie) => {
          return (
            <MovieCardComponent
              Title={movie.Title}
              Year={movie.Year}
              Type={movie.Type}
              Poster={movie.Poster}
              id={movie.id}
              key={movie.id}
            ></MovieCardComponent>
          );
        })}
      </ul>
    </section>
  );
}

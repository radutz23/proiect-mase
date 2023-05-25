import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

// formType can be create / edit
export function MovieEditComponent({ formType = 'edit' }) {
  const movieDetailUrl = 'http://localhost:3001/movies';
  let { movieId } = useParams();

  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  // In react the following are controlled inputs.
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [img, setImg] = useState('');

  useEffect(() => {
    if (formType === 'edit') {
      fetch(`${movieDetailUrl}/${movieId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })
        .then((response) => response.json())
        .then((movie) => {
          setTitle(movie.Title);
          setYear(movie.Year);
          setType(movie.Type);
          setImg(movie.Poster);
        });
    }
  }, []);

  function selectChange(event) {
    setType(event.target.value);
  }

  function titleChange(event) {
    setTitle(event.target.value);
  }

  function yearChange(event) {
    setYear(event.target.value);
  }

  function imgChange(event) {
    setImg(event.target.value);
  }

  function submit(event) {
    event.preventDefault();

    const body = {
      Title: title,
      Year: year,
      Type: type,
      Poster: img,
    };

    const url = formType === 'edit' ? `${movieDetailUrl}/${movieId}` : movieDetailUrl;

    fetch(url, {
      method: formType === 'edit' ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify(body)
    }).then(() => {
      if (formType === 'edit') {
        navigate('/movie-details/' + movieId)
      } else {
        navigate('/');
      }
    });
  }

  return (
    <form>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" value={title} onChange={titleChange} />
      </div>

      <div>
        <label htmlFor="year">Year</label>
        <input id="year" type="number" value={year} onChange={yearChange} />
      </div>

      <div>
        <label htmlFor="img">Poster</label>
        <input id="img" type="text" value={img} onChange={imgChange} />
      </div>

      <div>
        <label htmlFor="type">Movie type</label>
        <select
          id="type"
          value={type}
          onChange={selectChange}
        >
          <option value="null" disabled>Please select a value</option>
          <option value="movie">Movie</option>
          <option value="series">TV Series</option>
          <option value="documentaries">Documentaries</option>
        </select>
      </div>

      <button onClick={submit}>
        {
          formType === 'edit' ? 'Save changes' : 'Create'
        }
      </button>
    </form>
  )
}
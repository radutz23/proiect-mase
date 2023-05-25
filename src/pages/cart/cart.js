import { useEffect, useState } from 'react'
import { retrieveCart } from './retrieveCart';

export function ShoppingCart() {
  const [movies, setMovies] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    retrieveCart(setPrice, setMovies);
  }, []);

  return (
    <section>
      <h1>Shopping cart!</h1>

      <ul>
        {
          movies.map((movie) => (
            <li key={movie.id}>
              <p>Title: {movie.Title}</p>
              <p>Price: {movie.Price}</p>
              <p>Quantity: {movie.Quantity}</p>
              <img src={movie.Poster} alt="Movie poster" height="150" width="100" />
            </li>
          ))
        }
      </ul>

      <p>Total price: {price} </p>
    </section>
  )
}



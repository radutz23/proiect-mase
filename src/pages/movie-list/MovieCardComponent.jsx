import { Link } from 'react-router-dom';
import movieCardStyles from './MovieCardComponent.module.css';

export function MovieCardComponent(props) {
  const cartUrl = 'http://localhost:3001/cart';
  const { Title, Year, Type, Poster, id } = props;

  function addToCart(event) {
    event.preventDefault();

    fetch(cartUrl)
      .then(response => response.json())
      .then(cartList => {
        const [cart] = cartList;

        if (cart) {
          const movieInCart = cart.movies.find((movie) => movie.movieId === id);

          if (movieInCart) {
            movieInCart.quantity = movieInCart.quantity + 1; 
          } else {
            cart.movies.push({ movieId: id, quantity: 1 });
          }

          updateCart(cart.id, cart.movies);
        } else {
          createCart();
        }
      })
  }

  function createCart() {
    fetch(`${cartUrl}`, {
      method: 'POST',
      body: JSON.stringify({ 
        movies: [
          { movieId: id, quantity: 1 }
        ] 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  function updateCart(cartId, movies) {
    fetch(`${cartUrl}/${cartId}`, {
      method: 'PATCH',
      body: JSON.stringify({ movies }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <Link className={'article-card-text'} to={`/article-details/${id}`}>
      <li>
        <article className={movieCardStyles['movie-card']}>
          <h3 className={movieCardStyles['movie-card--title']}>{Title}</h3>

          <span>{Year}</span>
          <span>{Type}</span>

          <img src={Poster} alt="Movie poster" width={300} height={465}/>
        </article>

        {/* <button onClick={addToCart}>Add to cart</button> */}
      </li>
    </Link>
  );
}



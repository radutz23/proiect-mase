
export function retrieveCart(setPrice, setMovies) {
  const cartUrl = 'http://localhost:3001/cart';
  const moviesUrl = 'http://localhost:3001/movies';

  fetch(cartUrl)
    .then(response => response.json())
    .then(cartList => {
      const [cart] = cartList;

      fetch(moviesUrl)
        .then(response => response.json())
        .then(movies => {
          const cartMovies = [];
          let totalPrice = 0;

          for (const movie of movies) {
            const cartMovie = cart.movies.find(cartMovie => cartMovie.movieId === movie.id);

            if (cartMovie) {
              cartMovies.push({
                ...movie,
                Quantity: cartMovie.quantity,
              });
              totalPrice += Number((movie.Price * cartMovie.quantity).toFixed(2));
              setPrice(totalPrice);
            }
          }

          setMovies(cartMovies);
        });
    });
}

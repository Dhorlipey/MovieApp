import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/Movie';


function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieList = async () => {
    await fetch('https://imdb-api.com/en/API/MostPopularMovies/k_ur1o2j9x')
      .then(response => response.json())
      .then(data => setMovies(data.items))
  }
  useEffect(() => {
    getMovieList()
  }, [])
  const searchMovie = async () => {
    await fetch(`https://imdb-api.com/en/API/Search/k_ur1o2j9x/${searchValue}`)
      .then(response => response.json())
      .then(data => setMovies(data.results))
  }
  return (
    <>
      <div className='header'>
        <div className='container d-flex mt-4'>
          <a href="/" className='mr-3 title'>MovieApi</a>
          <form className='d-flex gap-3 w-50'>
            <input placeholder="search movies" className="search-box py-2 form-control" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <button onClick={searchMovie} type="button" className="search-btn btn btn-primary" style={{ border: 'none', color: 'white' }}>Search</button>
          </form>
        </div>
      </div>
      <div className='container movie-app'>

        <div className='row'>

          <MovieList movies={movies} />

        </div>
      </div>
    </>
  );
}

export default App;

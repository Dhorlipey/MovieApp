import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/Movie';


function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieList = async () => {
    await fetch('https://imdb-api.com/en/API/MostPopularMovies/k_zfntaf3f')
      .then(response => response.json())
      .then(data => setMovies(data.items))
  }
  useEffect(() => {
    getMovieList()
  }, [])
  const searchMovie = async () => {
    await fetch(`https://imdb-api.com/en/API/Search/k_zfntaf3f/${searchValue}`)
      .then(response => response.json())
      .then(data => setMovies(data.results))
  }
  const searchAll = async () => {
    await fetch(`https://imdb-api.com/en/API/SearchAll/k_zfntaf3f/${searchValue}`)
      .then(response => response.json())
      .then(data => setMovies(data.results))
  }
  const handleChange = (e) => {
    setSearchValue(e.target.value)
    if (e.target.value === "") {
      getMovieList()
    }
  }
  return (
    <>
      {/* <div className='header'>
        <div className='container justify-content-between d-flex mt-4'>
          <a href="/" className='mr-3 title'>MovieApi</a>
          <form className='d-flex gap-3'>
            <input placeholder="search movies" className="search-box py-2 form-control" value={searchValue} onChange={handleChange} />
            <button onClick={searchMovie} className="search-btn btn btn-primary" style={{ border: 'none', color: 'white' }}>Search By Title</button>
            <button onClick={searchAll} className="search-btn btn btn-primary" style={{ border: 'none', color: 'white' }}>Search All</button>
          </form>
        </div>
      </div> */}
      <nav className="navbar header navbar-expand-lg navbar-light" >
        <div className='container'>
          <a href="#" className="navbar-brand title" style={{ color: 'white', fontWeight: 'bold' }}>Movies App</a>
          <form className='d-flex gap-3'>
            <input placeholder="search movies" className="search-box py-2 form-control" value={searchValue} onChange={handleChange} />
            <button onClick={searchMovie} className="search-btn btn btn-primary" style={{ border: 'none', color: 'white' }}>Search By Title</button>
            <button onClick={searchAll} className="search-btn btn btn-primary" style={{ border: 'none', color: 'white' }}>Search All</button>
          </form>
        </div>
      </nav>
      <div className='container movie-app'>

        <div className='row'>

          <MovieList movies={movies} />

        </div>
      </div>
    </>
  );
}

export default App;

import React from 'react';
import Pagination from './Pagination';

const MovieList = ({ movies }) => {
  return (
    <>
      <Pagination data={movies} dataLimit={20} />
    </>
  );
};

export default MovieList;
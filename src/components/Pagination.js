import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoIosSearch } from "react-icons/io";
import classes from "./Pagination.module.css";

export default function Pagination({ data, dataLimit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResult, setSearchResult] = useState("");
  const [pages] = useState(Math.round(data.length / dataLimit));

  const pageLimit = Math.ceil(data.length / dataLimit)

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;

    // if there's a search, then return an array of searched items
    if (searchResult !== "") {
      return data
        .slice(startIndex, endIndex)
        .filter((movie) =>
          movie.name.toLowerCase().includes(searchResult.toLowerCase())
        );
    } else {
      return data.slice(startIndex, endIndex);
    }
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>

      <div className="row">
        {getPaginatedData().map((movie, index) => (
          <div key={index} className='col-md-6 col-lg-3 image-container '>
            <div className='image-card'>
              <img src={movie.image} height="350" width="100%" alt='movie' />
              <h5 className='mt-3 text-center'>{movie.title}</h5>
            </div>
          </div>
        ))}
      </div>
      <div className={classes["pagination"]}>
        {/* previous button */}
        <p
          onClick={goToPreviousPage}
          className={
            classes["prev"] +
            " " +
            (currentPage === 1 ? classes["disabled"] : classes[" "])
          }
        >
          <IoIosArrowBack
            className={
              classes["courses-category-font"] +
              " " +
              (currentPage === 1 ? classes["disabled"] : classes[" "])
            }
          />
        </p>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <p
            key={index}
            onClick={changePage}
            className={
              classes["paginationItem"] +
              " " +
              (currentPage === item ? classes["active"] : classes[" "])
            }
          >
            <span>{item}</span>
          </p>
        ))}

        {/* next button */}
        <p
          onClick={goToNextPage}
          className={
            classes["next"] +
            " " +
            (currentPage === pages + 1 ? classes["disabled"] : classes[" "])
          }
        >
          <IoIosArrowForward
            className={
              classes["courses-category-font"] +
              " " +
              (currentPage === pages + 1 ? classes["disabled"] : classes[" "])
            }
          />
        </p>
      </div>

    </>
  )
}
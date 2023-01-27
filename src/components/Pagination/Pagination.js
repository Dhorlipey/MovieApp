import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import classes from "./Pagination.module.css";

export default function Pagination({ data, dataLimit }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [pages] = useState(Math.ceil(data.length / dataLimit));

  const pageLimit = Math.ceil(data.length / dataLimit)

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
    window.scrollTo(0, 0)
  }

  function goToNextPage() {
    setCurrentPage((page) => page + 1)
    window.scrollTo(0, 0)
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0)
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;


    return data.slice(startIndex, endIndex);

  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>


      {getPaginatedData().map((movie, index) => (
        <div key={index} className='col-md-6 col-lg-3 image-container '>
          <div className='image-card'>
            <span className=" lazy-load-image-background blur lazy-load-image-loaded">
              <img src={movie.image !== '' ? movie.image : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'} height="350" width="100%" alt='movie' />
            </span>
            <h3 className='mt-3 text-center text-white'>{movie.title}</h3>
          </div>
        </div>
      ))}

      {data.length > 20 ?
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
                classes["icon"] +
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
              (currentPage === pages ? classes["disabled"] : classes[" "])
            }
          >
            <IoIosArrowForward
              className={
                classes["icon"] +
                " " +
                (currentPage === pages ? classes["disabled"] : classes[" "])
              }
            />
          </p>
        </div> : ""}

    </>
  )
}
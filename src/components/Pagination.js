import React from "react";
import ReactPaginate from "react-paginate";

function Pagination(props) {
  const { totalResults, handlePageClick, forcePage } = props;

  return (
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={totalResults / 10}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"activePage"}
      forcePage={forcePage}
    />
  );
}

export default Pagination;

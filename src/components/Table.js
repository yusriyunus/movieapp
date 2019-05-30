import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

class Table extends React.Component {
  renderListMovie = movies => {
    return movies.map(movie => (
      <tr key={movie.imdbID}>
        <td>{movie.imdbID}</td>
        <td>
          <strong>{movie.Title}</strong>
        </td>
        <td>{movie.Type}</td>
        <td>{movie.Year}</td>
        <td>
          <Popup
            trigger={
              <img
                src={movie.Poster}
                alt="Poster"
                style={{ height: "50px", cursor: "pointer" }}
              />
            }
            modal
            closeOnDocumentClick
          >
            <img src={movie.Poster} alt="Poster" />
          </Popup>
        </td>
        <td>
          <Link to={`/detail/${movie.imdbID}`} className="text-primary">
            Detail
          </Link>
        </td>
      </tr>
    ));
  };

  renderDetailMovie = movie => {
    return Object.keys(movie).map(function(key, index) {
      if (key !== "Ratings" && key !== "Poster" && key !== "Response") {
        return (
          <tr key={index}>
            <td>{key}</td>
            <td>{movie[key]}</td>
          </tr>
        );
      }
      return null;
    });
  };

  render() {
    const { tableHead, content, type } = this.props;
    return (
      <MDBTable className={type === "detailMovie" && "detailMovieTable"}>
        <MDBTableHead color="primary-color" textWhite>
          <tr>
            {tableHead.map((list, index) => (
              <th key={index}>{list}</th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {type === "listMovie"
            ? this.renderListMovie(content)
            : this.renderDetailMovie(content)}
        </MDBTableBody>
      </MDBTable>
    );
  }
}

export default Table;

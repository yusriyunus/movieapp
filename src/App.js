import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import _ from "underscore";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Popup from "reactjs-popup";
import asd from "../node_modules/mdbreact";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: {} };
  }

  async componentDidMount() {
    const { imdbID } = this.props.match.params;
    const movies = await axios.get(
      `http://www.omdbapi.com?apikey=b6814fee&i=${imdbID}`
    );
    movies && this.setState({ movies: movies.data });
  }

  render() {
    const { movies } = this.state;
    const {
      Actors,
      Awards,
      BoxOffice,
      Country,
      DVD,
      Director,
      Genre,
      Language,
      Metascore,
      Plot,
      Poster,
      Production,
      Rated,
      Ratings,
      Released,
      Title,
      Type,
      Website,
      Writer,
      Year,
      imdbRating,
      imdbVotes
    } = movies;
    console.log(movies);
    return (
      <div>
        <p>{Actors}</p>
        <p>{Awards}</p>
        <p>{BoxOffice}</p>
        <p>{Country}</p>
        <p>{DVD}</p>
        <p>{Director}</p>
        <p>{Genre}</p>
        <p>{Language}</p>
        <p>{Plot}</p>
        <img src={Poster} alt="Poster" />
        <p>{Production}</p>
        <p>{Released}</p>
        <p>{Title}</p>
        <p>{Type}</p>
        <p>{Website}</p>
        <p>{Writer}</p>
        <p>{Year}</p>
        <p>{imdbRating}</p>
        <p>{imdbVotes}</p>
      </div>
    );
  }
}

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.saveTitle = _.throttle(this.saveTitle.bind(this), 1000);
    this.state = { movies: {}, allMovies: [], totalResults: 1 };
  }

  componentDidMount() {
    this.saveTitle();
  }

  saveTitle() {
    let val = this.inputTitle.value;
    let allMovies = [];
    axios
      .get(`http://www.omdbapi.com?apikey=b6814fee&s=${val}`)
      .then(movies => {
        this.setState({
          movies: movies.data,
          allMovies,
          totalResults: movies.data.totalResults
        });
      });
  }

  posterOnClick = () => {
    // alert("test");
    Popup.alert("test", "ok");
  };

  handlePageClick = async e => {
    let val = this.inputTitle.value;
    const movies = await axios.get(
      `http://www.omdbapi.com?apikey=b6814fee&s=${val}&page=${e.selected + 1}`
    );
    movies && this.setState({ movies: movies.data });
  };
  render() {
    const { movies, allMovies, totalResults } = this.state;
    console.log(movies);
    return (
      <div className="App" style={{ padding: "100px 20vw" }}>
        <div className="form-group">
          <label htmlFor="exampleInput">
            <h2>Type your fav film here!</h2>
          </label>
          <input
            id="exampleInput"
            className="form-control text-center"
            ref={el => (this.inputTitle = el)}
            type="text"
            defaultValue="Batman"
            onChange={this.saveTitle}
          />
        </div>
        {movies.Search ? (
          <MDBTable>
            <MDBTableHead color="primary-color" textWhite>
              <tr>
                <th>imdbID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Year</th>
                <th>Poster</th>
                <th />
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {movies.Search.map(movie => (
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
                      <img src={movie.Poster} />
                    </Popup>
                  </td>
                  <td>
                    <Link
                      to={`/detail/${movie.imdbID}`}
                      className="text-primary"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        ) : movies.Error && movies.Error !== "Something went wrong." ? (
          <p>{movies.Error}</p>
        ) : (
          <p>Find your fav film here!</p>
        )}
        <hr />
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalResults / 10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"activePage"}
        />
      </div>
    );
  }
}
class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ textAlign: "center" }}>
        <Router>
          <Route exact path="/" component={Landing} />
          <Route path="/detail/:imdbID" component={Detail} />
        </Router>
      </div>
    );
  }
}

export default App;

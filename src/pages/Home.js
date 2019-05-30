import React from "react";
import _ from "underscore";
import axios from "axios";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.saveTitle = _.throttle(this.saveTitle.bind(this), 1000);
    this.state = { movies: {}, totalResults: 1 };
  }

  componentDidMount() {
    this.saveTitle();
  }

  // using debounce concept
  async saveTitle() {
    let val = this.inputTitle.value;
    const movies = await axios.get(
      `http://www.omdbapi.com?apikey=b6814fee&s=${val}`
    );

    movies &&
      this.setState({
        movies: movies.data,
        totalResults: movies.data.totalResults
      });
  }

  handlePageClick = async e => {
    let val = this.inputTitle.value;
    const movies = await axios.get(
      `http://www.omdbapi.com?apikey=b6814fee&s=${val}&page=${e.selected + 1}`
    );
    movies && this.setState({ movies: movies.data });
  };

  render() {
    const { movies, totalResults } = this.state;
    return (
      <div className="pageWrapper">
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
          <Table
            content={movies.Search}
            tableHead={["imdbID", "Title", "Type", "Year", "Poster", ""]}
            type="listMovie"
          />
        ) : movies.Error && movies.Error !== "Something went wrong." ? (
          <p>{movies.Error}</p>
        ) : (
          <p>Find your fav film here!</p>
        )}
        <hr />
        <Pagination
          totalResults={totalResults}
          handlePageClick={this.handlePageClick}
        />
      </div>
    );
  }
}

export default Home;

import React from "react";
import _ from "underscore";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import { getMovieList } from "../redux/action";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

const cookies = new Cookies();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.saveTitle = _.throttle(this.saveTitle.bind(this), 1000);
    this.state = { movies: {}, totalResults: 0, forcePage: 0 };
  }

  async componentDidMount() {
    this.saveTitle();
    const [title, page] = await Promise.all([
      cookies.get("title"),
      cookies.get("page")
    ]);
    title && this.props.getMovieList(title, page);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { globalState } = nextProps;
    if (globalState !== prevState) {
      return globalState;
    } else return null;
  }

  // using debounce concept
  async saveTitle() {
    let val = this.inputTitle.value;
    this.props.getMovieList(val);
  }

  handlePageClick = async e => {
    let val = this.inputTitle.value;
    this.props.getMovieList(val, e.selected + 1);
  };

  render() {
    const { movies, totalResults, forcePage } = this.state;
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
          forcePage={forcePage}
        />
      </div>
    );
  }
}

const mapStateToProps = globalState => {
  return {
    globalState
  };
};

export default connect(
  mapStateToProps,
  { getMovieList }
)(Home);

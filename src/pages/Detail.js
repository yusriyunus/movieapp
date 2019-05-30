import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import Spinner from "../asset/Spinner.gif";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: {}, loading: true };
  }

  async componentDidMount() {
    const { imdbID } = this.props.match.params;
    const movies = await axios.get(
      `http://www.omdbapi.com?apikey=b6814fee&i=${imdbID}`
    );
    movies && this.setState({ movies: movies.data, loading: false });
  }

  render() {
    const { movies, loading } = this.state;
    if (!loading) {
      return (
        <div className="pageWrapper">
          <h3>
            <Link to="/">HOME</Link>
          </h3>
          <div className="detailPage">
            <div>
              <img src={movies.Poster} alt="Poster" />
            </div>
            <Table
              tableHead={["Info", "Description"]}
              content={movies}
              type="detailMovie"
            />
          </div>
        </div>
      );
    }
    return <img src={Spinner} alt="Spinner" />;
  }
}

export default Detail;

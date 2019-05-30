import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovieDetail } from "../redux/action";
import Table from "../components/Table";
import Spinner from "../asset/Spinner.gif";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movieDetail: {}, loading: true };
  }

  componentDidMount() {
    const { imdbID } = this.props.match.params;
    this.props.getMovieDetail(imdbID);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { globalState } = nextProps;
    if (globalState !== prevState) {
      return globalState;
    } else return null;
  }

  render() {
    const { movieDetail, loading } = this.state;
    if (!loading && movieDetail.imdbID) {
      return (
        <div className="pageWrapper">
          <h3>
            <Link to="/">HOME</Link>
          </h3>
          <div className="detailPage">
            <div>
              <img src={movieDetail.Poster} alt="Poster" />
            </div>
            <Table
              tableHead={["Info", "Description"]}
              content={movieDetail}
              type="detailMovie"
            />
          </div>
        </div>
      );
    }
    return <img src={Spinner} alt="Spinner" />;
  }
}
const mapStateToProps = globalState => {
  return {
    globalState
  };
};

export default connect(
  mapStateToProps,
  { getMovieDetail }
)(Detail);

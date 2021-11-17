import { Col } from "react-bootstrap";
const SingleMovie = () => {
  return (
    <Col className="mb-2" key={this.props.data.imdbID}>
      <img
        className="img-fluid"
        src={this.props.data.Poster}
        alt="movie"
        onClick={() => {
          this.props.changeSelectedMovie(this.props.data.imdbID);
        }}
      />
    </Col>
  );
};

export default SingleMovie;

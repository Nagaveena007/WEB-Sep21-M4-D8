import { Component } from "react";
import { useState, useEffect } from "react";

import { Row, Spinner } from "react-bootstrap";
import SingleMovie from "./SingleMovie";
//OMDB_URL = "http://www.omdbapi.com/?apikey=24ad60e9";

const MovieList = ({ searchString }) => {
  const [searchResults, setSearchResult] = useState([]);
  const [error, setError] = useState(false);

  /*   componentDidUpdate = async (prevProps) => {
    if (prevProps.searchString !== this.props.searchString) {
      if (this.props.searchString === "") {
        this.setState({ error: false, searchResults: [] });
      } else {
        this.fetchSearchResult();
      }
    }
  }; */
  useEffect(() => {
    if (searchString === "") {
      setError(false);
      setSearchResult([]);
    } else {
      fetchSearchResult();
    }
  }, [searchString]);

  /*   componentDidMount = async () => {
    if (this.props.searchString) {
      this.fetchSearchResult();
    }
  }; */
  useEffect(() => {
    fetchSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSearchResult = async () => {
    try {
      const response = await fetch(
        "http://www.omdbapi.com/?apikey=24ad60e9" + "&s=" + searchString
      );
      if (response.ok) {
        const data = await response.json();
        if (data.Response === "True") {
          setSearchResult(data.Search);
          setError(false);
        } else {
          setError(true);
        }
      } else {
        setError(true);
        console.log("an error occurred");
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <h4>{this.props.title}</h4>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 text-center">
        {this.props.loading
          ? [...Array(6).keys()].map((movie) => (
              <div className="spinner-container" key={movie}>
                <Spinner animation="border" variant="light" />
              </div>
            ))
          : this.props.movies &&
            this.props.movies.map((movie) => (
              <SingleMovie
                data={movie}
                key={movie.imdbID}
                changeSelectedMovie={(movieId) =>
                  this.props.changeSelectedMovie(movieId)
                }
              />
            ))}
        {this.state.searchResults.map((movie) => (
          <SingleMovie
            data={movie}
            key={movie.imdbID}
            changeSelectedMovie={(movieId) =>
              this.props.changeSelectedMovie(movieId)
            }
          />
        ))}
      </Row>
    </>
  );
};
export default MovieList;

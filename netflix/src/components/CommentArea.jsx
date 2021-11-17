import { useState, useEffect } from "react";
import CommentsList from "./CommentsList";
import { Form, InputGroup, FormControl, Button, Alert } from "react-bootstrap";

const CommentArea = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [newComment, setNewComment] = useState({
    comment: "",
    rate: "3",
    elementId: movieId,
  });
  useEffect(() => {
    fetchComments();
    submitComment();
    setNewComment((c) => ({
      ...c,
      elementId: movieId,
    }));
  }, [movieId]);

  const fetchComments = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + movieId,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTUwNmRlY2RhMzE2MzAwMTVkNTEyM2YiLCJpYXQiOjE2MzI2NjA5NzIsImV4cCI6MTYzMzg3MDU3Mn0.vzSXzuRnbhUs7NjBPeeIiCBg6REuTwnoXE-R7Y-zU9Y",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        setComments(comments);
        setError(false);
      } else {
        console.log("error");
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const submitComment = async (e) => {
    // e.preventDefault();
    const COMMENTS_URL = "https://striveschool-api.herokuapp.com/api/comments/";
    try {
      const response = await fetch(COMMENTS_URL, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyODk0ZGFhY2FhMjAwMTU1MmExNjMiLCJpYXQiOjE2MzY2NDAwMzUsImV4cCI6MTYzNzg0OTYzNX0.VG86lV20CDVqvjC9I1KfBdP08Y5tWlGW5utDd-dm5cU",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Comment added");
        setNewComment({
          comment: "",
          rate: 0,
          elementId: movieId,
        });
      } else {
        alert("An error has occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRadioChange = (rating) => {
    let newComment = setNewComment;
    newComment.rate = rating;
    setNewComment({ newComment });
  };

  const handleCommentText = (e) => {
    let newComment = setNewComment;
    newComment.comment = e.currentTarget.value;
    setNewComment({ newComment });
  };

  return (
    <div className="my-3">
      {setError && (
        <Alert variant="danger" className="text-center">
          Error fetching comments
        </Alert>
      )}
      {comments.length > 0 && comments[0].elementId === movieId && (
        <CommentsList comments={comments} />
      )}
      <div className="text-center">
        <h5 className="my-3">Add a comment</h5>
        <Form onSubmit={submitComment}>
          <div className="my-3 text-center">
            <Form.Check
              inline
              label="1"
              value="1"
              type="radio"
              name="rating"
              defaultChecked={newComment.rate === "1"}
              onClick={() => handleRadioChange("1")}
            />
            <Form.Check
              inline
              label="2"
              value="2"
              type="radio"
              name="rating"
              defaultChecked={newComment.rate === "2"}
              onClick={() => handleRadioChange("2")}
            />
            <Form.Check
              inline
              label="3"
              value="3"
              type="radio"
              name="rating"
              defaultChecked={newComment.rate === "3"}
              onClick={() => handleRadioChange("3")}
            />
            <Form.Check
              inline
              label="4"
              value="4"
              type="radio"
              name="rating"
              defaultChecked={newComment.rate === "4"}
              onClick={() => handleRadioChange("4")}
            />
            <Form.Check
              inline
              label="5"
              value="5"
              type="radio"
              name="rating"
              defaultChecked={newComment.rate === "5"}
              onClick={() => handleRadioChange("5")}
            />
          </div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Write your comment"
              aria-label="comment"
              aria-describedby="basic-addon1"
              onChange={handleCommentText}
              value={newComment.comment}
              required
            />
          </InputGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default CommentArea;

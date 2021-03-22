import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import UpdateComment from "./UpdateComment";
import { useHistory } from "react-router-dom";
import { Container, List, Button, Header } from "semantic-ui-react";

export default function MyComments() {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const [userComments, setUserComments] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/users/comments/${user._id}`)
      .then((res) => {
        setUserComments(res.data.comments);
        console.log("comments", res.data);
      })
      .catch((err) => console.log(err));
  }, [update, user._id]);
  return (
    <Fragment>
      {userComments && (
        <Container>
          <Header
            textAlign="center"
            style={{ margin: "2rem", fontSize: "2rem" }}
          >
            Resources I commented on
          </Header>
          You can edit your comments on the resource page
          {userComments.map((comment) => {
            return (
              <List divided relaxed>
                <List.Item
                  style={{
                    marginTop: "0.5em",
                    padding: "1em",
                    borderBottom: "solid 2px var(--violett-dark)",
                  }}
                >
                  <List.Icon
                    name="checkmark"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header as="a">{comment.resource.title}</List.Header>
                    <List.Description as="a">
                      <Button
                        onClick={() => {
                          history.push(
                            `resources/resource/${comment.resource._id}`
                          );
                        }}
                      >
                        see{" "}
                      </Button>
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            );
          })}
        </Container>
      )}
    </Fragment>
  );
}

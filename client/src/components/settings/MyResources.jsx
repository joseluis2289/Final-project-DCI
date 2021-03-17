import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, List, Button, Header } from "semantic-ui-react";

export default function MyResources() {
  const user = useSelector((state) => state.user);
  const update = useSelector((state) => state.update);
  const [userResources, setUserResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`/users/resources/${user._id}`)
      .then((res) => {
        setUserResources(res.data.resources);
        console.log(res.data.resources);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [update, user._id]);

  return (
    <Container>
      {!loading && userResources && (
        <div>
          <Header
            textAlign="center"
            style={{ margin: "2rem", fontSize: "2rem" }}
          >
            Resources I added
          </Header>
          {userResources.map((resource) => {
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
                    <List.Header as="a">{resource.title}</List.Header>
                    <List.Description as="a">
                      <Button
                        onClick={() => {
                          history.push(`resources/resource/${resource._id}`);
                        }}
                      >
                        see{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          history.push(`/update_resource/${resource._id}`);
                        }}
                      >
                        edit
                      </Button>
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            );
          })}
        </div>
      )}
    </Container>
  );
}

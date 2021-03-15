import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Header,
  Card,
  Feed,
  Button,
  Icon,
} from "semantic-ui-react";
import { getDashboardData } from "../redux/actions";
import "./Home.css";

const Home = ({ getDashboardData, dashboard }) => {
  const [firstDashboardLoad, setFirstDashboardLoad] = useState(true);

  useEffect(() => {
    if (firstDashboardLoad) {
      getDashboardData();
      setFirstDashboardLoad(false);
      console.log("Dashboard Data:", dashboard);
    }
  }, [firstDashboardLoad, dashboard]);

  return (
    <Container fluid className="dashboard-container">
      <Grid columns={3} padded className="dashboard-grid">
        <Grid.Row>
          <Grid.Column width={4} className="dashboard-sidebar sidebar-left">
            <Card centered>
              <Card.Content>
                <Card.Header>Recently added resources</Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Label image="./images/molly.png" />
                    <Feed.Content>
                      <Feed.Date content="1 hour ago" />
                      <Feed.Summary>
                        Bel added <em>Semantic UI React 2.0.3</em> to the{" "}
                        <em>Frontend</em> category.
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>

                  <Feed.Event>
                    <Feed.Label image="./images/matthew.png" />
                    <Feed.Content>
                      <Feed.Date content="3 hours ago" />
                      <Feed.Summary>
                        José Luis added <em>Express/Node introduction</em> to
                        the <em>Backend</em> category.
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>

                  <Feed.Event>
                    <Feed.Label image="./images/elliot.jpg" />
                    <Feed.Content>
                      <Feed.Date content="2 days ago" />
                      <Feed.Summary>
                        Christian added <em>Figma in 40 Minutes</em> to the{" "}
                        <em>General</em> category.
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
            <Card centered>
              <Card.Content>
                <Card.Header>Recent Activity</Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Label image="./images/matthew.png" />
                    <Feed.Content>
                      <Feed.Date content="1 minute ago" />
                      <Feed.Summary>
                        José Luis added a comment to the{" "}
                        <em>Express/Node introduction</em> resource.
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>

                  <Feed.Event>
                    <Feed.Label image="./images/molly.png" />
                    <Feed.Content>
                      <Feed.Date content="4 hours ago" />
                      <Feed.Summary>
                        Bel approved <em>Alice</em> as moderator.
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={8} className="dashboard-content">
            <Grid columns={2} doubling padded>
              {/* <Grid.Row>
                <Grid.Column width={16}>
                  <Header as="h2">Categories</Header>
                </Grid.Column>
              </Grid.Row> */}
              <Grid.Row>
                <Grid.Column width={16} className="dashboard-frontend">
                  <Header as="h3">Frontend</Header>
                  <Container>
                    <p>{dashboard.length} resources</p>
                    <Button>
                      <Icon name="arrow right" />
                    </Button>
                    <img
                      src="./illustrations/frontend2.svg"
                      alt="Frontend Illustration"
                      className="illustration"
                    />
                  </Container>
                </Grid.Column>
                <Grid.Column width={8} className="dashboard-backend">
                  <Header as="h3">Backend</Header>
                  <Container>
                    <p>12 resources</p>
                    <Button>
                      <Icon name="arrow right" />
                    </Button>
                    <img
                      src="./illustrations/backend.svg"
                      alt="Backend Illustration"
                      className="illustration"
                    />
                  </Container>
                </Grid.Column>
                <Grid.Column width={8} className="dashboard-database">
                  <Header as="h3">Database</Header>
                  <Container>
                    <p>8 resources</p>
                    <img
                      src="./illustrations/database.svg"
                      alt="Database Illustration"
                      className="illustration"
                    />
                    <Button>
                      <Icon name="arrow right" />
                    </Button>
                  </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={4} className="dashboard-sidebar sidebar-right">
            <Header as="h3">User with most resources</Header>
            <Container>
              <p>Bel (21)</p>
            </Container>
            <Header as="h3">User with most comments</Header>
            <Container>
              <p>Jóse Luis (5)</p>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
Home.propTypes = {
  getDashboardData: PropTypes.func.isRequired,
  dashboard: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});
export default connect(mapStateToProps, { getDashboardData })(Home);

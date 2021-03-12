import React from "react";
import { Image, Grid, Header, Divider, Message, Icon } from "semantic-ui-react";
import "./About.css";

function About() {
  return (
    <div>
      <div>
        <Image style={{ height: "50vh" }} src="/images/banner.png" fluid />
      </div>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Image
              style={{
                height: "50vh",
                margin: "auto",
                marginTop: "30px",
                borderRadius: "5px",
              }}
              src="/images/graduation.svg"
            />
          </Grid.Column>
          <Grid.Column
            width={5}
            style={{ marginTop: "40px", color: "whitesmoke" }}
          >
            <Header style={{ textAlign: "center", color: "white" }}>
              About
            </Header>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore,
            maxime eveniet sed omnis nobis sequi error nulla reprehenderit odio
            libero! Officiis repellendus cum debitis soluta, eum distinctio sunt
            dignissimos libero? Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Provident laboriosam, natus, quisquam atque totam,
            maxime sit error consectetur maiores nobis ipsum. Doloremque hic
            veniam quis cum sequi dolorum quo magnam. dignissimos libero? Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. Provident
            laboriosam, natus, quisquam atque totam, maxime sit error
            consectetur maiores nobis ipsum. Doloremque hic veniam quis cum
            sequi dolorum quo magnam.
            <Divider style={{ color: "white" }} horizontal>
              Technologies
            </Divider>
            <Grid>
              <Grid.Row
                style={{
                  margin: "20px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Image
                  style={{ width: "40px", height: "15vh" }}
                  src="/images/mongodb.png"
                />
                <Image style={{ width: "90px" }} src="/images/express.png" />
                <Image style={{ width: "85px" }} src="/images/react.png" />

                <Image style={{ width: "75px" }} src="/images/node-js.png" />
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={1} doubling padded>
        <Grid.Row>
          <Header
            size="large"
            style={{ color: "white", width: "270px", marginTop: "29px" }}
            as="h2"
            icon
            textAlign="center"
          >
            <Icon name="users" circular />
            <Header.Content>Our mission</Header.Content>
            <Header.Subheader style={{ color: " #f5f5f5" }}>
              Gather DCI topics which are essential for student development and
              effective studying
            </Header.Subheader>
          </Header>
          <Header
            size="large"
            style={{ color: "white", width: "270px" }}
            as="h2"
            icon
            textAlign="center"
          >
            <Icon name="hand peace outline" circular />
            <Header.Content>Our vibe</Header.Content>
            <Header.Subheader style={{ color: " #f5f5f5" }}>
              We planned it, we dreamt it, and then we did it together every day
              reinventing what's possible
            </Header.Subheader>
          </Header>
          <Header
            size="large"
            style={{ color: "white", width: "270px" }}
            as="h2"
            icon
            textAlign="center"
          >
            <Icon name="student" circular />
            <Header.Content>Our values</Header.Content>
            <Header.Subheader style={{ color: " #f5f5f5" }}>
              Sharing knowledge, learning new topics, building trust with
              constant improvement and last but not least making coding FUN!
            </Header.Subheader>
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Image style={{ width: "300px" }} src="/images/team.png" />
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default About;

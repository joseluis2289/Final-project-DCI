import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import CreateComment from "./CreateComment.jsx";
import DisplayComments from "./DisplayComments";
import Options from "./Options";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Image,
  Grid,
  GridRow,
  GridColumn,
  CardMeta,
  Item,
  CardDescription,
  Label,
  Header,
} from "semantic-ui-react";

// Gets reference ID as props.data.id
const Resource = (props) => {
  // If the preview image url in the database, or possibly coming from
  // an external API doesnt work, use a generic illustration instead.
  const update = useSelector((state) => state.update);
  const [makeCom, setMakeComm] = useState(false);
  const [displayCom, setDisplayComm] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "illustrations/road_to_knowledge.svg"
  );
  //create function to allow the child component "CreateComment" to change "displayCom" state
  function showMakeComm(newValue) {
    setMakeComm(newValue);
  }
  function showComm(newValue) {
    setDisplayComm(newValue);
  }

  useEffect(() => {
    props.data.previewImage && setPreviewUrl(props.data.previewImage);
  }, [props.data.previewImage, update]);

  return (
    <Card.Group
      style={{ width: "600px", marginTop: "20px" }}
      className="ui container"
    >
      <Card
        style={{
          width: "620px",
          backgroundColor: "#706FCD",
          height: "130vh",
        }}
      >
        <CardContent>
          <CardHeader style={{ color: "white", padding: "10px" }}>
            Resources{" "}
          </CardHeader>
        </CardContent>
        <Card
          style={{
            display: "flex",
            align: "center",
            width: "500px",
            margin: "auto",
            height: "115vh",
            top: "-30px",
          }}
        >
          <CardContent style={{ marginTop: "0" }}>
            <Grid>
              <GridRow>
                <CardHeader
                  style={{
                    margin: "20px",
                    margin: "auto",
                    fontWeight: "bolder",
                    fontSize: "15px",
                  }}
                >
                  {props.data.title}
                </CardHeader>
                <Item
                  style={{ margin: "10px", fontSize: "20px", padding: "10px" }}
                  floated="right"
                  size="mini"
                >
                  <Options resource={props.data} />
                </Item>
              </GridRow>
            </Grid>
            <Rating
              style={{ marginRight: "40px" }}
              rating={props.data.rating}
              num_ratings={props.data.num_ratings}
              resourceId={props.data._id}
              size="large"
              icon="star"
              defaultRating={5}
              maxRating={5}
            />
            <Grid>
              <GridRow
                style={{
                  padding: "25px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CardMeta>
                  {" "}
                  {props.data.category.map((item, index) => {
                    let name = item[0].toUpperCase() + item.substring(1);
                    return <span key={index}>{name}</span>;
                  })}
                </CardMeta>
                <Item floated="right" size="mini">
                  {props.data.paid ? "paid" : "free"}
                </Item>
              </GridRow>
            </Grid>

            <GridColumn>
              <Image
                src={previewUrl}
                alt="Illustration for Online Learning"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "200px",
                  width: "400px",
                  borderRadius: "20px",
                  margin: "auto",
                  padding: "10px",
                }}
                size="medium"
              />
              <Grid>
                <GridRow
                  style={{
                    padding: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMeta> {props.data.num_views} Views</CardMeta>
                </GridRow>
                <CardDescription style={{ margin: "10px" }}>
                  <Header></Header>
                  {props.data.description}
                  <DisplayComments
                    comments={props.data.comments}
                    displayCom={displayCom}
                    showComm={showComm}
                  />
                  <CreateComment
                    resourceId={props.data._id}
                    makeCom={makeCom}
                    showComm={showComm}
                    showMakeComm={showMakeComm}
                  />
                </CardDescription>
              </Grid>
            </GridColumn>
          </CardContent>
        </Card>
      </Card>
    </Card.Group>
  );
};

export default Resource;

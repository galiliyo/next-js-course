import MyApp from "../_app";
import MeetupItem from "../../components/meetups/MeetupItem";
import classes from "./MeetupDetails.module.css";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://galiliyo:tG4v2Mp5GNvdVh6Y@cluster0.xfcwrqm.mongodb.net/admin?retryWrites=true&w=majority";

const MeetupDetails = (props) => {
  const { MeetupDetails } = props;
  console.log(" props : ", props);
  console.log("MeetupDetails  : ", MeetupDetails);

  return (
    <div className={classes.container}>
      <img src={props.image} alt="" />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </div>
  );
};

export default MeetupDetails;

export async function getStaticPaths(filter, options) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  let meetups = [];
  try {
    await client.connect();
    const mongoRes = await client
      .db("Cluster0")
      .collection("meetups")
      .find({}, { _id: 1 })
      .toArray();
  } finally {
    client.close();
  }
  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { "meetup-id": meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(ctx) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  let meetups = [];
  try {
    await client.connect();
    const mongoRes = await client
      .db("Cluster0")
      .collection("meetups")
      .findOne({ _id: new ObjectId(ctx.params["meetup-id"]) });

    const selectedPost = { ...mongoRes, _id: mongoRes._id.toString() };
    return { props: selectedPost };
  } catch (err) {
    console.log("mongo err", err);
  } finally {
    client.close();
  }
}

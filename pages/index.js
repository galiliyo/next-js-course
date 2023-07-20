import MeetupList from "../components/meetups/MeetupList";
import { useState } from "react";
import { MongoClient, ServerApiVersion } from "mongodb";

const DUMMY_MEETUPS = [
  {
    id: 1,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/60/Budapest_Hungarian_Parliament_%2831363963556%29.jpg",
    title: "First Meetup",
    address: "48764 Howard Forge Apt. 421 Vanessaside, VT 79393",
    description:
      "Discovering Intimacy: A Professional Meetup on Sex & Relationships. Join experts for insightful discussions on communication, consent, and promoting sexual health. A safe, respectful space for learning and networking.",
  },
  {
    id: 2,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Nuremberg_chronicles_-_BVJA.png",
    title: "Second Meetup",
    address: "48764 Howard Forge Apt. 421 Vanessaside, VT 79393",
    description:
      "Discovering Intimacy: A Professional Meetup on Sex & Relationships. Join experts for insightful discussions on communication, consent, and promoting sexual health. A safe, respectful space for learning and networking.",
  },
  {
    id: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f1/HUN-2015-Budapest-Hungarian_Parliament_%28Budapest%29_2015-01_crop.jpg",
    title: "Third Meetup",
    address: "48764 Howard Forge Apt. 421 Vanessaside, VT 79393",
    description:
      "Discovering Intimacy: A Professional Meetup on Sex & Relationships. Join experts for insightful discussions on communication, consent, and promoting sexual health. A safe, respectful space for learning and networking.",
  },
  {
    id: 4,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Budav%C3%A1ri_Palota%2C_ABCDEF_%C3%A9p%C3%BClet.jpg",
    title: "forth Meetup",
    address: "48764 Howard Forge Apt. 421 Vanessaside, VT 79393",
    description:
      "Discovering Intimacy: A Professional Meetup on Sex & Relationships. Join experts for insightful discussions on communication, consent, and promoting sexual health. A safe, respectful space for learning and networking.",
  },
];
const uri =
  "mongodb+srv://galiliyo:tG4v2Mp5GNvdVh6Y@cluster0.xfcwrqm.mongodb.net/admin?retryWrites=true&w=majority";

function HomePage(props) {
  console.log("props", props);

  return <MeetupList meetups={props.meetups} />;
}
export async function getStaticProps() {
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
      .find()
      .toArray();
    meetups = mongoRes.map((entry) => {
      return { ...entry, _id: entry._id.toString() };
    });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }

  return {
    props: {
      meetups,
    },
    revalidate: 1,
  };
}

export default HomePage;

import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://galiliyo:tG4v2Mp5GNvdVh6Y@cluster0.xfcwrqm.mongodb.net/admin?retryWrites=true&w=majority";

export default async function handler(req, res) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      // await client.db("admin").command({ ping: 1 });
      const mongoRes = await client
        .db("Cluster0")
        .collection("meetups")
        .insertOne(req.body);
      res.status(201).json("Inserted to mongo");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
}

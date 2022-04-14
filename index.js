const express = require('express')
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const username = process.env.DB_USER;
const password = process.env.DB_PASS;

const uri = `mongodb+srv://${username}:${password}@cluster0.ybfwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const database = client.db("autonomous");
    const productsCollection = database.collection("products");
    // const ordersCollection = database.collection("orders");
    // const usersCollection = database.collection("users");
    // const reviewsCollection = database.collection("reviews");

    // get all products
    app.get('/products', async (req, res) => {
      const cursor = productsCollection.find({});
      const result = await cursor.toArray();
      res.send(result)
    })

    // // get single product by id
    // app.get('/products/:id', async (req, res) => {
    //   const productId = req.params.id;
    //   const query = { _id: ObjectId(productId) };
    //   const result = await productsCollection.findOne(query);
    //   res.send(result)
    // })

  }
  finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log("listening from", port)
})
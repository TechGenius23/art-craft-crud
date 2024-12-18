const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors({origin:["https://art-craft-crud.vercel.app/","https://art-craft-crud.web.app","https://art-craft-crud.firebaseapp.com"]}));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.e9oaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        

        const userCollection=client.db('userDB').collection('user')

        app.get('/user',async(req,res)=>{
            const curser=userCollection.find();
            const result=await curser.toArray()
            res.send(result)
        })
        // data post
        app.post("/user",async(req,res)=>{
            const USER=req.body;
            // console.log(USER);
            const result=await userCollection.insertOne(USER)
            res.send(result)
        })


        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('server is running')
});

app.listen(port, () => {
    // console.log(`server is${port}`);
})
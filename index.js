const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// port
const port = process.env.PORT || 5000;
// middle wares
app.use(cors());
app.use(express.json());

//

const uri = `mongodb+srv://${process.env.CAR_DOCTOR_USER}:${process.env.CAR_DOCTOR_PASS}@cluster0.4ilyo9k.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const serviceCollection = client.db('car-doctor').collection('services');


    } catch (error) {

    }

}
run().catch(console.dir);

app.listen(port, () => {
    console.log('listening')
})



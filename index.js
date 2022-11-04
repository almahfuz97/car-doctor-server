const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const orderCollection = client.db('car-doctor').collection('orders');

        app.get('/', async (req, res) => {
            const cursor = serviceCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.findOne(query);
            console.log(result)
            res.send(result);
        })

        // orders
        app.get('/orders', async (req, res) => {
            const queryEmail = req.query.email;

            const query = {
                email: queryEmail
            }
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })
        // delete
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: ObjectId(id)
            }
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        })
    } catch (error) {

    }

}
run().catch(console.dir);

app.listen(port, () => {
    console.log('listening')
})



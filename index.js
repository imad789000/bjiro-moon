
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // ← allows cross-origin requests
app.use(express.json()); // for JSON body parsing

const PORT = 3000;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
client.connect()
let db = client.db("bjiromoon")

let calenderData = db.collection("calendarData")



app.post("/send", async (req, res) =>
{

  res.send("")
  let objectInDb = await calenderData.find({date: req.body.date}).toArray()
  

  if (objectInDb[0] == undefined && req.body.status == "Available")
  {

      calenderData.insertOne(req.body)
      
  }

  else if (req.body.status == "Unavailable")
  {

    console.log("delete")

      calenderData.deleteOne({date: req.body.date})

  }


})

app.get("/request", async (req, res) => {

  let data = await calenderData.find({}).toArray()

  res.json(data)

})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
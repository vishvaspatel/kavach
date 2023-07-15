const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

const mongoUrl =
  "mongodb+srv://neel1073:Neel%4010731@cluster0.zlpn6kf.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

const smsSchema = new mongoose.Schema({
  from: String,
  date: String,
  message: String,
  time: String,
});

const SmsModel = mongoose.model("Sms", smsSchema);

app.get("/",function(req,res)
{
  return res.json({"ok" : "ok ok"});
})

app.post("/api/sms", async (req, res) => {
  const smsData = req.body;

  SmsModel.insertMany(smsData).then(()=>{
    console.log(smsData);
    return res.json("ok");
  });
  
  // Process the SMS data here
  // console.log("Received SMS data:", smsData);

    // Create a new SMS document using the Mongoose model
  // const sms = new SmsModel(smsData);
  // console.log(sms);
  // // Save the SMS document to the database
  // sms.save().then(() => {
  //     console.log("Saved SMS to database:", sms);
  //     const response = {
  //       success: true,
  //       message: "SMS data received and saved successfully",
  //     };
  //     res.json(response);
  //   })
  //   .catch((error) => {
  //     console.error("Error saving SMS:", error);
  //     const response = {
  //       success: false,
  //       message: "Failed to save SMS data",
  //     };
  //     res.json(response);
  //   });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Hey Neel, your server is running on port ${port}`);
});

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Arunkumar@2001",
  database: "firstproject",
});



db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database as ID " + db.threadId);
});

app.post("/add", (req, res) => {
  const {
    Date,
    ItemCode,
    Description,
    BatchNo,
    Operation,
    MachineCode, 
    PlannedQty,
    ActualQty,
    Scrap,
    UOM,
    Workers,
    ReMarks
  } = req.body;

  const query =
  "INSERT INTO dpdr(Date, ItemCode, Description, BatchNo, Operation, MachineCode, PlannedQty, ActualQty, Scrap, UOM, Workers, ReMarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


  db.query(
    query,
    [
      Date,
      ItemCode,
      Description,
      BatchNo,
      Operation,
      MachineCode,
      PlannedQty,
      ActualQty,
      Scrap,
      UOM,
      Workers,
      ReMarks,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into the database: " + err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

app.listen(3002, () => {
  console.log("Backend server running on port 3002");
});

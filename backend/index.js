const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const app = express();
const { mongoClient } = require("./db");
app.use(cors());

// mongodb+srv://Devansh_Rai:<password>@cluster0.hlgzxch.mongodb.net/?retryWrites=true&w=majority 
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(3000, () => {
    mongoClient();
    console.log("Server up and running on port 3000");
});


const express = require("express");
const cors = require("cors");
const financesRouter = require("./routes/finances");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/finances", financesRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

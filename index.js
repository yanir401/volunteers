import { app } from "./server/app.js";
import "./server/db/mongoose.js";
import "dotenv/config";
const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (error) throw new Error("app.listen Error: " + error);
  console.log(`App listening on port ${PORT}`);
});

import { app } from "./server/app.js";
import "./server/db/mongoose.js";
import "dotenv/config";

app.listen(5000, (error) => {
  if (error) throw new Error("app.listen Error: " + error);
  console.log(`App listening on port ${process.env.PORT}`);
});

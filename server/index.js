import { app } from "./app.js";
import { PORT } from "./config/config.js";
import "./db/mongoose.js";

app.listen(PORT || 5000, (error) => {
  if (error) throw new Error("app.listen Error: " + error);
  console.log(`App listening on port ${PORT}`);
});

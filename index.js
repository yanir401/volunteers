import { app } from "./server/app.js";
import { PORT } from "./server/config/config.js";
import "./server/db/mongoose.js";

app.listen(process.env.PORT || 5000, (error) => {
  if (error) throw new Error("app.listen Error: " + error);
  console.log(`App listening on port ${PORT}`);
});

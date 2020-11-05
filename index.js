import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import postRoutes from "./routes/post.route.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://admin:admin@tiketing.6tcwn.mongodb.net/Tiketing?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log("Server running on port: " + PORT))
  )
  .catch((err) => {
    console.log(err.message);
  });
mongoose.set("useFindAndModify", false);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Libary",
      version: "1.0.0",
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /posts:
 *    get:
 *      description: Get all posts
 *      responses:
 *        200:
 *          description: Success
 */

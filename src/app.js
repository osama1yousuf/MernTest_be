import express, { response } from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import connectDatabase from "./config/database.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cors from "cors";

const app = express();

// import routes
import customerRoutes from "./Router/customer.js";

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors("*"));
app.use(
  fileUpload({
    useTempFiles: true,
    // tempFileDir: "/tmp/",
  })
);


// Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api", customerRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT}`);
});

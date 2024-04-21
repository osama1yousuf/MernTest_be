import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI)
    .then((con) => {
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      );
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default connectDatabase;

import mongoose from 'mongoose';

export const dbConnect = () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((error) => {
      console.error("Error while connecting to the database", error);
    });
};

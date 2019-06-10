import mongoose from "mongoose";
export default mongoose.createConnection(process.env.MONGOCONN.replace("<DB>", "jobdashboard"), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
export const accountsConnection = mongoose.createConnection(process.env.MONGOCONN.replace("<DB>", "accounts"), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

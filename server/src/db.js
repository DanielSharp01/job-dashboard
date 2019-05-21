import mongoose from "mongoose";
mongoose.connect(process.env.MONGOCONN, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
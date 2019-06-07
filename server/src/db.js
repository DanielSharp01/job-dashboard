import mongoose from "mongoose";
mongoose.connect(process.env.MONGOCONN.replace("<APP>", "jobdashboard"), { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

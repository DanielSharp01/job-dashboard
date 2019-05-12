import mongoose from "mongoose";
mongoose.connect('mongodb://localhost/jobdashboard', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const mongoose = require("mongoose")

mongoose.set('useFindAndModify', false);   //to handle findOneAndDelete and findOneAndUpdate warning

mongoose.connect("mongodb://127.0.0.1:27017/eSoftwarica", {

    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

})
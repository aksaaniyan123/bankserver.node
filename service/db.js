const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/bankApp', {//databae connection code
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const User = mongoose.model('User', {//databaseil ulla collection nameinte singular form aanu model bracketilkodukkande

    acno: Number,
    username: String,
    password: String,
    balance: Number
})
module.exports = {
    User
}
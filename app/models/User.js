const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name:{type:String , trim:true},
    email:{type:String , trim:true},
    password:{type:String ,trim:true}

});
UserSchema.pre(save , function(next){
    this.password = bcrypt.hashSync(this.password , saltRounds);
    next();
});

module.exports = mongoose.model('User', UserSchema);
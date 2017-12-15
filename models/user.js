const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
var uuid = require('uuid');

const UserSchema = mongoose.Schema({

  username: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  parent: {type: Schema.Types.ObjectId, ref: 'User' },
  children:[{ type: Schema.Types.ObjectId, ref: "User"}],
  points: { type: Number }
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual("password")
  .get(function() {
    return this._password;
  })
  .set(function(value) {
    this._password = value;
    this.passwordHash = bcrypt.hashSync(value, 8);
  });

const User = mongoose.model("User", UserSchema);

module.exports = User;

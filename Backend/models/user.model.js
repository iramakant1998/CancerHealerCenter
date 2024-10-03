const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["DOCTOR", "PHARMASIST", "ADMIN", "RECEPTIONIST", "NURSING"],
    //   default: "ADMIN",
    },

    password: {
      type: String,
    },

    image: {
      type: String, 
      default: null,
    },
   
  
  },
  {
    timestamps: true,
  }
);


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Add a method to create token //
UserSchema.methods.getToken = async function () {
  return await jwt.sign({ id: this._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: `${process.env.JWT_EXPIRES}`,
  });
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const Users = mongoose.model("User", UserSchema);

module.exports = Users;

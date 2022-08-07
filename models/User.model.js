const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    avatar: {
      type: String,
      default: "https://w7.pngwing.com/pngs/510/43/png-transparent-computer-icons-avatar-facebook-messenger-avatar-heroes-silhouette-artwork.png"
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'OWNER'],
      default: 'USER'
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

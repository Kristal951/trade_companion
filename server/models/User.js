import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    image:{
      type: String,
      default: "https://res.cloudinary.com/dz1qj3x8h/image/upload/v1735681234/default-user.png",
      trim: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      required: true,
      type: String,
      minlength: 6,
    },
    age: {
      required: true,
      type: Number,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    IsGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;

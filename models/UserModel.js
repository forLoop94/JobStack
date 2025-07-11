import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "Lagos, Nigeria",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  avatarPublicId: String,
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);

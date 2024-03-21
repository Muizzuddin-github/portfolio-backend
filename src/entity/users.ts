import mongoose from "mongoose";

interface UsersEntity {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export default UsersEntity;

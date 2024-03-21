import mongoose from "mongoose";

function isObjectID(id: string): boolean {
  return mongoose.isValidObjectId(id);
}

export default isObjectID;

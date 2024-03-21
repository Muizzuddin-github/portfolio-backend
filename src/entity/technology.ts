import mongoose from "mongoose";

interface TechnologyEntity {
  _id: mongoose.Types.ObjectId;
  name: string;
  logo: string;
  created_at: string;
}

export default TechnologyEntity;

import mongoose from "mongoose";

interface ProjectHistoryEntity {
  _id: mongoose.Types.ObjectId;
  title: string;
  image: string;
  description: string;
  technology: any[];
  created_at: string;
}

export default ProjectHistoryEntity;

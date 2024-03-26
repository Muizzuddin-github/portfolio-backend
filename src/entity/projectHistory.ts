import mongoose from "mongoose";

interface Technology {
  name: string;
  logo: string;
}

interface ProjectHistoryEntity {
  _id: mongoose.Types.ObjectId;
  title: string;
  image: string;
  description: string;
  technology: Technology[];
  created_at: string;
}

export default ProjectHistoryEntity;

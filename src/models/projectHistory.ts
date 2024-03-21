import mongoose from "mongoose";

const technologySchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

const projectHistorySchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  technology: {
    type: [technologySchema],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const ProjectHistoryCol = mongoose.model(
  "project_history",
  projectHistorySchema,
  "project_history"
);

export default ProjectHistoryCol;

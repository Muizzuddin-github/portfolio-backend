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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const TechnologyCol = mongoose.model(
  "technology",
  technologySchema,
  "technology"
);

export default TechnologyCol;

import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();

  res.status(StatusCodes.OK).json({ jobs });
};

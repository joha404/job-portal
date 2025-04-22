import prisma from "../DB/db.config.js";

export const fetchJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      select: {
        id: true,
        name: true,
        vacency: true,
        position: true,
        experience: true,
        sellery: true,
        education: true,
        location: true,
        created_at: true,
      },
    });

    return res.status(200).json({ status: 200, data: jobs });
  } catch (error) {
    console.error("Error fetching Jobs:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

export const createJob = async (req, res) => {
  const { name, vacency, position, experience, sellery, education, location } =
    req.body;

  const newjob = await prisma.job.create({
    data: {
      name,
      vacency,
      position,
      experience,
      sellery,
      education,
      location,
    },
  });
  return res.json({ status: 200, data: newjob, msg: "Job created." });
};

// * Show user
export const showJob = async (req, res) => {
  const jobId = req.params.id;
  const job = await prisma.job.findFirst({
    where: {
      id: Number(jobId),
    },
  });

  return res.json({ status: 200, data: job });
};

// * Update the user
export const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const { name, vacency, position, experience, sellery, education, location } =
    req.body;

  await prisma.job.update({
    where: {
      id: Number(jobId),
    },
    data: {
      name,
      vacency,
      position,
      experience,
      sellery,
      education,
      location,
    },
  });

  return res.json({ status: 200, message: "Job updated successfully" });
};

// * Delete user
export const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  await prisma.job.delete({
    where: {
      id: Number(jobId),
    },
  });

  return res.json({ status: 200, msg: "Job deleted successfully" });
};

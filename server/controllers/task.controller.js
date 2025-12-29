import taskModel from "../models/task.model.js";

export async function createTask(req, res) {
  const author = req.user.id;
  const { title, description, category, status } = req.body;
  try {
    if (!author) {
      return res.status(401).json({ message: "You are not Logged In" });
    }
    const createdTask = await taskModel.create({
      title: title,
      description: description,
      category: category,
      status: status,
      author: author,
    });
    const printTask = await createdTask.populate("author", "fullname");
    res.status(201).json({
      message: "Task created Successfully",
      success: true,
      task: printTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database crashed task cannot be created",
      error: error.message,
    });
  }
}

export async function allTasksUser(req, res) {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const { status, category } = req.query;
  const userID = req.user.id;
  try {
    if (!userID) {
      return res.status(401).json({ message: "You are not logged In" });
    }
    const skip = (page - 1) * limit;
    // Task Filter logic

    let queryObject = { author: userID };
    if (status) queryObject.status = status;
    if (category) queryObject.category = category;

    const FindTask = await taskModel
      .find(queryObject)
      .sort({ createdAt: -1 })
      .populate("author", "fullname")
      .skip(skip)
      .limit(limit);
    const taskCount = await taskModel.countDocuments(queryObject);
    res.status(200).json({
      message: "Tasks Found",
      success: true,
      count: FindTask.length,
      totalPages: Math.ceil(taskCount / limit),
      data: FindTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database crashed tasks not Found",
      error: error.message,
    });
  }
}

export async function singleTask(req, res) {
  const userID = req.user.id;
  const taskID = req.params.id;
  try {
    if (!userID) {
      return res.status(401).json({ message: "You are not logged In" });
    }
    const task = await taskModel
      .findById(taskID)
      .populate("author", "fullname");
    if (!task) {
      return res.status(404).json({ message: "Task Not found" });
    }
    // owner Check
    if (!task.author.equals(userID)) {
      return res.status(403).json({ message: "This is not your task " });
    }

    res.status(200).json({
      message: "Task Found ",
      success: true,
      data: task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "database connection crashed ", error: error.message });
  }
}

export async function updateTask(req, res) {
  const userID = req.user.id;
  const taskID = req.params.id;
  const alllowedFields = ["title", "description", "category", "status"];

  try {
    const findTask = await taskModel.findById(taskID);
    let updateTask = {};
    if (!userID) {
      return res.status(401).json({ message: "You are not logged In" });
    }

    if (!findTask) {
      return res.status(404).json({ message: "Task Not found" });
    }
    // owner Check
    if (!findTask.author.equals(userID)) {
      return res.status(403).json({ message: "This is not your task " });
    }
    for (let key of alllowedFields) {
      if (req.body[key] !== undefined) {
        updateTask[key] = req.body[key];
      }
    }
    if (Object.keys(updateTask).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const task = await taskModel.findByIdAndUpdate(
      taskID,
      { $set: updateTask },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Task Updated ",
      success: true,
      data: task,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "database connection crashed ", error: error.message });
  }
}

export async function deleteTask(req, res) {
  const userID = req.user.id;
  const taskID = req.params.id;

  try {
    const findTask = await taskModel.findById(taskID);

    if (!userID) {
      return res.status(401).json({ message: "You are not logged In" });
    }

    if (!findTask) {
      return res.status(404).json({ message: "Task Not found" });
    }
    // check owner
    if (!findTask.author.equals(userID)) {
      return res
        .status(403)
        .json({ message: "Your are not authorised to delete Task" });
    }
    await taskModel.findByIdAndDelete(taskID);
    res.status(204).json({
      message: "Task deleted Successfully",
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "database connection crashed ", error: error.message });
  }
}

import Task from '../Models/Tasks.js';

const createTask =async(req, res) =>{
  try{
    const {title, description}=req.body;
    if (!title || title.trim()===''){
      return res.status(400).json({message:'Title is required'});
    }

    const newTask=await Task.create({
      title: title.trim(),
      description: description?.trim() || null,
      status: false
    });
    console.log("Tas created",newTask)

    req.io.emit('taskCreated', newTask);

    return res.status(201).json({message:'Task created successfully',task: newTask});
  }catch(error){
    return res.status(500).json({message:'Failed to create task'});
  }
};

const getAllTasks =async(req, res) => {
  try{
    const tasks=await Task.findAll({ order: [['createdAt', 'ASC']] });
    console.log("Teass",tasks)

    return res.status(200).json({tasks});
  }catch(error){
    return res.status(500).json({message:'Failed to fetch tasks'});
  }
};

const updateTask =async(req, res) =>{
  try{
    const {id} = req.params;
    const {title, description, status}=req.body;

    const task=await Task.findByPk(id);

    if(!task){
      return res.status(404).json({message: 'Task not found'});
    }

    if(title !== undefined) task.title = title.trim();
    if(description !== undefined) task.description = description.trim() || null;
    if(status !== undefined) task.status = Boolean(status);

    await task.save();

    req.io.emit('taskUpdated', task);

    return res.status(200).json({message:'Task updated successfully', task});
  }catch(error){
    return res.status(500).json({message:'Failed to update task'});
  }
};

export {createTask, getAllTasks, updateTask};
import express from 'express';
import {createTask, getAllTasks, updateTask} from '../controllers/tasks.controller.js';

const router=express.Router();

router.post('/', createTask);
router.get('/', getAllTasks);
router.patch('/:id', updateTask);

export default router;
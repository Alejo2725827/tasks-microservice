
const Task = require('../../models/mongo/task.model');
const mongoose = require('mongoose');


class TaskCtrl {

    obtenerTareasPorUsuario = async (req, res) => {

        const { completed, task_id } = req.query


        const { userId } = req.params;

        try {
            // Verificar si el userId es un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ mensaje: 'ID de usuario no válido' });
            }

            // Buscar todas las tareas asociadas al userId

            const condicion = { userId }

            if (task_id) {
                condicion._id = task_id
            }

            if (completed) {
                condicion.completed = completed
            }

            const tareas = await Task.find(condicion);

            res.status(200).json({ tareas });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener las tareas', detalle: `${error}` });
        }
    }

    crear = async (req, res) => {
        try {
            const { userId, title } = req.body;

            if (!userId || !title) {
                return res.status(400).json({ mensaje: 'Se requiere userId y title' });
            }

            const newTask = new Task({
                userId,
                title
            });

            await newTask.save();

            res.status(201).json({ mensaje: 'Tarea creada exitosamente', task: newTask });

        } catch (error) {
            res.status(500).json({ mensaje: 'Error al crear la tarea', detalle: `${error}` });
        }
    }

    actualizar = async (req, res) => {
        const { task_id } = req.params;
        const { title, completed } = req.body;

        try {
            const updatedTask = await Task.findByIdAndUpdate(
                task_id,
                { title, completed },
                { new: true }
            );

            if (!updatedTask) {
                return res.status(404).json({ mensaje: 'Tarea no encontrada' });
            }

            res.status(200).json({ mensaje: 'Tarea actualizada', task: updatedTask });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al actualizar la tarea', detalle: `${error}` });
        }
    }

    eliminar = async (req, res) => {
        const { task_id } = req.params;

        try {

            // Verificar si el userId es un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(task_id)) {
                return res.status(400).json({ mensaje: 'ID de tarea no válido' });
            }

            const deletedTask = await Task.findByIdAndDelete(task_id);

            if (!deletedTask) {
                return res.status(404).json({ mensaje: 'Tarea no encontrada' });
            }

            res.status(200).json({ mensaje: 'Tarea eliminada', task: deletedTask });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al eliminar la tarea', detalle: `${error}` });
        }
    }
}

module.exports = TaskCtrl
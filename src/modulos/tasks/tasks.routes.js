
const express = require('express');
const TaskCtrl = require('./tasks.ctrl');

const router = express.Router()

const taskCtrl = new TaskCtrl();

router.get('/:userId', taskCtrl.obtenerTareasPorUsuario);

router.post('/crear', taskCtrl.crear);

router.put('/:task_id/actualizar', taskCtrl.actualizar);

router.delete('/:task_id/eliminar', taskCtrl.eliminar);

module.exports = router
const router = require('express').Router();
const taskController = require("../../controllers/task/task.controller");
const {storeRules} = require('../../validators/task/task.validator');
const {validate} = require("../../middlewares");


router.get('/tasks',taskController.index);

router.get('/tasks/:taskId',taskController.show);

router.post('/tasks', [validate.joiValidator(storeRules)], taskController.store);

router.put('/tasks/:taskId',taskController.update);

router.delete('/tasks/:taskId', taskController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middelware/auth.js');
const { check } = require('express-validator');

// api/createProject
router.post('/',
  auth,
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
  ],
  projectController.createProject
);

router.get('/',
  auth,
  projectController.getProjects
);

router.put('/:id',
  auth,
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
  ],
  projectController.updateProject
);

router.delete('/:id',
  auth,
  projectController.removeProject
)

module.exports = router;
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json({msg: "Profiles works"}));

module.exports = router;

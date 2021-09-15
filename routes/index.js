const express = require("express");
var router = express.Router();
// API calls
router.get('/', (req, res) => {
    res.send('Welcome to Node API')
})

router.get('/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

//API,s routes

router.use('/users', require('./user'));

router.use('/bloodGroup', require('./blood-group'));

router.use('/bricks', require('./bricks'));

router.use('/cities', require('./city'));
router.use('/companies', require('./company'));
router.use('/designations', require('./designation'));
router.use('/doctors', require('./doctor'));
router.use('/hospitals', require('./hospitals'));
router.use('/products', require('./product'));
router.use('/provinces', require('./province'));
router.use('/qualifications', require('./qualification'));
router.use('/regions', require('./region'));
router.use('/representative', require('./representative'));
router.use('/selling', require('./selling-pitch'));
router.use('/speciality', require('./speciality'));
router.use('/survey', require('./survey'));
router.use('/surveyQuestion', require('./survey-question'));
router.use('/surveyQuestionOption', require('./survey-question-option'));
router.use('/surveyType', require('./survey-type'));
router.use('/territory', require('./territory'));
router.use('/tiers', require('./tier'));
router.use('/workPlans', require('./workPlan'));
router.use('/approveWorkPlan', require('./approvedWorkPlan'));
router.use('/zones', require('./zone'));
router.use('/attachmnets', require('./attachmnetsUpload'));
router.use('/meeting', require('./meetings'));
router.use('/attendace' , require('./attendaceEmployee'));

module.exports = router;
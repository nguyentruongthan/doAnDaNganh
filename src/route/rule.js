import ruleController from '../controllers/ruleController.js';
import express from "express";

const ruleRouter = express.Router();
ruleRouter.post('/addRules', ruleController.addRules);
ruleRouter.get('/all/:outputID', ruleController.getAllRulesByOutputID);
ruleRouter.put('/', ruleController.updateRuleByOutputRuleID); // as well as sensor rules
ruleRouter.get('/:ruleID', ruleController.getRuleByID);
ruleRouter.delete('/:outputRuleID', ruleController.deleteRuleByOutputRuleID); //as well as sensor rules
ruleRouter.get('/outputRuleID/:outputRuleID', ruleController.getOutputRuleByOutputRuleID);
ruleRouter.get('/getSensorRuleByOutputRuleID/:outputRuleID', ruleController.getSensorRuleByOutputRuleID);
export default ruleRouter;
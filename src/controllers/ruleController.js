// import outputDeviceModel from '../models/outputDevice.js';
import ruleService from '../services/ruleService.js';
import mqttService from '../services/mqttService.js';
import constant from '../services/constant.js';


const getAllRulesByOutputID = async (req, res) => {
  try {
    const outputID = req.params.outputID;
    const rules = await ruleService.getAllRulesByOutputID(outputID);
    res.status(200).json(rules);
  }catch(err){
    res.status(500).json(err);
  }
}

const updateRuleByOutputRuleID = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (cookies.token == null) {
      return res.redirect('/dangNhap');
    }
    const token = cookies.token;
    const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const username = decodeToken.username;
    const outputRuleReq = req.body['outputRule'];
    const sensorRulesReq = req.body['sensorRules'];
    
    //find output rule by id
    const outputRule = await ruleService.getOutputRuleByOutputRuleID(outputRuleReq._id);
    if (!outputRule) {
      return res.status(404).json("Output rule not found");
    }
    //update output rule
    const newOutputRule = await outputRule.updateOne({
      $set: outputRuleReq
    })
    //update sensor rule by sensorRuleID
    
    for (let i = 0; i < sensorRulesReq.length; i++){
      // console.log('sensorRule: ', sensorRulesReq[i]);
      const sensorRule = await ruleService.getSensorRuleBySensorRuleID(sensorRulesReq[i]._id);
      if(!sensorRule){
        return res.status(404).json("Sensor rule not found");
      }
      await sensorRule.updateOne({
        $set: sensorRulesReq[i]
      })
    }
    const rules = {
      'outputRule': outputRuleReq,
      'sensorRules': sensorRulesReq
    }
    mqttService.publish(username, `${constant.HEADER_CREATE_RULE}:[${JSON.stringify(rules)}]`);
    res.status(200).json(rules);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

const getRuleByID = async (req, res) => {
  try {
    const ruleID = req.params.ruleID;
    const rule = await ruleModel.Rule.findById(ruleID);
    if(!rule){
      res.status(404).json("Rule not found");
    }
    res.status(200).json(rule);
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteRuleByOutputRuleID = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (cookies.token == null) {
      return res.redirect('/dangNhap');
    }
    const token = cookies.token;
    const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const username = decodeToken.username;
    const deleteOutputRule = await ruleService.deleteRuleByOutputRuleID(req.params.outputRuleID);
    mqttService.publish(username, `${constant.HEADER_DELETE_RULE}:${deleteOutputRule._id}`);
    res.status(200).json(deleteOutputRule);
  } catch (err) {
    res.status(500).send(err);
  }
}

const addRules = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (cookies.token == null) {
      return res.redirect('/dangNhap');
    }
    const token = cookies.token;
    const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const username = decodeToken.username;
    const outputID = req.body['outputID'];
    const action = req.body['action'];
    const sensorRules = req.body['sensorRules'];
    const rules = await ruleService.addRules(outputID, action, sensorRules);
    mqttService.publish(username, `${constant.HEADER_CREATE_RULE}:[${JSON.stringify(rules)}]`);
    res.status(200).json(rules);
  } catch (err) {
    res.status(500).json(err);
  }
}
const getOutputRuleByOutputRuleID = async (req, res) => {
  try{
    const outputRuleID = req.params.outputRuleID;
    const outputRule = await ruleService.getOutputRuleByOutputRuleID(outputRuleID);
    res.status(200).json(outputRule);
  } catch (err) {
    res.status(500).json(err);
  }
}
const getSensorRuleByOutputRuleID = async (req, res) => {
  try {
    const outputRuleID = req.params.outputRuleID;
    const sensorRules = await ruleService.getSensorRuleByOutputRuleID(outputRuleID);
    res.status(200).json(sensorRules);
  } catch (err) {
    res.status(500).json(err);
  }

}
module.exports = {
  getAllRulesByOutputID: getAllRulesByOutputID,
  deleteRuleByOutputRuleID: deleteRuleByOutputRuleID,
  updateRuleByOutputRuleID: updateRuleByOutputRuleID,
  getRuleByID: getRuleByID,
  addRules: addRules,
  getOutputRuleByOutputRuleID: getOutputRuleByOutputRuleID,
  getSensorRuleByOutputRuleID: getSensorRuleByOutputRuleID
};
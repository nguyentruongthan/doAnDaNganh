import outputRuleModel from '../models/outputRule';
import sensorRuleModel from '../models/sensorRule';

const getAllRulesByOutputID = async (outputID) => {
  try {
    const outputRules = await outputRuleModel.OutputRule.find({
      outputID: outputID
    })
    const rules = [];
    for (let i = 0; i < outputRules.length; i++) {
      const outputRule = outputRules[i];
      const sensorRules = await sensorRuleModel.SensorRule.find({
        outputRuleID: outputRule._id
      })
      rules.push({
        'outputRule': outputRule,
        'sensorRules': sensorRules
      });
    }
    return rules;
  } catch (err) {
    return err;
  }
}
const addRules = async (outputID, action, sensorRules) => {
  try {
    const newOutputRule = new outputRuleModel.OutputRule({
      outputID: outputID,
      action: action
    });
    const saveOutputRule = await newOutputRule.save();
    const outputRuleID = saveOutputRule._id;
    const newSensorRules = []
    for (let i = 0; i < sensorRules.length; i++) {
      const newSensorRule = await sensorRuleModel.SensorRule.create({
        'outputRuleID': outputRuleID,
        'sensorID': sensorRules[i]['sensorID'],
        'threshold': sensorRules[i]['threshold'],
        'condition': sensorRules[i]['condition']
      });
      newSensorRules.push(newSensorRule);
    }
    const result = {
      'outputRule': saveOutputRule,
      'sensorRules': newSensorRules
    }
    
    return result;
  } catch (err) {
    return err;
  }
}

const getOutputRuleByOutputRuleID = async (outputRuleID) => {
  try {
    const outputRule = await outputRuleModel.OutputRule.findById(outputRuleID);
    return outputRule;
  } catch (err) {
    return err;
  }
}
const getSensorRuleByOutputRuleID = async (outputRuleID) => {
  try {
    const sensorRules = await sensorRuleModel.SensorRule.find({
      outputRuleID: outputRuleID
    });
    return sensorRules;
  }catch(err){
    return err;
  }
}
const getSensorRuleBySensorRuleID = async (sensorRuleID) => {
  try {
    const sensorRule = await sensorRuleModel.SensorRule.findById(sensorRuleID);
    return sensorRule;
  } catch (err) {
    return err;
  }
}
const deleteRuleByOutputRuleID = async (outputRuleID) => {
  try { 
    //find and delete output rule
    const deleteOutputRule = await outputRuleModel.OutputRule.findByIdAndDelete(outputRuleID);
    //find and delete sensor rules by output rule ID
    const deleteSensorRules = await sensorRuleModel.SensorRule.deleteMany({
      outputRuleID: outputRuleID
    });
    return deleteOutputRule;
  } catch (err) {
    return err;
  }
}
module.exports = {
  getAllRulesByOutputID: getAllRulesByOutputID,
  addRules: addRules,
  getOutputRuleByOutputRuleID: getOutputRuleByOutputRuleID,
  getSensorRuleByOutputRuleID: getSensorRuleByOutputRuleID,
  getSensorRuleBySensorRuleID: getSensorRuleBySensorRuleID,
  deleteRuleByOutputRuleID: deleteRuleByOutputRuleID
}
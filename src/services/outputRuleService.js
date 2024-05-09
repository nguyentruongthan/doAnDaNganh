import outputRule from "../models/outputRule";
import sensorRule from "../models/sensorRule";

const getAllRulesByOutputID = async (outputID) => {
  try {
    const rules = await outputRule.OutputRule.find({
      outputID: outputID
    })
    return rules;
  } catch (err) {
    return err;
  }
}
const addRule = async (outputID, sensorRules) => {
  try {
    const newOutputRule = new outputRule.OutputRule({
      outputID: outputID,
      action: '1'
    });
    const saveOutputRule = await newOutputRule.save();
    const outputRuleID = saveOutputRule._id;

    for (let i = 0; i < sensorRules.length; i++) {
      await sensorRule.SensorRule.create({
        'outputRuleID': outputRuleID,
        'sensorID': sensorRules[i].sensorID,
        'threshold': sensorRules[i].threshold,
        'condition': sensorRules[i].condition
      });
    }

    return saveOutputRule;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getAllRulesByOutputID: getAllRulesByOutputID,
  addRule: addRule
}
import gardenModel from '../models/garden.js';

const addGarden = async (req, res) => {
  try {
    const newGarden = new gardenModel.Garden(req.body);
    const saveGarden = await newGarden.save();
    res.status(200).json(saveGarden);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  addGarden: addGarden,
};
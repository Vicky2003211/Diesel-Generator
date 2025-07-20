const DieselGenerator = require('../Models/Dieselgenerator');
const Telemetry = require('../Models/Telemetry');

const createDG = async (req, res) => {
  try {
    const dg = await DieselGenerator.create(req.body);
    res.json(dg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDGs = async (req, res) => {
  try {
    const { org_id } = req.query; // 👉 extract org_id from query

    let filter = {};
    if (org_id) {
      filter.org_id = org_id; // 🔍 filter only if org_id is provided
    }

    const dgs = await DieselGenerator.find(filter);
    res.json(dgs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addTelemetry = async (req, res) => {
  try {
    const existing = await Telemetry.findOne({ dg_id: req.params.dg_id });

    if (existing) {
      return res.status(400).json({
        message: 'Telemetry for this DG already exists.'
      });
    }

    const telemetry = await Telemetry.create({
      dg_id: req.params.dg_id,
      ...req.body
    });

    res.json({ status: 'received', dg_id: req.params.dg_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getLatestTelemetry = async (req, res) => {
  try {
    const latestTelemetry = await Telemetry.findOne({})
      .sort({ createdAt: -1 })
      .populate('dg_id');

    if (!latestTelemetry || !latestTelemetry.dg_id) {
      return res.status(404).json({ message: 'No telemetry data found' });
    }

    res.json({
      dg_id: latestTelemetry.dg_id._id,
      name: latestTelemetry.dg_id.name,
      location: latestTelemetry.dg_id.location,
      fuel_level_percent: latestTelemetry.fuel_level_percent,
      engine_temperature_celsius: latestTelemetry.engine_temperature_celsius,
      running_status: latestTelemetry.running_status,
      createdAt: latestTelemetry.createdAt,
    });
  } catch (error) {
    console.error('Error in getLatestTelemetry:', error);
    res.status(500).json({ error: error.message });
  }
};



const gettelemetrydata = async (req, res) => {
  const dgId = req.params.dg_id;

  try {
    const telemetry = await Telemetry.findOne({ dg_id: dgId }).sort({ createdAt: -1 });

    if (!telemetry) {
      return res.status(404).json({ message: 'No telemetry data found for this DG' });
    }

    res.json(telemetry);
  } catch (err) {
    console.error('Error fetching telemetry:', err);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = {
  createDG,
  getAllDGs,
  addTelemetry,
  getLatestTelemetry,
  gettelemetrydata
};

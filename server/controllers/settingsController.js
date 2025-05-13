const mongoose = require("mongoose");

const AppSettings = require('../models/appSettings');

const getDate = async(req, res) => {
    try {
        const settings = await AppSettings.findOne();
        if (!settings) return res.status(404).json({ error: 'Settings not found' });
    
        res.json({ promoDate: settings.promoDate });
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      };
    
    

}

module.exports = {getDate};

const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const requireAuth = async (req, res, next) => {

    //verify authorization

    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({error: 'Not authorized'});
    }

    const token = authorization.split(' ')[1];

    try {
       const {_id} = jwt.verify(token, process.env.SECRET);

       req.admin = await Admin.findOne({_id}).select('_id');
       next();

    } catch(error) {
        console.log(error);
        res.status(401).json({error: 'Not authorized'})
    }
}

module.exports = requireAuth;
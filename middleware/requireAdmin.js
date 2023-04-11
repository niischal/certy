const Admin = require('../models/adminModel')

const requireAdmin = async (req, res, next) =>{
    const adminId = req.headers.adminid

    if(!adminId){
        return res.status(401).json({message: 'Authorization Required'})
    }

    const admin = await Admin.findOne({_id: adminId});

    if(!admin){
        return res.status(401).json({message: 'Invalid Request'})
    }

    next();
}

module.exports = requireAdmin
const Issuer = require('../models/issuerModel')

const requireAuth = async (req, res, next) =>{
    const issuerId = req.headers.issuerid

    if(!issuerId){
        return res.status(401).json({message: 'Authorization Required', issuerId: issuerId})
    }

    const issuer = await Issuer.findOne({_id: issuerId});

    if(!issuer){
        return res.status(401).json({message: 'Invalid Request'})
    }

    next();
}

module.exports = requireAuth
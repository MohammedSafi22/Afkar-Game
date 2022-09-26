const asyncHandler = require('express-async-handler');
const Avarage = require('../models/avarageModel');

exports.addPoints = asyncHandler(async (req, res, next)=>{
    const document = await Avarage.findOne(req.body.userId)
    if(!document) {
        return res.status(404).json({message:'لا يوجد مستخدم'})
    }
    res.status(200).json({data:document})
})
const mongoose = require('mongoose');

const avarageSchema =new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        totalAvg:{
            type:Number,
            default:0,
        },
    },
    category:[{
        type: mongoose.Schema.ObjectId,
        ref:"Category",
        avgPoints:{
            type:Number,
            default:0,
        },
        games:[
            {
              type: mongoose.Schema.ObjectId,
              ref: "Game",
              points:{
                type:Number,
                default:0,
            },
            }]
    }], 
});

const avaragwModel = mongoose.model("Avarage",avarageSchema);

module.exports = avaragwModel;
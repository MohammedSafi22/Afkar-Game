const mongoose = require('mongoose');

const gameSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:100
    },
    scores:{
         type:Number,
         required:true
    },
    points:{
        type:Number,
        min:[0,"أقل معدل للتقدم هو 0"],
        max:[2000,"أعلى معدل للتقدم هو 2000"],
        required:true
    },
    starsNo:{
        type:Number,
        min:[0,"أقل معدل للتقدم هو 0"],
        max:[5,"أعلى معدل للتقدم هو 5"],
        required:true
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref:"Category",
        required:true
    }
},{timestamps:true,})

gameSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'category',
      select: 'name',
    });
    next();
})

const gameModel = mongoose.model("Game",gameSchema);

module.exports = gameModel;
const mongoose = require('mongoose');
const Game = require('../models/gameModel');

const categorySchema =new mongoose.Schema({
    catName:{
        type:String,
        required:[true,"category required"],
        unique:[true,"Category unique"],
        minlength:[3,'too short category name'],
        maxlength:[32, 'too long category name']
    },
    games:[
        {
            type: mongoose.Schema.Types.Mixed,
            ref: "Game",
            // required: [true,"game unique"],
        }
    ],
    categoryAverage: {
        type: Number,
        default: 0
    },
    categoryTotal: {
        type: Number,
        default: 0
    },
    totalGames: {
        type: Number,
        default: 0
    }
},{
    timestamps:true,
    // toJSON:{virtuals:true},
    // toObject:{virtuals:true}
}
)
// categorySchema.pre(/^find/, function (next) {
//     this.populate({
//       path: "games",
//       select: 'name',
//     });
//     next();
// })
// categorySchema.pre(/^find/, function (next) {
//     this.populate({
//       path: 'games',
//       select: 'name',
//       model: 'Game'
//     });
//     next();
// })
   


const CategoryModel = mongoose.model('Category',categorySchema);

module.exports = CategoryModel;
const mongoose = require('mongoose');

// image schema 

const imageSchema = new mongoose.Schema({
 
    picture : {
        type : String,
    },
    
},

{
    timestamps: true,
}
)


const Image = mongoose.model("Image",imageSchema)


module.exports = Image;

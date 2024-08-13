const mongoose = require('mongoose');
const schema=new mongoose.Schema({
    todo:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        required: true,
    }

});

module.exports=new mongoose.model("addTodo",schema,"TodoMaster");
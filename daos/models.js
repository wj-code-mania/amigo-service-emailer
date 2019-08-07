var modelMap = new Map()

var Mongoose = require('mongoose')
var Schema = Mongoose.Schema;
//var mongoosePaginate = require('mongoose-paginate');


//var collSchema = new Schema({ any: Schema.Types.Mixed });

exports.getModel= function (collectionName) {

    if (modelMap.get(collectionName)){

        return modelMap.get(collectionName);

    }
    else{
        
        var collSchema = new Schema({ any: Schema.Types.Mixed },{collection:collectionName});
        var schema=Mongoose.model(collectionName, collSchema);
        //collSchema.plugin(mongoosePaginate);
        modelMap.set(collectionName,schema);
        return schema;
    }

}
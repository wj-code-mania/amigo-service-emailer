var Mongoose = require('mongoose'), cfg = require('../config');
Mongoose.Promise = require('bluebird');
const winston = require('../config/winston');
var Connection = Mongoose.connection;
var model = require('./models');
var Grid = require('gridfs-stream');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var streamBuffers = require('stream-buffers');
var StringDecoder = require('string_decoder').StringDecoder;

var db = Mongoose.connect(
'mongodb://' + cfg.mongo.uri + ':' + cfg.mongo.port + '/' + cfg.mongo.db, { useMongoClient: true })
.then(
() => {
winston.info('connection with database succeeded');

}
)
.catch(
err => winston.error(err)
);

var gfs;
var decoder = new StringDecoder('utf8');

// Use connect method to connect to the server
MongoClient.connect('mongodb://' + cfg.mongo.uri + ':' + cfg.mongo.port, function (err, client) {
console.log("Connected successfully to server");

const db = client.db(cfg.mongo.db);
gfs = Grid(db, mongo);


});



//var gfs = Grid(Mongoose.mongo.Db, Mongoose.mongo);
Mongoose.set('debug', true);

exports.checkIfExists = function (query, collectionName) {

return new Promise(function (resolve, reject) {

//var collSchema = new Schema({ any: Schema.Types.Mixed });
//var coll = Mongoose.model(collectionName, collSchema);
var coll = model.getModel(collectionName);
coll.findOne(query, function (err, results) {

if (err)
reject(err)
else
resolve(results)


})



})

}



exports.checkIfExistsWithAttributes = function (query, collectionName, attibutes) {

return new Promise(function (resolve, reject) {

//var collSchema = new Schema({ any: Schema.Types.Mixed });
//var coll = Mongoose.model(collectionName, collSchema);
var coll = model.getModel(collectionName);
coll.findOne(query, attibutes, function (err, results) {

if (err)
reject(err)
else
resolve(results)


})



})

}

exports.getLatestObject = function (query, collectionName, attibutes) {

return new Promise(function (resolve, reject) {
var coll = model.getModel(collectionName);

dao.findOne(query).sort({ _id: -1 })

coll.findOne(query, attibutes, function (err, results) {

if (err)
reject(err)
else
resolve(results)


})



})

}

exports.nextSequence = function (key) {

return new Promise(function (resolve, reject) {
var seqFunction = "nextSequence('" + key + "')"
Connection.db.eval(seqFunction, function (err, nextNo) {

if (err)
reject(err)
else
resolve(nextNo)

})

})
}


exports.findAggregate = function (collectionName, aggregateArray) {

return new Promise(function (resolve, reject) {
var coll = model.getModel(collectionName);
coll.aggregate(aggregateArray).exec((err, aggVal) => {
if (err) reject(err);
resolve(aggVal)
});

})
}

exports.insert = function (doc, collectionName) {

return new Promise(function (resolve, reject) {
Connection.collection(collectionName).insertOne(doc).then(
function (obj) {
resolve(obj);
}
).catch(function (err) {
reject(err);
});

})


}

exports.insertMany = function (doc, collectionName) {

return new Promise(function (resolve, reject) {
Connection.collection(collectionName).insert(doc).then(
function (obj) {
resolve(obj);
}
).catch(function (err) {
reject(err);
});

})


}


exports.getCollection = function (collectionName, options) {

return new Promise(function (resolve, reject) {

//var collSchema = new Schema({ any: Schema.Types.Mixed });
//var coll = Mongoose.model(collectionName, collSchema);
// options['status'] = {$nin : ['DELETED']}
var coll = model.getModel(collectionName);


coll.find({}, options, function (err, results) {

if (err)
reject(err)
else
resolve(results)

})
/*
coll.find({}, function (err, results) {

if (err)
reject(err)
else
resolve(results)


})
*/



})

}



exports.getCollectionCount = function (collectionName) {

return new Promise(function (resolve, reject) {

//var collSchema = new Schema({ any: Schema.Types.Mixed });
//var coll = Mongoose.model(collectionName, collSchema);
var coll = model.getModel(collectionName);


coll.find({}).count(function (err, count) {

if (err)
reject(err)
else
resolve(count)
})
})

}




exports.getCollectionCountWithCriteria = function (collectionName, criteria) {

return new Promise(function (resolve, reject) {

//var collSchema = new Schema({ any: Schema.Types.Mixed });
//var coll = Mongoose.model(collectionName, collSchema);
var coll = model.getModel(collectionName);
coll.find(criteria).count(function (err, count) {
if (err)
reject(err)
else
resolve(count)
})
})
}


exports.getCollectionWithCriteriaAndProjections = function (collectionName, criteria, projections, options) {

return new Promise(function (resolve, reject) {

//var collSchema = new Schema({ any: Schema.Types.Mixed });
//var coll = Mongoose.model(collectionName, collSchema);
// criteria['status'] = {$nin :['DELETED']}
var coll = model.getModel(collectionName);
coll.find(criteria, projections, options, function (err, results) {
if (err)
reject(err)
else
resolve(results)

})
/*
coll.find(criteria, projections, function (err, results) {

if (err)
reject(err)
else
resolve(results)
})
*/


})





}


exports.findOneWithCriteriaAndProjections = function (collectionName, criteria, projections) {

return new Promise(function (resolve, reject) {

//var collSchema = new Schema({ any: Schema.Types.Mixed });
//var coll = Mongoose.model(collectionName, collSchema);
//criteria['status'] = {$nin: ['DELETED']}
var coll = model.getModel(collectionName);
coll.findOne(criteria, projections, function (err, results) {

if (err)
reject(err)
else
resolve(results)


})



})

}


exports.getCollectionWithCriteriaProjectionsAndSort = function (collectionName, criteria, projections, sort, options) {

return new Promise(function (resolve, reject) {

//var collSchema = new Schema({ any: Schema.Types.Mixed });
//var coll = Mongoose.model(collectionName, collSchema);
var coll = model.getModel(collectionName);
coll.find(criteria, projections, options).sort(sort).exec(function (err, results) {

if (err)
reject(err)
else
resolve(results)

})
/*

coll.find(criteria, projections).sort(sort).exec(function (err, results) {

if (err)
reject(err)
else
resolve(results)


})

*/

})
}





exports.findOneWithCriteriaProjectionsAndSort = function (collectionName, criteria, projections, sort, options) {

return new Promise(function (resolve, reject) {
var coll = model.getModel(collectionName);
coll.findOne(criteria, projections, options).sort(sort).exec(function (err, results) {

if (err)
reject(err)
else
resolve(results)

})

})
}

exports.deleteWithCriteria = function (collectionName, criteria) {

return new Promise(function (resolve, reject) {

var coll = model.getModel(collectionName);

coll.deleteOne(criteria, function (err, results) {
if (err)
reject(err) //TODO: add logging
else
resolve(results)

});

})

}




exports.multipleDeleteWithCriteria = function (collectionName, criteria) {

return new Promise(function (resolve, reject) {
var coll = model.getModel(collectionName);

coll.deleteMany(criteria, function (err, results) {
if (err)
reject(err) //TODO: add logging
else
resolve(results)
});

})

}
exports.findOneAndUpdate = function (collectionName, criteria, updateDoc) {

return new Promise(function (resolve, reject) {

//var collSchema = new Schema({ any: Schema.Types.Mixed });
//var coll = Mongoose.model(collectionName, collSchema);





var coll = model.getModel(collectionName);
//coll.update(criteria,updateDoc,{'multi':multi}, function (err, results) {
//coll.findOneAndUpdate({ UserId: '10000000477' }, { MobNumVerificationStatus: 'N' },
coll.findOneAndUpdate(criteria, updateDoc, { strict: false, new: true }, function (err, results) {
if (err)
reject(err)
else
resolve(results)


})



})
}


exports.updateCollection = function (collectionName, criteria, updateDoc, multi, upsert = true, arrayFilters = {}) {

return new Promise(function (resolve, reject) {
var coll = model.getModel(collectionName);
coll.update(criteria, updateDoc, { 'arrayFilters': arrayFilters, 'multi': multi, 'strict': false, 'upsert': upsert }, function (err, results) {
if (err)
reject(err)
else
resolve(results)
})

})
}

exports.updateManyCollection = function (collectionName, criteria, updateDoc, upsert = true, arrayFilters = {}) {

return new Promise(function (resolve, reject) {
var coll = model.getModel(collectionName);
coll.updateMany(criteria, updateDoc, { 'arrayFilters': arrayFilters, 'strict': false, 'upsert': upsert }, function (err, results) {
//coll.update({ UserId: '10000000484' }, { EmailNotificationStatus: 'Y' }, { 'multi': multi }, function (err, results) {
if (err)
reject(err)
else
resolve(results)
})

})
}

exports.checkIfFileExists = function (options) {

return new Promise(function (resolve, reject) {

gfs.exist(options, function (err, found) {
if (err)
reject(err)
found ? resolve(true) : resolve(false);
});

}
)

}


exports.getFile = function (options) {
return new Promise(function (resolve, reject) {

var readstream = gfs.createReadStream(options);


var myWritableStreamBuffer = new streamBuffers.WritableStreamBuffer({
initialSize: (100 * 1024), // start at 100 kilobytes.
incrementAmount: (10 * 1024) // grow by 10 kilobytes each time buffer overflows.
});

//myWritableStreamBuffer.write('ASDF');
//myWritableStreamBuffer.end();
//console.log(myWritableStreamBuffer.getContentsAsString());
readstream.pipe(myWritableStreamBuffer);
var data = '';

//error handling, e.g. file does not exist
readstream.on('error', function (err) {
console.log('An error occurred!', err);
reject(err);
});

readstream.on('data', (chunk) => {
//myWritableStreamBuffer.write(chunk);
console.log("chunk" + chunk);
//decoder.write(chunk);
//data=myWritableStreamBuffer.getContentsAsString("utf-8");
data = data + chunk.toString('utf8');

});

readstream.on('end', () => {
myWritableStreamBuffer.end();
resolve(data);
});




})

}



exports.db = db;
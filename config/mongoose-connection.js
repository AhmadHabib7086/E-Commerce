const mongoose =require('mongoose');
const config =require('config');

const dbgr =require('debug') ('development:mongoose');

mongoose.connect(`${config.get("MONGODB_URI")}/ecommerceDb`)
.then(function() {
    dbgr('connected to mongodb');

})

.catch(function(err){
    dbgr('error in mongodb connection' +err);
});

module.exports = mongoose.connection;
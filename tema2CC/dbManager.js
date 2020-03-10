function DbManager(){
    function insertDocuments(db,data,collName,callback){
        const coll = db.collection(collName);
        coll.insertMany(data,(err,res)=>{
            if(err !== null){
                throw err;
            }
            callback(res);
        });
    }

    function findDocuments(db,collName,filter,callback){
        const coll = db.collection(collName);
        console.log(collName,filter);
        coll.find(filter).toArray(function(err,docs){
            callback(docs);
        });
    }

    function updateDocument(db,collName,filter,changeTo,callback){
        const coll = db.collection(collName);
        coll.updateMany(filter,{$set:changeTo},(err,res)=>{
            if(err !== null){
                throw err;
            }
            callback(res);
        });
    }

    function removeDocument(db,collName,filter,callback){
        const coll = db.collection(collName);
        coll.deleteOne(filter,(err,res)=>{
            if(err !== null){
                throw err;
            }
            callback(res);
        });
    }

    function removeMore(db,collName,filter,callback){
        const coll = db.collection(collName);
        coll.deleteMany(filter,(err,res)=>{
            if(err !== null){
                throw err;
            }
            callback(res);
        });
    }

    

    return {
        insertDocuments:insertDocuments,
        findDocuments:findDocuments,
        updateDocument:updateDocument,
        removeDocument:removeDocument,
        removeMore:removeMore
    };
}

module.exports = DbManager;
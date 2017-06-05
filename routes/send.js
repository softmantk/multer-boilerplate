var express = require('express');
var mongodb = require('mongodb').MongoClient;
var multer  = require('multer');

var url = 'mongodb://localhost:27017/simplemean';
var router = express.Router();


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/upl/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

var upload = multer({
    storage: storage
});



/* GET users listing. */
router.post('/',upload.single('file'),  function(req, res) {


  /*  console.log("file: ", req.file);
    console.log("Body:",req.body);
*/
    var obj = {
        title: req.body.title,
        path: req.file.filename
    };

    console.log(req.file.path)
    mongodb.connect(url, function (err, db) {
        if (err)
            throw err


        var doc = db.collection('docs');

        doc.insertOne(obj, function (err, data) {
            if(err)
                throw err
            console.log("data:"+data)
        });


        db.close();
    });

    
  res.send("<title>"+obj.title+" </title><img heigh='300px' width='100px' src='upl/"+req.file.filename+"'>");
});

module.exports = router;

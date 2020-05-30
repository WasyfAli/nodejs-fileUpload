const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;



//multer settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myload')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage }).single('profilepic');



//setup for EJS
app.set('view engine', 'ejs');
//static folder
app.use(express.static('./public'));

app.get('/', (req,res) => {
    res.render('index')
})

//Description
app.post('/upload', (req,res) => {
    upload(req, res, (error) => {
        if(error) {
            res.render('index', {
                message: error
            })
        }
        else {
            res.render('index', {
                message: 'Successfully uploaded!',
                fileName: `myload/${req.file.filename}`
            })
        }
    })
 })


app.listen(port, () => console.log(`Server running at ${port}`))
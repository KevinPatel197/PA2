const express = require ('express')
const app = express()
const multer = require('multer')
const port = 6969
let fs = require('fs')
let path = require('path')

let Storage = multer.diskStorage({

    destination: (req,file,callback)=>{
        const destinationFolder = './uploads'
        if(fs.existsSync(destinationFolder))
        {
            callback(null, destinationFolder)
        }
        else
        {
            fs.mkdir(destinationFolder,(err)=>{
                err ? console.error(err.stack) : callback(null, destinationFolder)
            })
        }
    },
    filename: (req, file, callback)=>{
        callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

})

const acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg", "image/gif"]

let upload = multer({
    storage: Storage, fileFilter: (req, file, callback) => {
        if (acceptedTypes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(null, false)
            return callback(`only ${acceptedTypes.toString(',')} format allowed`)
        }
    }
})

app.post('/singlefile', upload.single('singleFile'), (req, res) => {
    return res.send('file is uploaded');
})

app.post('/multiplefiles', upload.array('multipleFiles', 4), (req, res) => {
    return res.send('files uploaded successfully.');
})

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/views/index.html');
})

app.use(function (err, req, res, next) {
    if (err instanceof multer.MulterError) {
        console.log("ERRRR");
        res.status(500).send("file upload  err " + err.message);
    }
    else
        next(err);
});

app.listen(port,()=>{
    console.log(`🚀 Server running on port ${port}`)
})
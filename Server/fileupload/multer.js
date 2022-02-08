const multer = require('multer');
const path = require('path');

// //check file type
// function checkFileType(file, cb){
//     //allowed extention
//     const filetypes = /jpeg|jpg|png|gif/;
//     //check extention
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     console.log("extname", extname);
//     //check mimetype
//     const mimetype = filetypes.test(file.mimetype);
//     console.timeLog("mimetype", mimetype)
//     if(mimetype &&  extname){
//         return cb(null, true)
//     }
//     else{
//         cb("Error: Images Only!!")
//     }
// }

//Multer Config
module.exports = multer({
    storage: multer.diskStorage({}),
    limits: {
            fieldNameSize: 200,
            fileSize: 5 * 1024 * 1024,
        },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.pdf' && ext !== '.doc' && ext !== '.txt' && ext !== '.docx'){
            cb(new Error("File Type is Not supported"), false);
            return;
        }
        cb(null, true)
    }
});

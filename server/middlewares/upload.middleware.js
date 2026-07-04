const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/ids");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + Math.round(Math.random() * 1e9) +
                path.extname(file.originalname)
        )
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = [".pdf", ".jpg", ".jpeg", ".png"];

    const ext = path.extname(file.originalname).toLowerCase();

    if(allowed.includes(ext)){
        cb(null, true);
    }else{
        cb(new Error("Invalid file type."))
    }
};

const upload = multer({
    storage,
    limits:{
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
});

module.exports = upload;
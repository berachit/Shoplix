import multer from "multer";

const storage = multer.diskStorage({
  // tells what should be the uploaded file name
  // Parameters:
  // req → request object
  // file → uploaded file info
  // callback → function used to finalize filename
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

export const upload = multer({ storage });

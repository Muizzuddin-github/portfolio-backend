import multer from "multer";
import ResponseErr from "../responses/error";

const filter = function (req: any, file: Express.Multer.File, cb: any) {
  var allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedMimes.includes(file.mimetype)) {
    cb(new ResponseErr(400, "Ext file not allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: filter,
});

export default upload;

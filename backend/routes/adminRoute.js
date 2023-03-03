import { Router } from "express";
import { addProduct, adminLogin,deleteProduct,forgetPassword,getBusinessData } from "../controllers/adminController.js";
import multer from "multer";

// Create a disk storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
  });
  
  // Create a Multer instance with the disk storage
  const upload = multer({ storage });

const router = Router();

router.route('/login').post(adminLogin);
router.route('/forget-password').post(forgetPassword);
router.route('/business-data').get(getBusinessData);
router.route('/add-product').post(upload.fields([{name: 'files', maxCount:5}, {name: 'primaryImage', maxCount: 1}]),addProduct);
router.route('/delete-product').delete(deleteProduct);

export default router;
import { Router } from "express";
import { addProduct, adminLogin,deleteProduct,forgetPassword,getBusinessData, getSellers, getUsers, removeSeller, removeUser, salesGraph, updateProduct } from "../controllers/adminController.js";
import multer from "multer";
import { randomUUID } from "crypto";
import auth from "../middlewares/auth.js";

// Create a disk storage for Multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, `${file.fieldname}-${randomUUID()}-${Date.now()}.${ext}`);
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
router.route('/update-product/:_id').patch(updateProduct);
router.route('/get-users').get(auth,getUsers);
router.route('/remove-user/:_id').delete(removeUser);
router.route('/get-sellers').get(getSellers);
router.route('/remove-seller/:_id').delete(removeSeller);
router.route('/get-sales/:days').get(salesGraph);
router.route('/get-sales').get(salesGraph);

export default router;
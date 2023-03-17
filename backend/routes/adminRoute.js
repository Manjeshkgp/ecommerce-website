import { Router } from "express";
import { addProduct, adminLogin,allOrdersGraph,deleteProduct,forgetPassword,getBusinessData, getOrders, getRevenueByMonth, getSellers, getTotalRevenue, getUsers, orderCancel, orderToSale, removeSeller, removeUser, salesGraph, totalRevenueAccordingToDate, updateProduct, verifyMe } from "../controllers/adminController.js";
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
router.route('/verify').post(auth,verifyMe);
router.route('/forget-password').post(auth,forgetPassword);
router.route('/business-data').get(auth,getBusinessData);
router.route('/add-product').post(auth,upload.fields([{name: 'files', maxCount:5}, {name: 'primaryImage', maxCount: 1}]),addProduct);
router.route('/delete-product').delete(auth,deleteProduct);
router.route('/update-product/:_id').patch(auth,updateProduct);
router.route('/get-users').get(auth,getUsers);
router.route('/remove-user/:_id').delete(auth,removeUser);
router.route('/get-sellers').get(getSellers);
router.route('/remove-seller/:_id').delete(removeSeller);
router.route('/get-sales/:days').get(auth,salesGraph);
router.route('/get-sales').get(auth,salesGraph);
router.route('/orders').get(auth,getOrders);
router.route('/order-to-sale/:_id').patch(auth,orderToSale);
router.route('/order-cancel/:_id').patch(auth,orderCancel);
router.route('/all-orders-graph/:days').get(auth,allOrdersGraph);
router.route('/all-orders-graph/').get(auth,allOrdersGraph);
router.route('/total-revenue').get(auth,getTotalRevenue);
router.route('/total-revenue/:date1/:date2').get(auth,totalRevenueAccordingToDate);
router.route('/revenue-by-month/:year').get(getRevenueByMonth); // under construction for later

export default router;
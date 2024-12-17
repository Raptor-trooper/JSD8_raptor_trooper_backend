import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  checkRole
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  addProduct,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", adminAuth, singleProduct);
productRouter.post("/checkrole", adminAuth, checkRole);

productRouter.get("/list", listProducts);


export default productRouter;

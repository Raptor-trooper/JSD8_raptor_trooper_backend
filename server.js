import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// import swaggerUi from "swagger-ui-express";
// import swaggerFile from './swagger-output.json' with { type: 'json' };

const app = express();
const port = 4000;

connectDB();
connectCloudinary();

app.use(express.json());

const allowedOrigins = [
  // "https://admin-seven-coral.vercel.app",
  // "https://user-six-bay.vercel.app",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => res.send("API Working"));

app.listen(port, () =>
  console.log("Server started on PORT : http://localhost:" + port + " 🌎👋")
);

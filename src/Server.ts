import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import session from "express-session";
import allRoute from "./routes/allRoutes";
import userRoute from "./routes/userRoutes";

dotenv.config();
mongoose.set('strictQuery', true);

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true }));

app.use(session({
   secret: 'your_secret_key',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: false } 
}));

app.use('/api/auth', allRoute);
app.use('/api', userRoute);

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB');
    const port: string | undefined = process.env.PORT;
    if (!port) {
      console.error('Port not specified in environment variables');
      process.exit(1);
    }
    app.listen(parseInt(port), () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error: any) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connect();

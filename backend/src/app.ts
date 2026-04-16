import express from "express";
import cors from "cors";
import employeeRouter from "./routes/employeeRoutes";
import organizationRouter from "./routes/organizationRoutes";

const app = express();
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "http://localhost:5173,http://127.0.0.1:5173")
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

app.use(express.json());
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
				return;
			}

			callback(new Error("Origin not allowed by CORS."));
		},
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);
app.use("/api", employeeRouter);
app.use("/api", organizationRouter);

export default app;

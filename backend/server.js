import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://finsight-5hpf.vercel.app",
  "https://finsight-5hpf-git-main-viktor-angelo.vercel.app",
  "https://finsight-5hpf-2zmercgql-viktor-angelo.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/users", userRoutes);
app.use("/financas", financeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
// import { connectRedis } from "./app/config/config.redis";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to Database!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening on port: ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
//   await connectRedis();
  await startServer();
  // await seedSuperAdmin();
})();

// unhandled rejection error handle
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection Detected ... Server shutting down ...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaught rejection error handle
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception Detected ... Server shutting down ...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// creating uncaught rejection error for testing
// throw new Error("I forgot to handle this error!");

// signal termination sigterm
process.on("SIGTERM", () => {
  console.log("SIGTERM Signal received... Server sutting down ...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// this will execute when we close the server using Ctrl+C.
process.on("SIGINT", () => {
  console.log("SIGINT Signal received... Server sutting down ...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

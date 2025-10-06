// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// const db = mysql.createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "Krrish@567",
//   database: process.env.DB_NAME || "event_management",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// export default db;
// // backend/config/db.js
// // import pkg from "pg";
// // import dotenv from "dotenv";

// // dotenv.config();
// // const { Pool } = pkg;

// // // ✅ Use Render DATABASE_URL for both local and production
// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL, // Render DB URL
// //   ssl: {
// //     rejectUnauthorized: false, // Render ke liye SSL required
// //   },
// // });

// // // Test connection
// // pool.connect()
// //   .then(() => console.log("✅ Connected to PostgreSQL"))
// //   .catch((err) => console.error("❌ PostgreSQL connection error:", err));
// import pkg from "pg";
// import dotenv from "dotenv";

// dotenv.config(); // load .env

// const { Pool } = pkg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // use Render DB
//   ssl: { rejectUnauthorized: false }, // mandatory for Render PostgreSQL
// });

// pool.connect()
//   .then(() => console.log("✅ Connected to Render PostgreSQL"))
//   .catch((err) => console.error("❌ PostgreSQL connection error:", err));

// export default pool;

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Port ko hamesha number format mein hona chahiye, par process.env string deta hai.
// Railway par MYSQL_PORT set hai (Screenshot 378 mein dikha).
const dbPort = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;

const db = mysql.createPool({
    // HOST: Railway ka variable (MYSQL_HOST) ya local (localhost)
    host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
    
    // USER: Railway ka variable (MYSQL_USER) ya local (root)
    user: process.env.MYSQL_USER || process.env.DB_USER || "root",
    
    // PASSWORD: Railway ka variable (MYSQL_PASSWORD) ya local password
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "Krrish@567",
    
    // DATABASE NAME: Railway ka variable (MYSQL_DATABASE) ya local name
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "event_management",

    // Port ko number format mein bhejein
    port: dbPort, 

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// ⚡ CRITICAL STEP: Connection Test and Crash Prevention
// Pool create hote hi ek dummy query chala kar connection test karte hain.
// Agar connection fail hua, toh yeh try/catch block server ko crash hone se bachayega,
// aur humein asli error log mein dikhega.
(async () => {
    try {
        await db.query("SELECT 1");
        console.log("✅ Database connection successful!");
    } catch (error) {
        // Agar yahan error aaya toh iska matlab hai ki connection string galat hai.
        console.error("❌ FATAL ERROR: Could not connect to the database:", error.message);
        // Container ko crash hone se bachane ke liye, hum yahan se throw nahi karenge.
        // Server chalega, lekin API call hone par error dega, jiska hum log mein pata laga sakte hain.
    }
})();

export default db;

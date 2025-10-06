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

const db = mysql.createPool({
    // Sabse pehle Railway ke variables ko use karein.
    // Agar woh available nahi hain (jaise local par), toh DB_HOST/local values use honge.
    
    // HOST: Railway ka variable (MYSQL_HOST) ya local (localhost)
    host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
    
    // USER: Railway ka variable (MYSQL_USER) ya local (root)
    user: process.env.MYSQL_USER || process.env.DB_USER || "root",
    
    // PASSWORD: Railway ka variable (MYSQL_PASSWORD) ya local password
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "Krrish@567",
    
    // DATABASE NAME: Railway ka variable (MYSQL_DATABASE) ya local name
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "event_management",

    // Optional: Port bhi add kar dein, agar Railway de raha hai toh use karein
    port: process.env.MYSQL_PORT, 

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default db;
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




// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// // Port ko hamesha number format mein hona chahiye, par process.env string deta hai.
// // Railway par MYSQL_PORT set hai (Screenshot 378 mein dikha).
// // parseInt function se string ko number mein badalte hain.
// const dbPort = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;

// // Final DB Connection Configuration
// const db = mysql.createPool({
//     // HOST: Railway ka variable (MYSQL_HOST) ya local (localhost)
//     host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
    
//     // USER: Railway ka variable (MYSQL_USER) ya local (root)
//     user: process.env.MYSQL_USER || process.env.DB_USER || "root",
    
//     // PASSWORD: Railway ka variable (MYSQL_PASSWORD) ya local password
//     password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "Krrish@567",
    
//     // DATABASE NAME: Railway ka variable (MYSQL_DATABASE) ya local name
//     database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "event_management",

//     // Port ko number format mein bhejein
//     port: dbPort, 

//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// // IMPORTANT: Humne yahan se (async () => { await db.query("SELECT 1"); ... }) hata diya hai.
// // Isse server start hote waqt crash nahi hoga.
// // Database connection error ab API call hone par hi aayega, jise hum Express error handler mein dekh sakenge.

// export default db;

// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// // Port ko hamesha number format mein hona chahiye, par process.env string deta hai.
// // Railway par MYSQL_PORT set hai.
// // parseInt function se string ko number mein badalte hain.
// const dbPort = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;

// // Final DB Connection Configuration
// const db = mysql.createPool({
//     // HOST: Railway ka variable (MYSQL_HOST) ya local (localhost)
//     host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
//     
//     // USER: Railway ka variable (MYSQL_USER) ya local (root)
//     user: process.env.MYSQL_USER || process.env.DB_USER || "root",
//     
//     // PASSWORD: Railway ka variable (MYSQL_PASSWORD) ya local password
//     password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "Krrish@567",
//     
//     // DATABASE NAME: Railway ka variable (MYSQL_DATABASE) ya local name
//     database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "event_management",

//     // Port ko number format mein bhejein
//     port: dbPort, 

//     // 🔑 ETIMEDOUT FIX: SSL/TLS Configuration Added for Public Connection
//     // Public network connections (jaise Railway ka proxy) ko secure banane ke liye yeh zaroori hai.
//     ssl: {
//         rejectUnauthorized: false
//     },
//     // 🔑 FIX ENDS

//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// // IMPORTANT: Humne yahan se (async () => { await db.query("SELECT 1"); ... }) hata diya hai.
// // Isse server start hote waqt crash nahi hoga.
// // Database connection error ab API call hone par hi aayega, jise hum Express error handler mein dekh sakenge.

// export default db;


import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Port ko number format mein change karte hain
const dbPort = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;

// Database URL ko prefer karte hain, agar available ho.
// Yeh Railway par sabse zyada reliable tareeka hai.
const connectionUrl = process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL;

// Final DB Connection Pool Configuration
const dbConfig = connectionUrl ? 
    // Option 1: Agar URL available hai (Cloud environment)
    {
        uri: connectionUrl,
        // SSL/TLS settings for Vercel/Railway ETIMEDOUT fix
        ssl: {
            rejectUnauthorized: false
        },
        // Additional settings
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    }
    : 
    // Option 2: Agar URL available nahi hai (Local environment)
    {
        // HOST: Railway ka variable ya local (localhost)
        host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
        
        // USER: Railway ka variable ya local (root)
        user: process.env.MYSQL_USER || process.env.DB_USER || "root",
        
        // PASSWORD: Railway ka variable ya local password
        password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "Krrish@567",
        
        // DATABASE NAME: Railway ka variable ya local name
        database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "event_management",

        // Port ko number format mein bhejein
        port: dbPort, 

        // Connection pool settings
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    };

// Connection Pool banao
const db = mysql.createPool(dbConfig);

export default db;
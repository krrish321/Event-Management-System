// import { NextResponse } from "next/server";
// import mysql from "mysql2/promise";

// // Database connection
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "Krrish@567",
//   database: process.env.DB_NAME || "event_management",
// });

// // GET request -> saare events laana
// export async function GET() {
//   try {
//     const [rows] = await pool.query("SELECT * FROM events");
//     return NextResponse.json(rows);
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Error fetching events", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// // POST request -> naya event create karna
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { eventName, description, startDate, endDate, startTime, endTime } = body;

//     if (!eventName || !startDate || !endDate) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     await pool.query(
//       "INSERT INTO events (eventName, description, startDate, endDate, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)",
//       [eventName, description, startDate, endDate, startTime, endTime]
//     );

//     return NextResponse.json({ message: "Event created successfully" }, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Error creating event", details: error.message },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import mysql from "mysql2/promise";

// // Database connection pool
// const pool = mysql.createPool({
//  host: process.env.DB_HOST || "localhost",
//    user: process.env.DB_USER || "root",
//    password: process.env.DB_PASSWORD || "Krrish@567",
//  database: process.env.DB_NAME || "event_management",
// });

// // GET -> fetch all events
// export async function GET() {
//   try {
//     const [rows] = await pool.query("SELECT * FROM events");
//     return NextResponse.json(rows);
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Error fetching events", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// // POST -> add new event
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { eventName, description, startDate, endDate, startTime, endTime, location, level, eventType, assignedUser } = body;

//     if (!eventName || !startDate || !endDate) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     await pool.query(
//       `INSERT INTO events 
//       (eventName, description, startDate, endDate, startTime, endTime, location, level, eventType, assignedUser)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [eventName, description, startDate, endDate, startTime, endTime, location, level, eventType, assignedUser]
//     );

//     return NextResponse.json({ message: "Event created successfully" }, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Error creating event", details: error.message },
//       { status: 500 }
//     );
//   }
// }


// // import { NextResponse } from "next/server";
// // import { Pool } from "pg";

// // // ✅ PostgreSQL Pool Config
// // const pool = new Pool({
// //   host: process.env.DB_HOST || "localhost",
// //   user: process.env.DB_USER || "postgres",
// //   password: process.env.DB_PASSWORD || "",
// //   database: process.env.DB_NAME || "event_management",
// //   port: Number(process.env.DB_PORT) || 5432,
// //   ssl:
// //     process.env.NODE_ENV === "production"
// //       ? { rejectUnauthorized: false } // Render (Production)
// //       : false, // Local me SSL nahi chahiye
// // });

// // // ✅ GET all events
// // export async function GET() {
// //   try {
// //     const result = await pool.query("SELECT * FROM events");
// //     return NextResponse.json(result.rows, { status: 200 });
// //   } catch (err) {
// //     console.error("GET Error:", err);
// //     return NextResponse.json(
// //       { error: "Failed to fetch events" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // ✅ POST new event
// // export async function POST(req: Request) {
// //   try {
// //     const data = await req.json();
// //     console.log("Event Data Received:", data);

// //     const {
// //       eventName,
// //       description,
// //       startDate,
// //       startTime,
// //       endDate,
// //       endTime,
// //       issueDate,
// //       location,
// //       eventType,
// //       level,
// //       assignedUser,
// //     } = data;

// //     const start_datetime = `${startDate} ${startTime}`;
// //     const end_datetime = `${endDate} ${endTime}`;

// //     // PostgreSQL INSERT with placeholders
// //     const insertQuery = `
// //       INSERT INTO events 
// //       (name, description, start_datetime, end_datetime, issue_date, location, event_type, level, created_by) 
// //       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
// //       RETURNING id
// //     `;

// //     const values = [
// //       eventName,
// //       description,
// //       start_datetime,
// //       end_datetime,
// //       issueDate,
// //       location,
// //       eventType,
// //       level,
// //       assignedUser,
// //     ];

// //     const result = await pool.query(insertQuery, values);

// //     return NextResponse.json(
// //       {
// //         message: "Event created successfully!",
// //         eventId: result.rows[0].id,
// //       },
// //       { status: 201 }
// //     );
// //   } catch (err) {
// //     console.error("POST Error:", err);
// //     return NextResponse.json(
// //       { error: "Something went wrong" },
// //       { status: 500 }
// //     );
// //   }
// // }


// import { NextResponse } from "next/server";
// import pool from "@/backend/config/db";

// // GET all events
// export async function GET() {
//   try {
//     const result = await pool.query("SELECT * FROM events");
//     return NextResponse.json(result.rows, { status: 200 });
//   } catch (err) {
//     console.error("GET Error:", err);
//     return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
//   }
// }

// // POST new event
// export async function POST(req: Request) { // ✅ Add type here
//   try {
//     const data = await req.json();

//     const {
//       eventName,
//       description,
//       startDate,
//       startTime,
//       endDate,
//       endTime,
//       issueDate,
//       location,
//       eventType,
//       level,
//       assignedUser,
//     } = data;

//     const start_datetime = `${startDate} ${startTime}`;
//     const end_datetime = `${endDate} ${endTime}`;

//     const insertQuery = `
//       INSERT INTO events 
//       (name, description, start_datetime, end_datetime, issue_date, location, event_type, level, created_by)
//       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
//       RETURNING id
//     `;

//     const values = [
//       eventName,
//       description,
//       start_datetime,
//       end_datetime,
//       issueDate,
//       location,
//       eventType,
//       level,
//       assignedUser,
//     ];

//     const result = await pool.query(insertQuery, values);

//     return NextResponse.json(
//       { message: "Event created successfully!", eventId: result.rows[0].id },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("POST Error:", err);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }


// import mysql from 'mysql2/promise';
// import { NextResponse } from 'next/server';

// const dbConfig = {
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "Krrish@567",
//   database: process.env.DB_NAME || "event_management",
// };

// // ✅ GET all events
// export async function GET() {
//   try {
//     const connection = await mysql.createConnection(dbConfig);
//     const [rows] = await connection.execute("SELECT * FROM events");
//     await connection.end();

//     return NextResponse.json(rows, { status: 200 });
//   } catch (err) {
//     console.error("GET Error:", err);
//     return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
//   }
// }

// // ✅ POST new event
// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     console.log("Event Data Received:", data);

//     const connection = await mysql.createConnection(dbConfig);

//     const {
//       eventName,
//       description,
//       startDate,
//       startTime,
//       endDate,
//       endTime,
//       issueDate,
//       location,
//       eventType,
//       level,
//       assignedUser,
//     } = data;

//     const start_datetime = `${startDate} ${startTime}`;
//     const end_datetime = `${endDate} ${endTime}`;

//     const [result] = await connection.execute(
//       `INSERT INTO events 
//       (name, description, start_datetime, end_datetime, issue_date, location, event_type, level, created_by) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [eventName, description, start_datetime, end_datetime, issueDate, location, eventType, level, assignedUser]
//     );

//     await connection.end();

//     return NextResponse.json(
//       { message: "Event created successfully!", eventId: (result as any).insertId },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("POST Error:", err);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }

// import mysql from 'mysql2/promise';
// import { NextResponse } from 'next/server';

// // Railway provides environment variables with MYSQL_ prefix (e.g., MYSQL_HOST, MYSQL_PORT)
// // hum in variables ko prefer karenge agar woh available hain, warna local defaults use karenge.
// const dbConfig = {
//     // HOST: Railway (MYSQL_HOST) ya local (DB_HOST/localhost)
//     host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
    
//     // USER: Railway (MYSQL_USER) ya local (DB_USER/root)
//     user: process.env.MYSQL_USER || process.env.DB_USER || "root",
    
//     // PASSWORD: Railway (MYSQL_PASSWORD) ya local password
//     password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "Krrish@567",
    
//     // DATABASE NAME: Railway (MYSQL_DATABASE) ya local name
//     database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "event_management",
    
//     // PORT: Railway (MYSQL_PORT) ya default (3306). Number mein convert karna zaruri hai.
//     port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
// };


// // ✅ GET all events
// export async function GET() {
//     let connection;
//     try {
//         // Ek naya connection pool ya connection banao
//         connection = await mysql.createConnection(dbConfig);
//         const [rows] = await connection.execute("SELECT * FROM events ORDER BY start_datetime DESC");
        
//         return NextResponse.json(rows, { status: 200 });
//     } catch (err) {
//         // 🔥 CRITICAL: Yahan hum exact error ko server logs mein print kar rahe hain.
//         console.error("GET Error - Database Connection/Query Failed:", (err as Error).message);
//         return NextResponse.json({ error: "Failed to fetch events. Check server logs for DB error." }, { status: 500 });
//     } finally {
//         // Connection ko hamesha close karna zaruri hai
//         if (connection) {
//             await connection.end();
//         }
//     }
// }

// // ✅ POST new event
// export async function POST(req: Request) {
//     let connection;
//     try {
//         const data = await req.json();
        
//         // Ensure data exists and basic fields are present
//         if (!data || !data.eventName || !data.startDate) {
//             return NextResponse.json({ message: "Missing required fields (eventName, startDate)" }, { status: 400 });
//         }

//         connection = await mysql.createConnection(dbConfig);

//         const {
//             eventName,
//             description,
//             startDate,
//             startTime,
//             endDate,
//             endTime,
//             issueDate,
//             location,
//             eventType,
//             level,
//             assignedUser,
//         } = data;

//         const start_datetime = `${startDate} ${startTime}`;
//         const end_datetime = `${endDate} ${endTime}`;

//         const query = `
//             INSERT INTO events 
//             (name, description, start_datetime, end_datetime, issue_date, location, event_type, level, created_by) 
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         const values = [eventName, description, start_datetime, end_datetime, issueDate, location, eventType, level, assignedUser];
        
//         const [result] = await connection.execute(query, values);

//         return NextResponse.json(
//             { message: "Event created successfully!", eventId: (result as any).insertId },
//             { status: 201 }
//         );
//     } catch (err) {
//         // 🔥 CRITICAL: Yahan hum exact error ko server logs mein print kar rahe hain.
//         console.error("POST Error - Database Connection/Query Failed:", (err as Error).message);
//         return NextResponse.json({ error: "Something went wrong during event creation. Check server logs for DB error." }, { status: 500 });
//     } finally {
//         // Connection ko hamesha close karna zaruri hai
//         if (connection) {
//             await connection.end();
//         }
//     }
// }


import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

// Railway provides environment variables with MYSQL_ prefix (e.g., MYSQL_HOST, MYSQL_PORT)
// hum in variables ko prefer karenge agar woh available hain, warna local defaults use karenge.
const dbConfig = {
    // HOST: Railway (MYSQL_HOST) ya local (DB_HOST/localhost)
    host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
    
    // USER: Railway (MYSQL_USER) ya local (DB_USER/root)
    user: process.env.MYSQL_USER || process.env.DB_USER || "root",
    
    // PASSWORD: Railway (MYSQL_PASSWORD) ya local password
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "Krrish@567",
    
    // DATABASE NAME: Railway (MYSQL_DATABASE) ya local name
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "event_management",
    
    // PORT: Railway (MYSQL_PORT) ya default (3306). Number mein convert karna zaruri hai.
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,

    // 🔥 FIXES FOR RAILWAY/VERCEL CLOUD DEPLOYMENT 🔥
    // Timezone ko 'Z' (Zulu/UTC) par set karna
    timezone: 'Z',
    // SSL connection enable karna (Railway ke liye zaroori)
    ssl: {
        rejectUnauthorized: true,
    },
};


// ✅ GET all events
export async function GET() {
    let connection;
    try {
        // Ek naya connection pool ya connection banao
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT * FROM events ORDER BY start_datetime DESC");
        
        return NextResponse.json(rows, { status: 200 });
    } catch (err) {
        // 🔥 CRITICAL: Yahan hum exact error ko server logs mein print kar rahe hain.
        console.error("GET Error - Database Connection/Query Failed:", (err as Error).message);
        return NextResponse.json({ error: "Failed to fetch events. Check server logs for DB error." }, { status: 500 });
    } finally {
        // Connection ko hamesha close karna zaruri hai
        if (connection) {
            await connection.end();
        }
    }
}

// ✅ POST new event
export async function POST(req: Request) {
    let connection;
    try {
        const data = await req.json();
        
        // Ensure data exists and basic fields are present
        if (!data || !data.eventName || !data.startDate) {
            return NextResponse.json({ message: "Missing required fields (eventName, startDate)" }, { status: 400 });
        }

        connection = await mysql.createConnection(dbConfig);

        const {
            eventName,
            description,
            startDate,
            startTime,
            endDate,
            endTime,
            issueDate,
            location,
            eventType,
            level,
            assignedUser,
        } = data;

        const start_datetime = `${startDate} ${startTime}`;
        const end_datetime = `${endDate} ${endTime}`;

        const query = `
            INSERT INTO events 
            (name, description, start_datetime, end_datetime, issue_date, location, event_type, level, created_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [eventName, description, start_datetime, end_datetime, issueDate, location, eventType, level, assignedUser];
        
        const [result] = await connection.execute(query, values);

        return NextResponse.json(
            { message: "Event created successfully!", eventId: (result as any).insertId },
            { status: 201 }
        );
    } catch (err) {
        // 🔥 CRITICAL: Yahan hum exact error ko server logs mein print kar rahe hain.
        console.error("POST Error - Database Connection/Query Failed:", (err as Error).message);
        return NextResponse.json({ error: "Something went wrong during event creation. Check server logs for DB error." }, { status: 500 });
    } finally {
        // Connection ko hamesha close karna zaruri hai
        if (connection) {
            await connection.end();
        }
    }
}
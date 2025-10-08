// import { NextResponse } from "next/server";
// import db from "../../../../backend/config/db.js";


// // ✅ Get single event by ID
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;
//   try {
//     const [rows]: any = await db.execute("SELECT * FROM events WHERE id = ?", [id]);

//     if (rows.length === 0) {
//       return NextResponse.json({ message: "Event not found" }, { status: 404 });
//     }

//     return NextResponse.json(rows[0], { status: 200 });
//   } catch (error: any) {
//     console.error("GET by ID Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // ✅ Update event by ID
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;
//   const data = await req.json();

//   const {
//     eventName,
//     description,
//     startDate,
//     startTime,
//     endDate,
//     endTime,
//     issueDate,
//     location,
//     eventType,
//     level,
//     assignedUser,
//   } = data;

//   const start_datetime = `${startDate} ${startTime}`;
//   const end_datetime = `${endDate} ${endTime}`;

//   try {
//     const [result]: any = await db.execute(
//       `UPDATE events 
//        SET name = ?, description = ?, start_datetime = ?, end_datetime = ?, issue_date = ?, location = ?, event_type = ?, level = ?, created_by = ?
//        WHERE id = ?`,
//       [
//         eventName,
//         description,
//         start_datetime,
//         end_datetime,
//         issueDate,
//         location,
//         eventType,
//         level,
//         assignedUser,
//         id,
//       ]
//     );

//     if (result.affectedRows === 0) {
//       return NextResponse.json({ message: "Event not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Event updated successfully!" }, { status: 200 });
//   } catch (error: any) {
//     console.error("PUT Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // ✅ Delete event by ID
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const [result]: any = await db.execute("DELETE FROM events WHERE id = ?", [id]);

//     if (result.affectedRows === 0) {
//       return NextResponse.json({ message: "Event not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Event deleted successfully!" }, { status: 200 });
//   } catch (error: any) {
//     console.error("DELETE Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import db from "../../../../backend/config/db.js";

// // ✅ Get single event by ID
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;
//   try {
//     const [rows]: any = await db.execute("SELECT * FROM events WHERE id = ?", [id]);

//     if (rows.length === 0) {
//       return NextResponse.json({ message: "Event not found" }, { status: 404 });
//     }

//     return NextResponse.json(rows[0], { status: 200 });
//   } catch (error: any) {
//     console.error("GET BY ID Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // ✅ Update event by ID
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     // ✅ Check content type
//     const contentType = req.headers.get("content-type") || "";
//     let body: any = {};

//     if (contentType.includes("application/json")) {
//       body = await req.json();
//     } else if (contentType.includes("multipart/form-data")) {
//       // FormData handling (placeholder)
//       // Note: Next.js 13 App Router does not parse multipart natively, use formidable/multer if needed
//       body = {}; // For now, frontend sends JSON first
//     }

//     const {
//       location = null,
//       startDate = null,
//       attendeesCount = null,
//       updatingDate = null,
//     } = body;

//     // ✅ Validate numeric field
//     const attendees_count_num =
//       attendeesCount !== null && attendeesCount !== undefined
//         ? parseInt(attendeesCount)
//         : null;

//     const [result]: any = await db.execute(
//       `UPDATE events 
//        SET location = ?, start_datetime = ?, attendees_count = ?, updated_at = ?
//        WHERE id = ?`,
//       [location || null, startDate || null, attendees_count_num, updatingDate || null, id]
//     );

//     if (result.affectedRows === 0) {
//       return NextResponse.json({ message: "Event not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Event updated successfully!" }, { status: 200 });
//   } catch (error: any) {
//     console.error("PUT Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';

// Railway backend ki base URL Environment Variable se milegi.
// Yeh Vercel function mein 'API_URL' variable set hone ke baad hi kaam karega.
const RAILWAY_API_URL = process.env.API_URL;

// Check karte hain ki variable set hai ya nahi (safety check)
if (!RAILWAY_API_URL) {
  console.error("❌ FATAL: API_URL environment variable is not set.");
}


/**
 * GET handler to fetch all events from the Railway backend.
 * Route: /api/events
 */
export async function GET(request: Request) {
  if (!RAILWAY_API_URL) {
    return NextResponse.json(
      { error: "API_URL configuration missing on server." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${RAILWAY_API_URL}/api/events`, {
      method: 'GET',
      // Ensure Vercel knows not to cache this data heavily (optional, but good practice)
      cache: 'no-store', 
    });

    if (!response.ok) {
      // Agar Railway se 4xx ya 5xx status aaya, toh use aage bhejein
      const errorText = await response.text();
      console.error(`❌ Backend error (${response.status}):`, errorText);
      return NextResponse.json(
        { error: `Backend API failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("❌ Error fetching from Railway backend:", error);
    // Vercel serverless function se koi unhandled network/fetch error
    return NextResponse.json(
      { error: "Failed to connect to the external API service." },
      { status: 500 }
    );
  }
}

/**
 * POST handler to create a new event.
 * Route: /api/events
 */
export async function POST(request: Request) {
  if (!RAILWAY_API_URL) {
    return NextResponse.json(
      { error: "API_URL configuration missing on server." },
      { status: 500 }
    );
  }
  
  try {
    const body = await request.json();

    const response = await fetch(`${RAILWAY_API_URL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Backend POST error (${response.status}):`, errorText);
      return NextResponse.json(
        { error: `Event creation failed at backend: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("❌ Error posting to Railway backend:", error);
    return NextResponse.json(
      { error: "Failed to process event creation request." },
      { status: 500 }
    );
  }
}
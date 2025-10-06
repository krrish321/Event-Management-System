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
import { NextResponse } from "next/server";

// Frontend ke liye live backend URL (jo Vercel variables se aayegi)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// --- Helper Function for Clean Fetching ---
const handleFetch = async (endpoint: string, options: RequestInit = {}) => {
  if (!API_BASE_URL) {
    // If NEXT_PUBLIC_API_URL is missing, return error
    return { error: "Backend API URL is not configured." };
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      // Backend se aaye hue error ko catch karein
      const errorData = await response.json().catch(() => ({ message: "Backend failed without JSON response." }));
      return { error: errorData.message || errorData.error || `Backend connection error: ${response.status}` };
    }

    return { data: await response.json() };

  } catch (error) {
    console.error("Network or Fetch Error:", error);
    return { error: "Failed to connect to the live backend server." };
  }
};
// ------------------------------------------


// ✅ Get all events (GET /api/events)
export async function GET() {
  // Railway Backend ke /api/events endpoint par GET request bhej rahe hain
  const { data, error } = await handleFetch("/api/events", { cache: 'no-store' });

  if (error) {
    console.error("Vercel GET Events Route Failed:", error);
    // Vercel se 500 status code return karein
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// ✅ Create new event (POST /api/events)
export async function POST(req: Request) {
  const body = await req.json();

  // Railway Backend ke /api/events endpoint par POST request bhej rahe hain
  const { data, error } = await handleFetch("/api/events", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (error) {
    console.error("Vercel POST Event Route Failed:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }

  // Backend se aaya hua success response return karein (usually 201)
  return NextResponse.json(data, { status: 201 });
}
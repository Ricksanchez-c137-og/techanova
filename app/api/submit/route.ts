import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Create a MySQL connection pool for better performance and connection reuse
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "alhosn",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "contactdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON body
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Use parameterized queries to prevent SQL errors
    const query = `
  INSERT INTO messages (name, email, subject, message)
  VALUES (${mysql.escape(name)}, ${mysql.escape(email)}, ${mysql.escape(subject)}, ${mysql.escape(message)})
`;
    const values = [name, email, subject, message];

    // Execute the query
    await pool.execute(query, values);

    // Return success response
    return NextResponse.json({ success: true, message: "Message received!" });
  } catch (error) {
    const err = error as Error;
    console.error("Database error:", err.message);

    // Return error response
    return NextResponse.json(
      { success: false, message: "Error saving message." },
      { status: 500 }
    );
  }
}

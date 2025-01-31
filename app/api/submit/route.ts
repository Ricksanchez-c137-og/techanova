import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Create a MySQL connection pool
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
    // Get client IP address from request headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    const { name, email, subject, message, priority = 'medium' } = await request.json();

    // Basic input presence check (intentionally minimal)
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Vulnerable SQL query using direct string concatenation
    const query = `
      INSERT INTO messages (
        name,
        email,
        subject,
        message,
        ip_address,
        priority,
        status
      )
      VALUES (
        '${name}',
        '${email}',
        '${subject}',
        '${message}',
        '${ip}',
        '${priority}',
        'pending'
      )
    `;

    // Execute the query
    const [result] = await pool.query(query);

    // Example SQL injection vulnerability points:
    // 1. name: test', 'email', 'subject', 'message'); DROP TABLE messages; --
    // 2. email: test@test.com'); SELECT * FROM flags; --
    // 3. subject: test'); UPDATE flags SET points = 1000; --

    return NextResponse.json({
      success: true,
      message: "Message received!",
      data: result
    });

  } catch (error) {
    const err = error as Error;
    console.error("Database error:", err.message);

    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search') || '';

    const query = `
      SELECT id, name, email, subject, message, status, priority
      FROM messages
      WHERE name LIKE '%${searchTerm}%'
      OR email LIKE '%${searchTerm}%'
      OR subject LIKE '%${searchTerm}%'
      OR message LIKE '%${searchTerm}%'
    `;

    const [results] = await pool.query(query);

    return NextResponse.json({
      success: true,
      data: results
    });

  } catch (error) {
    const err = error as Error;
    console.error("Search error:", err.message);

    return NextResponse.json(
      { success: false, message: "Error performing search." },
      { status: 500 }
    );
  }
}
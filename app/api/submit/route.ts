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

// Fix: Ensure connection before executing queries
async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Connected");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error);
  }
}
checkConnection();

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    const body = await request.json();
    const { name, email, subject, message, priority = 'medium' } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }
//Vuln 
    const query = `
  INSERT INTO messages (name, email, subject, message, ip_address, priority, status)
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

    const values = [name, email, subject || "", message, ip, priority];

    // Execute the query
    const [result] = await pool.query(query, values);

    return NextResponse.json({
      success: true,
      message: "Message received!",
      data: result,
    });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// 🚨 MySQL connection with multipleStatements enabled (Allows SQL Injection)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "alhosn",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "contactdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true, // 🚨 Allows stacked SQL injection
});

export async function POST(request: Request) {
  try {
    // Get client IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // 🚨 No Input Validation: Accepts anything!
    const { name, email, subject, message, priority = "medium" } = await request.json();

    // 🔥 SQL Injection Vulnerable Query (User input is directly concatenated)
    const query = `
      INSERT INTO messages (name, email, subject, message, ip_address, priority, status)
      VALUES ('${name}', '${email}', '${subject}', '${message}', '${ip}', '${priority}', 'pending');
    `;

    console.log("🔥 Executing SQL Query:", query); // Debugging log (shows injected query)

    // Execute the unsafe query
    const [result] = await pool.query(query);

    return NextResponse.json({
      success: true,
      message: "Message received!",
      data: result,
    });
  } catch (error) {
    console.error("❌ Database error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
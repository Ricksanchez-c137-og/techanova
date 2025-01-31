import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// 🚨 SQL Injection Vulnerable Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "alhosn",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "contactdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true, // 🚨 ALLOWS STACKED SQL INJECTION
});

export async function POST(request: Request) {
  try {
    // Get client IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // 🚨 No Input Validation (Fully Vulnerable)
    const { name, email, subject, message, priority = "medium" } = await request.json();

    // 🔥 Corrected Vulnerable SQL Query (Allows Injection)
    const query = `
      INSERT INTO messages (name, email, subject, message, ip_address, priority, status)
      VALUES ('${name}', '${email}', '${subject}', '${message}', '${ip}', '${priority}', 'pending');
    `;

    console.log("🔥 Executing SQL Query:", query);

    // Execute the vulnerable query
    await pool.query(query);

    // 🚨 Allow SQL Injection via Stored Procedures
    const procedureQuery = `
      CALL validate_flag('${subject}');
      CALL search_messages('${message}');
    `;

    await pool.query(procedureQuery);

    // 🚨 Detect SQL Injection Success
    const isInjection = /DROP TABLE|UPDATE users|DELETE FROM|SELECT \*/i.test(query + procedureQuery);

    let randomNumber = null;
    if (isInjection) {
      randomNumber = Math.floor(1000 + Math.random() * 900000); // Generates 4-6 digit number
      console.log("🚀 SQL Injection Detected! Generated Code:", randomNumber);
    }

    return NextResponse.json({
      success: true,
      message: "Message received!",
      injectionDetected: isInjection,
      secretCode: randomNumber,
    });

  } catch (error) {
    console.error("❌ Database error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

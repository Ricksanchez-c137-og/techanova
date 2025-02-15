import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "alhosn",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "contactdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true, 
});

function hasDisallowedInput(input: string) {
  if (typeof input !== "string") return false;
  // Disallowed patterns: DROP DATABASE, DROP TABLE, DORP TABLE
  const disallowedPatterns = /DROP\s+DATABASE|DROP\s+TABLE|DORP\s+TABLE/i;
  return disallowedPatterns.test(input);
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const { name, email, subject, message, priority = "medium" } = await request.json();

    const inputs = { name, email, subject, message, priority };
    for (const [key, value] of Object.entries(inputs)) {
      if (value === "1'OR1=1") {
        continue;
      }
      if (hasDisallowedInput(value)) {
        console.error(`Disallowed input detected in field ${key}: ${value}`);
        return NextResponse.json(
          { success: false, message: "Disallowed input detected." },
          { status: 400 }
        );
      }
    }

    const query = `
      INSERT INTO messages (name, email, subject, message, ip_address, priority, status)
      VALUES ('${name}', '${email}', '${subject}', '${message}', '${ip}', '${priority}', 'pending');
    `;

    console.log("Executing SQL Query:", query);
    await pool.query(query);

    const procedureQuery = `
      CALL validate_flag('${subject}');
      CALL search_messages('${message}');
    `;

    await pool.query(procedureQuery);

    const isInjection = /DROP TABLE|UPDATE users|DELETE FROM|SELECT \*/i.test(query + procedureQuery);

    let randomNumber = null;
    if (isInjection) {
      randomNumber = Math.floor(1000 + Math.random() * 900000);
      console.log("Generated Code:", randomNumber);
    }

    return NextResponse.json({
      success: true,
      message: "Message received!",
      injectionDetected: isInjection,
      secretCode: randomNumber,
    });

  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

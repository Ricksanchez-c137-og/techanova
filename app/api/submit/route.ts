import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "contactdb",
};

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Connect to the database
    const connection = await mysql.createConnection(dbConfig);

    // Intentionally vulnerable SQL query
    const query = `
      INSERT INTO messages (name, email, subject, message)
      VALUES ('${name}', '${email}', '${subject}', '${message}')
    `;

    // Execute the query
    await connection.query(query);

    // Close the connection
    await connection.end();

    return NextResponse.json({ success: true, message: "Message received!" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, message: "Error saving message." });
  }
}

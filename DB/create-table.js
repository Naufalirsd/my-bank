require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const deleteTable = await sql`DROP TABLE IF EXISTS note`;
        console.log("Table dropped:", deleteTable);

        const createTable = await sql`
        CREATE TABLE IF NOT EXISTS note (
            id SERIAL PRIMARY KEY,
            title VARCHAR(30) NOT NULL,
            contain VARCHAR(1500) NOT NULL,
            status INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        ) 
        `;
        console.log("Table created:", createTable);
    } catch (error) {
        console.log(error);
    }
}

execute();

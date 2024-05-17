require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
    try {
        const { rows } = await sql`
        UPDATE note 
        SET status = 1, updated_at = CURRENT_TIMESTAMP 
        WHERE id = 1
        RETURNING *
        `;
        console.log("Data updated:", rows);
    } catch (error) {
        console.log(error);
    }
    // UPDATE note
    // SET title = ${title}, contain = ${Contain} WHERE id = 1
}

execute();

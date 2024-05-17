const { sql } = require("@vercel/postgres");

async function insertData(req, res) {
    try {
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const { title, contain } = req.body;

        if (!title || !contain) {
            return res
                .status(400)
                .json({ message: "Title dan contain harus diisi" });
        }

        const rows = await sql`
            INSERT INTO note (title, contain)
            VALUES (${title}, ${contain})
            RETURNING *
        `;

        res.status(200).json({ message: "Success", data: rows[0] });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}

export default insertData;

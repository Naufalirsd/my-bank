const { sql } = require("@vercel/postgres");

async function updateData(req, res) {
    try {
        if (req.method !== "PUT") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const { id, title, contain } = req.body;

        if (!title || !contain || !id) {
            return res
                .status(400)
                .json({ message: "ID, title, dan contain harus diisi" });
        }

        const { rows } = await sql`
            UPDATE note 
            SET title = ${title}, contain = ${contain}, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ${id}
            RETURNING *
        `;

        if (rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.status(200).json({ message: "Success", data: rows[0] });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}

export default updateData;

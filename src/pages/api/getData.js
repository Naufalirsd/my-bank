const { sql } = require("@vercel/postgres");

async function getData(req, res) {
    try {
        if (req.method !== "GET") {
            return res
                .status(405)
                .json({ message: "Method tidak diperbolehkan" });
        }

        const { rows } = await sql`SELECT * FROM note`;

        res.status(200).json({ message: "Success", data: rows });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}

export default getData;

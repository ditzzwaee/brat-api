export default async function handler(req, res) {
    const { text = "BRAT", bg = "white", color = "black" } = req.query;

    // API luar yang langsung hasilkan gambar
    const apiUrl = `https://api.bratgenerator.com/create?text=${encodeURIComponent(text)}&bg=${bg}&color=${color}`;

    try {
        const response = await fetch(apiUrl);
        const buffer = await response.arrayBuffer();

        res.setHeader("Content-Type", "image/png");
        res.send(Buffer.from(buffer));
    } catch (err) {
        res.status(500).json({ error: "Gagal memproses gambar" });
    }
}

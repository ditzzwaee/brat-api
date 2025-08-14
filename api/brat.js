export default function handler(req, res) {
  const { text, bg = "white", color = "black" } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Parameter 'text' wajib diisi" });
  }

  const imageUrl = `https://api.bratgenerator.com/create?text=${encodeURIComponent(text)}&bg=${bg}&color=${color}&font=SANTO`;
  res.redirect(imageUrl);
}

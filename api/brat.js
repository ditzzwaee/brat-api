module.exports = (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).json({ error: 'Parameter "text" wajib diisi' });
  }

  // Contoh respons API sederhana (misal return gambar bratgenerator)
  const imageUrl = `https://bratgenerator.com/api?text=${encodeURIComponent(text)}`;
  
  res.status(200).json({
    status: 'success',
    text: text,
    image: imageUrl
  });
};

const express = require("express");
const { createCanvas, registerFont } = require("canvas");

const app = express();

// Daftarkan font (gunakan font bawaan atau upload ke folder fonts)
registerFont(__dirname + "/../fonts/SANTO.ttf", { family: "SANTO" });

app.get("/", (req, res) => {
    const text = req.query.text || "BRAT";
    const bgColor = req.query.bg || "white";
    const color = req.query.color || "black";
    const fontFamily = req.query.font || "SANTO";

    const canvas = createCanvas(1000, 1000);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text settings
    ctx.fillStyle = color;
    ctx.font = `100px "${fontFamily}"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Bikin teks otomatis turun kalau panjang
    const words = text.split(" ");
    let line = "";
    let y = canvas.height / 2 - (words.length * 60) / 2;

    for (let i = 0; i < words.length; i++) {
        line += words[i] + " ";
        if (ctx.measureText(line).width > 800 || i === words.length - 1) {
            ctx.fillText(line.trim(), canvas.width / 2, y);
            line = "";
            y += 120;
        }
    }

    res.setHeader("Content-Type", "image/png");
    canvas.pngStream().pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Brat API running on port ${PORT}`));

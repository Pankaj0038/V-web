const express = require("express");
const app = express();
const multer = require("multer");
const unzipper = require("unzipper");
const path = require("path");
const fs = require("fs");
const fsp = require("fs").promises;
const port = process.env.PORT || 3007;

const stpath = path.join(__dirname, "../public");
app.use(express.static(stpath));

app.get("/", (req, res) => {
    res.redirect("index.html");
});

app.get("/flag",(req,res)=>{
	res.redirect("flag.html");
})
const upload = multer({ dest: "uploads/" });

const extractPath = path.join(__dirname, 'extracted');
fsp.mkdir(extractPath, { recursive: true });





app.post("/upload", upload.single("zipFile"), async (req, res) => {
    if (!req.file) {
        console.log('No file uploaded');
        return res.status(400).send("Please upload a file!");
    }

    console.log(req.file);

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    console.log('Uploaded file path:', filePath);
    try {
        await fsp.stat(filePath);
        console.log('File exists:', filePath);
    } catch (err) {
        console.log('Error with file stats:', err);
        return res.status(500).send('Uploaded file not found or file access issue');
    }

    try {
        const zipStream = fs.createReadStream(filePath)
            .pipe(unzipper.Parse());

        zipStream.on('entry', async (entry) => {
            const filePath = path.join(extractPath, entry.path);
            const dirPath = path.dirname(filePath);

            try {
                await fsp.mkdir(dirPath, { recursive: true });
                entry.pipe(fs.createWriteStream(filePath));

            } catch (err) {
                console.error('Error handling file during extraction:', err);
            }
        });

        zipStream.on('close', async () => {
            console.log('Extraction completed.');

            const files = await fsp.readdir(extractPath);

            let fileContents = '';
            for (const file of files) {
                const extractedFilePath = path.join(extractPath, file);
                console.log('Extracted file:', extractedFilePath);
                try {
                    const content = await fsp.readFile(extractedFilePath, 'utf-8'); 
                    fileContents += `<h3>Content of ${file}: </h3><pre>${content}</pre>`; 
                    console.log('Error reading file:', extractedFilePath, err);
                    fileContents += `<h3>Error reading ${file}</h3>`;
                } catch(err){
                	console.log("read file error");
                }
            }

            res.send(`
                ${fileContents}
            `);
        });

        zipStream.on('error', (err) => {
            console.error("Error occurred during file extraction:", err);
            res.status(500).send('Error extracting the file');
        });

    } catch (err) {
        console.error("Error occurred while extracting the file", err);
        res.status(500).send('Error extracting the file');
    }
});







app.listen(port, () => {
    console.log(`Web Server is live on port ${port}`);
});

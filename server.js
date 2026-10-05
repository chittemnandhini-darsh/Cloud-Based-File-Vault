const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Create uploads folder if it does not exist
const uploadFolder = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// File storage configuration
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage
});

// Home
app.get("/", (req, res) => {

    res.send("Cloud-Based File Vault Backend is Running!");
});

// Upload file
app.post("/api/upload", upload.single("file"), (req, res) => {

    if (!req.file) {

        return res.status(400).json({
            message: "Please select a file"
        });

    }

    res.json({

        message: "File uploaded successfully!",

        file: {
            name: req.file.originalname,
            size: req.file.size,
            filename: req.file.filename
        }

    });

});

// Get all files
app.get("/api/files", (req, res) => {

    fs.readdir(uploadFolder, (err, files) => {

        if (err) {

            return res.status(500).json({
                message: "Unable to read files"
            });

        }

        const fileList = files.map(file => {

            const filePath =
                path.join(uploadFolder, file);

            const stats =
                fs.statSync(filePath);

            return {
                name: file,
                size: stats.size
            };

        });

        res.json(fileList);

    });

});

// Download file
app.get("/api/download/:filename", (req, res) => {

    const filename = req.params.filename;

    const filePath =
        path.join(uploadFolder, filename);

    if (!fs.existsSync(filePath)) {

        return res.status(404).send("File not found");

    }

    res.download(filePath);

});

// Delete file
app.delete("/api/files/:filename", (req, res) => {

    const filename = req.params.filename;

    const filePath =
        path.join(uploadFolder, filename);

    if (!fs.existsSync(filePath)) {

        return res.status(404).json({
            message: "File not found"
        });

    }

    fs.unlink(filePath, err => {

        if (err) {

            return res.status(500).json({
                message: "Unable to delete file"
            });

        }

        res.json({
            message: "File deleted successfully!"
        });

    });

});

// Start server
app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});
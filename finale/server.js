const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Autoriser le CORS pour permettre les requêtes entre frontend et backend
app.use(cors());

// Configuration pour Multer (gestion des fichiers)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); // Dossier où les images seront stockées
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix); // Nom unique pour chaque fichier
    }
});

const upload = multer({ storage: storage });

// Servir les fichiers statiques (images) pour le frontend
app.use('/images', express.static(path.join(__dirname, 'images')));

// Endpoint pour télécharger une image
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier téléchargé.');
    }
    res.status(200).json({ filePath: `/images/${req.file.filename}` });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
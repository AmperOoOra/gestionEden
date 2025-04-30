-- Création de la table pour les sacs
CREATE TABLE sacs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT NOT NULL,
    prix REAL NOT NULL,
    date_ajout TEXT NOT NULL,
    date_vente TEXT,
    vendu BOOLEAN NOT NULL DEFAULT 0
);
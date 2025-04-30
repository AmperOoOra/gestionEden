const sacs = JSON.parse(localStorage.getItem('sacs')) || [];

// Fonction pour afficher les sacs
function displaySacs() {
    const sacsContainer = document.getElementById('sacsContainer');
    sacsContainer.innerHTML = '';

    sacs.forEach((sac, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-3">
                <img src="${sac.image}" class="card-img-top" alt="Image du sac">
                <div class="card-body">
                    <h5 class="card-title">Prix: ${sac.prix} €</h5>
                    <p class="card-text">Date d'ajout: ${sac.dateAjout}</p>
                    <button class="btn btn-warning" onclick="toggleVendu(${index})">
                        ${sac.vendu ? 'Marquer comme Disponible' : 'Marquer comme Vendu'}
                    </button>
                    <button class="btn btn-danger" onclick="deleteSac(${index})">Supprimer</button>
                </div>
            </div>
        `;
        sacsContainer.appendChild(card);
    });
}

// Fonction pour ajouter un sac
function addSac(event) {
    event.preventDefault();
    const imageInput = document.getElementById('image');
    const prixInput = document.getElementById('prix');

    const sac = {
        image: URL.createObjectURL(imageInput.files[0]),
        prix: parseFloat(prixInput.value),
        dateAjout: new Date().toISOString(),
        dateVente: null,
        vendu: false
    };

    sacs.push(sac);
    localStorage.setItem('sacs', JSON.stringify(sacs));
    window.location.href = 'index.html';
}

// Fonction pour supprimer un sac
function deleteSac(index) {
    sacs.splice(index, 1);
    localStorage.setItem('sacs', JSON.stringify(sacs));
    displaySacs();
}

// Fonction pour changer l'état vendu
function toggleVendu(index) {
    sacs[index].vendu = !sacs[index].vendu;
    sacs[index].dateVente = sacs[index].vendu ? new Date().toISOString() : null;
    localStorage.setItem('sacs', JSON.stringify(sacs));
    displaySacs();
}

// Fonction pour filtrer les sacs
function filterSacs() {
    const filter = document.getElementById('filter').value;
    let filteredSacs = sacs;

    if (filter === 'vendu') {
        filteredSacs = sacs.filter(sac => sac.vendu);
    } else if (filter === 'disponible') {
        filteredSacs = sacs.filter(sac => !sac.vendu);
    }

    const sacsContainer = document.getElementById('sacsContainer');
    sacsContainer.innerHTML = '';

    filteredSacs.forEach((sac, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-3">
                <img src="${sac.image}" class="card-img-top" alt="Image du sac">
                <div class="card-body">
                    <h5 class="card-title">Prix: ${sac.prix} €</h5>
                    <p class="card-text">Date d'ajout: ${sac.dateAjout}</p>
                    <button class="btn btn-warning" onclick="toggleVendu(${index})">
                        ${sac.vendu ? 'Marquer comme Disponible' : 'Marquer comme Vendu'}
                    </button>
                    <button class="btn btn-danger" onclick="deleteSac(${index})">Supprimer</button>
                </div>
            </div>
        `;
        sacsContainer.appendChild(card);
    });
}

// Affichage initial des sacs
if (document.getElementById('sacsContainer')) {
    displaySacs();
}
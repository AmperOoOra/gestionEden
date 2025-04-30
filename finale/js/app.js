const sacs = JSON.parse(localStorage.getItem('sacs')) || [];

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

function deleteSac(index) {
    sacs.splice(index, 1);
    localStorage.setItem('sacs', JSON.stringify(sacs));
    displaySacs();
}

function toggleVendu(index) {
    sacs[index].vendu = !sacs[index].vendu;
    localStorage.setItem('sacs', JSON.stringify(sacs));
    displaySacs();
}

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

if (document.getElementById('sacsContainer')) {
    displaySacs();
}
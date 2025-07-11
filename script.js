const produits = [
    { nom: "Barre énergétique dattes", prix: 120, image: "https://via.placeholder.com/250x150", categorie: "Pâtisseries" },
    { nom: "Pâte à tartiner figue", prix: 200, image: "https://via.placeholder.com/250x150", categorie: "Produits à tartiner" },
    { nom: "Thé de noyaux", prix: 150, image: "https://via.placeholder.com/250x150", categorie: "Thé & infusions" },
    { nom: "Pot en verre 200g", prix: 80, image: "https://via.placeholder.com/250x150", categorie: "Emballages" },
    { nom: "Sirop de dattes", prix: 90, image: "https://via.placeholder.com/250x150", categorie: "Naturels" }
  ];
  
  const zoneProduits = document.getElementById("produits");
  const listePanier = document.getElementById("liste-panier");
  const totalAffiche = document.getElementById("total");
  const filtres = document.querySelectorAll(".filtre");
  
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  
  function afficherProduits(cat = "all") {
    zoneProduits.innerHTML = "";
    produits.forEach(p => {
      if (cat === "all" || p.categorie === cat) {
        const div = document.createElement("div");
        div.className = "produit";
        div.innerHTML = `
          <img src="${p.image}" alt="${p.nom}">
          <h3>${p.nom}</h3>
          <p>${p.prix} DA</p>
          <button onclick='ajouterAuPanier("${p.nom}", ${p.prix})'>Ajouter au panier</button>
        `;
        zoneProduits.appendChild(div);
      }
    });
  }
  
  function ajouterAuPanier(nom, prix) {
    panier.push({ nom, prix });
    enregistrer();
    afficherPanier();
  }
  
  function afficherPanier() {
    listePanier.innerHTML = "";
    let total = 0;
    panier.forEach((item, i) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.nom} - ${item.prix} DA <button onclick='supprimerDuPanier(${i})'>❌</button>`;
      listePanier.appendChild(li);
      total += item.prix;
    });
    totalAffiche.textContent = total;
  }
  
  function supprimerDuPanier(index) {
    panier.splice(index, 1);
    enregistrer();
    afficherPanier();
  }
  
  function enregistrer() {
    localStorage.setItem("panier", JSON.stringify(panier));
  }
  
  filtres.forEach(b => {
    b.addEventListener("click", () => {
      document.querySelector(".filtre.active").classList.remove("active");
      b.classList.add("active");
      afficherProduits(b.dataset.cat);
    });
  });
  
  document.getElementById("form-commande").addEventListener("submit", e => {
    e.preventDefault();
    if (panier.length === 0) return alert("Panier vide !");
    const nom = document.getElementById("nom-client").value;
    const adresse = document.getElementById("adresse-client").value;
    document.getElementById("confirmation").textContent = `Merci ${nom}, livraison à ${adresse}.`;
    panier = [];
    enregistrer();
    afficherPanier();
    e.target.reset();
  });
  
  afficherProduits();
  afficherPanier();
  
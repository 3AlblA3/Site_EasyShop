let arrayJSON = localStorage.getItem("array");
let arrayParsed = JSON.parse(arrayJSON);
let URLOrder = "http://localhost:3000/api/products/order";
let URL = "http://localhost:3000/api/products/";




//::::::::: Récupérer les éléments du DOM :::::::::://

let cartItems = document.getElementById("cart__items");
let totalQuantitySpan = document.getElementById("totalQuantity");
let totalPriceSpan = document.getElementById("totalPrice");

let html = "";


//::::::::: Afficher les données du local storage dans le DOM ::::::::://

async function cart() {

  try{

    const response = await fetch(URL);
    const data = await response.json();
    
    // Mise à jour des prix dans arrayParsed en fonction des données de l'API
    arrayParsed.forEach(item => {
      let matchedProduct = data.find(matchedProduct => matchedProduct._id === item.id);
      if (matchedProduct) {
        item.price = matchedProduct.price;
      }
    });

    async function displayItems() {

      for (let i of arrayParsed) {
    
      html = `<article class="cart__item" data-id="${i.id}" data-color="${i.color}">
                <div class="cart__item__img">
                  <img src="${i.img}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${i.name}</h2>
                    <p>${i.color}</p>
                    <p>${i.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${i.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${i.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
      cartItems.innerHTML += html;
      }
    }
    await displayItems();
 
    // Afficher le total des articles et des prix

    function displayTotals() {
      let totalQuantity = arrayParsed.reduce((acc, i) => acc + i.quantity, 0); 
      // On parcourt le tableau d'objet en cumulant les quantités //
      totalQuantitySpan.innerHTML = `${totalQuantity}`;

      let totalPrice = arrayParsed.reduce((acc, i) => acc + (i.price * i.quantity), 0);
      // On parcourt le tableau d'objet en additionnat les sous-totaux à chaque fois
      totalPriceSpan.innerHTML = `${totalPrice}`;
    }

    displayTotals();

    // Suppression

    function deleteItemFunc() {
      let deleteItems = document.querySelectorAll(".deleteItem"); // QuerySelectorAll pour tous les boutons supprimer 
      deleteItems.forEach((deleteItem, i) => { // forEach pour boucler sur tous les éléments
        deleteItem.addEventListener("click", () => {
          arrayParsed.splice(i, 1); // Supprime l'élément du tableau d'objet du local storage
          arrayJSON = JSON.stringify(arrayParsed);
          localStorage.setItem("array", arrayJSON);
          deleteItem.closest("article").remove();
          displayTotals();
        });
      });
    }

    deleteItemFunc();

   // Modification

    function modifyQuantity() {
      let itemQuantities = document.querySelectorAll(".itemQuantity");

      itemQuantities.forEach((itemQuantity, i) => { // Boucle forEach pour faire la fonction pour chaque article
       itemQuantity.addEventListener("change", (event) => {
          let newQuantity = parseInt(event.target.value); // Récupérer la valeur de l'input et la convertir en number
          arrayParsed[i].quantity = newQuantity; // Placer la nouvelle valeur et la remplacer dans le tableau d'objet
          let arrayJSON = JSON.stringify(arrayParsed);
          localStorage.setItem("array", arrayJSON);

          // Mettre à jour l'affichage de la quantité dans le <p>
          let pQuantity = itemQuantity.closest(".cart__item__content__settings__quantity").querySelector("p");
          pQuantity.innerHTML = `Qté : ${newQuantity}`;

          displayTotals();
        });
     });
   }
  modifyQuantity();
  }
  catch(error){
    console.error("Erreur lors de la récupération des données :", error);
  }
}

cart();

                //:::::::::::::::::::::::::::::: Partie 3: le formulaire ::::::::::::::::::::::::::::://

const form = document.querySelector("form")

// Fonction d'envoie des données du formulaire et post de l'API

  form.addEventListener("submit", async (event) =>{

    event.preventDefault();

    if(arrayJSON == null){
      alert("Votre panier est vide")
    }

    // On récupére les valeurs des formulaires //

    let firstNameValue= document.getElementById("firstName").value;
    let lastNameValue = document.getElementById("lastName").value;
    let cityValue = document.getElementById("city").value;
    let emailValue = document.getElementById("email").value;

    // Régles de validation //

    let regexMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
    let regexText = new RegExp("[a-z.-]");
    let resultatMail = regexMail.test(emailValue);
    let resultatText = regexText.test(firstNameValue, lastNameValue, cityValue);

    if(resultatMail && resultatText == true){

      // Mettre les valeurs récupérées dans un objet //
      
      const formData = new FormData(form);
      const formValue  = [...formData.entries()];

      // Convertir le tableau de données en obj

      const entries = new Map (formValue);
      let contact = Object.fromEntries(entries);
      let products = arrayParsed.map(i => i.id);
   
      let order = {
        "contact": contact, 
        "products": products
      }
    

      // Ouverture de la page confirmation //

      // Envoi des données au serveur via une requête POST //

      try {
        let PostResponse = await fetch(URLOrder, {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          },

        });
    
        if (!PostResponse.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
        let responseData = await PostResponse.json();
        let orderId = responseData.orderId;
        let orderIdStringed = JSON.stringify(orderId)
        localStorage.setItem("orderId", orderIdStringed)
    
        // Redirection vers la page de confirmation avec l'ID de commande
          window.location.href = `confirmation.html?orderId=${orderId}`;
      }catch (error) {
        console.error("Erreur lors de l'envoi des données au serveur :", error);
        alert("Une erreur est survenue lors de la commande. Veuillez réessayer plus tard.");
      }

    }else{
      alert("Veuillez remplir correctement tous les champs du formulaire.");
    }
  })
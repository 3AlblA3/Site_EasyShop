let arrayJSON = localStorage.getItem("array");
let arrayParsed = JSON.parse(arrayJSON);

//::::::::: Récupérer les éléments du DOM :::::::::://

let cartItems = document.getElementById("cart__items");
let totalQuantitySpan = document.getElementById("totalQuantity");
let totalPriceSpan = document.getElementById("totalPrice");

let html = "";


//::::::::: Afficher les données du local storage dans le DOM ::::::::://

async function cart() {

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
                      <p>Qté : </p>
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

  console.table(arrayParsed);

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

cart();

                //:::::::::::::::::::::::::::::: Partie 3: le formulaire ::::::::::::::::::::::::::::://

let order = document.getElementById("order");

order.addEventListener("click", (event) =>{

  event.preventDefault();

// On récupére les valeurs des formulaires //

  let firstNameValue= document.getElementById("firstName").value;
  let lastNameValue = document.getElementById("lastName").value;
  let addressValue = document.getElementById("address").value;  
  let cityValue = document.getElementById("city").value;
  let emailValue = document.getElementById("email").value;

// Régles de validation //

  let regexMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
  let regexText = new RegExp("[a-z.-]");
  let resultatMail = regexMail.test(emailValue);
  let resultatText = regexText.test(firstNameValue, lastNameValue, addressValue, cityValue);

  if(resultatMail && resultatText == true){

  // Mettre les valeurs récupérées dans un objet //
  
  let contact = new Object();

  contact.firstName = firstNameValue;
  contact.lastName = lastNameValue;
  contact.address = addressValue;
  contact.city = cityValue;
  contact.email = emailValue;

  // Envoie du contact dans le local storage //

  let contactStringed = JSON.stringify(contact);
  localStorage.setItem("contact", contactStringed);

  // Ouverture de la page confirmation //

  window.location.replace("confirmation.html");

  }else{
    alert("Format invalide! Veuillez vérifier le formulaire.");
    }
  }
)



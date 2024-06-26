//::::::::::::::::::::::: Partie 1: afficher les éléments du local storage dans le DOM :::::::::::::::::::::://

let arrayJSON = localStorage.getItem("array");

let arrayParsed = JSON.parse(arrayJSON);

let cartItems = document.getElementById("cart__items");

let totalQuantity = document.getElementById("totalQuantity");

let totalPrice = document.getElementById("totalPrice");

let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

let html ="";

console.table(arrayParsed);

async function displayItems(){

  for(i of arrayParsed){
    html = `<article class="cart__item" data-id="${i.id}" data-color="${i.color}}">
                <div class="cart__item__img">
                  <img src="${i.img}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${i.name}</h2>
                    <p>${i.color}</p>
                    <p${i.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>${i.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${i.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p id="deleteItem" class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
               </article>
               `;

    cartItems.innerHTML += html;

    //::::::::::::::::::::::: Partie 2: modification et suppression des produits :::::::::::::::::::::://

    // Suppression //
                


    // Modification //  
  }
}

displayItems()

//::::::::::::::::::::::: Partie 3: le formulaire :::::::::::::::::::::://

let order = document.getElementById("order")

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
  let regexText = new RegExp("[0-9]")
  let resultatMail = regexMail.test(emailValue);
  let resultatText = regexText.test(firstNameValue, lastNameValue, addressValue, cityValue);

if(resultatMail == true && resultatText == false){

  // Mettre les valeurs récupérées dans un objet //
  
let contact = new Object();

  contact.firstName = firstNameValue
  contact.lastName = lastNameValue
  contact.address = addressValue
  contact.cityValue = cityValue
  contact.emailValue = emailValue

  let contactStringed = JSON.stringify(contact)
    
  localStorage.setItem("contact", contactStringed)

}else{
  alert("Format invalide! Veuillez vérifier le formulaire.")
}
  } 

)



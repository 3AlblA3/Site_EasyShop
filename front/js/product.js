let params = new URLSearchParams (window.location.search);
let productID = params.get("id");
let URL = "http://localhost:3000/api/products/";
let itemImage = document.getElementsByClassName("item__img");
let itemTitle = document.getElementById("title");
let itemPrix = document.getElementById("price");
let itemDescription = document.getElementById("description");
let itemColor = document.getElementById("colors");
let button = document.getElementById("addToCart");

//::::::::::Afficher le produit choisi précédemment::::::::::::::::://

async function fetchProduct(){
    try{
        const response = await fetch(URL + productID);
        const data = await response.json();
        itemImage[0].innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        itemTitle.innerHTML += `${data.name}`;
        itemPrix.innerHTML += `${data.price}`;
        itemDescription.innerHTML += `${data.description}`;
        let colors = data.colors;

        for(i of colors){
            itemColor.innerHTML += `<option value="${i}">${i}</option>`;
        };

        // Ajouter les éléments dans un tableau sur le local storage sur le clic //

        button.addEventListener("click", (event) =>{
            event.preventDefault();
            let name= data.name
            let id = data._id
            let color = itemColor.value
            let quantityStringed = document.getElementById("quantity").value
            let quantity = parseInt(quantityStringed)
            let price = data.price
            let description = data.description
            let img = data.imageUrl
           class Item{
                constructor(){
                    this.name = name;
                    this.id = id;
                    this.quantity = quantity;
                    this.color = color;
                    this.price = price;
                    this.description = description; 
                    this.img = img;
                }
            }

            //Récupérer le tableau d'objets du local storage et y ajouter les objets
            
            let array = JSON.parse(localStorage.getItem("array"));
            if(array == null){
                array = []
            }

            let objet = new Item();

            //Vérifier que l'artile ne soit pas déjà présent dans le panier, et que les quantité et couleur soient bien choisies

            let arrayId = array.map(a => a.color);

            if (arrayId.includes(color) == true){
                alert("Cet objet est déjà dans votre panier!");
            }else if (quantity == 0){
                alert("Merci de chosir une quantité.");
            }else if (color == ""){
                alert("Merci de chosir une couleur.");
            }
            else{
                array.push(objet);
                let arrayStringed = JSON.stringify(array);
                localStorage.setItem("array", arrayStringed);
                window.location.replace("cart.html");
            }
        })
    } 
    catch{
        alert("error")
    }
}
fetchProduct()
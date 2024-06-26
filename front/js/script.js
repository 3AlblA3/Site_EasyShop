let URL = "http://localhost:3000/api/products/"

let section = document.getElementById("items")

let html = ""

//::::::: Fonction pour fetch l'api et afficher les articles ::::::://

async function getApi(){
    try{
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data)
        for(i of data){
            html =`
            <a href="./product.html?id=${i._id}">
                <article>
                <img src="${i.imageUrl}" alt="${i.altTxt}">
                <h3 class="productName">${i.name}</h3>
                <p class="productDescription">${i.description}</p>
                </article>
            </a>`;

            section.innerHTML += html
        }

    }
    catch{alert("error")}
}

getApi()
let orderIdJSON = localStorage.getItem("orderId")
let orderId = JSON.parse(orderIdJSON)

let orderIdSpan = document.getElementById("orderId")


function getOrder(){
    try {
    let response = fetch(URL);
    let data = response.json;
    console.log(data)
    orderIdSpan.innerHTML += `${orderId}`;
    localStorage.removeItem("orderId")
    localStorage.removeItem("array")
    }
    catch(error){alert("error")};
}

getOrder()


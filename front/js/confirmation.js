let orderIdJSON = localStorage.getItem("orderId")
let orderId = JSON.parse(orderIdJSON)

let orderIdSpan = document.getElementById("orderId")


function getOrder(){
    try {
    orderIdSpan.innerHTML += `${orderId}`;
    localStorage.removeItem("orderId")
    localStorage.removeItem("array")
    }
    catch(error){alert("error")};
}

getOrder()


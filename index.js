console.log(window.innerWidth)

let data = [{category: "smartfon", name: "Xiaomi Redmi Note 8T", price: "799",
 description: `smartfon o bardzo dobrym stosunku jakości do ceny`, 
photos: ["productimages/xiaomi.png"] },

{category: "laptop", name: "Laptop MacBook Pro 15 15,4  Intel Core i7 16 GB / 512 GB szary", price: "3499",
 description: `Jeden z najbardziej zaawansowanych komputerów na świecie dostępny w świetnej
  konfiguracji oraz niespotykanej dotąd cenie!`, 
photos: ["productimages/macbook.png"]},

{category: "laptop", name: "Lenovo ThinkPad X240 i5-4 gen. 8GB 500GB WIN10", price: "649",
 description: `ulra-mobilny profesjonalny laptop przeznaczony do codziennej pracy zarówno w biurze,
  jak i poza nim.`, 
photos: ["productimages/lenovo.png"] },

{category: "smartfon", name: "Smartfon Apple iPhone 13 4 GB / 128 GB czarny", price: "3899",
 description: `Urządzenie oparto na czipie A15 Bionic oraz systemie operacyjnym iOS 15,
  a główną cechą wyróżniającą tę generację "jabłuszek" ma być zaawansowany aparat fotograficzny`, 
photos: ["productimages/iphone13.png"] }

]

let productArray = []

let parsed = JSON.parse(localStorage.getItem("products"))
console.log(parsed) 

parsed ?  productArray = parsed : productArray = []


const quantity = document.getElementById("quantity")
quantity.innerHTML = parsed? parsed.length : 0

  function updateCounter(){
    bagCounter.innerHTML = `Ilość przedmiotów w koszyku: ${parsed? parsed.length : 0} `
    }

const logging = document.querySelector(".logging")

const welcome = document.getElementById("welcome")

logging.addEventListener("click", ()=> loginDiv.classList.toggle("loginDiv")) 

function login(){
  const userInput = document.getElementById("userNameInput")
  const passInput = document.getElementById("passInput")
  if(userInput.value.trim() !=="" && passInput.value.trim() !=="") 
  {let userName = userInput.value
  welcome.innerHTML = `Witaj ${userName}!`
  localStorage.setItem("userName", JSON.stringify(userName))
  loginDiv.classList.toggle("loginDiv")
  console.log(logging.outerHTML)
  console.log(userInput, passInput)}
}

const userName = JSON.parse(localStorage.getItem("userName"))

userName? welcome.innerHTML = `Witaj ${userName}!` : ""

const passBtn =  document.getElementById("passBtn")

passBtn.addEventListener("click", login)

passBtn.addEventListener("keydown", (e)=>{if(e.key === "Enter") login()})

const loginDiv = document.querySelector(".login")

const showAll =  document.getElementById("showAll")

const magnifier = document.querySelector(".magnifier")

const searchInput = document.querySelector(".searchInput")

const container = document.getElementById("container")

const bag = document.querySelector("#bag")

const shoppingCart = document.querySelector(".shoppingCart")

const bagOpen = shoppingCart.addEventListener("click", ()=> {bag.id ==="bag" ?
bag.setAttribute("id", "bagOpen") : bag.setAttribute("id", "bag")})

let bagCounter = document.createElement("p")
bagCounter.classList.add("cartP")

let deleteAll = document.createElement("div")
deleteAll.style.minWidtth = "100px"
deleteAll.classList.add("cartP")
deleteAll.innerHTML = "Usuń wszystkie produkty"

deleteAll.addEventListener("click", ()=> {localStorage.clear()
bagContainer.innerHTML = ""
bagCounter.innerHTML = `Ilość przedmiotów w koszyku: ${0} `
quantity.innerHTML =  0
location.reload()})

bagCounter.innerHTML = `Ilość przedmiotów w koszyku: ${parsed? parsed.length : 0} `
bag.prepend(bagCounter, deleteAll)

let productsArray = []

//item.replace(`deleteItem(${regex})`, `deleteItem(${index})`)})
//const regex = /[0-9]/ 

const bagContainer =  document.getElementById("bagContainer")

function deleteItem(index){
  let parsed = JSON.parse(localStorage.getItem("products"))
  let mapped = parsed.map((item, index)=> { 
  return item.slice(0, 43)+`(${index})"` + item.slice(47)})
  localStorage.setItem("products", JSON.stringify(mapped))
  mapped = JSON.parse(localStorage.getItem("products"))
  mapped.splice(index, 1)
  productArray.splice(index, 1)
  localStorage.setItem("products", JSON.stringify(mapped))
  console.log("mapped: ", mapped, index)
  mapped = JSON.parse(localStorage.getItem("products"))
  mapped = mapped.map((item, index)=> { 
    return item.slice(0, 43)+`(${index})"` + item.slice(47)})
    bagContainer.innerHTML = mapped.join("")
  bagCounter.innerHTML = `Ilość przedmiotów w koszyku: ${mapped? mapped.length : 0} `
  quantity.innerHTML = mapped ? mapped.length : 0
}


const generateProduct = ()=> {
parsed = JSON.parse(localStorage.getItem("products"))  
parsed?bagContainer.innerHTML = parsed.join("") : parsed
data.forEach((item, index)=>{

const productDiv = document.createElement("div")
productDiv.classList.add("productDivNone")
productDiv.id = data[index].name
productDiv.category = data[index].category


const imageDiv = document.createElement("div")
imageDiv.classList.add("imageDiv")
imageDiv.style.maxWidth = "220px"



const productImg = document.createElement("img")
imageDiv.classList.add("productImage")
productImg.setAttribute("src", data[index].photos[0])
productImg.style.maxWidth = "200px"
productImg.style.maxHeight = "200px"

const productInformation = document.createElement("div")
productInformation.classList.add("productDescription")

const name = document.createElement("p")
name.innerHTML = `<b>${data[index].name}</b>`
name.id = data[index].name
name.style.wordWrap = "break-word";
 

const price = document.createElement("p")
price.innerHTML = `<b>${data[index].price}</b> zł  `
price.id = data[index].price
price.style.wordWrap= "break-word";

let addButton = document.createElement("div")
addButton.classList.add("addButton1")
addButton.id = "addButton"


const buttonText = document.createElement("p")
buttonText.innerText="dodaj do koszyka"
buttonText.classList.add("addButton")
const addImage = document.createElement("img")
addImage.style.width="50px"
addImage.setAttribute("src", "add.svg")
addButton.append(addImage, buttonText)


const description = document.createElement("p")
description.style.fontSize = "12px"
description.innerHTML = data[index].description


imageDiv.append(productImg)
productDiv.append(imageDiv)
productInformation.append(name, price, description, addButton)
productDiv.append(productInformation)
container.append(productDiv) 
productsArray.push(productDiv)


function searchForAnItem(){
productsArray.forEach((item)=>{  
productDiv.classList.add("productDivNone")    
let value = searchInput.value.toLowerCase()
if(value==="")return
const isVisible = productDiv.id.toLowerCase().includes(value) || 
productDiv.category.toLowerCase().includes(value)
if(isVisible) productDiv.classList.remove("productDivNone");
 productDiv.classList.add("productDiv")})
}

magnifier.addEventListener("click", searchForAnItem)

searchInput.addEventListener("keydown", (e)=>{if(e.key === "Enter") searchForAnItem()})

showAll.addEventListener("change", ()=>{if(showAll.value === "wszystko"){

productDiv.classList.remove("productDivNone");
productDiv.classList.add("productDiv")}
else if (showAll.value === "kategorie"){
  productDiv.classList.remove("productDiv");
  productDiv.classList.add("productDivNone")
}

})

})

}

generateProduct()

 const takeValues = (e)=>{
  let productName = e.target.parentElement.parentElement.childNodes[0].innerText 
  let productPrice =  e.target.parentElement.parentElement.childNodes[1].innerText 
  let returnValue = `<p style="color:white">${productName}</p> <br> <p style="color:white">${productPrice}</p>`
  transferProduct(returnValue)
 }


function transferProduct(returnValue){
  console.log(returnValue)
  let parsed = JSON.parse(localStorage.getItem("products")) 
  quantity.innerHTML = parsed? parsed.length : 0
  updateCounter()
  let index = bagContainer.childNodes.length
  productArray.push(
    `<div><img src="out.svg" onclick="deleteItem(${index})"    style="width: 50px; margin: 5px" ></img>
    <p style="color: white">${returnValue}</p></div>`)
    localStorage.setItem("products", JSON.stringify(productArray))
    parsed = JSON.parse(localStorage.getItem("products"))
    localStorage.setItem("products", JSON.stringify(parsed))
    productArray=parsed
    console.log(productArray)
    
    console.log(parsed)
    updateCounter()
    quantity.innerHTML = parsed? parsed.length : 0
    bagCounter.innerHTML = `Ilość przedmiotów w koszyku: ${parsed? parsed.length : 0} `
    bagContainer.innerHTML = parsed.join("")
    console.log(bagContainer.childNodes)
  
}


const addButtons = document.querySelectorAll(".addButton1")
for (const button of addButtons) {
button.addEventListener("click", takeValues)
}

function adAnimation(){
 if (window.innerWidth< 800) {return}
  let ad = document.createElement("div")

  let adImg = document.createElement("img")
  adImg.src = "productimages/lenovo.png"
  adImg.style.width = "200px"

  let adText = document.createElement("p")
  adText.innerHTML = `<h2 style="color: steelblue">Super okazja!</h1> <br>
  <p style="color: steelblue" >Kup Lenovo ThinkPad X240</p> <br><p style="color: steelblue">
  za jedyne 649zł!</p>`

  let addIcon = document.createElement("img")
  addIcon.src="add.svg"
  addIcon.style.width="100px"
  addIcon.addEventListener("click", showAdItem)

  let deleteIcon = document.createElement("img")
  deleteIcon.src = "delete.png"
  deleteIcon.classList.add("delete-icon")
  deleteIcon.addEventListener("click", ()=>{container.removeChild(ad)})

  ad.append(deleteIcon, adImg, adText, addIcon)
  ad.classList.add("adAnimation")
  
 
  container.append(ad)

  function moveRight(){ 
    let ad = container.childNodes[4]
    let randHorizontal = Math.floor(Math.random() * 500)
    ad.style.transition = "all 7s"
    ad.style.transform = `translateX(${randHorizontal}px)`
   // ad.style.transform =`rotate(${randVertical}deg)`
  }
  setInterval(moveRight, 2000)
  function moveLeft(){
    let ad = container.childNodes[4]
    let randHorizontal = Math.floor(Math.random() * -500)
    ad.style.transition = "all 7s"
    ad.style.transform = `translateX(${randHorizontal}px)`
  }
  setInterval(moveLeft, 4000)

  function moveDown(){
    let ad = container.childNodes[4]
    let randHorizontal = Math.floor(Math.random() * 500)
    ad.style.transition = "all 7s"
    ad.style.transform = `translateY(${randHorizontal}px)`
  }
  setInterval(moveDown, 5000)
}

function showAdItem(){
  const adItem = container.childNodes[2]
  console.log(adItem)
  adItem.classList.remove("productDivNone")
  adItem.classList.add("productDiv")
  
  container.childNodes[4].remove()
}


adAnimation()
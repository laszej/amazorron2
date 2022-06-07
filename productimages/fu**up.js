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

const container = document.getElementById("container")

const showAll =  document.getElementById("showAll")

const magnifier = document.querySelector(".magnifier")

const searchInput = document.querySelector(".searchInput")

const bag = document.querySelector("#bag")

const shoppingCart = document.querySelector(".shoppingCart")

const bagOpen = shoppingCart.addEventListener("click", ()=> {bag.id ==="bag" ?
bag.setAttribute("id", "bagOpen") : bag.setAttribute("id", "bag")})

let bagCounter = document.createElement("p")
bagCounter.classList.add("cartP")

nameElement = document.getElementById("nameElement")

priceElement = document.getElementById("priceElement")

let productsArray = []

let productArray = []

let productsQuantity = 0

const bagContainer =  document.getElementById("bagContainer")

const quantity = document.getElementById("quantity")
quantity.innerHTML = productsQuantity

bagCounter.innerHTML = `W koszyku znajduje się ${productsQuantity} przedmiotów`
bag.prepend(bagCounter)

  function updateCounter(){
    bagCounter.innerHTML = `W koszyku znajduje się ${productsQuantity} przedmiotów`
    }

let parsed = JSON.parse(localStorage.getItem("products"))
console.log(parsed) || []


 function deleteItem(index){
  parsed.splice(index, 1)
  localStorage.setItem("products", JSON.stringify(productArray))
  console.log(parsed)
  bagContainer.innerHTML = parsed
}

generateProduct()



function generateProduct() {
  bagContainer.innerHTML = parsed
data.forEach((item, index)=>{

const productDiv = document.createElement("div")
productDiv.classList.add("productDivNone")
productDiv.id = data[index].name
productDiv.category = data[index].category


const imageDiv = document.createElement("div")
imageDiv.classList.add("imageDiv")


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
addButton.id = "addButton"


const buttonText = document.createElement("p")
buttonText.innerText="dodaj do koszyka"
buttonText.classList.add("addButton")
const addImage = document.createElement("img")
addImage.style.width="50px"
addImage.setAttribute("src", "add.svg")
addButton.append(addImage, buttonText)

addButton.addEventListener("click", (e)=>{
  productsQuantity+=1;
  quantity.innerHTML = productsQuantity;
  updateCounter()
  let productName = e.target.parentElement.parentElement.childNodes[0].innerText 
  let productPrice =  e.target.parentElement.parentElement.childNodes[1].innerText 

  const itemAddedIcon = document.createElement("img")
  itemAddedIcon.src = "out.svg"
  itemAddedIcon.style.width="50px"
  itemAddedIcon.style.margin="5px"
  itemAddedIcon.setAttribute("onclick", `deleteItem(${index})`)
  
  const itemAddedName = document.createElement("p")
  itemAddedName.innerHTML = productName
  itemAddedName.style.margin="5px"

  const itemAddedPrice = document.createElement("p")
  itemAddedPrice.innerHTML = productPrice
  itemAddedPrice.style.margin="5px"

 
  const itemAdded = document.createElement("div")
  itemAdded.style.margin = "10px"
  itemAdded.style.color = "white"
  itemAdded.classList.add("itemAdded")

  itemAdded.append(itemAddedIcon, itemAddedName, itemAddedPrice )
  productArray.push(itemAdded.outerHTML)
  localStorage.setItem("products", JSON.stringify(productArray))
 
  console.log(productArray)
  parsed = JSON.parse(localStorage.getItem("products"))
  bagContainer.innerHTML = parsed
  productsQuantity -=1
  updateCounter()
  quantity.innerHTML = productsQuantity


  })

const description = document.createElement("p")
description.style.fontSize = "12px"
description.innerHTML = data[index].description


imageDiv.append(productImg)
productDiv.append(imageDiv)
productInformation.append(name, price, description, addButton)
productDiv.append(productInformation)
container.append(productDiv) 
productsArray.push(productDiv)

const searchForAnItem = ()=>{
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




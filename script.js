// Promises and Asynchronous Functions
/* 
  What is a Promise in Javascript?
  A promise in Javascript is like a guarantee that something will happen in future. 

  It's used when working with tasks that take
  time, like loading data from a server

  A promise can be in one of these states
  1. Pending: The task is still happening(like just waiting for a response)
  2. Resolved(Fulfilled): The task is finished successfully and we got a result
  3. Rejected: The task failed and something went wrong  
*/

// How to use Promises
/* 
1. Promise Creation: 
Creating a promise that simulates fetching data
*/
/* let fetchData = new Promise((resolve, reject) => {
  let dataDownloaded = true

  setTimeout(() => {
    if (dataDownloaded) {
      resolve('Data downloaded successfully')
    } else {
      reject('Failed to load data')
    }
  }, 2000)
})

// 2. Using the Promise
fetchData
  .then((result) => {
    // This runs if the promise is resolved
    console.log(result)
  })
  .catch((error) => {
    // This runs if the promise is rejected
    console.error(error)
  })
 */
/* 
Async/Await 
JavaScript introduced the async/await to make working with promises easier and more readable. Async/Await allows us to write asynchrous code that looks like traditional synchronus code, making it easier to read and understand

Benefit of async/await
1. Cleaner Syntax - instead of chaining .then() and .catch(), you can use await to pause code execution until the promise resolves
2. Error Handling - You can handle errors neatly using the try/catch blocks, which are intuitive than handling errors through .catch()
3. Sequential Flow - it allows you to write asynchronous code in a more linear fashion, making it easier to understand the flow code
*/

// Using async / await to handle a promise
async function loadData() {
  try {
    let result = await fetchData
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
//loadData()

// Define an asynchronous function
const getData = async (fn) => {
  try {
    const response = await fetch("data.json")
    const data = await response.json()
    fn(data)
  } catch (error) {
    console.error("Could not find file")
  }
}
// Define the callback
const displayData = (data) => {
  //console.log(data)
  const members = data.map((member) => {
    const tr = document.createElement("tr")
    // Create the td
    for (prop in member) {
      const td = document.createElement("td")
      td.textContent = member[prop]
      tr.appendChild(td)
    }
    return tr
  })
  // Add the members to DOM
  const tbody = document.querySelector("tbody")
  members.forEach((member) => {
    tbody.appendChild(member)
  })
  console.log(tbody)
}
getData(displayData)

/* 
The DOM id the Document Object Model
that it is a tree-like representation of an
HTML or XML document, where each node is an object representing part of the document, such
as elements, attributes and text.

What does JS use the DOM for?
JS uses the DOM to interact with the webpage in 
real time, making it dynamic and interactive.

What does this mean to you as a developer?
Well it menas that you can do the following;
1. Access elements in the documents
2. Modify elements, attributes and text
3. Create, append and remove nodes
4. Attach events to elements

How does this happen?
JS is able to access, modify create, remove and attach events in the DOM via interfaces. Therefore are commonly used JS interfaces for DOM Manipulation

For example before you can manipulate an element in the DOM you have to have access to it. The DOM provides several methods to find elements in the DOM.

1. Access elements in the documents
Methods for finding elements in the DOM
1.1 document.getElementById() - Retrieve the element with the specified id.
*/
const app = document.getElementById("app")
console.log(app)
/* 
1.2 document.getElementByClassName() - Retrieve a live HTMLCollection of all elements that match a given class name. 
*/
const header = document.getElementsByClassName("header")
console.log(header)

/* 
1.3. documemnt.getElementbyTagName() - Retrieve a live HTMLCollection with the specified tag name.  
*/
const spantags = document.getElementsByTagName("span")
console.log(spantags)
/* 
1.4. document.querySelector()- Retrieves the first element that matches a CSS selector
*/
const main = document.querySelector("main")
console.log(main)
/* 
1.5. document.querySelectorAll() - Returns a static NodeList of all elements matching a CSS selector
*/
const menuItems = document.querySelectorAll("li")
console.log(menuItems)

/* 
2. Modifying and Updating DOM Nodes.
There are multiple ways to modify a DOM node's attributes, content and structure
For example..change the color of the header
*/
const heading = document.querySelector("h1")
heading.style.color = "brown"
const footer = document.querySelector("footer")

/*
2.1 Setting and retrieving attributes
There are two methods for setting and retrieving attributes
- setAttribute() Adds or changes an attribute
- getAttribute() Retrieves the value of an attribute
*/
const signIn = spantags[0],
  register = spantags[1]
console.log(signIn, register)
signIn.setAttribute("data", "0")
register.setAttribute("data", "1")
/* 
3. Create, append and remove nodes 
3.1 You can create new DOM nodes using document.createElement() but it doesn't add it to the document until you explicitly append it
*/
const dateDiv = document.createElement("div")
dateDiv.setAttribute("id", "date-div")
dateDiv.textContent = new Date().toDateString()
const footerParagraph = document.createElement("p")
const currentYear = new Date().getFullYear()
footerParagraph.innerHTML = `<p>&#169; Copyright ${currentYear} TrippleX </p>`
/* 
3.2 To insert a created node into the DOM, you can use the appendChild() or insertBefore()methods of the document object. The appendChild() adds the new node as the last child of a parent node
*/
footer.appendChild(footerParagraph)
/* 
The insertBefore(newNode, referenceNode)inserts the new node before an existing child node. It takes two parameters. 
- newNode, the node to be inserted
- refrenceNode, the node before which newNode is inserted
*/
const topBar = document.querySelector("#top-bar")
app.insertBefore(dateDiv, topBar)
/* 
3.3 Removing DOM Nodes
You can remove elements from the DOM using 
removeChild()or the newer remove() method
- removeChild(child), removes a child node from the parent node. It takes one parameter which is the child node to remove. The syntax is parentNode.removeChild(child). For Example let's remove the first li element of the nav node. 
*/
const nav = document.querySelector("nav")
nav.removeChild(nav.firstElementChild)
// Removing a node using the remove()method of the Node interface
document.getElementById("notification").remove()
/* 
3.4 Replacing DOM Nodes
You can replace an existing node with another using the replaceChild() method of the node interface. The replaceChild(newNode, oldNode)takes two parameters. The first is the new element, and the other is the old element you want to replace. For example let's replace the heading h1 element with an h2 
*/
const newHeading = document.createElement("h2")
newHeading.textContent = "Dashboard"
const aside = document.querySelector("aside")
aside.replaceChild(newHeading, heading)

/* 
4.0 Event Handling in the DOM 
JavaScript can dynamically attach event listeners to elements, allowing for interaction when a user clicks, hovers, or interact in various ways

4.1 addEventListener() - Adds an event listeners to an element, specifying the type of event e.g click, mouseover, and a callback function to execute when that event happens
*/
const viewMembers = document.querySelector("#view-members")
const addMember = document.querySelector("#add-member")
const updateMember = document.querySelector("#update-member")
const form = document.querySelector("#form-add-member")
const table = document.querySelector("table")
const button = document.createElement("button")
const tableContainer = document.getElementById("data")
button.textContent = "Save"
button.setAttribute("hidden", true)
tableContainer.appendChild(button)

viewMembers.addEventListener("click", handleViewMembers)
addMember.addEventListener("click", handleAddMembers)
updateMember.addEventListener("click", handleUpdateMembers)
form.addEventListener("submit", handleSubmit)

/* 4.1.1 Writing Event Handler Functions */
function handleViewMembers() {
  //table.toggleAttribute("hidden")
  // if table is in view get new data and reload the browser
  form.setAttribute("hidden", true)
  table.removeAttribute("hidden")
  if (!table.hasAttribute("hidden")) {
    getData(function () {
      window.location.reload()
    })
  } else {
    button.setAttribute("hidden", true)
  }
}
function handleAddMembers() {
  form.removeAttribute("hidden")
  button.setAttribute("hidden", true)
  table.setAttribute("hidden", true)
}
function handleUpdateMembers() {
  makeTableFieldsEditable(table)
  button.removeAttribute("hidden")
  if (table.hasAttribute("hidden")) {
    table.removeAttribute("hidden")
    // Todo: Implement editing
  }
  if (!form.hasAttribute("hidden")) {
    form.setAttribute("hidden", true)
  }
}
function handleDeleteMembers() {
  // Todo: Implement
}
async function handleSubmit(event) {
  event.preventDefault()
  const formData = new FormData(form)
  const formDataObject = {}
  formData.forEach((value, key) => (formDataObject[key] = value))
  await addNewMember(formDataObject)
  form.reset()
}
async function addNewMember(data) {
  const url = "http://localhost:3000/add-data"
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    // Check type of content to make sure its json
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!")
    }
    const jsonObject = await response.json()
    const message = jsonObject["message"]
    if (jsonObject["success"]) {
      addFlashNotification(message, "success", 800)
    }
  } catch (error) {
    console.error(error.message)
  }
}

/* 
4.2 Removing Event Listerners
You can remove an event listeners using the 
removeEventListener() method
*/
// addMember.removeEventListener('click', handleAddMembers)

/* 
5.0 Dynamically adding and removing an element in DOM
after a set interval. 
You can dynamically add or remove an element in DOM and then insert or remove it after a set time period using the DOM setTimeout() method. In this example we will create a notifiction system for our dashboard application. Currently we have a div element with id of "notification" which is removed from the DOM when the application loads. We will recreate this
div element when the user adds a new member. 
*/
function addFlashNotification(message, type = "info", duration = 5000) {
  // Create the flash div
  const app = document.getElementById("app")
  const topBar = document.getElementById("top-bar")
  const div = document.createElement("div")
  div.className = `notifications ${type}`
  div.textContent = message
  // Insert notification
  app.insertBefore(div, topBar)
  // Remove notification
  removeNotification(div, duration)
}
async function removeNotification(div, duration) {
  await sleep(duration)
  div.classList.add("fade-out")
  await sleep(duration / 2)
  app.removeChild(div)
}
// Create a sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/* 
5.1 Making Elements in the DOM editable 
You can make any element in the DOM editable by setting the contenteditable 
to true on the element
*/
function makeTableFieldsEditable(table) {
  const fields = table.querySelectorAll("td")
  fields.forEach((field) => {
    field.contentEditable = true
  })
  fields[0].focus() 
}

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const consoleElement = document.getElementById("console");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  }

  const liElements = listContainer.querySelectorAll("li");
  let allContainString = false;
  liElements.forEach((li) => {
    // Check if the string exists in the text content of the <li> element
    if (li.textContent.includes(inputBox.value)) {
      // If the string doesn't exist, set the flag to false
      allContainString = true;
      // Break out of the loop since we already know not all elements contain the string
      return;
    }
  });

  if (allContainString === true) {
    alert("The task you are trying to add already exists");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  const elements = document.querySelectorAll("li.checked"); // Select all <li> elements with the "checked" class

  // Check if all elements have the "checked" class toggled
  if (elements.length === document.querySelectorAll("li").length) {
    consoleElement.innerHTML =
      "        Congratulations! All tasks are completed now";
  } else {
    consoleElement.innerHTML = "";
  }
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      // Toggle the "checked" class on the clicked <li> element
      e.target.classList.toggle("checked");
      const elements = document.querySelectorAll("li.checked"); // Select all <li> elements with the "checked" class

      // Check if all elements have the "checked" class toggled
      if (elements.length === document.querySelectorAll("li").length) {
        consoleElement.innerHTML =
          "        Congratulations! All tasks are completed now";
      } else {
        consoleElement.innerHTML = "";
      }
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
    saveData();
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

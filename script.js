const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

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
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      const elements = document.querySelectorAll("li"); // Select all <li> elements

      // Initialize a variable to keep track of whether all elements have the class toggled
      let allToggled = true;

      // Iterate over each <li> element
      elements.forEach((element) => {
        // Check if the class is present on the element
        if (!element.classList.contains("checked")) {
          // If the class is not present, set the flag to false
          allToggled = false;
          // Exit the loop since we already know not all elements have the class toggled
          return;
        }
      });

      // Check the flag to see if all elements have the class toggled
      if (allToggled) {
        alert("Congratulations all tasks are completed now");
      }
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
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

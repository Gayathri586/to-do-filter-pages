const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // The 'x' symbol
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// Event listener for checking/unchecking tasks and deleting them
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Function to save data to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show tasks from local storage on page load
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
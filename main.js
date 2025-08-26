const createBtn = document.querySelector(".create-btn");
const list = document.querySelector(".todo-list");
const input = document.querySelector("input");

let task = JSON.parse(localStorage.getItem("task")) || [];


function showTasks() {
    list.innerHTML = "";
    task.forEach((item, i) => {
        const div = document.createElement("div");

        const h3 = document.createElement("h3");
        h3.innerText = item.title;

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        editBtn.onclick = () => editTask(i);
        deleteBtn.onclick = () => deleteTask(i);

        div.append(h3, editBtn, deleteBtn);
        list.append(div);
    });

    localStorage.setItem("task", JSON.stringify(task));
}

function createTask() {
    if (!input.value.trim()) return alert("Введите задачу!");

    task.push({ title: input.value });
    input.value = "";

    showTasks();
}

function editTask(i) {
    const newTitle = prompt("Изменить задачу:", task[i].title);
    if (newTitle && newTitle.trim()) {
        task[i].title = newTitle.trim();
        showTasks();
    }
}

function deleteTask(i) {
    task.splice(i, 1);
    showTasks();
}

createBtn.onclick = createTask;
input.addEventListener("keydown", e => {
    if (e.key === "Enter") createTask();
});

showTasks();

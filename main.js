document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("todo-input");
    const dateField = document.getElementById("todo-date");
    const addButton = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    // 로컬 저장소에서 저장된 할 일 불러오기
    const loadTodos = () => {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        savedTodos.forEach(todo => addTodo(todo.text, todo.date, todo.completed));
    };

    // 할 일 추가 함수
    const addTodo = (text, date, completed = false) => {
        if (!text.trim()) return;

        const li = document.createElement("li");
        li.classList.add("todo-item");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", () => {
            saveTodos();
            li.classList.toggle("completed", checkbox.checked);
        });

        const span = document.createElement("span");
        span.textContent = text;

        const dateSpan = document.createElement("span");
        dateSpan.textContent = date ? `📅 ${date}` : "";
        dateSpan.classList.add("date-span");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        saveTodos();
    };

    // 할 일 저장 함수 (로컬 저장소)
    const saveTodos = () => {
        const todos = [];
        document.querySelectorAll(".todo-item").forEach(li => {
            todos.push({
                text: li.querySelector("span").textContent,
                date: li.querySelector(".date-span").textContent.replace("📅 ", ""),
                completed: li.querySelector("input").checked
            });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    // 추가 버튼 클릭 시 할 일 추가
    addButton.addEventListener("click", () => {
        addTodo(inputField.value, dateField.value);
        inputField.value = "";
        dateField.value = "";
    });

    // Enter 키 입력 시 할 일 추가
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTodo(inputField.value, dateField.value);
            inputField.value = "";
            dateField.value = "";
        }
    });

    // 페이지 로드 시 저장된 할 일 불러오기
    loadTodos();
});
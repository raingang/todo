class TodoList{
    constructor(title){
        this.todos = [];
        this.lastID = 0;
        this.title = title;
    }

    initializeTodo(){
        // Инициализируем приложение
        let app = document.createElement('div');
        app.setAttribute("id", "app");

        // Шапка
        const header = document.createElement('div');
        const headerTitle = document.createElement('span');
        headerTitle.innerHTML = this.title;
        header.appendChild(headerTitle);
        header.classList.add('header');
        app.appendChild(header);

        // Список todo
        let todoListElement = document.createElement('ul');
        todoListElement.setAttribute("id", "todos");
        app.appendChild(todoListElement);

        // Форма создания нового таска
        let form = document.createElement('form');
        form.setAttribute('id', 'form');
        let todoInput = document.createElement('input');
        todoInput.setAttribute('type', 'text');
        todoInput.setAttribute('id', 'add-input');
        let addButton = document.createElement('button');
        addButton.appendChild(document.createTextNode('Add todo'));
        addButton.addEventListener('click', this.addTodo());
        form.appendChild(todoInput);
        form.appendChild(addButton);
        app.appendChild(form);

        // ProgressBar
        let progressWrapper = document.createElement('div');
        progressWrapper.setAttribute('id', 'progress-wrapper');
        let progressBar = document.createElement('div');
        progressBar.setAttribute('id', 'progress-bar');
        progressBar.style.width = 0 + '%';
        progressWrapper.appendChild(progressBar);
        app.appendChild(progressWrapper);

        document.body.appendChild(app);
    }
    addTodo(){
        return (event) => {
            event.preventDefault();
            const message = document.getElementById('add-input').value;
            this.todos.push({message: message, id: this.lastID++, completed: false});
            let todo = document.createElement('li');
            todo.classList.add('todo');

            // Чекбокс
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.addEventListener('click', this.checkTodo(this.lastID - 1));
            todo.appendChild(checkbox);

            // Элемент сообщения
            let messageElement = document.createElement('span')
            messageElement.appendChild(document.createTextNode(message));
            todo.appendChild(messageElement);

            // Элемент редактирования сообщения
            let messageEdit = document.createElement('input');
            messageEdit.setAttribute('type', 'text');
            messageEdit.setAttribute('value', message);
            messageEdit.classList.toggle('disable')
            todo.appendChild(messageEdit);

            // Кнопка удаления
            let removeButton = document.createElement('button');
            removeButton.appendChild(document.createTextNode('Remove'));
            removeButton.addEventListener('click', this.removeTodo(this.lastID - 1));
            todo.appendChild(removeButton);

            // Кнопка редактирования
            let editButton = document.createElement('button');
            editButton.appendChild(document.createTextNode('Edit'));
            editButton.addEventListener('click', this.editTodo(this.lastID - 1, todo));
            todo.appendChild(editButton);
            document.getElementById('todos').appendChild(todo);

            // Обновление прогресс бара, т.к. количество элементов в this.todos изменилось
            this.updateProgressBar();
        }
    }

    removeTodo(id){
        // Удаляет todo по заданному id

        return () => {
            this.todos = this.todos.filter((item, i) => {
                item.id !== id ? null : document.getElementById('todos').removeChild(document.getElementById('todos').children[i])
                return item.id !== id;
            });
            this.updateProgressBar();
        }
    }

    editTodo(id, todo){
        return (event) => {
            let messageElement = todo.children[1];
            let messageEdit = todo.children[2];



            if(messageElement.classList.contains('disable')) {
                let message = messageEdit.value;
                console.log(message);
                messageElement.innerHTML = message;
                console.log(messageElement);
                this.todos = this.todos.map((item, i) => {
                    return item.id !== id ? item : {id: item.id, message: message, completed: item.completed}
                });
            }

            messageElement.classList.toggle('disable');
            messageEdit.classList.toggle('disable');
        }
    }

    checkTodo(id){
        return (event) => {
            this.todos = this.todos.map((item, i) => {
                return item.id !== id ? item : {id: item.id, message: item.message, completed: !item.completed}
            });
            console.log(event.target.parentElement)
            this.updateProgressBar();
        }
    }

    updateProgressBar(){
        const completedTasks = this.todos.reduce((prev, item, i) => item.completed ? prev + 1 : prev, 0)
        const percentsOfAll = completedTasks ? (completedTasks/this.todos.length) * 100 : 0;
        document.getElementById('progress-bar').style.width = percentsOfAll + '%';
    }
}

const todolist = new TodoList('sales')
todolist.initializeTodo();

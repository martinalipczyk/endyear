document.addEventListener('DOMContentLoaded', fetchUserTasks);

document.querySelector('#push').onclick = function (event) {
    event.preventDefault(); // Prevent form submission to avoid page reload
    const taskName = document.querySelector('#txt').value;

    if (taskName.length === 0) {
        alert('Please enter a task :)');
    } else {
        console.log(taskName);

        document.querySelector('#tasks').innerHTML += `
        
            <div class="container">
                <div class="row">
                    <span class="col s3 left-align" id="taskname">${taskName}</span>
                    <a href="#" class="col s2 btn right-align offset-s6 delete-task">
                        <i class="far fa-trash-alt"></i>done
                    </a>
                    <p></p>
                </div>
            </div>
        `;

        addToDatabase(taskName);
        updateDeleteFunctionality();
        document.querySelector('#txt').value = ''; // Clear the input box after adding a task
    }
};

function addToDatabase(taskName) {
    fetch('/addTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_name: taskName }), // Ensure the task_name is passed as JSON
    })
        .then(response => response.json())
        .then(data => console.log('Task added to the database:', data))
        .catch(error => console.error('Error adding task to the database:', error));
}

function updateDeleteFunctionality() {
    const current_tasks = document.querySelectorAll('.delete-task');

    current_tasks.forEach(task => {
        task.onclick = function () {
            const taskElement = this.parentNode.parentNode; // Adjusted to get the correct task element
            const taskName = taskElement.querySelector('#taskname').innerText;

            deleteFromDatabase(taskName);

            taskElement.remove();
        };
    });
}

function deleteFromDatabase(taskName) {
    fetch('/deleteTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_name: taskName }), // Ensure the task_name is passed as JSON
    })
    .then(response => response.json())
    .then(data => console.log('Task deleted from the database:', data))
    .catch(error => console.error('Error deleting task from the database:', error));
}

function fetchUserTasks() {
    fetch('/getUserTasks')
        .then(response => response.json())
        .then(data => {
            displayTasks(data.tasks);
        })
        .catch(error => console.error('Error fetching user tasks:', error));
}

function displayTasks(tasks) {
    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
        tasksContainer.innerHTML += `
            <div class="container">
                <div class="row">
                    <span class="col s3 left-align" id="taskname">${task.task_name}</span>
                    <a href="#" class="col s2 btn right-align offset-s6 delete-task">
                        <i class="far fa-trash-alt"></i>done
                    </a>
                    <p></p>
                </div>
            </div>
        `;
    });
    updateDeleteFunctionality();
}

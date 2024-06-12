
document.addEventListener('DOMContentLoaded', fetchUserTasks);

document.querySelector('#push').onclick = function () {
    const taskName = document.querySelector('#txt').value;
    console.log(taskName);

    if (taskName.length == 0) {
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

        document.getElementById("txt").value = "";

        updateDeleteFunctionality();

        addToDatabase(taskName);
    }
};

function addToDatabase(taskName) {
    fetch('/addTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_name: taskName }), // Change the key to match the server
    })
        .then(response => response.json())
        .then(data => console.log('Task added to the database:', data))
        .catch(error => console.error('Error adding task to the database:', error));
}


function updateDeleteFunctionality() {
    var current_tasks = document.querySelectorAll(".delete-task");

    for (var i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function () {
            var taskElement = this.parentNode.parentNode; // Adjusted to get the correct task element
            var taskName = taskElement.querySelector("#taskname").innerText;

            deleteFromDatabase(taskName);

            taskElement.remove();
        };
    }
}

function deleteFromDatabase(taskName) {
    fetch('/deleteTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_name: taskName }), // Ensure the task_name is passed as JSON
    })
    .then(response => {
        console.log(response); 
        return response.json();
    })
    .then(data => console.log('Task deleted from the database:', data))
    .catch(error => console.error('Error deleting task from the database:', error));
}

// Call updateDeleteFunctionality after adding tasks
document.querySelector('#push').onclick = function () {
    const taskName = document.querySelector('#txt').value;
    console.log(taskName);

    if (taskName.length == 0) {
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
        updateDeleteFunctionality(); // Update delete functionality after adding a task
    }
};


var input = document.querySelector('#newtask input');
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (input.value.length == 0) {
            alert('Please enter a task :)');
        } else {
            console.log(input.value);
            document.querySelector('#tasks').innerHTML += `
                <div class="container">
                    <div class="row">
                        <span class="col s3 left-align" id="taskname">${input.value}</span>
                        <a href="#" class="col s2 btn right-align offset-s6 delete-task">
                            <i class="far fa-trash-alt"></i>done
                        </a>
                        <p></p>
                    </div>
                </div>
            `;
            input.value = "";
            updateDeleteFunctionality();

            addToDatabase(input.value);
        }
    }
});


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



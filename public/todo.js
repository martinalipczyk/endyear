document.querySelector('#push').onclick = function(){
  if(document.querySelector('#newtask input').value.length == 0){
      alert("please enter a task :)")
  }

  else{
    console.log(document.querySelector('#newtask input').value)
      document.querySelector('#tasks').innerHTML += `
          <div class="task">
              <span id="taskname">
                  ${document.querySelector('#newtask input').value}
              </span>
              <button class="delete">
                    <img src = "graphics/finishtaskwidget.png" width = 50 >
                  <i class="far fa-trash-alt"></i>
              </button>
          </div>
      `;
      document.getElementById("textplace").value = "";
      var current_tasks = document.querySelectorAll(".delete");
      for(var i=0; i<current_tasks.length; i++){
          current_tasks[i].onclick = function(){
              this.parentNode.remove();
          }
      }
  }
}


var input = document.querySelector('#newtask input');

input.addEventListener("keypress", function(event) {

  if (event.key === "Enter") {

    if(document.querySelector('#newtask input').value.length == 0){
        alert("please enter a task :)")
    }
  
    else{
      console.log(document.querySelector('#newtask input').value)
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#newtask input').value}
                </span>
                <button class="delete">
                      <img src = "graphics/finishtaskwidget.png" width = 50 >
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;
        document.getElementById("textplace").value = "";
        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }
    }
  }
});
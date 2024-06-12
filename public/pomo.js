let time = 25 * 60;
let completeround = 0;

let countdownEl = document.getElementById('countdown');
setInterval(updateCountdown, 1000);


function updateCountdown() {
    
    if(time>=0){
        document.getElementById('yes').style.opacity = 0.0;
        document.getElementById('no').style.opacity = 0.0;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
    
        seconds = seconds < 10 ? '0' + seconds : seconds; 
    
        countdownEl.innerHTML = `${minutes} : ${seconds}`;
        time--;

        
        
    }
    else {
        
        switchTo5();
    }
     
}


// }
 function switchTo5() {
    time = 5 * 60;
    completeround = 1;

    stopStudy();
    
}

function stopStudy(){
    countdownEl.innerHTML = "this session is over! wanna study again?";
       document.getElementById('yes').style.opacity = 1.0;
       document.getElementById('no').style.opacity = 1.0;
       document.getElementById('yes').innerHTML = "yes!";
       document.getElementById('no').innerHTML = "no thanks :)";
}

function yes() {
    countdownEl.innerHTML = "yay!";
    window.location.href='pomodoro.html'

}

function no() {
    countdownEl.innerHTML = "ok! redirecting you to the home page :)";
    window.location.href='stubhome.html'
}

document.addEventListener('DOMContentLoaded', () => {
    const timers = []; // Array to store active timers
  
    const audio = new Audio('countdown.mp3'); 
    const startTimerButton = document.getElementById('start-timer-btn');
    const timersDisplay = document.getElementById('timers-display');
    
  
    // Function to format time display
    function formatTime(timeInSeconds) {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    // Function to update timer display every second
    function updateTimerDisplay(timer, timerElement) {
      timerElement.querySelector('.time').textContent = formatTime(timer.time);
      if (timer.time === 0) {
        timerElement.innerHTML = `<h3 style="background-color: yellow; color:black;">Timer Is Up !</h3>
        <button class="stop-btn" data-timer-index="${timers.length}">Stop Timer</button>`;
        timers.push(timer);
        timersDisplay.appendChild(timerElement);
        
  
        clearInterval(timer.intervalId);
        timerElement.classList.add('timer-ended');
      
      }
    }
  
    // Function to create a new timer
    function createTimer(hours, minutes, seconds) {
      const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
      if (timeInSeconds <= 0) {
        alert('Please enter a valid time.');
        return;
      }
  
      const timer = {
        time: timeInSeconds,
        intervalId: null,
      };
  
      const timerElement = document.createElement('div');
      timerElement.classList.add('timer');
      timerElement.innerHTML = `<h3>Time Left :</h3>
        <div class="time">${formatTime(timer.time)}</div>
        <button class="stop-btn" data-timer-index="${timers.length}">Stop Timer</button>
      `;
  
      timers.push(timer);
      timersDisplay.appendChild(timerElement);
      audio.play();
  
      timer.intervalId = setInterval(() => {
        timer.time--;
        updateTimerDisplay(timer, timerElement);
      }, 1000);

   
  

      
    }
  
    // Event listener for 'Start New Timer' button
    startTimerButton.addEventListener('click', () => {
      const hoursInput = document.getElementById('hours');
      const minutesInput = document.getElementById('minutes');
      const secondsInput = document.getElementById('seconds');
  
      const hours = parseInt(hoursInput.value);
      const minutes = parseInt(minutesInput.value);
      const seconds = parseInt(secondsInput.value);
  
      createTimer(hours, minutes, seconds);
  
      // Reset input fields
      hoursInput.value = '';
      minutesInput.value = '';
      secondsInput.value = '';
    });
  
    // Event listener for 'Stop Timer' buttons (using event delegation)
    timersDisplay.addEventListener('click', (event) => {
      if (event.target.classList.contains('stop-btn')) {
        const timerIndex = parseInt(event.target.dataset.timerIndex);
        const timer = timers[timerIndex];
        
        if(timer.intervalId===undefined){
            clearInterval(timer.intervalId);
            audio.pause();
            audio.currentTime = 0;
        }else{
            clearInterval(timer.intervalId);
            audio.pause();
            audio.currentTime = 0;
        }
        timers.splice(timerIndex, 1);
        event.target.parentNode.remove();
      }
    });
  });
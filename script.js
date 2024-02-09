import Timer from './timer.js'

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector ('.tempo-text');
const decreaseTempoBtn = document.querySelector ('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector ('.start-stop');
const subtractBeats = document.querySelector ('.subtract-beats');
const addBeats = document.querySelector ('.add-beats');
const measureCount = document.querySelector ('.measure-count');
//audio
const click1 = new Audio('click1.mp3');
const click2 = new Audio('click2.mp3');

let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false; //not clicked btn yet

//decreasing tempo - button
decreaseTempoBtn.addEventListener('click',()=>{
    if(bpm <= 20){
        return;
    }
    bpm--;
    validateTempo()
    updateMetronome()
});

//increasing tempo - button
increaseTempoBtn.addEventListener('click',()=>{
    if(bpm >= 280){
        return;
    }
    bpm++;
    validateTempo()
    updateMetronome()
});

//change in tempoDisplay with slider
tempoSlider.addEventListener('input',()=>{ //if you did 'change' the numbers won't change on every tick
    bpm = tempoSlider.value;
    validateTempo()
    updateMetronome()
});

//subtract the beats per measure - time signature
subtractBeats.addEventListener('click',()=>{
    if(beatsPerMeasure <= 2){
        return;
    }
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;//start from scratch
});

//add the beats per measure - time signature
addBeats.addEventListener('click',()=>{
    if(beatsPerMeasure >= 12){
        return;
    }
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

//start/stop metronome
startStopBtn.addEventListener('click',()=>{
    count = 0;
    if(!isRunning){
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = "STOP";
    }
    else{//already running ->STOP
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
    }
});

//every change should lead here
function updateMetronome(){
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000/bpm;
}

function validateTempo(){
    if(bpm <= 20 || bpm >=280){
        return;
    }
}

function playClick(){
    if(count === beatsPerMeasure){//last beat
        count = 0;
    }
    if(count === 0){//first beat
        click1.play();
        click1.currentTime = 0; //reset audio to beginning
    }
    else{//other beats
        click2.play();
        click2.currentTime = 0;
    }
    count++;
}

//60000/bpm to get in milliseconds
//if immediate: false then it will wait for sometime 
const metronome = new Timer(playClick, 60000/bpm, {immediate: true} );

// metronome.start();
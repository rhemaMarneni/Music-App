function Timer(callback, timeInterval, options){
    // callback: The function to be called at regular intervals.
    // timeInterval: The time interval between each execution of the callback function.
    // options: An object containing optional configurations for the timer.
    this.timeInterval = timeInterval;

    //start timer
    this.start = ()=>{
        //expected time = start time + time interval
        this.expected = Date.now() + this.timeInterval;
        //start timeout, save id in a property so we can cancel it later
        this.theTimeout = null;

        if(options.immediate){ //start immediately, do not wait until 'timeInterval'
            callback();
        }

        this.timeout = setTimeout(this.round, this.timeInterval);
        console.log('Timer Started');
    }

    //stop timer
    this.stop = () => {
        clearTimeout(this.timeout);
        console.log('Timer stopped');
    }

    //Running callback and adjusting time
    this.round = () => {
        console.log('timeout: ',this.timeout);
        //drift = current time - expected time
        let drift = Date.now() - this.expected;
        if(drift > this.timeInterval){
            //if error callback provided
            if(options.errorCallback){
                options.errorCallback();
            }
        }
        callback(); //called at regular intervals
        //increment time interval each time callback() is run
        this.expected += this.timeInterval;
        console.log('Drift: ', drift);
        console.log('Next round time interval: ', this.timeInterval - drift);
        this.timeout = setTimeout(this.round, this.timeInterval - drift);
    }
}

export default Timer;
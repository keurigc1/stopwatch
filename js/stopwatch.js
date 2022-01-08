$(function(){

    //variables
    var mode = 0; //app mode
    var timeCounter = 0; //time counter
    var lapCounter = 0; // lap counter
    var action; // variable for setInterval
    var lapNumber = 0; //number of Laps

    //minutes,seconds,centiseconds, for time and lap
    
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

    hideshowButtons("#startButton","#lapButton");
    //click on startButton
    $("#startButton").click(function(){
        //mode on
        mode = 1;
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start counter
        startAction();

    });

    //click on stopButton
    $("#stopButton").click(function(){
        //show resume and reset buttons
        hideshowButtons("#resumeButton","#resetButton");
        //stop counter
        clearInterval(action);
    });
    //click on resumeButton
    $("#resumeButton").click(function(){
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start counter
        startAction();
    });
    //click on resetButton
    $("#resetButton").click(function(){
        //reload the page
        location.reload();
    });
    //click on lapButton
    $("#lapButton").click(function(){
        //if mode is ON
        if(mode){
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }
    });
        


        //functions
        //shows 2 buttons
        function hideshowButtons(x,y){
            $(".control").hide();
            $(x).show();
            $(y).show();
        }

        //start the counter
        function startAction(){
            action = setInterval(function(){
                timeCounter++;
                if (timeCounter == 100*60*100){
                    timeCounter = 0;
                }
                lapCounter++;
                if (lapCounter == 100*60*100){
                    lapCounter = 0;
                }
                updateTime();
            },10);
            
        }
        //updateTime: converts counters to min, sec, centiseconds
        function updateTime(){
            //1min=60*100centiseconds=6000centiseconds
            timeMinutes = Math.floor(timeCounter/6000);
            //1sec=100centiseconds
            timeSeconds = Math.floor((timeCounter%6000)/100);
            timeCentiseconds = (timeCounter%6000)%100;
            $("#timeminute").text(format(timeMinutes));
            $("#timesecond").text(format(timeSeconds));
            $("#timecentisecond").text(format(timeCentiseconds));
            lapMinutes = Math.floor(lapCounter/6000);
            //1sec=100centiseconds
            lapSeconds = Math.floor((lapCounter%6000)/100);
            lapCentiseconds = (lapCounter%6000)%100;
            $("#lapminute").text(format(lapMinutes));
            $("#lapsecond").text(format(lapSeconds));
            $("#lapcentisecond").text(format(lapCentiseconds))
        }
        //format numbers
        function format(number){
            if(number<10){
                return '0'+number;
            }else{
                return number;
            }
        }

        //addLap funtion: print lap details inside the lap box

        function addLap(){
            lapNumber++;
            var myLapDetails = 
            '<div class="lap">'+
                '<div class="laptimetitle">'+
                '</div >'+'Lap '+ lapNumber +
                '<div class="laptime">' +
                '<span>'+ format(lapMinutes) + '</span>'+
                ':<span>'+ format(lapSeconds) + '</span>'+
                ':<span>'+ format(lapCentiseconds) + '</span>'+
                '</div>'+
            '</div>';
            $(myLapDetails).appendTo("#laps");
        }
});
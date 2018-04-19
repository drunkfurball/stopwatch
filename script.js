var hour = 0;
var minute = 0;
var second = 0;
var nano = 0;
var timerToggle = false;
var records = "";

function stopWatch(ref){
	if (timerToggle == false){
		counter = setInterval(countUp, 100);
		ref.innerHTML = "Stop";
		timerToggle = true;
	}
	else {
		clearInterval(counter);
		ref.innerHTML = "Start";
		timerToggle = false;
	}
}

function timer(ref){
	if (timerToggle == false){
		timerToggle = true;
		counter = setInterval(countDown, 100);
		ref.innerHTML = "Stop";
	}
	else {
		clearInterval(counter);
		ref.innerHTML = "Start";
		timerToggle = false;
	}
}

function countUp(){
	nano++;
	if (nano > 9){
		nano = nano - 10;
		second++;
		if (second > 59){
			second = second - 60;
			minute++;
			if (minute > 59){
				minute = minute - 60;
				hour++;
			}	
		}
	}
	displayCount();
}

function countDown(){
	nano--;
	if (nano < 0){
		nano = nano + 10;
		second--;
		if (second < 0){
			second = second + 60;
			minute--;
			if (minute < 0){
				minute = minute + 60;
				hour--;
				if (hour <0){
					timer(document.getElementById("start"), 0);
					alert("Time is Up!");
					countReset();
					
				}
			}
		}
	}
	displayCount();
}

function countSplit(){
	records = records + "<br>" + hour + "hrs " + 
		minute + "mins " + second + "." + nano + "secs";
	document.getElementById("board").innerHTML = records;
}

function countReset(){
	nano = 0;
	second = 0;
	minute = 0;
	hour = 0;
	displayCount();
}

function addMinute(){
	minute++;
	if (minute > 59){
		hour++;
		minute = minute - 60;
	}
	displayCount();
}

function subMinute(){
	if (minute <= 0){
		if (hour > 0){
			hour--;
			minute = minute + 60;
			minute--;
		}
		else {
			minute = 0;
		}
	}
	else {
		minute--;
	}
	displayCount();
}

function displayCount(){
	dnano = nano;
	if (second < 10){
		dsecond = "0" + second;
	}
	else {
		dsecond = second;
	}
	if (minute < 10){
		dminute = "0" + minute;
	}
	else {
		dminute = minute;
	}
	if (hour < 10){
		dhour = "0" + hour;
	}
	else {
		dhour = hour;
	}
	document.getElementById("clock").innerHTML = dhour + ":" + dminute +
		":" + dsecond + "<span class='micro'>." + dnano + "</span>";
}

function pomodoro(ref){
	if (timerToggle == false){
		timerToggle = true;
		minute = 30;
		counter = setInterval(phase, 100);
	}
	else {
		clearInterval(counter);
		countReset();
		ref.innerHTML = "Begin Pomodoro";
		timerToggle = false;
	}
}

function phase(){
	countDown();
	if (minute < 5) {
		document.getElementById("start").innerHTML = "Break Time"
	}
	else {
		document.getElementById("start").innerHTML = "Abandon Pomodoro";
	}
}
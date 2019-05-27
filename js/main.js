var next = 0;
var score = 0;
$(document).ready(function(){
	$(".next").css("display" , "block");
   	$('form').on("submit",function(){
   		$(".next").css("display" , "block");
   		$(".entry").css("display" , "none");
   		var name = $(".form-control").val();
		// alert("Welcome " + name + "");
		start();
   	});
});
function start(){
	if(next == 0){
		event.stopImmediatePropagation();
		document.querySelector('.question').innerHTML = "How Many Popular Blog Nisharg Have?";
		document.querySelector('.op1').innerHTML = "1";
		document.querySelector('.op2').innerHTML = "2";
		document.querySelector('.op3').innerHTML = "3";
		document.querySelector('.op4').innerHTML = "4";
		document.querySelector('.point').innerHTML = "1/5";
		document.querySelector('.progress-bar').style.width = "20%";
		for (var i = 1; i < 5; i++) {
			var lol = document.querySelector(".op"+i+"").style.backgroundColor = "white";
		}
		red();
		green();
		next = 1;
	}	
}
function nextpage(event){
	if(next == 1){
		event.stopImmediatePropagation();
		document.querySelector('.question').innerHTML = "How Many Subscribers Are Nisharg Have In His Youtube Channel?";
		document.querySelector('.op1').innerHTML = ">100";
		document.querySelector('.op2').innerHTML = ">150";
		document.querySelector('.op3').innerHTML = ">200";
		document.querySelector('.op4').innerHTML = ">250";
		document.querySelector('.point').innerHTML = "2/5";
		document.querySelector('.progress-bar').style.width = "40%";
		for (var i = 1; i < 5; i++) {
			var lol = document.querySelector(".op"+i+"").style.backgroundColor = "white";
		}
		red();
		green();
		next = 2;
	}
	else if(next == 2){
		event.stopImmediatePropagation();
		document.querySelector('.question').innerHTML = "How Many Programming Languages Nisharg Knows Perfectly?";
		document.querySelector('.op1').innerHTML = "3";
		document.querySelector('.op2').innerHTML = "4";
		document.querySelector('.op3').innerHTML = "5";
		document.querySelector('.op4').innerHTML = "6";
		document.querySelector('.point').innerHTML = "3/5";
		document.querySelector('.progress-bar').style.width = "60%";
		for (var i = 1; i < 5; i++) {
			var lol = document.querySelector(".op"+i+"").style.backgroundColor = "white";
		}
		red();
		green();
		next = 3;
		
	}
	else if(next == 3){
		event.stopImmediatePropagation();
		document.querySelector('.question').innerHTML = "Which Of The Programming Language Blog Nisharg Have?";
		document.querySelector('.op1').innerHTML = "C";
		document.querySelector('.op2').innerHTML = "C++";
		document.querySelector('.op3').innerHTML = "HTML";
		document.querySelector('.op4').innerHTML = "Js";
		document.querySelector('.point').innerHTML = "4/5";
		document.querySelector('.progress-bar').style.width = "80%";
		for (var i = 1; i < 5; i++) {
			var lol = document.querySelector(".op"+i+"").style.backgroundColor = "white";
		}
		red();
		green();
		next = 4;
	}
	else if(next == 4){
		event.stopImmediatePropagation();
		document.querySelector('.question').innerHTML = "This Quiz Is Made In Which Programming Languages?";
		document.querySelector('.op1').innerHTML = "HTML,CSS,Js";
		document.querySelector('.op2').innerHTML = "HTML,CSS,Bootstrap,Js";
		document.querySelector('.op3').innerHTML = "HTML,CSS,Bootstrap,JQuery";
		document.querySelector('.op4').innerHTML = "HTML,CSS,Bootstrap,Js,JQuery";
		document.querySelector('.point').innerHTML = "5/5";
		document.querySelector('.progress-bar').style.width = "100%";
		for (var i = 1; i < 5; i++) {
			var lol = document.querySelector(".op"+i+"").style.backgroundColor = "white";
		}
		document.querySelector('.next').innerHTML = "Result";
		red();
		green();
		next = 5;
	}
	else if(next == 5){
		document.querySelector('.container-fluid').style.display = "none";
		document.querySelector('.congo').style.display = "block";
	}
}
function red(){
	var classname = document.getElementsByClassName("option");
	var count = 1;
	var setcolor = function() {
		var button = this;
		//console.log(button);
		if (count == 0) {
		   //console.log('nothing');      
		}
		else {
		    button.style.backgroundColor = "red";
		    count = 0;
		    //console.log('red');
		}
	};

	for (var i = 0; i < classname.length; i++) {
	  	classname[i].addEventListener('click', setcolor);
	};
};
function green(){
	var classname = document.getElementsByClassName("option");
	var setclr = function() {
		if (next == 1) {
			document.querySelector('.op2').style.backgroundColor = "green";
		   	//console.log('green1');      
		}
		else if(next == 2){
			document.querySelector('.op3').style.backgroundColor = "green";
		   	//console.log('green2');
		}
		else if(next == 3){
			document.querySelector('.op4').style.backgroundColor = "green";
		   	//console.log('green3');
		}
		else if(next == 4){
			document.querySelector('.op1').style.backgroundColor = "green";
		   	//console.log('green4');
		}
		else if(next == 5){
			document.querySelector('.op4').style.backgroundColor = "green";
		   	//console.log('green5');			
		}
		else {
		    //console.log('red');
		}
	};

	for (var i = 0; i < classname.length; i++) {
	  	classname[i].addEventListener('click', setclr);
	};
};

function point(){
	var classname = document.getElementsByClassName("option");
	var points = function() {
		var button = this;
		var btn = this.style.backgroundColor;
		//console.log("Color :- " + btn + "");
		//console.log(button);
		if (button.style.backgroundColor == "white") {
			$(document).ready(function(){
  				$(button)[0].click();
  				if (button.style.backgroundColor == "green") {
  					score++;
  					console.log('happy :- ' + score + "");
  				}
  				for (var i = 1; i < 6; i++) {
				if(score == ""+ i +""){
					var win = document.querySelector('.change').innerHTML = "" + i + "";
				}
		}
  				//console.log(button);
			});
		   	//console.log('score');      
		}
		else {
		    //console.log('no score');
		}	
	};
	for (var i = 0; i < classname.length; i++) {
	  	classname[i].addEventListener('click', points);
	};
}

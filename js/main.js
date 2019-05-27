var UIController = (function () {
	//  ALL CLASSES THAT ARE USED IN THIS PROJECT
	var DOMData = {
		op1: '.op1', op2: '.op2', op3: '.op3', op4: '.op4', op5: '.op5',
		next: '.next', entry: '.entry', form: 'form',
		question: '.question', point: '.point',
		progressBar: '.progress-bar',
		container: '.container',
		formControl: '.form-control'
	};

	// ALL QUESTIONS
	var question = {
		que1: "How Many Popular Blog Nisharg Have?",
		que2: "How Many Subscribers Are Nisharg Have In His Youtube Channel?",
		que3: "How Many Programming Languages Nisharg Knows Perfectly?",
		que4: "Which Of The Programming Language Blog Nisharg Have?",
		que5: "This Quiz Is Made In Which Programming Languages?"
	};

	// ALL OPTIONS
	var options = {
		op1: [1, 2, 3, 4],
		op2: [100, 150, 200, 250],
		op3: [3, 4, 5, 6],
		op4: ["C", "C++", "HTML", "Js"],
		op5: ["HTML,CSS,Js", "HTML,CSS,Bootstrap,Js", "HTML,CSS,Bootstrap,JQuery", "HTML,CSS,Bootstrap,Js,JQuery"]
	};

	return {
		getDom: function () {
			return DOMData
		},
		getQuestion: function () {
			return question
		},
		getOptions: function () {
			return options
		}
	}
})();

var updateController = (function (ui) {
	// ACCESS UIController DOMs VARIABLE
	var updateDom = ui.getDom();

	//
	var Information = function (que, op, correct) {
		this.que = que;
		this.op = op;
		this.correct = correct;
		// 23414  12303 UIController.question.que1, UIController.options.op1, UIController.options.op1[2]
	};

	// ADD DATA INTO UI
	var addData =  function(addQuestion, addOptions, once) {
		var html =
			'<p class="question">' + addQuestion + '</p><br>' +
			'<div class="option op1 radius_top">' + addOptions[0] +'</div>' +
			'<div class="option op2">' + addOptions[1] +'</div>' +
			'<div class="option op3">' + addOptions[2] +'</div>' +
			'<div class="option op4 radius_bottom">' + addOptions[3] +'</div>';

		// ADD DATA TO THE CHILD OF CONTAINER
		if (once) {
			document.querySelector(updateDom.container).insertAdjacentHTML('beforeend', html);
		} else {
			document.querySelector(updateDom.container + ' p').innerHTML = addQuestion;
			for (var i = 1; i <= 4; i++) {
				document.querySelector(updateDom.container + ' .op' + i).innerHTML = addOptions[i - 1];
			}
		}

	};

	// WHEN YOU CLICK BUTTON THIS FUNCTION FIRED
	var clickData = function () {
		var clicked = 0;
		var getQuestion = ui.getQuestion();
		var getOptions = ui.getOptions();
		addData(getQuestion.que1, getOptions.op1, true);

		// UPDATE YOUR DATA WHEN CLICK
		var updateData = function() {
			for (var i = 0; i <= 3; i++) {
				if (clicked === i) {
					var concatIQuestion = 'que' + (i + 2);
					var concatIOption = 'op' + (i + 2);
					var loopedQuestion = getQuestion[concatIQuestion];
					var loopedOption = getOptions[concatIOption];
					addData(loopedQuestion, loopedOption, false);
				}
			}
			if (clicked === 3) {
				document.querySelector(updateDom.next).innerHTML = 'Result';
			}
		};

		// WHEN YOU CLICK BUTTON THIS EVENT FIRED
		document.querySelector(updateDom.next).addEventListener('click', function () {
			updateData();
			clicked++;
		});
	};

	return {
		getUpdateData: function() {
			return addData()
		},
		getClickedData: function () {
			return clickData()
		}
	}
})(UIController);

var controller = (function (ui, update) {
	// ACCESS UIController DOMs VARIABLE
	var controllerDOM = ui.getDom();

	// ALL EVENT HANDED BY THIS FUNCTION
	var eventHandler = function () {
		document.querySelector(controllerDOM.form).addEventListener('submit', function () {
			document.querySelector(controllerDOM.next).style.display = 'block';
			document.querySelector(controllerDOM.entry).style.display = 'none';
			const name = document.querySelector(controllerDOM.formControl).value;
			// alert("Welcome " + name + "");
		});
	};

	return {
		init: function () {
			console.log('Application Started');
			eventHandler();
			update.getClickedData();
		}
	}
})(UIController, updateController);

// WITHOUT THAT PROGRAM NOT CALLED
controller.init();



// var next = 0;
// var score = 0;

// function start(event){
// 	if(next == 0){
// 		event.stopImmediatePropagation();
// 		document.querySelector('.question').innerHTML = "How Many Popular Blog Nisharg Have?";
// 		document.querySelector('.op1').innerHTML = "1";
// 		document.querySelector('.op2').innerHTML = "2";
// 		document.querySelector('.op3').innerHTML = "3";
// 		document.querySelector('.op4').innerHTML = "4";
// 		document.querySelector('.point').innerHTML = "1/5";
// 		document.querySelector('.progress-bar').style.width = "20%";
// 		for (var i = 1; i < 5; i++) {
// 			var lol = document.querySelector(".op"+i+"").style.backgroundColor = "white";
// 		}
// 		red();
// 		green();
// 		next = 1;
// 	}
// }
// function nextpage(event){
// 	if(next == 1){
// 		event.stopImmediatePropagation();
// 		document.querySelector('.question').innerHTML = "How Many Subscribers Are Nisharg Have In His Youtube Channel?";
// 		document.querySelector('.op1').innerHTML = ">100";
// 		document.querySelector('.op2').innerHTML = ">150";
// 		document.querySelector('.op3').innerHTML = ">200";
// 		document.querySelector('.op4').innerHTML = ">250";
// 		document.querySelector('.point').innerHTML = "2/5";
// 		document.querySelector('.progress-bar').style.width = "40%";
// 		for (var i = 1; i < 5; i++) {
// 			var lol = document.querySelector(".op"+i+"").style.backgroundColor = "white";
// 		}
// 		red();
// 		green();
// 		next = 2;
// 	}
// 	else if(next == 2){
// 		event.stopImmediatePropagation();
// 		document.querySelector('.question').innerHTML = "How Many Programming Languages Nisharg Knows Perfectly?";
// 		document.querySelector('.op1').innerHTML = "3";
// 		document.querySelector('.op2').innerHTML = "4";
// 		document.querySelector('.op3').innerHTML = "5";
// 		document.querySelector('.op4').innerHTML = "6";
// 		document.querySelector('.point').innerHTML = "3/5";
// 		document.querySelector('.progress-bar').style.width = "60%";
// 		for (var i = 1; i < 5; i++) {
// 			var lol = document.querySelector(".op"+i+"").style.backgroundColor = "white";
// 		}
// 		red();
// 		green();
// 		next = 3;
//
// 	}
// 	else if(next == 3){
// 		event.stopImmediatePropagation();
// 		document.querySelector('.question').innerHTML = "Which Of The Programming Language Blog Nisharg Have?";
// 		document.querySelector('.op1').innerHTML = "C";
// 		document.querySelector('.op2').innerHTML = "C++";
// 		document.querySelector('.op3').innerHTML = "HTML";
// 		document.querySelector('.op4').innerHTML = "Js";
// 		document.querySelector('.point').innerHTML = "4/5";
// 		document.querySelector('.progress-bar').style.width = "80%";
// 		for (var i = 1; i < 5; i++) {
// 			var lol = document.querySelector(".op"+i+"").style.backgroundColor = "white";
// 		}
// 		red();
// 		green();
// 		next = 4;
// 	}
// 	else if(next == 4){
// 		event.stopImmediatePropagation();
// 		document.querySelector('.question').innerHTML = "This Quiz Is Made In Which Programming Languages?";
// 		document.querySelector('.op1').innerHTML = "HTML,CSS,Js";
// 		document.querySelector('.op2').innerHTML = "HTML,CSS,Bootstrap,Js";
// 		document.querySelector('.op3').innerHTML = "HTML,CSS,Bootstrap,JQuery";
// 		document.querySelector('.op4').innerHTML = "HTML,CSS,Bootstrap,Js,JQuery";
// 		document.querySelector('.point').innerHTML = "5/5";
// 		document.querySelector('.progress-bar').style.width = "100%";
// 		for (var i = 1; i < 5; i++) {
// 			var lol = document.querySelector(".op"+i+"").style.backgroundColor = "white";
// 		}
// 		document.querySelector('.next').innerHTML = "Result";
// 		red();
// 		green();
// 		next = 5;
// 	}
// 	else if(next == 5){
// 		document.querySelector('.container-fluid').style.display = "none";
// 		document.querySelector('.congo').style.display = "block";
// 	}
// }
// function red(){
// 	var classname = document.getElementsByClassName("option");
// 	var count = 1;
// 	var setcolor = function() {
// 		var button = this;
// 		//console.log(button);
// 		if (count == 0) {
// 		   //console.log('nothing');
// 		}
// 		else {
// 		    button.style.backgroundColor = "red";
// 		    count = 0;
// 		    //console.log('red');
// 		}
// 	};
//
// 	for (var i = 0; i < classname.length; i++) {
// 	  	classname[i].addEventListener('click', setcolor);
// 	};
// };
// function green(){
// 	var classname = document.getElementsByClassName("option");
// 	var setclr = function() {
// 		if (next == 1) {
// 			document.querySelector('.op2').style.backgroundColor = "green";
// 		   	//console.log('green1');
// 		}
// 		else if(next == 2){
// 			document.querySelector('.op3').style.backgroundColor = "green";
// 		   	//console.log('green2');
// 		}
// 		else if(next == 3){
// 			document.querySelector('.op4').style.backgroundColor = "green";
// 		   	//console.log('green3');
// 		}
// 		else if(next == 4){
// 			document.querySelector('.op1').style.backgroundColor = "green";
// 		   	//console.log('green4');
// 		}
// 		else if(next == 5){
// 			document.querySelector('.op4').style.backgroundColor = "green";
// 		   	//console.log('green5');
// 		}
// 		else {
// 		    //console.log('red');
// 		}
// 	};
//
// 	for (var i = 0; i < classname.length; i++) {
// 	  	classname[i].addEventListener('click', setclr);
// 	};
// };
//
// function point(){
// 	var classname = document.getElementsByClassName("option");
// 	var points = function() {
// 		var button = this;
// 		var btn = this.style.backgroundColor;
// 		//console.log("Color :- " + btn + "");
// 		//console.log(button);
// 		if (button.style.backgroundColor == "white") {
// 			$(document).ready(function(){
//   				$(button)[0].click();
//   				if (button.style.backgroundColor == "green") {
//   					score++;
//   					console.log('happy :- ' + score + "");
//   				}
//   				for (var i = 1; i < 6; i++) {
// 				if(score == ""+ i +""){
// 					var win = document.querySelector('.change').innerHTML = "" + i + "";
// 				}
// 		}
//   				//console.log(button);
// 			});
// 		   	//console.log('score');
// 		}
// 		else {
// 		    //console.log('no score');
// 		}
// 	};
// 	for (var i = 0; i < classname.length; i++) {
// 	  	classname[i].addEventListener('click', points);
// 	};
// }

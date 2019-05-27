var UIController = (function () {
	//  ALL CLASSES THAT ARE USED IN THIS PROJECT
	var DOMData = {
		op1: '.op1', op2: '.op2', op3: '.op3', op4: '.op4', op5: '.op5',
		next: '.next', entry: '.entry', form: 'form',
		question: '.question', point: '.point', congo: '.congo',
		progressBar: '.progress-bar', formControl: '.form-control',
		container: '.container', containerFluid: '.container-fluid'
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
		op5: ["HTML, CSS, Js", "HTML, CSS, Bootstrap, Js", "HTML, CSS, Bootstrap, JQuery", "HTML, CSS, Bootstrap, Js, JQuery"]
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
		// 23413  12302 UIController.question.que1, UIController.options.op1, UIController.options.op1[2]
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

	// WHEN YOU CLICK NEXT BUTTON THIS FUNCTION FIRED
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
			} else if (clicked === 4) {
				document.querySelector(updateDom.containerFluid).style.display = 'none';
				document.querySelector(updateDom.congo).style.display = 'block';
			}
		};

		// INCREASE PERCENTAGE IN UI BY 20
		var IncreasePercentage = function () {
			var width = document.querySelector(updateDom.progressBar).style.width.split('%');
			width = parseInt(width[0]) + 20;
			document.querySelector(updateDom.progressBar).style.width = width + '%';
		};

		var IncreasePoint = function () {
			var pointValue = document.querySelector(updateDom.point).innerHTML.split('/');
			pointValue = parseInt(pointValue[0]) + 1;
			document.querySelector(updateDom.point).innerHTML = pointValue + '/5';
		};

		// WHEN YOU CLICK BUTTON THIS EVENT FIRED
		document.querySelector(updateDom.next).addEventListener('click', function () {
			updateData();
			IncreasePercentage();
			IncreasePoint();
			clicked++;
		});
	};

	var clickOnOption = function () {

	};

	return {
		// getUpdateData: function() {
		// 	return addData()
		// },
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
			eventHandler();
			update.getClickedData();
		}
	}
})(UIController, updateController);

// WITHOUT THAT PROGRAM NOT CALLED
controller.init();

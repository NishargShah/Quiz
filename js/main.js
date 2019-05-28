var UIController = (function () {
	//  ALL CLASSES THAT ARE USED IN THIS PROJECT
	var DOMData = {
		op1: '.op1', op2: '.op2', op3: '.op3', op4: '.op4', op5: '.op5',
		next: '.next', entry: '.entry', form: 'form', point: '.point',
		question: '.question', option: '.option', congo: '.congo',
		progressBar: '.progress-bar', formControl: '.form-control',
		container: '.container', containerFluid: '.container-fluid',
        change: '.change', clicked: 0, score: 0
	};

	// ALL QUESTIONS
	var questions = {
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

	// ALL ANSWER
    var answers = {
        ans1: [0, 1],
        ans2: [1, 2],
        ans3: [2, 3],
        ans4: [3, 0],
        ans5: [4, 2]
    };

	// RETURN THE FUNCTION OF UIController
	return {
		getDom: function () {
			return DOMData
		},
		getQuestions: function () {
			return questions
		},
		getOptions: function () {
			return options
		},
        getAnswers: function () {
            return answers
        }
	}
})();

var updateController = (function (ui) {
	// ACCESS UIController DOMs VARIABLE
    var updateDom, clicked, getQuestions, getOptions;
	updateDom = ui.getDom();
	clicked = updateDom.clicked;
    getQuestions = ui.getQuestions();
    getOptions = ui.getOptions();

	// ADD DATA INTO UI
	var addData =  function(addQuestion, addOptions, once) {
	    // ADD HTML DYNAMICALLY WHEN EVERY CALL
		var html =
			'<p class="question">' + addQuestion + '</p><br>' +
			'<div class="option op1">' + addOptions[0] +'</div>' +
			'<div class="option op2">' + addOptions[1] +'</div>' +
			'<div class="option op3">' + addOptions[2] +'</div>' +
			'<div class="option op4">' + addOptions[3] +'</div>';

		// ADD DATA TO THE CHILD OF CONTAINER AND CHECK TRUE OR FALSE FOR INSERT OR REPLACE
		if (once) {
			document.querySelector(updateDom.container).insertAdjacentHTML('beforeend', html);
		} else {
			document.querySelector(updateDom.container + ' p').innerHTML = addQuestion;
			for (var i = 1; i <= 4; i++) {
				document.querySelector(updateDom.container + ' .op' + i).innerHTML = addOptions[i - 1];
			}
		}
	};

	// PROVIDE DATA WHEN YOU CLICK ON NEXT BUTTON
	var clickData = function () {
        // THIS FUNCTION FIRED INITIALLY
        var initiallyData = function () {
            addData(getQuestions.que1, getOptions.op1, true);
        };

        // REPLACE DATA WHEN NEXT BUTTON PRESSED
        var updateData = function() {
            for (var i = 0; i <= 3; i++) {
                if (clicked === i) {
                    var concatIQuestion = 'que' + (i + 2);
                    var concatIOption = 'op' + (i + 2);
                    var loopedQuestion = getQuestions[concatIQuestion];
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
            clicked++;
        };

        // INCREASE PERCENTAGE IN UI BY 20
		var increasePercentage = function () {
			var width = document.querySelector(updateDom.progressBar).style.width.split('%');
			width = parseInt(width[0]) + 20;
			document.querySelector(updateDom.progressBar).style.width = width + '%';
		};

        // INCREASE POINT IN UI BY 1
		var increasePoint = function () {
			var pointValue = document.querySelector(updateDom.point).innerHTML.split('/');
			pointValue = parseInt(pointValue[0]) + 1;
			document.querySelector(updateDom.point).innerHTML = pointValue + '/5';
		};

		// RETURN OF clickData
		return {
		    getInitiallyData: function () {
		        return initiallyData();
            },
            getUpdateData: function () {
                return updateData();
            },
            getIncreasePercentage: function () {
                return increasePercentage();
            },
            getIncreasePoint: function () {
                return increasePoint();
            }
        }
	};

	// WHEN YOU CLICK ON OPTION THIS FUNCTION IS FIRED
    var clickOnOption = function () {
        var optionVar = document.querySelectorAll(updateDom.option);
        var answers = ui.getAnswers();

        // WHEN YOU CLICK ON OPTION THIS EVENT IS FIRED
        for (var i = 0; i < optionVar.length; i++) {
            optionVar[i].addEventListener('click', function (current) {
                // CURRENT OPTION WHEN YOU CLICK
                var currentLength = current.target.classList[1];
                var currentVar = (currentLength.substr(currentLength.length - 1)) - 1;

                // GET CORRECT ANSWER
                for (var i = 0; i <= 4; i++) {
                    if (clicked === i) {
                        var concatIAnswer = 'ans' + (i + 1);
                        var correctAnswer = answers[concatIAnswer][1];
                    }
                }

                // CHECK IF CURRENT ANSWER AND CURRENT CLICK OPTION IS MATCHED OR NOT
                if (correctAnswer === currentVar) {
                    if (optionVar[correctAnswer].style.backgroundColor !== 'green') {
                        updateDom.score++;
                    }
                    optionVar[correctAnswer].style.backgroundColor = "green";
                    optionVar[correctAnswer].style.color = "white";
                } else {
                    if (optionVar[correctAnswer].style.backgroundColor === 'green' && optionVar[currentVar].style.backgroundColor !== 'red') {
                        optionVar[currentVar].style.backgroundColor = "white";
                    } else {
                        optionVar[currentVar].style.backgroundColor = 'red';
                        optionVar[currentVar].style.color = "white";
                    }
                    optionVar[correctAnswer].style.backgroundColor = "green";
                    optionVar[correctAnswer].style.color = "white";
                }
            });
        }
    };

    // UPDATE SCORE EVERY TIME WHEN YOU CLICK ON NEXT BUTTON
    var updateScore = function () {
        document.querySelector(updateDom.change).innerHTML = updateDom.score;
    };

    // SET COLOR WHITE WHEN CLICK ON NEXT
    var setBG2White = function () {
        var optionVar = document.querySelectorAll(updateDom.option);
        for (var i = 0; i < 4; i++) {
            optionVar[i].style.backgroundColor = "white";
            optionVar[i].style.color = "black";
        }
    };

    // WHEN YOU CLICK NEXT BUTTON THIS FUNCTION FIRED
	var clickOnNext = function () {
        // THIS EVENT FIRED INITIALLY
        clickData().getInitiallyData();

        // WHEN YOU CLICK NEXT BUTTON THIS EVENT FIRED
        document.querySelector(updateDom.next).addEventListener('click', function () {
            clickData().getUpdateData();
            clickData().getIncreasePercentage();
            clickData().getIncreasePoint();
            setBG2White();
            updateScore();
        });
    };

    // RETURN THE FUNCTION OF updateController
	return {
        getClickOnNext: function () {
            return clickOnNext();
        },
        getClickOnOption: function () {
            return clickOnOption()
        }
	}
})(UIController);

var controller = (function (ui, update) {
	// ACCESS UIController DOMs VARIABLE
	var controllerDOM = ui.getDom();

	// ALL EVENT HANDED BY THIS FUNCTION
	var eventHandler = function () {
		document.querySelector(controllerDOM.form).addEventListener('submit', function () {
			document.querySelector(controllerDOM.containerFluid).style.display = 'block';
			document.querySelector(controllerDOM.next).style.display = 'block';
			document.querySelector(controllerDOM.entry).style.display = 'none';
			const name = document.querySelector(controllerDOM.formControl).value;
			alert("Welcome " + name);
		});
	};

    // RETURN THE FUNCTION OF controller
	return {
		init: function () {
			eventHandler();
			update.getClickOnNext();
			update.getClickOnOption();
		}
	}
})(UIController, updateController);

// WITHOUT THAT PROGRAM NOT CALLED
controller.init();

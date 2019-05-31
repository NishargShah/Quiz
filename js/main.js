let mainController = (() => {
    let UIController = (() => {
        //  ALL CLASSES THAT ARE USED IN THIS PROJECT
        const DOMData = {
            op1: '.op1', op2: '.op2', op3: '.op3', op4: '.op4', op5: '.op5',
            next: '.next', entry: '.entry', form: 'form', point: '.point',
            question: '.question', option: '.option', congo: '.congo',
            progressBar: '.progress-bar', formControl: '.form-control',
            container: '.container', containerFluid: '.container-fluid',
            change: '.change', clicked: 0, score: 0, clickOrNotVar: false
        };

        // ALL QUESTIONS
        const questions = {
            que1: "Nisharg Site Name?",
            que2: "How Many Subscribers Are Nisharg Have In His Youtube Channel?",
            que3: "How Many Programming Languages Nisharg Knows Perfectly?",
            que4: "Which Of The Programming Language Blog Nisharg Have?",
            que5: "This Quiz Is Made In Which Programming Languages?"
        };

        // ALL OPTIONS
        const options = {
            op1: ['https://nisharg.com', 'https://nisarg.me', 'https://nisharg.tech', 'https://nisharg.me'],
            op2: ['>=100', '>=250', '>=500', '>=1000'],
            op3: [3, 5, 7, 9],
            op4: ["C", "C++", "HTML", "Js"],
            op5: ["HTML, CSS, Js", "HTML, CSS, Bootstrap, Js", "HTML, CSS, Bootstrap, JQuery", "HTML, CSS, Bootstrap, Js, JQuery"]
        };

        // ALL ANSWER
        const answers = {
            ans1: [0, 3],
            ans2: [1, 1],
            ans3: [2, 2],
            ans4: [3, 0],
            ans5: [4, 1]
        };

        // RETURN THE FUNCTION OF UIController
        return {
            getDom: () => DOMData,
            getQuestions: () => questions,
            getOptions: () => options,
            getAnswers: () => answers
        }
    })();

    let updateController = (ui => {
        // ACCESS UIController DOMs VARIABLE
        let updateDom, clicked, getQuestions, getOptions;
        updateDom = ui.getDom();
        clicked = updateDom.clicked;
        getQuestions = ui.getQuestions();
        getOptions = ui.getOptions();

        // ADD DATA INTO UI
        let addData = (addQuestion, addOptions, once) => {
            // ADD HTML DYNAMICALLY WHEN EVERY CALL
            let html =
                '<p class="question">' + addQuestion + '</p><br>' +
                '<div class="option op1">' + addOptions[0] + '</div>' +
                '<div class="option op2">' + addOptions[1] + '</div>' +
                '<div class="option op3">' + addOptions[2] + '</div>' +
                '<div class="option op4">' + addOptions[3] + '</div>';

            // ADD DATA TO THE CHILD OF CONTAINER AND CHECK TRUE OR FALSE FOR INSERT OR REPLACE
            if (once) {
                document.querySelector(updateDom.container).insertAdjacentHTML('beforeend', html);
            } else {
                document.querySelector(updateDom.container + ' p').innerHTML = addQuestion;
                for (let i = 1; i <= 4; i++) {
                    document.querySelector(updateDom.container + ' .op' + i).innerHTML = addOptions[i - 1];
                }
            }
        };

        // PROVIDE DATA WHEN YOU CLICK ON NEXT BUTTON
        let clickData = () => {
            // THIS FUNCTION FIRED INITIALLY
            let initiallyData = () => {
                addData(getQuestions.que1, getOptions.op1, true);
            };

            // REPLACE DATA WHEN NEXT BUTTON PRESSED
            let updateData = () => {
                for (let i = 0; i <= 3; i++) {
                    if (clicked === i) {
                        let concatIQuestion = 'que' + (i + 2);
                        let concatIOption = 'op' + (i + 2);
                        let loopedQuestion = getQuestions[concatIQuestion];
                        let loopedOption = getOptions[concatIOption];
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
            let increasePercentage = () => {
                let width = document.querySelector(updateDom.progressBar).style.width.split('%');
                width = parseInt(width[0]) + 20;
                document.querySelector(updateDom.progressBar).style.width = width + '%';
            };

            // INCREASE POINT IN UI BY 1
            let increasePoint = () => {
                let pointValue = document.querySelector(updateDom.point).innerHTML.split('/');
                pointValue = parseInt(pointValue[0]) + 1;
                document.querySelector(updateDom.point).innerHTML = pointValue + '/5';
            };

            // RETURN OF clickData
            return {
                getInitiallyData: () => initiallyData(),
                getUpdateData: () => updateData(),
                getIncreasePercentage: () => increasePercentage(),
                getIncreasePoint: () => increasePoint()
            }
        };

        // WHEN YOU CLICK ON OPTION THIS FUNCTION IS FIRED
        let clickOnOption = () => {
            let optionVar = document.querySelectorAll(updateDom.option);
            let answers = ui.getAnswers();

            // WHEN YOU CLICK ON OPTION THIS EVENT IS FIRED
            for (let i = 0; i < optionVar.length; i++) {
                optionVar[i].addEventListener('click', current => {
                    // CHECK OPTION CLICKED OR NOT SO NEXT BUTTON REACT FROM THAT
                    updateDom.clickOrNotVar = true;
                    // CURRENT OPTION WHEN YOU CLICK
                    let currentLength, currentVar, concatIAnswer, correctAnswer;
                    currentLength = current.target.classList[1];
                    currentVar = (currentLength.substr(currentLength.length - 1)) - 1;

                    // GET CORRECT ANSWER
                    for (let i = 0; i <= 4; i++) {
                        if (clicked === i) {
                            concatIAnswer = 'ans' + (i + 1);
                            correctAnswer = answers[concatIAnswer][1];
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
        let updateScore = () => {
            document.querySelector(updateDom.change).innerHTML = updateDom.score;
        };

        // SET COLOR WHITE WHEN CLICK ON NEXT
        let setBG2White = () => {
            let optionVar = document.querySelectorAll(updateDom.option);
            for (let i = 0; i < 4; i++) {
                optionVar[i].style.backgroundColor = "white";
                optionVar[i].style.color = "black";
            }
        };

        // WHEN YOU CLICK NEXT BUTTON THIS FUNCTION FIRED
        let clickOnNext = () => {
            // THIS EVENT FIRED INITIALLY
            clickData().getInitiallyData();

            // WHEN YOU CLICK NEXT BUTTON THIS EVENT FIRED
            document.querySelector(updateDom.next).addEventListener('click', () => {
                if (updateDom.clickOrNotVar) {
                    clickData().getUpdateData();
                    clickData().getIncreasePercentage();
                    clickData().getIncreasePoint();
                    setBG2White();
                    updateScore();
                    updateDom.clickOrNotVar = false;
                }
            });
        };

        // RETURN THE FUNCTION OF updateController
        return {
            getClickOnNext: () => clickOnNext(),
            getClickOnOption: () => clickOnOption()
        }
    })(UIController);

    let controller = ((ui, update) => {
        // ACCESS UIController DOMs VARIABLE
        const controllerDOM = ui.getDom();

        // ALL EVENT HANDED BY THIS FUNCTION
        let eventHandler = () => {
            document.querySelector(controllerDOM.form).addEventListener('submit', () => {
                document.querySelector(controllerDOM.containerFluid).style.display = 'block';
                document.querySelector(controllerDOM.next).style.display = 'block';
                document.querySelector(controllerDOM.entry).style.display = 'none';
                const name = document.querySelector(controllerDOM.formControl).value;
                alert(`Welcome ${name}`);
            });
        };

        // RETURN THE FUNCTION OF controller
        return {
            controllerInit: () => {
                eventHandler();
                update.getClickOnNext();
                update.getClickOnOption();
            }
        }
    })(UIController, updateController);

    return {
        init: () => controller.controllerInit()
    }
})();

// WITHOUT THAT PROGRAM NOT CALLED
mainController.init();

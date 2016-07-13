/**
 * Created by dsnos on 12.07.2016.
 */

var cGame = (function(cGame){

    cGame.TAB_KEYCODE = 9;

    cGame.init = function() {

        cGame.readyButton = document.getElementById("ready-button");
        cGame.readyBlock = document.getElementById("ready-block");
        cGame.gameBlock = document.getElementById("game-block");
        cGame.sampleTextBlock = document.getElementById("sample-text");
        cGame.inputTextBlock = document.getElementById("input-text");
        cGame.errorsBlock = document.getElementById("errors");

        cGame.sampleLinesBlocks = [];

        cGame.errorCount = 0;

        cGame.bindEvents();

    };

    cGame.bindEvents = function() {

        cGame.readyButton.addEventListener('click', cGame.showGame);
        cGame.inputTextBlock.addEventListener('keydown', cGame.codeOnKeyDown);
        cGame.inputTextBlock.addEventListener('paste', function (event) { event.preventDefault(); return false; });

    };

    cGame.renderSampleText = function () {

        var sampleText = document.getElementById("code_template").innerHTML,
            lines = sampleText.split('\n');

        cGame.sampleTextBlock.innerHTML = '';
        cGame.sampleLinesBlocks = [];

        for (var i = 0; i < lines.length; i++) {

            var lineWrapper = document.createElement('p');

            lineWrapper.innerHTML = lines[i].replace(/ /g, '&nbsp;');

            cGame.sampleLinesBlocks.push(lineWrapper);

            cGame.sampleTextBlock.appendChild(lineWrapper);
        }

        sampleText.split('\n');

        cGame.sampleText = sampleText;
        cGame.sampleLines = lines;

    };

    cGame.showGame = function () {

        console.log("Game started.");

        cGame.readyBlock.style.display = "none";
        cGame.gameBlock.style.display = "inherit";

        timer(5, function () {
            console.log("pow!");
            cGame.inputTextBlock.disabled = false;
        })

    };

    cGame.codeOnKeyDown = function (event) {

        if (event.keyCode == cGame.TAB_KEYCODE) {

            var sel = window.getSelection();
            if (sel) {
                var range = sel.getRangeAt(0);
                var newNode = document.createTextNode('    ');
                range.insertNode(newNode);

                range.setStartAfter(newNode);
                range.setEndAfter(newNode);

                sel.removeAllRanges();
                sel.addRange(range);
            }

            event.preventDefault();
        }

        var inputText = cGame.inputTextBlock.innerText.replace(new RegExp(String.fromCharCode(160), "g"), " "),
            equalContentLength = 0;

        for (var i = 0; i < inputText.length; i++) {
            if ((inputText[i] == cGame.sampleText[i]) ||
            (inputText[i] == " " && cGame.sampleText[i] == "&nbsp;"))
            {
                equalContentLength += 1;
            }
            else {
                // console.log(inputText[i], cGame.sampleText[i], event.key);

                if (event.keyCode == 16) {
                    console.log("!!!!!!!!");
                }

                if (event.key != "Backspace" && event.key != "Enter")
                {
                    cGame.errorCount += 1;
                    cGame.errorsBlock.innerHTML = cGame.errorCount;
                }

                break;
            }
        }

        console.log(equalContentLength);

        cGame.highlightSample(equalContentLength);

    };

    cGame.highlightSample = function (validCharCount) {

        cGame.renderSampleText();

        for (var i = 0; i < cGame.sampleLines.length && validCharCount != 0; i++) {

            var curLine = cGame.sampleLinesBlocks[i];

            if (validCharCount >= curLine.innerText.length) {

                curLine.classList += "valid-p";

            }
            else {

                var beforeElement = document.createElement('span'),
                    afterElement = document.createElement('span');

                beforeElement.innerHTML = curLine.innerText.substring(0, validCharCount);
                afterElement.innerHTML = curLine.innerText.substring(validCharCount);

                beforeElement.classList += "valid-p";

                curLine.innerHTML = '';
                curLine.appendChild(beforeElement);
                curLine.appendChild(afterElement);

                break;

            }

            validCharCount -= (curLine.innerText.length + 1);

        }

    };

    return cGame;

})({});

function start() {

    cGame.init();

    cGame.renderSampleText();

    cGame.showGame();


}

function timer(count, callback) {
    var counter = setInterval(timer, 1000);

    function timer() {
        $("#timer").html(count);
        if (count <= 0) {
            $("#timer").html("Begin!");
            clearInterval(counter);
            callback();
        }
        count--;
    }
}

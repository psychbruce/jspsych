/** HTML DOM Settings **/

// 禁用鼠标右键
document.oncontextmenu = function() {
    event.returnValue = false;
};

// 屏蔽键盘按键
document.onkeydown = function() {
    // https://www.bejson.com/othertools/keycodes/
    var disable_keys = { 27: "Esc", 116: "F5", 123: "F12" };
    if ((event.keyCode in disable_keys) || (event.ctrlKey && event.keyCode == 85)) {
        event.keyCode = 0;
        event.returnValue = false;
        return false;
    }
};

/** Custom Functions **/

// NOTE: when using functions in experiment.js, parameters should be defined in order !

function openfullscreen() {
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function closefullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function keyCode(character) {
    return jsPsych.pluginAPI.convertKeyCharacterToKeyCode(character);
}

function inputDialog(title, default_text) {
    var input = prompt(msg = title, defaultText = default_text);
    return input;
}

function timer() {
    var second = document.getElementById("timer");
    var button = document.getElementsByClassName("jspsych-btn")[0];
    if (second.innerText > 1) {
        second.innerText = second.innerText - 1;
    } else {
        button.innerText = "继续";
        button.disabled = false;
    }
}

function addRespFromButton(data) {
    // compute variables from button-plugin response (for simple item)
    data.response = parseInt(data.button_pressed) + 1; // raw: 0, 1, 2, ...
}

function addRespFromButtonScale(data, scale_name) {
    // compute variables from button-plugin response (for likert scale)
    data.scale = scale_name;
    data.varname = scale_name + data.i;
    data.response = parseInt(data.button_pressed) + 1; // raw: 0, 1, 2, ...
}

function addRespFromSurvey(data, parse_int = false) {
    // only for single response ("Q0" in survey-plugin responses)
    var resp = String(JSON.parse(data.responses).Q0);
    data.responses = resp;
    data.response = (parse_int) ? resp.match(/\d+/) : resp;
}

function replaceComma(data, sep = "|") {
    // only for single response ("Q0" in survey-plugin responses)
    data.responses = String(JSON.parse(data.responses).Q0).split(",").join(sep);
}

function setSliderAttr(event = "onmouseup") {
    document.getElementById("jspsych-html-slider-response-response").setAttribute(event, "addSliderValue()");
}

function addSliderValue(element_id = "slider-value") {
    document.getElementById(element_id).innerHTML = document.getElementById("jspsych-html-slider-response-response").value;
    document.getElementById("jspsych-html-slider-response-next").disabled = false;
}

save_locally = function() {
    var data = jsPsych.data.get().csv();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'submit');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ filedata: data }));
};
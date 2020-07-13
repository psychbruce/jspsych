/**
 * xprmntr.js - > jspsychr.js
 * Danielle Navarro
 * modified to not conflict with xprmntr : Matt Crump
 **/

var jspsychr = {};
jspsychr.save_locally = function() {
  var data = jsPsych.data.get().csv();
  var file = "jspsychr_local_name";
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'submit');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filename: file, filedata: data}));
};

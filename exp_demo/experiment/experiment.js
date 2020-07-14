
/** Main JavaScript Experiment File **/

/** Tips on HTML style:
 * font: italic bold 30pt 微软雅黑
 * font-style: italic
 * font-weight: bold
 * font-size: 30pt
 * font-family: simhei, dengxian, kaiti
 * text-align: center, left, right
 * color: white
 * background-color: black
 **/


/** Blocks: Basic Setting **/

var open_fullscreen = {
  type: "fullscreen",
  fullscreen_mode: true,
  message: "<p style='font: 30px 微软雅黑'>请做好准备，实验即将开始……</p>",
  button_label: "<p style='font: 30px 微软雅黑'>点此开始</p>",
  delay_after: 100
};

var close_fullscreen = {
  type: "fullscreen",
  fullscreen_mode: false,
  delay_after: 0
};

var welcome = {
  type: "html-keyboard-response",
  stimulus:
    "<p style='font: bold 42px 微软雅黑; color: #B22222'>\
    欢迎参与我们的实验</p>\
    <p style='font: 30px 微软雅黑; color: black'><br/>\
    <按任意键继续><br/><b>实验过程中请勿退出全屏</b>\
    <br/><br/></p>\
    <p style='font: 24px 华文中宋; color: grey'>\
    中国科学院心理研究所<br/>2020年</p>",
  post_trial_gap: 100
};

var set_html_style = {
  type: "call-function",
  func: function() {
    document.body.style.backgroundColor = "rgb(245, 245, 245)";  // "#F0F0F0"
    document.body.style.color = "black";  // font color
    document.body.style.fontSize = "24px";  // 1px = 0.75pt; px = pt * DPI / 72
    document.body.style.fontFamily = "等线";
    document.body.style.fontWeight = "bold";  // or "normal"
    document.body.style.cursor = "default";
  },
};

var set_html_style_EAST = {
  type: "call-function",
  func: function() {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    document.body.style.fontSize = "40px";
    document.body.style.fontFamily = "微软雅黑";
    document.body.style.fontWeight = "normal";
    document.body.style.cursor = "none";
  },
};

var btn_html = "<p><button class='jspsych-btn' style='font: normal 20px 等线'>\
  %choice%</button></p>";
var btn_timer_html = "<style onload='setInterval(timer, 1000)'></style>\
  <button class='jspsych-btn' style='font: normal 20px 等线' disabled=true>\
  %choice%</button>";

var warmup = {
  type: "html-button-response",
  stimulus: "<p>请做好准备……</p>",
  choices: ["<span id='timer'>5</span>秒后继续"],
  button_html: btn_timer_html
};


/** Blocks: Survey **/

var Sex = {
  type: "html-button-response",
  data: {varname: "Sex"},
  stimulus: "你的性别",
  choices: ["男", "女", "其他"],
  button_html: btn_html,
  on_finish: function(data) { addRespFromButton(data); }
};

var Age = {
  type: "survey-html-form",
  data: {varname: "Age"},
  preamble: "你的年龄",
  html: "<p><input name='Q0' type='number' placeholder='16~90'\
        min=16 max=90 oninput='if(value.length>2) value=value.slice(0,2)'\
        required /></p>",
  button_label: "继续",
  on_finish: function(data) { addRespFromSurvey(data); }
};

var Birth = {
  type: "survey-html-form",
  data: {varname: "Birth"},
  preamble: "你的生日",
  html: "<p><input name='Q0' type='date' value='2000-01-01' required /></p>",
  button_label: "继续",
  on_finish: function(data) { addRespFromSurvey(data); }
};

var Email = {
  type: "survey-html-form",
  data: {varname: "Email"},
  preamble: "你的邮箱",
  html: "<p><input name='Q0' type='email' /></p>",
  button_label: "继续",
  on_finish: function(data) { addRespFromSurvey(data); }
};

var School = {
  type: "survey-html-form",
  data: {varname: "School"},
  preamble: "你的学校",
  html: "<p><select name='Q0' size=10>\
         <option>北京大学</option>\
         <option>清华大学</option>\
         <option>中国人民大学</option>\
         <option>北京师范大学</option>\
         </select></p>",
  button_label: "继续",
  on_finish: function(data) { addRespFromSurvey(data); }
};

var Language = {
  type: "survey-multi-select",
  data: {varname: "Language"},
  questions: [{
    prompt: "你会哪些语言？",
    options: ["汉语", "英语", "日语", "韩语", "西班牙语", "其他"],
    horizontal: false,
    required: false
  }],
  button_label: "继续",
  on_finish: function(data) { replaceComma(data); }
};

var NameLiking = {
  type: "html-slider-response",
  data: {varname: "NameLiking"},
  on_load: function() { setSliderAttr(); },
  stimulus: "总体而言，你在多大程度上喜欢自己的名字？<br/>（1 = 非常不喜欢，9 = 非常喜欢）",
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  min: 1, max: 9, start: 5,
  prompt: "<b id='slider-value'>_</b><br/><br/>",
  button_label: "继续",
  require_movement: true
};

var OpenEnded = {
  type: "survey-text",
  data: {varname: "OpenEnded"},
  questions: [{
    prompt: "问卷已全部完成，你可以分享在填写过程中的任何疑问或想法：",
    placeholder: "非必答",
    rows: 5, columns: 50,
    required: false
  }],
  button_label: "完成",
  on_finish: function(data) { addRespFromSurvey(data); }
};


/** Blocks: Likert Scale **/

var likert_5 = ["1", "2", "3", "4", "5"];
var likert_7 = ["1", "2", "3", "4", "5", "6", "7"];
var prompt_7 = "<p style='font: 20px 等线; font-weight: normal'>\
               请表明你对该陈述的同意程度<br/>\
               （1 = 非常不同意，7 = 非常同意）</p>";

var instr_7 = {
  type: "instructions",
  pages: [
    "<p style='text-align: left'>\
    指导语：<br/>\
    下面有一系列陈述，<br/>\
    请表明你对这些陈述的同意程度。<br/><br/>\
    1 = 非常不同意<br/>\
    2 = 不同意<br/>\
    3 = 比较不同意<br/>\
    4 = 不确定<br/>\
    5 = 比较同意<br/>\
    6 = 同意<br/>\
    7 = 非常同意</p>",
  ],
  show_clickable_nav: true,
  allow_backward: false,
  button_label_previous: "返回",
  button_label_next: "继续"
};

var SWLS = {
  // stimulus items
  timeline_variables: [
    {data: {i: 1}, s: "我的生活在大多数情况下接近我的理想状态"},
    {data: {i: 2}, s: "我的生活条件非常好"},
    {data: {i: 3}, s: "我对我的生活感到满意"},
    {data: {i: 4}, s: "目前为止我已经得到了生活中我想得到的重要东西"},
    {data: {i: 5}, s: "如果生活可以重来，我还愿意过现在这样的生活"},
  ],
  // single trial
  timeline: [{
    type: "html-button-response",
    data: jsPsych.timelineVariable("data"),
    stimulus: jsPsych.timelineVariable("s"),
    choices: likert_7,
    prompt: prompt_7,
    button_html: btn_html,
    on_finish: function(data) { addRespFromButtonScale(data, "SWLS"); },
    post_trial_gap: 50
  }],
  // trial presentation
  randomize_order: false
};


/** Blocks: Experimental Task **/

var EAST_attrib_words = [
  {data: {stim_type: "pos"}, s: "健康"},
  {data: {stim_type: "pos"}, s: "快乐"},
  {data: {stim_type: "pos"}, s: "美好"},
  {data: {stim_type: "neg"}, s: "邪恶"},
  {data: {stim_type: "neg"}, s: "吝啬"},
  {data: {stim_type: "neg"}, s: "卑鄙"},
];

var a1 = "玫瑰";
var a2 = "牡丹";
var b1 = "空气";
var b2 = "土地";
var c1 = "蟑螂";
var c2 = "蚊子";
var blue = "rgb(0, 125, 150)";
var green = "rgb(0, 150, 125)";
var EAST_target_words = [
  {data: {stim_type: blue, x: "a"}, s: a1},
  {data: {stim_type: blue, x: "a"}, s: a2},
  {data: {stim_type: blue, x: "b"}, s: b1},
  {data: {stim_type: blue, x: "b"}, s: b2},
  {data: {stim_type: blue, x: "c"}, s: c1},
  {data: {stim_type: blue, x: "c"}, s: c2},
  {data: {stim_type: green, x: "a"}, s: a1},
  {data: {stim_type: green, x: "a"}, s: a2},
  {data: {stim_type: green, x: "b"}, s: b1},
  {data: {stim_type: green, x: "b"}, s: b2},
  {data: {stim_type: green, x: "c"}, s: c1},
  {data: {stim_type: green, x: "c"}, s: c2},
];

var tag_LR1 = "<div style='position: absolute; top: 15%; left: 15%'; font-size: 30px>\
               按“F”键:<br/>积极词</div>\
               <div style='position: absolute; top: 15%; right: 15%'; font-size: 30px>\
               按“J”键:<br/>消极词</div>";
var tag_LR2 = "<div style='position: absolute; top: 15%; left: 15%'; font-size: 30px>\
               按“F”键:<br/><span style='color: rgb(0, 125, 150)'>蓝色</span></div>\
               <div style='position: absolute; top: 15%; right: 15%'; font-size: 30px>\
               按“J”键:<br/><span style='color: rgb(0, 150, 125)'>绿色</span></div>";
var tag_LR3 = "<div style='position: absolute; top: 10%; left: 10%'; font-size: 30px>\
               按“F”键:<br/>积极词<br/>或<br/>\
               <span style='color: rgb(0, 125, 150)'>蓝色</span></div>\
               <div style='position: absolute; top: 10%; right: 10%'; font-size: 30px>\
               按“J”键:<br/>消极词<br/>或<br/>\
               <span style='color: rgb(0, 150, 125)'>绿色</span></div>";
var feedback_right = "<span style='position: absolute; top: 55%; left: 0; right: 0;\
                     color: green'>√</span>";
var feedback_wrong = "<span style='position: absolute; top: 55%; left: 0; right: 0;\
                     color: red'>X</span>";

var EAST_prac1_instr = {
  type: "html-keyboard-response",
  stimulus:
    "<p style='text-align: left'>\
    练习任务1：<br/><br/>\
    下面是一个“形容词分类”任务。<br/>\
    屏幕上将依次呈现一些形容词，它们分别具有<span style='color:#E11111'>积极</span>或<span style='color:#E11111'>消极</span>的含义。<br/>\
    在每个形容词呈现之前，屏幕上会出现注视点“+”来提醒您注意。<br/>\
    在每个形容词呈现之后，请<span style='color:#E11111'>尽量正确并且快速地</span>做出按键反应。<br/>\
    - 如果出现<span style='color:#E11111'>积极</span>形容词，请按<span style='color:#E11111'>“F”键</span>。<br/>\
    - 如果出现<span style='color:#E11111'>消极</span>形容词，请按<span style='color:#E11111'>“J”键</span>。<br/>\
    每次判断均会有正确（“√”）或错误（“X”）的反馈。<br/><br/>\
    现在，请您双手食指分别放在“F”键和“J”键上，并保证实验过程中双手不离开键盘。<br/>\
    如果您已认真阅读并充分理解了上述要求，请按空格键开始。</p>",
  choices: [" "]
};

var EAST_prac2_instr = {
  type: "html-keyboard-response",
  stimulus:
    "<p style='text-align: left'>\
    练习任务2：<br/><br/>\
    下面是一个“名词分类”任务。<br/>\
    屏幕上将依次呈现一些名词，它们分别具有<span style='color:rgb(0,125,150);background-color:black'>蓝色■</span>或<span style='color:rgb(0,150,125);background-color:black'>绿色■</span>的字体颜色。<br/>\
    在每个名词呈现之前，屏幕上会出现注视点“+”来提醒您注意。<br/>\
    在每个名词呈现之后，请<span style='color:#E11111'>尽量正确并且快速地</span>做出按键反应。<br/>\
    - 如果出现<span style='color:rgb(0,125,150);background-color:black'>蓝色</span>名词，请按<span style='color:#E11111'>“F”键</span>。<br/>\
    - 如果出现<span style='color:rgb(0,150,125);background-color:black'>绿色</span>名词，请按<span style='color:#E11111'>“J”键</span>。<br/>\
    每次判断均会有正确(“√”)或错误(“X”)的反馈。<br/><br/>\
    现在，请您双手食指分别放在“F”键和“J”键上，并保证实验过程中双手不离开键盘。<br/>\
    如果您已认真阅读并充分理解了上述要求，请按空格键开始。</p>",
  choices: [" "]
};

var EAST_test_instr = {
  type: "html-keyboard-response",
  stimulus:
    "<p style='text-align: left'>\
    正式任务：<br/><br/>\
    接下来是正式任务，先前两个练习任务中的白色形容词和彩色名词会随机交替出现。<br/>\
    你仍然需要<span style='color:#E11111'>尽量正确并且快速地</span>对它们的属性做出判断：<br/>\
    - 如果出现<span style='color:#E11111'>积极</span>形容词或<span style='color:rgb(0,125,150);background-color:black'>蓝色</span>名词，请按<span style='color:#E11111'>“F”键</span>。<br/>\
    - 如果出现<span style='color:#E11111'>消极</span>形容词或<span style='color:rgb(0,150,125);background-color:black'>绿色</span>名词，请按<span style='color:#E11111'>“J”键</span>。<br/>\
    这次将不再呈现关于正确或错误的反馈。<br/><br/>\
    现在，请您双手食指分别放在“F”键和“J”键上，并保证实验过程中双手不离开键盘。<br/>\
    如果您已认真阅读并充分理解了上述要求，请按空格键开始。</p>",
  choices: [" "]
};

var EAST_prac1 = {
  // stimulus items
  timeline_variables: EAST_attrib_words,
  // single trial
  timeline: [
    {
      // fixation
      type: "html-keyboard-response",
      stimulus: "+",
      choices: jsPsych.NO_KEYS,
      prompt: tag_LR1,
      trial_duration: 500,
      post_trial_gap: 0,
      response_ends_trial: false
    },
    {
      // word stimulus
      type: "categorize-html",
      data: jsPsych.timelineVariable("data"),
      stimulus: jsPsych.timelineVariable("s"),
      choices: ["f", "j"],
      key_answer: function() {
        switch(jsPsych.timelineVariable("data", true).stim_type) {
          case "pos": return keyCode("f");
          case "neg": return keyCode("j");
        }
      },
      prompt: tag_LR1,
      correct_text: tag_LR1 + feedback_right,
      incorrect_text: tag_LR1 + feedback_wrong,
      feedback_duration: 500,
      post_trial_gap: function() { return Math.random() * 500 + 200; },
      force_correct_button_press: true
    },
  ],
  // trial presentation
  repetitions: 2,
  randomize_order: true
};

var EAST_prac2 = {
  // stimulus items
  timeline_variables: EAST_target_words,
  // single trial
  timeline: [
    {
      // fixation
      type: "html-keyboard-response",
      stimulus: "+",
      choices: jsPsych.NO_KEYS,
      prompt: tag_LR2,
      trial_duration: 500,
      post_trial_gap: 0,
      response_ends_trial: false
    },
    {
      // word stimulus
      type: "categorize-html",
      data: jsPsych.timelineVariable("data"),
      stimulus: function() {
        return "<p style='color:" + jsPsych.timelineVariable("data", true).stim_type + "'>" + jsPsych.timelineVariable("s", true) + "</p>";
      },
      choices: ["f", "j"],
      key_answer: function() {
        switch(jsPsych.timelineVariable("data", true).stim_type) {
          case blue: return keyCode("f");
          case green: return keyCode("j");
        }
      },
      prompt: tag_LR2,
      correct_text: tag_LR2 + feedback_right,
      incorrect_text: tag_LR2 + feedback_wrong,
      feedback_duration: 500,
      post_trial_gap: function() { return Math.random() * 500 + 200; },
      force_correct_button_press: true
    },
  ],
  // trial presentation
  repetitions: 1,
  randomize_order: true
};

var EAST_warmup = {
  type: "html-keyboard-response",
  stimulus: "",
  choices: jsPsych.NO_KEYS,
  prompt: tag_LR3,
  trial_duration: 2000,
  response_ends_trial: false
};

var EAST_test = {
  // stimulus items
  timeline_variables: [].concat(EAST_attrib_words, EAST_attrib_words, EAST_target_words),
  // single trial
  timeline: [
    {
      // fixation
      type: "html-keyboard-response",
      stimulus: "+",
      choices: jsPsych.NO_KEYS,
      prompt: tag_LR3,
      trial_duration: 500,
      post_trial_gap: 0,
      response_ends_trial: false
    },
    {
      // word stimulus
      type: "categorize-html",
      data: jsPsych.timelineVariable("data"),
      stimulus: function() {
        var stim_type = jsPsych.timelineVariable("data", true).stim_type;
        var stimulus = jsPsych.timelineVariable("s", true);
        switch(stim_type) {
          case "pos": case "neg": return stimulus;
          case blue: case green: return "<p style='color:" + stim_type + "'>" + stimulus + "</p>";
        }
      },
      choices: ["f", "j"],
      key_answer: function() {
        switch(jsPsych.timelineVariable("data", true).stim_type) {
          case "pos": case blue: return keyCode("f");
          case "neg": case green: return keyCode("j");
        }
      },
      prompt: tag_LR3,
      correct_text: tag_LR3,
      incorrect_text: tag_LR3,
      feedback_duration: 500,
      post_trial_gap: function() { return Math.random() * 500 + 200; },
      force_correct_button_press: false,
      on_finish: function(data) { data.formal = true; }
    },
  ],
  // trial presentation
  repetitions: 2,
  randomize_order: true
};


/** Blocks: Feedback **/

var Debrief = {
  type: "html-keyboard-response",
  stimulus: function() {
    var swls = jsPsych.data.get().filter({scale: "SWLS"}).select("response").mean().toFixed(2);
    var east_a = (jsPsych.data.get().filter({formal: true, correct: true, stim_type: green, x: "a"}).select("rt").mean() - jsPsych.data.get().filter({formal: true, correct: true, stim_type: blue, x: "a"}).select("rt").mean()).toFixed(2);
    var east_b = (jsPsych.data.get().filter({formal: true, correct: true, stim_type: green, x: "b"}).select("rt").mean() - jsPsych.data.get().filter({formal: true, correct: true, stim_type: blue, x: "b"}).select("rt").mean()).toFixed(2);
    var east_c = (jsPsych.data.get().filter({formal: true, correct: true, stim_type: green, x: "c"}).select("rt").mean() - jsPsych.data.get().filter({formal: true, correct: true, stim_type: blue, x: "c"}).select("rt").mean()).toFixed(2);
    return "<p style='text-align: left; font-family: 华文中宋'>\
    结果反馈：<br/><br/>\
    你的幸福感得分："+swls+"（取值范围1~7）<br/><br/>\
    你对玫瑰、牡丹的内隐态度："+east_a+"<br/>\
    你对空气、土地的内隐态度："+east_b+"<br/>\
    你对蟑螂、蚊子的内隐态度："+east_c+"<br/>\
    （小于0 = 消极，0 = 中性，大于0 = 积极）<br/><br/>\
    （按任意键继续）</p>";
  }
};


/** Final Timelines and Experiment **/

var begin = {
  timeline: [
    open_fullscreen, welcome, set_html_style, warmup,
  ]
};

var demographics = {
  timeline: [
    Sex, Age, Birth, Language, School, Email,
  ]
};

var surveys = {
  timeline: [
    NameLiking, instr_7, SWLS,
  ]
};

var EAST = {
  timeline: [
    EAST_prac1_instr, set_html_style_EAST, EAST_prac1, set_html_style,
    EAST_prac2_instr, set_html_style_EAST, EAST_prac2, set_html_style,
    EAST_test_instr, set_html_style_EAST, EAST_warmup, EAST_test, set_html_style,
  ]
};

var end = {
  timeline: [
    Debrief, OpenEnded, close_fullscreen,
  ]
};

var timeline = [
  begin,
  demographics,
  surveys,
  EAST,
  end,
];

jsPsych.init({
  timeline: timeline,
  default_iti: 0,
  show_progress_bar: false,
  message_progress_bar: "",
  on_finish: function() {
    // jsPsych.data.displayData("csv");
    jsPsych.data.get().localSave("csv", "data_exp_demo.csv");  // download from browser
    // save_locally();  // get json from html
    document.write("<h1 style='text-align:center; height:500pt; line-height:500pt'>实验结束，感谢您的参与！</h1>");
  }
});


/**
 * Author:
 * Bao H.-W.-S. (https://psychbruce.github.io)
 */


/* Global Variables */

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

const subID = jsPsych.randomization.randomID(8)


/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
            if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
                (event.ctrlKey && event.keyCode in { 85: 'U' })
            ) { return false }
        }
    },
}

var set_html_style_EAST = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
        document.body.style.fontSize = '32pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'normal'
        document.body.style.lineHeight = '1.2em'
        document.body.style.cursor = 'none'
    },
}


/* Blocks: Basics */

var open_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在测验过程中不要退出全屏<br/>
    （5）务必认真作答<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var welcome = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与我们的实验</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <按空格键继续><br/>
    <b>实验过程中请勿退出全屏</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    中国科学院心理研究所<br/>2020年</p>`,
    choices: [' '],
    post_trial_gap: 100
}

var warmup = {
    type: 'html-button-response',
    stimulus: '<p>请做好准备……</p>',
    choices: ['<span id="timer">5</span>秒后继续'],
    button_html: btn_html_timer
}

var instr_4 = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        指导语：<br/>
        下面有一系列陈述，<br/>
        请表明你对这些陈述的同意程度。<br/><br/>
        1 = 非常不同意<br/>
        2 = 不同意<br/>
        3 = 同意<br/>
        4 = 非常同意</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var instr_7 = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        指导语：<br/>
        下面有一系列陈述，<br/>
        请表明你对这些陈述的同意程度。<br/><br/>
        1 = 非常不同意<br/>
        2 = 不同意<br/>
        3 = 比较不同意<br/>
        4 = 不确定<br/>
        5 = 比较同意<br/>
        6 = 同意<br/>
        7 = 非常同意</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}


/* Blocks: Surveys */

var Sex = {
    type: 'html-button-response',
    data: { varname: 'Sex' },
    stimulus: '你的性别',
    choices: ['男', '女', '其他'],
    on_finish: function(data) { addRespFromButton(data) }
}

var Age = {
    type: 'survey-html-form',
    data: { varname: 'Age' },
    preamble: '你的年龄',
    html: `
    <p><input name="Q0" type="number" placeholder="15~99" min=15 max=99
    oninput="if(value.length>2) value=value.slice(0,2)" required /></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Birth = {
    type: 'survey-html-form',
    data: { varname: 'Birth' },
    preamble: '你的生日',
    html: '<p><input name="Q0" type="date" value="2000-01-01" required /></p>',
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Email = {
    type: 'survey-html-form',
    data: { varname: 'Email' },
    preamble: '你的邮箱',
    html: '<p><input name="Q0" type="email" placeholder="非必填" /></p>',
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var School = {
    type: 'survey-html-form',
    data: { varname: 'School' },
    preamble: '你的学校',
    html: `
    <p><select name="Q0" size=10>
    <option>北京大学</option>
    <option>清华大学</option>
    <option>中国人民大学</option>
    <option>北京师范大学</option>
    <option>其他</option>
    </select></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Language = {
    type: 'survey-multi-select',
    data: { varname: 'Language' },
    questions: [{
        prompt: '你会哪些语言？',
        options: ['汉语', '英语', '日语', '韩语', '西班牙语', '其他'],
        horizontal: false,
        required: false
    }],
    button_label: '继续',
    on_finish: function(data) { replaceComma(data) }
}

var NameLiking = {
    type: 'html-slider-response',
    data: { varname: 'NameLiking' },
    on_load: function() { setSliderAttr() },
    stimulus: '总体而言，你在多大程度上喜欢自己的名字？<br/>（1 = 非常不喜欢，9 = 非常喜欢）',
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    min: 1,
    max: 9,
    start: 5,
    prompt: '<b id="slider-value">_</b><br/><br/>',
    button_label: '继续',
    require_movement: true
}

var SWLS = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请表明你对该陈述的同意程度<br/>
        （1 = 非常不同意，7 = 非常同意）</p>`,
        choices: ['1', '2', '3', '4', '5', '6', '7'],
        on_finish: function(data) { addRespFromButtonScale(data, 'SWLS') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 }, s: '我的生活在大多数情况下接近我的理想状态' },
        { data: { i: 2 }, s: '我的生活条件非常好' },
        { data: { i: 3 }, s: '我对我的生活感到满意' },
        { data: { i: 4 }, s: '目前为止我已经得到了生活中我想得到的重要东西' },
        { data: { i: 5 }, s: '如果生活可以重来，我还愿意过现在这样的生活' },
    ],
    randomize_order: false
}

var RSES = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请表明你对该陈述的同意程度<br/>
        （1 = 非常不同意，4 = 非常同意）</p>`,
        choices: ['1', '2', '3', '4'],
        on_finish: function(data) { addRespFromButtonScale(data, 'RSES') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 }, s: '我认为自己是个有价值的人，至少与别人不相上下' },
        { data: { i: 2 }, s: '我觉得我有许多优点' },
        { data: { i: 3 }, s: '总的来说，我倾向于认为自己是一个失败者' },
        { data: { i: 4 }, s: '我做事可以做得和大多数人一样好' },
        { data: { i: 5 }, s: '我觉得自己没有什么值得自豪的地方' },
        { data: { i: 6 }, s: '我对自己持有一种肯定的态度' },
        { data: { i: 7 }, s: '整体而言，我对自己感到满意' },
        { data: { i: 8 }, s: '我本应该对自己尊重更多一些' },
        { data: { i: 9 }, s: '有时我的确感到自己没用了' },
        { data: { i: 10 }, s: '有时我认为自己一无是处' },
    ],
    randomize_order: false
}

var OpenEnded = {
    type: 'survey-text',
    data: { varname: 'OpenEnded' },
    questions: [{
        prompt: '实验已全部完成，你可以分享任何疑问或想法：',
        placeholder: '非必答',
        rows: 5,
        columns: 50,
        required: false
    }],
    button_label: '完成',
    on_finish: function(data) { addRespFromSurvey(data) }
}


/* Blocks: Experiments */

// Stimuli

var EAST_attrib_words = [
    { data: { stim_type: 'pos' }, s: '健康' },
    { data: { stim_type: 'pos' }, s: '快乐' },
    { data: { stim_type: 'pos' }, s: '美好' },
    { data: { stim_type: 'neg' }, s: '邪恶' },
    { data: { stim_type: 'neg' }, s: '吝啬' },
    { data: { stim_type: 'neg' }, s: '卑鄙' },
]

var a1 = '玫瑰'
var a2 = '牡丹'
var b1 = '空气'
var b2 = '土地'
var c1 = '蟑螂'
var c2 = '蚊子'
var blu = 'rgb(0, 125, 150)'
var grn = 'rgb(0, 150, 125)'
var EAST_target_words = [
    { data: { stim_type: blu, x: 'a' }, s: a1 },
    { data: { stim_type: blu, x: 'a' }, s: a2 },
    { data: { stim_type: blu, x: 'b' }, s: b1 },
    { data: { stim_type: blu, x: 'b' }, s: b2 },
    { data: { stim_type: blu, x: 'c' }, s: c1 },
    { data: { stim_type: blu, x: 'c' }, s: c2 },
    { data: { stim_type: grn, x: 'a' }, s: a1 },
    { data: { stim_type: grn, x: 'a' }, s: a2 },
    { data: { stim_type: grn, x: 'b' }, s: b1 },
    { data: { stim_type: grn, x: 'b' }, s: b2 },
    { data: { stim_type: grn, x: 'c' }, s: c1 },
    { data: { stim_type: grn, x: 'c' }, s: c2 },
]

var tag_LR1 = `<div class="tag-left">按“F”键:<br/>积极词</div>
               <div class="tag-right">按“J”键:<br/>消极词</div>`

var tag_LR2 = `<div class="tag-left">按“F”键:<br/><span style="color:${blu}">蓝色</span></div>
               <div class="tag-right">按“J”键:<br/><span style="color:${grn}">绿色</span></div>`

var tag_LR3 = `<div class="tag-left">按“F”键:<br/>积极词<br/>或<br/><span style="color:${blu}">蓝色</span></div>
               <div class="tag-right">按“J”键:<br/>消极词<br/>或<br/><span style="color:${grn}">绿色</span></div>`

// Instructions

var EAST_prac1_instr = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="text-align: left; font-size: 20pt">
    练习任务1：<br/><br/>
    下面是一个“形容词分类”任务。<br/>
    屏幕上将依次呈现一些形容词，它们分别具有<span style="color:#FFD866">积极</span>或<span style="color:#FFD866">消极</span>的含义。<br/>
    在每个形容词呈现之前，屏幕上会出现注视点“+”来提醒您注意。<br/>
    在每个形容词呈现之后，请<span style="color:#FFD866">尽量正确并且快速地</span>做出按键反应。<br/>
    - 如果出现<span style="color:#FFD866">积极</span>形容词，请按<span style="color:#FFD866">“F”键</span>。<br/>
    - 如果出现<span style="color:#FFD866">消极</span>形容词，请按<span style="color:#FFD866">“J”键</span>。<br/>
    每次判断均会有正确（“√”）或错误（“X”）的反馈。<br/><br/>
    现在，请您双手食指分别放在“F”键和“J”键上，并保证实验过程中双手不离开键盘。<br/>
    如果您已认真阅读并充分理解了上述要求，请按空格键开始。</p>`,
    choices: [' ']
}

var EAST_prac2_instr = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="text-align: left; font-size: 20pt">
    练习任务2：<br/><br/>
    下面是一个“名词分类”任务。<br/>
    屏幕上将依次呈现一些名词，它们分别具有<span style="color:${blu}">蓝色■</span>或<span style="color:${grn}">绿色■</span>的字体颜色。<br/>
    在每个名词呈现之前，屏幕上会出现注视点“+”来提醒您注意。<br/>
    在每个名词呈现之后，请<span style="color:#FFD866">尽量正确并且快速地</span>做出按键反应。<br/>
    - 如果出现<span style="color:${blu}">蓝色</span>名词，请按<span style="color:#FFD866">“F”键</span>。<br/>
    - 如果出现<span style="color:${grn}">绿色</span>名词，请按<span style="color:#FFD866">“J”键</span>。<br/>
    每次判断均会有正确(“√”)或错误(“X”)的反馈。<br/><br/>
    现在，请您双手食指分别放在“F”键和“J”键上，并保证实验过程中双手不离开键盘。<br/>
    如果您已认真阅读并充分理解了上述要求，请按空格键开始。</p>`,
    choices: [' ']
}

var EAST_test_instr = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="text-align: left; font-size: 20pt">
    正式任务：<br/><br/>
    接下来是正式任务，先前两个练习任务中的白色形容词和彩色名词会随机交替出现。<br/>
    你仍然需要<span style="color:#FFD866">尽量正确并且快速地</span>对它们的属性做出判断：<br/>
    - 如果出现<span style="color:#FFD866">积极</span>形容词或<span style="color:${blu}">蓝色</span>名词，请按<span style="color:#FFD866">“F”键</span>。<br/>
    - 如果出现<span style="color:#FFD866">消极</span>形容词或<span style="color:${grn}">绿色</span>名词，请按<span style="color:#FFD866">“J”键</span>。<br/>
    这次将不再呈现关于正确或错误的反馈。<br/><br/>
    现在，请您双手食指分别放在“F”键和“J”键上，并保证实验过程中双手不离开键盘。<br/>
    如果您已认真阅读并充分理解了上述要求，请按空格键开始。</p>`,
    choices: [' ']
}

// Exp. Blocks

var EAST_prac1 = {
    // stimulus items
    timeline_variables: EAST_attrib_words,
    // single trial
    timeline: [{
            // fixation
            type: 'html-keyboard-response',
            stimulus: '+',
            choices: jsPsych.NO_KEYS,
            prompt: tag_LR1,
            trial_duration: 500,
            post_trial_gap: 0,
            response_ends_trial: false
        },
        {
            // word stimulus
            type: 'categorize-html',
            data: jsPsych.timelineVariable('data'),
            stimulus: jsPsych.timelineVariable('s'),
            choices: ['f', 'j'],
            key_answer: function() {
                switch (jsPsych.timelineVariable('data', true).stim_type) {
                    case 'pos':
                        return keyCode('f')
                    case 'neg':
                        return keyCode('j')
                }
            },
            prompt: tag_LR1,
            correct_text: tag_LR1 + feedback_right,
            incorrect_text: tag_LR1 + feedback_wrong,
            feedback_duration: 500,
            force_correct_button_press: true
        },
    ],
    // trial presentation
    repetitions: 2,
    randomize_order: true
}

var EAST_prac2 = {
    // stimulus items
    timeline_variables: EAST_target_words,
    // single trial
    timeline: [{
            // fixation
            type: 'html-keyboard-response',
            stimulus: '+',
            choices: jsPsych.NO_KEYS,
            prompt: tag_LR2,
            trial_duration: 500,
            post_trial_gap: 0,
            response_ends_trial: false
        },
        {
            // word stimulus
            type: 'categorize-html',
            data: jsPsych.timelineVariable('data'),
            stimulus: function() {
                return `<p style="color:${jsPsych.timelineVariable('data', true).stim_type}">${jsPsych.timelineVariable('s', true)}</p>`
            },
            choices: ['f', 'j'],
            key_answer: function() {
                switch (jsPsych.timelineVariable('data', true).stim_type) {
                    case blu:
                        return keyCode('f')
                    case grn:
                        return keyCode('j')
                }
            },
            prompt: tag_LR2,
            correct_text: tag_LR2 + feedback_right,
            incorrect_text: tag_LR2 + feedback_wrong,
            feedback_duration: 500,
            force_correct_button_press: true
        },
    ],
    // trial presentation
    repetitions: 1,
    randomize_order: true
}

var EAST_test_warmup = {
    type: 'html-keyboard-response',
    stimulus: '',
    choices: jsPsych.NO_KEYS,
    prompt: tag_LR3,
    trial_duration: 2000,
    response_ends_trial: false
}

var EAST_test = {
    // stimulus items
    timeline_variables: [].concat(EAST_attrib_words, EAST_attrib_words, EAST_target_words),
    // single trial
    timeline: [{
            // fixation
            type: 'html-keyboard-response',
            stimulus: '+',
            choices: jsPsych.NO_KEYS,
            prompt: tag_LR3,
            trial_duration: 500,
            post_trial_gap: 0,
            response_ends_trial: false
        },
        {
            // word stimulus
            type: 'categorize-html',
            data: jsPsych.timelineVariable('data'),
            stimulus: function() {
                var stim_type = jsPsych.timelineVariable('data', true).stim_type
                var stimulus = jsPsych.timelineVariable('s', true)
                switch (stim_type) {
                    case 'pos':
                    case 'neg':
                        return stimulus
                    case blu:
                    case grn:
                        return `<p style="color:${stim_type}">${stimulus}</p>`
                }
            },
            choices: ['f', 'j'],
            key_answer: function() {
                switch (jsPsych.timelineVariable('data', true).stim_type) {
                    case 'pos':
                    case blu:
                        return keyCode('f')
                    case 'neg':
                    case grn:
                        return keyCode('j')
                }
            },
            prompt: tag_LR3,
            correct_text: tag_LR3,
            incorrect_text: tag_LR3,
            feedback_duration: function() { return Math.random() * 1000 + 1000 }, // ITI: 1~2s
            show_stim_with_feedback: false,
            force_correct_button_press: false,
            on_finish: function(data) { data.formal = true }
        },
    ],
    // trial presentation
    repetitions: 2,
    randomize_order: true
}


/* Blocks: Feedbacks */

var debrief1 = {
    type: 'html-keyboard-response',
    stimulus: function() {
        return `
        <p style="text-align: left">
        结果反馈（问卷部分）：<br/><br/>
        你的生活满意度：${MEAN('SWLS').toFixed(1)}（取值范围1~7）<br/>
        你的自尊水平：${MEAN('RSES', rev = [3, 5, 8, 9, 10], likert = [1, 4]).toFixed(1)}（取值范围1~4）<br/><br/>
        （按任意键继续）</p>`
    }
}

var debrief2 = {
    type: 'html-keyboard-response',
    stimulus: function() {
        var data = jsPsych.data.get()
        var east_a_grn = data.filter({ formal: true, correct: true, stim_type: grn, x: 'a' }).select('rt').mean()
        var east_a_blu = data.filter({ formal: true, correct: true, stim_type: blu, x: 'a' }).select('rt').mean()
        var east_b_grn = data.filter({ formal: true, correct: true, stim_type: grn, x: 'b' }).select('rt').mean()
        var east_b_blu = data.filter({ formal: true, correct: true, stim_type: blu, x: 'b' }).select('rt').mean()
        var east_c_grn = data.filter({ formal: true, correct: true, stim_type: grn, x: 'c' }).select('rt').mean()
        var east_c_blu = data.filter({ formal: true, correct: true, stim_type: blu, x: 'c' }).select('rt').mean()
        var east_a = east_a_grn - east_a_blu
        var east_b = east_b_grn - east_b_blu
        var east_c = east_c_grn - east_c_blu
        return `
        <p style="text-align: left">
        结果反馈（实验部分）：<br/><br/>
        你对玫瑰、牡丹的内隐态度：${east_a.toFixed(2)}<br/>
        你对空气、土地的内隐态度：${east_b.toFixed(2)}<br/>
        你对蟑螂、蚊子的内隐态度：${east_c.toFixed(2)}<br/>
        （小于0 = 消极，0 = 中性，大于0 = 积极）<br/><br/>
        （按任意键继续）</p>`
    }
}


/* Combine Timelines */

var demographics = {
    timeline: [
        Sex, Age, Birth, Language, School, Email,
    ]
}

var surveys = {
    timeline: [
        NameLiking,
        instr_4, RSES,
        instr_7, SWLS,
        debrief1,
    ]
}

var EAST = {
    timeline: [
        set_html_style_EAST,
        EAST_prac1_instr, EAST_prac1,
        EAST_prac2_instr, EAST_prac2,
        EAST_test_instr, EAST_test_warmup, EAST_test,
        set_html_style,
        debrief2,
    ]
}

var main_timeline = [
    set_html_style,
    open_fullscreen,
    welcome,
    warmup,
    demographics,
    surveys,
    EAST,
    OpenEnded,
    close_fullscreen,
]


/* Launch jsPsych */

jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', `data_exp_demo_${subID}.csv`) // download from browser
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
    }
})
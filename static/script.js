//var source = new EventSource("/stream");
//source.onmessage = function(event) {
//    console.log(event.data);
//    //display lock status according to event.data
//    //document.getElementById("result").innerHTML += event.data + "<br>";
//};

//source.addEventListener('message', function(e) {
//  console.log(e.data);
//}, false);

function resetLogin() {
    "use strict";
    document.getElementById('access').style.display = 'none';
    document.getElementById('info_block').style.outline = '3px solid #0F0';
    document.getElementById('password_block').style.display = 'block';
    document.getElementById('password_field').value = "";
}

function checkPassword() {
    "use strict";
    var msgTimer;
    var password = document.getElementById('password_field').value;

    if (password === "a") {
        document.getElementById('password_block').style.display = 'none';
        document.getElementById('info_block').style.left = "25%";
        document.getElementById('info_block').style.top = "5%";
        document.getElementById('info_block').style.width = "50%";
        document.getElementById('info_block').style.height = "70%";
        document.getElementById('security_console').style.display = 'block';
    } else {
        document.getElementById('access').style.display = 'block';
        document.getElementById('info_block').style.outline = '3px solid #F00';
        document.getElementById('password_block').style.display = 'none';
        msgTimer = setTimeout(resetLogin, 2500);
    }
}

function checkSubmit(e) {
    "use strict";
    if (e && e.keyCode === 13) {
        checkPassword();
    }
}


function changeLockState(id, state) {
    "use strict"
    var lockElement;
    if (id == 1) {
        lockElement = document.getElementById('lock_1');
    } else if (id == 2) {
        lockElement = document.getElementById('lock_2');
    } else if (id == 3) {
        lockElement = document.getElementById('lock_3');
    }

    if (state == 0) {
        lockElement.textContent = "OFF";
        lockElement.style.color = "#F00";
    } else if (state == 1){
        lockElement.textContent = "ON";
        lockElement.style.color = "#0F0";
    }
}
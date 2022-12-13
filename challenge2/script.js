//Keyboard stuff
window.addEventListener('keyup', keyUp);

document.onkeydown = keyDown;


function keyDown(e) {
    document.getElementById("display").innerHTML = e.code;

    if (document.getElementById("keyboard").hidden) {
        document.getElementById("keyboard").hidden = false;
        document.getElementById("mainKeys").hidden = false;
        document.getElementById("navKeys").hidden = false;
        document.getElementById("keyboardNote").hidden = true;
    }
    if (document.getElementById("numpad").hidden) { 
        if (e.code.slice(0,3) === "Num" || e.getModifierState("NumLock")) {
            document.getElementById("numpad").hidden = false;
        }
    }
    const key = document.querySelector(`div[data-key="${e.code}"]`);
    if (!key) return;
    key.classList.add('down');
    if (key.classList.contains('override')) return false;
}

function keyUp(e) {
    const key = document.querySelector(`div[data-key="${e.code}"]`);
    if (!key) return;
    key.classList.remove('down');
    key.classList.add('pressed');
}


//mouse stuff
window.addEventListener('mousedown', mouseDown);

function mouseDown(e) {
    mouseVisible();
    document.getElementById("display").innerHTML = 'Mouse'+e.button;
    const key = document.querySelector(`div[data-key="Mouse${e.button}"]`);
    if (!key) return;
    key.classList.add('down');
}

window.addEventListener('mouseup', mouseUp);

function mouseUp(e) {
    const key = document.querySelector(`div[data-key="Mouse${e.button}"]`);
    if (!key) return;
    key.classList.remove('down');
    key.classList.add('pressed');
}

window.addEventListener('wheel', mouseScroll);

function mouseScroll(e) {
    mouseVisible();
    document.getElementById("display").innerHTML = 'MouseWheel'+e.deltaY;
    if(e.deltaY < 0) {
        const key = document.querySelector(`div[data-key="MouseWheelUp"]`);
        key.classList.add('down');
        delay(300).then(() => {
            key.classList.remove('down'); 
            key.classList.add('pressed');
        });
    }
    else {
        const key = document.querySelector(`div[data-key="MouseWheelDown"]`);
        key.classList.add('down');
        delay(300).then(() => {
            key.classList.remove('down'); 
            key.classList.add('pressed');
        });
    }
}

function mouseVisible() {
    if (document.getElementById("mouse").hidden) {
        document.getElementById("mouseNote").hidden = true;
        document.getElementById("mouse").hidden = false;
        document.getElementById("mouseSub").hidden = false;
    }
}


//allows delays 
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


//Light and dark mode
var r = document.querySelector(':root');

function swapMode(e) {
    if (e.innerHTML == "Swap to Light Mode") lightMode(e);
    else darkMode(e);
}
function lightMode(e) {
    r.style.setProperty('--background', 'white');
    r.style.setProperty('--text', 'black');
    r.style.setProperty('--header', '#bfbfbf');
    e.innerHTML = "Swap to Dark Mode";
}
function darkMode(e) {
    r.style.setProperty('--background', '#1a1a1a');
    r.style.setProperty('--text', '#ffffff');
    r.style.setProperty('--header', '#404040');
    e.innerHTML = "Swap to Light Mode";
}


//reset page 
function clearKeys() {
    document.getElementById("display").innerHTML = "---";
    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.classList.remove('down'));
    keys.forEach(key => key.classList.remove('pressed'));
}


//Gamepad stuff
window.addEventListener('gamepadconnected', updateGamepad);

function updateGamepad() {
    var gamepads = navigator.getGamepads();
    gamepads.forEach(gamepad => {
        if (document.getElementById(gamepad.index+"Gamepad").hidden) {
            document.getElementById("gamepadNote").hidden = true;
            document.getElementById(gamepad.index+"Gamepad").hidden = false;
            document.getElementById(gamepad.index+"GamepadSub").hidden = false;
        }
        gamepad.buttons.forEach( (button, i) => {
            var key = document.querySelector(`div[data-key="${gamepad.index}Gamepad${i}"]`);
            if (!key) return;
            if (button.pressed) {
                if (!key.classList.contains("down")) {
                    key.classList.add("down"); 
                    document.getElementById("display").innerHTML = gamepad.index + "Gamepad" + i;
                }
            }
            else if (key.classList.contains("down")) {
                key.classList.add("pressed");
                key.classList.remove("down");
            }
        });
    });
    delay(50).then(() => updateGamepad());
}
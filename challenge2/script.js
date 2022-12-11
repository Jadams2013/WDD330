
window.addEventListener('keyup', keyUp);

document.onkeydown = keyDown;


function keyDown(e) {
    document.getElementById("display").innerHTML = e.code;
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



window.addEventListener('mousedown', mouseDown);

function mouseDown(e) {
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




function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
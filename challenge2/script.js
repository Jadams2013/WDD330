
//window.addEventListener('keydown', keyDown);

window.addEventListener('keyup', keyUp);

document.onkeydown = keyDown;


function keyDown(e) {
    document.getElementById("display").innerHTML = e.code;
    const key = document.querySelector(`div[data-key="${e.code}"]`);
    if (!key) return; //not sure if this is necesarry
    key.classList.add('down');
    if (key.classList.contains('override')) {
        return false;
    }
}

function keyUp(e) {
    const key = document.querySelector(`div[data-key="${e.code}"]`);
    key.classList.remove('down');
    key.classList.add('pressed');
}









/*
document.onmousedown = mouseDown;

function mouseDown(e) {
    document.getElementById("display").innerHTML = e.code;
    const key = document.querySelector(`div[data-key="${e.code}"]`);
    if (!key) return; //not sure if this is necesarry
    key.classList.add('down');
    if (key.classList.contains('override')) {
        return false;
    }
}





*/





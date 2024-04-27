const menuHolder = "sideBarMenu";
const menuItem = 11;

let _ul = document.createElement('ul');
_ul.classList.add('list-group');

for (let i = 0; i < menuItem; i++) {

    let _li = document.createElement('li');
    _li.classList.add('list-group-item');
    
    let _a = document.createElement('a');
    _a.title = `Json Data - ${i + 1}`;
    if (i === 0) {
        _a.href = `./index.html`;
    } else {
        _a.href = `./index${i + 1}.html`;
    }
    

    let _txt = document.createTextNode(`Json Data - ${i + 1}`);
    _a.appendChild(_txt);
    
    
    _li.appendChild(_a);
    _ul.appendChild(_li);
}

const menu = _ul;
document.getElementById(menuHolder).appendChild(menu);
# RAW JSON FILE DATA RENDERING

## Application with raw json file data


### Pure Javascript : ul & li

```js
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
```

### Json Array of Object Filter by Specific Key set

```js
const resetObjArr = (objArr, keyArr) => {
    let data = [];
    if ((objArr.length > 0) && (keyArr.length > 0)) {
        objArr.map((objItem, objIndex) => {
            let _obj = {};
            let _objItemValues = Object.values(objItem);
            let _objItemKeys = Object.keys(objItem);
            keyArr.forEach((arrItem, arrIndex) => {
                _obj[arrItem] = '';
                _objItemKeys.forEach((v, i) => {
                    if (v == arrItem) {
                        _obj[arrItem] = _objItemValues[i];
                    }
                });
            });
            data.push(_obj);
        });
    }
    return data;
}
```

### Create HTML Table with Json Array of Objects

```js
const jsonTable = (objArr, renderId, appName = '', objKeys = [], objLength = null) => {

    if (objKeys.length > 0) {
        objArr = resetObjArr(objArr, objKeys);
    }
    /* create table */
    let _table = document.createElement('table');
    _table.setAttribute('id', 'dataTable');
    _table.classList.add('table', 'table-bordered', 'table-striped', 'table-sm');

    if (objArr.length) {
        
        let firstObjKeys = Object.keys(objArr[0]) || [];
        let firstObjValues = Object.values(objArr[0]) || [];
        let firstObjKeyLength = (objLength) ? parseInt(objLength) : parseInt(firstObjKeys.length);
        

        /* create thead & apped to table */
        let _thead = document.createElement('thead');
        _table.appendChild(_thead);

        if (appName !== '') {
            /* create heading row with colspan td */
            let _headingTr = _thead.insertRow();
            let _headingTd = _headingTr.insertCell(0);
            _headingTd.colSpan = firstObjKeyLength;
            _headingTd.innerHTML = `<strong>${appName}</strong> (${objArr.length})`;
        }

        objArr.map((value, index) => {

            if (index === 0) {
                /* add or insert tr within thead */
                let _headTr = _thead.insertRow();

                /* dynamically create th & append to above tr*/
                for (let i = 0; i < firstObjKeyLength; i++) {
                    let _headTh = document.createElement('th');
                    let _headThText = document.createTextNode(`${firstObjKeys[i].charAt(0).toUpperCase()}${firstObjKeys[i].slice(1)}`);
                    _headTh.appendChild(_headThText);
                    _headTr.appendChild(_headTh);
                }   
            } else {
                /* create tbody & append to table */
                let _tbody = document.createElement('tbody');
                    _table.appendChild(_tbody);

                let _tr = _tbody.insertRow();

                /* dynamically create td with object value & append to above tr in map loop*/
                for (let i = 0; i < firstObjKeyLength; i++) {
                    let _objKeys = Object.keys(value);
                    let _objVals = Object.values(value);
                    let _td = _tr.insertCell(i);
                    _td.innerHTML = `${_objVals[i]}`;
                }
            }
        });
        /* finally table render to html */
        document.getElementById(renderId).appendChild(_table);
    } else {
        document.getElementById(renderId).innerHTML = `<h4>No Records Found!</h4>`;
    }
}
```

### Raw JSON File Call via fetch()

```js
const fetchData = async () => {
    await fetch(callObj.url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        jsonTable(data, 'dataRender', callObj.name);
    }).catch((error) => {
        console.log(error);
    });
};
fetchData();
```

### Create HTML Table using pure Javascript

```js
/* create table */
let _table = document.createElement('table');
_table.setAttribute('id', 'dataTable');
_table.classList.add('table', 'table-bordered', 'table-striped', 'table-sm');

/* create thead & apped to table */
let _thead = document.createElement('thead');
_table.appendChild(_thead);

/* create heading row with colspan td */
let _headingTr = _thead.insertRow();
let _headingTd = _headingTr.insertCell(0);
_headingTd.colSpan = 3;

/* add/insert tr within thead */
let _headTr = _thead.insertRow();

/* create th1 & append to tr within thead */
let _headTh1 = document.createElement('th');
_headTr.appendChild(_headTh1);

/* create th2 & append to tr within thead */
let _headTh2 = document.createElement('th');
_headTr.appendChild(_headTh2);

/* create th3 & append to tr within thead */
let _headTh3 = document.createElement('th');
_headTr.appendChild(_headTh3);

/* create text element for th and append */
let _headTh1Text = document.createTextNode('Language');
_headTh1.appendChild(_headTh1Text);

/* create text element for th and append */
let _headTh2Text = document.createTextNode('Owner');
_headTh2.appendChild(_headTh2Text);

/* create text element for th and append */
let _headTh3Text = document.createTextNode('Year');
_headTh3.appendChild(_headTh3Text);

/* create tbody & append to table */
let _tbody = document.createElement('tbody');
_table.appendChild(_tbody);

/* finally table render to html */
document.getElementById('dataRender').appendChild(_table);

const fetchData = async () => {
    await fetch('./jsons/coding_languages.json').then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        if (data.length) {
            _headingTd.innerHTML = `<strong>Programming Languages</strong> (${data.length})`;
            data.map((value, index) => {
                let _tr = _tbody.insertRow();
                let _td1 = _tr.insertCell(0);
                let _td2 = _tr.insertCell(1);
                let _td3 = _tr.insertCell(2);
                _td1.innerHTML = `<strong>${value.language}</strong>`;
                _td2.innerHTML = value.owner;
                _td3.innerHTML = value.year;
            });
        }
    }).catch((error) => {
        console.log(error);
    });
};
fetchData();
```
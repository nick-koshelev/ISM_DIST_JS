function createTable(rows, cols) { // строка, столбец
    let table = document.createElement('table');
    table.id = 'table';
    document.body.appendChild(table);
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        table.append(tr);
        for (let i = 0; i < cols; i++) {
            let td = document.createElement('td');
            td.classList.add('td');
            tr.append(td);
        }
    }
    cssForTd(table);
    return table;
}

function cssForTd(table) {
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[0].cells.length; j++) {
            let cell = table.rows[i].cells[j];
            if ((i + j) % 2 === 0) {
                cell.style.background = 'darkgray';
                cell.classList.add('even');
            } else {
                cell.style.background = 'lightgray';
            }
            cell.style.width = '30px';
            cell.style.height = '30px';
            cell.style.boxShadow = '5px 5px 5px 0 black';
        }
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createBomb(count) {
    let table = document.getElementById('table');
    if ((table.rows.length * table.rows[0].cells.length) < count) {
        alert("Ошибка! Количество бомб больше чем клеток на поле!");
    } else {
        for (let i = 0; i < count; i++) {
            let bomb;
            let color;
            do {
                bomb = table.rows[getRandom(table.rows.length)].cells[getRandom(table.rows[0].cells.length)];
            } while (bomb.classList.contains('bomb'));
            bomb.classList.add('bomb');
        }
    }
}

function createNumbers(table) {
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[0].cells.length; j++) {
            table.rows[i].cells[j].innerHTML = '<p>0</p>';
        }
    }
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[0].cells.length; j++) {
            if (table.rows[i].cells[j].classList.contains('bomb')) {
                if (i !== 0) {
                    table.rows[i - 1].cells[j].firstElementChild.innerHTML = parseInt(table.rows[i - 1].cells[j].firstElementChild.innerHTML, 10) + 1;
                    if (j !== 0) {
                        table.rows[i - 1].cells[j - 1].firstElementChild.innerHTML = parseInt(table.rows[i - 1].cells[j - 1].firstElementChild.innerHTML, 10) + 1;
                    }
                    if (j !== table.rows[0].cells.length - 1) {
                        table.rows[i - 1].cells[j + 1].firstElementChild.innerHTML = parseInt(table.rows[i - 1].cells[j + 1].firstElementChild.innerHTML, 10) + 1;
                    }
                }
                if (j !== 0) {
                    table.rows[i].cells[j - 1].firstElementChild.innerHTML = parseInt(table.rows[i].cells[j - 1].firstElementChild.innerHTML, 10) + 1;
                    if (i !== table.rows.length - 1) {
                        table.rows[i + 1].cells[j - 1].firstElementChild.innerHTML = parseInt(table.rows[i + 1].cells[j - 1].firstElementChild.innerHTML, 10) + 1;
                    }
                }
                if (i !== table.rows.length - 1) {
                    table.rows[i + 1].cells[j].firstElementChild.innerHTML = parseInt(table.rows[i + 1].cells[j].firstElementChild.innerHTML, 10) + 1;
                    if (j !== table.rows[0].cells.length - 1) {
                        table.rows[i + 1].cells[j + 1].firstElementChild.innerHTML = parseInt(table.rows[i + 1].cells[j + 1].firstElementChild.innerHTML, 10) + 1;
                    }
                }
                if (j !== table.rows[0].cells.length - 1) {
                    table.rows[i].cells[j + 1].firstElementChild.innerHTML = parseInt(table.rows[i].cells[j + 1].firstElementChild.innerHTML, 10) + 1;
                }
            }
        }
    }
    let p = document.getElementsByTagName('p');
    for (let i = 0; i < table.rows.length * table.rows[0].cells.length; i++) {
        p[i].style.margin = '0';
        p[i].style.marginLeft = '35%';
        p[i].style.display = 'none';
    }
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[0].cells.length; j++) {
            if (parseInt(table.rows[i].cells[j].firstElementChild.innerHTML, 10) === 0 || table.rows[i].cells[j].classList.contains('bomb')) {
                table.rows[i].cells[j].firstElementChild.innerHTML = ' ';
                if (table.rows[i].cells[j].classList.contains('bomb')) {
                    let img = document.createElement('img');
                    img.src = 'image/bomb.png';
                    img.setAttribute('width', '25px');
                    img.style.marginLeft = '3px';
                    img.style.display = 'none';
                    table.rows[i].cells[j].append(img);
                }
            }
            let flag = document.createElement('img');
            flag.setAttribute('src', 'image/flag.png');
            flag.setAttribute('width', '25px');
            flag.style.display = 'none';
            flag.classList.add('flag_in_flag');
            table.rows[i].cells[j].append(flag);
            if (table.rows[i].cells[j].firstElementChild.innerHTML === '1' || table.rows[i].cells[j].firstElementChild.innerHTML === '4' || table.rows[i].cells[j].firstElementChild.innerHTML === '7') {
                table.rows[i].cells[j].firstElementChild.style.color = 'blue';
            } else if (table.rows[i].cells[j].firstElementChild.innerHTML === '2' || table.rows[i].cells[j].firstElementChild.innerHTML === '5' || table.rows[i].cells[j].firstElementChild.innerHTML === '8') {
                table.rows[i].cells[j].firstElementChild.style.color = 'yellowgreen';
            } else if (table.rows[i].cells[j].firstElementChild.innerHTML === '3' || table.rows[i].cells[j].firstElementChild.innerHTML === '6' || table.rows[i].cells[j].firstElementChild.innerHTML === '9'){
                table.rows[i].cells[j].firstElementChild.style.color = 'red';
            } else {
                table.rows[i].cells[j].firstElementChild.style.color = 'violet';
            }
        }
    }
}

let rows = +prompt("Сколько строк?", 5);
let cols = +prompt("Сколько столбцов?", 5);
let bombs = +prompt("Сколько бомб?", 3);
let table = createTable(rows, cols);
createBomb(bombs);
createNumbers(table);

table.addEventListener('mouseover', function (event) {
    let target = event.target;
    if (target.classList.contains('td') && !target.classList.contains('used')) {
        target.style.background = 'white';
    }
});

table.addEventListener('mouseout', function (event) {
    let target = event.target;
    if (target.classList.contains('td') && !target.classList.contains('used')) {
        if (target.classList.contains('even')) {
            target.style.background = 'darkgray';
        } else {
            target.style.background = 'lightgray';
        }
    }
});

table.addEventListener('mousedown', function (event) {
    event.cancelBubble = true;
    let target = event.target;
    if (event.target.classList.contains('td')) {
        let target = event.target;
        let p = target.firstElementChild;
        let table = document.getElementById('table');
        let flag = target.getElementsByClassName('flag_in_flag');
        let bombs = document.getElementsByClassName('bomb');
        let no_bomb = 0;
        if (event.buttons === 1) {
            if (target.classList.contains('td') && !target.classList.contains('used') && !target.classList.contains('flag')) {
                if (target.classList.contains('bomb')) {
                    let bombs = document.getElementsByClassName('bomb');
                    for (let i = 0; i < bombs.length; i++) {
                        let bomb = bombs[i];
                        bomb.style.backgroundColor = 'red';
                        let img = bomb.children[1];
                        img.style.display = 'block';
                        let flag = bomb.children[2];
                        flag.style.display = 'none';
                    }
                    alert('Вы проиграли!');
                    for (let i = 0; i < table.rows.length; i++) {
                        for (let j = 0; j < table.rows[i].cells.length; j++) {
                            table.rows[i].cells[j].classList.add('used');
                        }
                    }
                } else {
                    target.style.background = 'gray';
                    p.style.display = 'inline';
                }
                target.classList.add('used');
                if (target.firstElementChild.innerHTML === ' ') {
                    clear(table, target);
                }
            }
        } else if (event.buttons === 2) {
            if (!target.classList.contains('flag')) {
                flag[0].style.display = 'block';
                target.classList.add('flag');
            } else {
                flag[0].style.display = 'none';
                target.classList.remove('flag');
            }
        }
        for (let i = 0; i < bombs.length; i++) {
            if (bombs[i].classList.contains('flag')) {
                no_bomb++;
            }
        }
        if (no_bomb === bombs.length) {
            alert("Вы победили!!");
            for (let i = 0; i < table.rows.length; i++) {
                for (let j = 0; j < table.rows[i].cells.length; j++) {
                    table.rows[i].cells[j].classList.add('used');
                }
            }
            return;
        }
    }
    if (target.className === 'flag_in_flag') {
        if (event.buttons === 2) {
            if (!target.classList.contains('flag_in_flag')) {
                target.style.display = 'block';
                target.parentElement.classList.add('flag');
            } else {
                target.style.display = 'none';
                target.parentElement.classList.remove('flag');
            }
        }
    }
    return false;
});

function coord(table, cell) {
    let cord = [];
    for (let m = 0; m < table.rows.length; m++) {
        for (let n = 0; n < table.rows[m].cells.length; n++) {
            if (table.rows[m].cells[n] === cell) {
                cord[0] = m;
                cord[1] = n;
            }
        }
    }
    return cord;
}

document.body.oncontextmenu = function (e) {
    return false;
};


function clear(table, target) {
    let cord = coord(table, target);
    if (cord[0] < table.rows.length - 1) { // вниз
        if (!table.rows[cord[0] + 1].cells[cord[1]].classList.contains('used') && table.rows[cord[0] + 1].cells[cord[1]].firstElementChild.innerHTML === ' ') {
            table.rows[cord[0] + 1].cells[cord[1]].classList.add('used');
            table.rows[cord[0] + 1].cells[cord[1]].style.backgroundColor = 'gray';
            clear(table, table.rows[cord[0] + 1].cells[cord[1]]);
        } else {
            let p = table.rows[cord[0] + 1].cells[cord[1]].getElementsByTagName('p');
            p[0].style.display = 'inline';
            table.rows[cord[0] + 1].cells[cord[1]].classList.add('used');
            table.rows[cord[0] + 1].cells[cord[1]].style.backgroundColor = 'gray';
        }
    }
    if (cord[0] > 0) { // вверх
        if (!table.rows[cord[0] - 1].cells[cord[1]].classList.contains('used') && table.rows[cord[0] - 1].cells[cord[1]].firstElementChild.innerHTML === ' ') {
            table.rows[cord[0] - 1].cells[cord[1]].classList.add('used');
            table.rows[cord[0] - 1].cells[cord[1]].style.backgroundColor = 'gray';
            clear(table, table.rows[cord[0] - 1].cells[cord[1]]);
        } else {
            let p = table.rows[cord[0] - 1].cells[cord[1]].getElementsByTagName('p');
            p[0].style.display = 'inline';
            table.rows[cord[0] - 1].cells[cord[1]].classList.add('used');
            table.rows[cord[0] - 1].cells[cord[1]].style.backgroundColor = 'gray';
        }
    }
    if (cord[1] < table.rows[0].cells.length - 1) { // вправо
        if (!table.rows[cord[0]].cells[cord[1] + 1].classList.contains('used') && table.rows[cord[0]].cells[cord[1] + 1].firstElementChild.innerHTML === ' ') {
            table.rows[cord[0]].cells[cord[1] + 1].classList.add('used');
            table.rows[cord[0]].cells[cord[1] + 1].style.backgroundColor = 'gray';
            clear(table, table.rows[cord[0]].cells[cord[1] + 1]);
        } else {
            let p = table.rows[cord[0]].cells[cord[1] + 1].getElementsByTagName('p');
            p[0].style.display = 'inline';
            table.rows[cord[0]].cells[cord[1] + 1].classList.add('used');
            table.rows[cord[0]].cells[cord[1] + 1].style.backgroundColor = 'gray';
        }
    }
    if (cord[1] > 0) { // влево
        if (!table.rows[cord[0]].cells[cord[1] - 1].classList.contains('used') && table.rows[cord[0]].cells[cord[1] - 1].firstElementChild.innerHTML === ' ') {
            table.rows[cord[0]].cells[cord[1] - 1].classList.add('used');
            table.rows[cord[0]].cells[cord[1] - 1].style.backgroundColor = 'gray';
            clear(table, table.rows[cord[0]].cells[cord[1] - 1]);
        } else {
            let p = table.rows[cord[0]].cells[cord[1] - 1].getElementsByTagName('p');
            p[0].style.display = 'inline';
            table.rows[cord[0]].cells[cord[1] - 1].classList.add('used');
            table.rows[cord[0]].cells[cord[1] - 1].style.backgroundColor = 'gray';
        }
    }
}
let stringArray = new Array();
let numsArray = new Array(2);
let operation = "";
let historyArrayLocal = new Array();
let historyArrayGlobaL = new Array();
let isHistoryVisible = false;

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.NumsButton').forEach(clickButton => {
        clickButton.addEventListener('click', function() {
            if(this.textContent != "🖩") {
                document.getElementById('WorkBox').textContent += this.textContent;
                stringArray.unshift(this.textContent);
            }
        });
    });
    document.querySelectorAll('.OpButton').forEach(op => {
        op.addEventListener('click', function() {
            if(document.getElementById('WorkBox').textContent != "" && this.textContent != "=") {
                historyArrayLocal.push(document.getElementById('WorkBox').textContent);
                operation = this.textContent;
                historyArrayLocal.push(operation);
                document.getElementById('OpBox').textContent = operation;
                numsArray[0] = parseFloat(document.getElementById('WorkBox').textContent);
                document.getElementById('WorkBox').textContent = "";
            }
        });
    });
    downloadFromStorage();
});

function deleteNum() {
    stringArray = [];
    document.getElementById('WorkBox').textContent = "";
    operation = "";
    document.getElementById('OpBox').textContent = operation;
}

function modulo() {
    operation = "%"
    document.getElementById('OpBox').textContent = operation;
    numsArray[0] = document.getElementById('WorkBox').textContent;
    document.getElementById('WorkBox').textContent = "";
}

function calcNums() {
    numsArray[1] = parseFloat(document.getElementById('WorkBox').textContent);
    historyArrayLocal.push(document.getElementById('WorkBox').textContent);
    historyArrayLocal.push("=");
    let result = 0;
    switch(operation) {
        case "+":
            result = numsArray[0] + numsArray[1];
            break;
        case "-":
            result = numsArray[0] - numsArray[1];
            break;
        case "*":
            result = numsArray[0] * numsArray[1];
            break;
        case "/":
            result = numsArray[0] / numsArray[1];
            result.toFixed(3);
            break;
        case "%":
            result = numsArray[0] % numsArray[1];
            break;
    }
    document.getElementById('OpBox').textContent = "";
    document.getElementById('WorkBox').textContent = result.toString();
    historyArrayLocal.push(document.getElementById('WorkBox').textContent);
    let rowGlobalHistory = historyArrayLocal.join(' ');
    historyArrayGlobaL.push(rowGlobalHistory);
    downloadFromStorage();
    historyArrayLocal = [];
}

function downloadFromStorage() {
    const history = localStorage.getItem('calculatorHistory');
    if(history) {
        historyArrayGlobaL = JSON.parse(history);
    }
}

function uploadToStorage(item) {
    localStorage.setItem('calculatorHistory', JSON.stringify(item));
}

function showHistory() {
    const container = document.getElementById('HistoryContainer');
    
    if (isHistoryVisible) {
        container.innerHTML = '';
        isHistoryVisible = false;
    } 
    else {
        if (historyArrayGlobaL && historyArrayGlobaL.length > 0) {  // dodaj to sprawdzenie
            historyArrayGlobaL.forEach(item => {
                const newLabel = document.createElement('label');
                newLabel.textContent = item;
                newLabel.className = 'History';
                container.appendChild(newLabel);
                container.appendChild(document.createElement('br'));
            });
            isHistoryVisible = true;
        }
    }
}
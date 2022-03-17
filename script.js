var testScore = {
    nameStudent : "",
    math :0,
    physical : 0,
    chemistry : 0,
    avgMark : "?",
};

// Tạo biến chứa id của bảng.
const idTable = "markTable";

// Khởi tạo biến toàn cục vị trí của row hiện tại.
var rowIndex = 0;

//Setup điểm xếp loại học lực.
const gradeBad = 4;
const gradeNormal = 6;
const gradeFairly = 8;

//Index các col.
const col0 = 0;
const col1 = 1;
const col2 = 2;
const col3 = 3;
const col4 = 4;
const col5 = 5;
const col6 = 6;
const col7 = 7;

//Số thập phân của điểm trung bình.
const fixedAvg = 1;
const subjects = 3;
function onClickSubmit() {
    getMark();
    renderMarkToTable();
    resetForm();
}

// TODO: lấy dữ liệu từ form.
function getMark() {
    rowIndex++;
    testScore.nameStudent = document.getElementById("nameStudent").value;
    testScore.math = document.getElementById("math").value;
    testScore.physical = document.getElementById("physical").value;
    testScore.chemistry = document.getElementById("chemistry").value;
}
// TODO: show dữ liệu lên bảng.
function renderMarkToTable() {
    const table = document.getElementById(idTable);
    let row = table.insertRow(rowIndex);
    row.insertCell(col0).innerHTML = rowIndex;
    row.insertCell(col1).innerHTML = testScore.nameStudent;
    row.insertCell(col2).innerHTML = testScore.math;
    row.insertCell(col3).innerHTML = testScore.physical;
    row.insertCell(col4).innerHTML = testScore.chemistry;
    row.insertCell(col5).innerHTML = testScore.avgMark;
    row.insertCell(col6).innerHTML = "";
}
// TODO: reset form như ban đầu.
function resetForm() {
    document.getElementById("nameStudent").value = "";
    document.getElementById("math").value = "";
    document.getElementById("physical").value = "";
    document.getElementById("chemistry").value = "";
}

// TODO: tính điểm trung bình.
// param: index: số thự tự của học viên.
function caculateAvg(index) {
    let table = document.getElementById(idTable);
    row = table.rows;

    const mathMark = parseFloat(row[index].cells[col2].innerText);
    const physicalMark = parseFloat(row[index].cells[col3].innerText);
    const chemistryMark = parseFloat(row[index].cells[col4].innerText);
    const avgMark = (mathMark + physicalMark + chemistryMark) / subjects;

    row[index].cells[col5].innerHTML = avgMark.toFixed(fixedAvg); 
}
//TODO: Xác định các học sinh giỏi.
function findGoodStudent(){
    let table = document.getElementById(idTable);
    let row = table.rows;
    for (let i = 1; i < row.length; i++) {
        caculateAvg(i);
        if (parseFloat(row[i].cells[col5].innerText) >= gradeFairly){
            row[i].style="color:red";
        }
    }
}
//TODO: Xếp loại học sinh theo điểm trung bình.
function classifyMark(){
    let table = document.getElementById(idTable);
    let row = table.rows;
    for (let i = 1; i < row.length; i++) {
        caculateAvg(i);
        if (parseFloat(row[i].cells[col5].innerText) <= gradeBad){
            row[i].cells[col6].innerHTML = "Kém";
        }
        else if (parseFloat(row[i].cells[col5].innerText) <= gradeNormal){
            row[i].cells[col6].innerHTML = "Trung bình";
        }
        else if (parseFloat(row[i].cells[col5].innerText) <= gradeFairly){
            row[i].cells[col6].innerHTML = "Khá";
        }
        else{
            row[i].cells[col6].innerHTML = "Giỏi";
        }
    }
}
//TODO: Xóa hàng cuối cùng.
function deleteRow(){
    let table = document.getElementById(idTable);
    table.rows[rowIndex].remove();
    rowIndex--;
}
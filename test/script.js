var testScore = {
    nameStudent : "",
    math :0,
    physical : 0,
    chemistry : 0,
    avgMark : "?",
};

// Khởi tạo biến toàn cục vị trí của row hiện tại.

var rowIndex = 0;

//Setup điểm xếp loại học lực.
const gradeBad = 4;
const gradeNormal = 6;
const gradeFairly = 8;

//Số thập phân của điểm trung bình.
const fixedAvg = 1;
const subjects = 3;

// Regex cho dữ liệu form.
const regexForName = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/;
const regexForMark = /^\d*\.?\d*$/;

// Chạy hàm chính khi trang được load xong.
$(document).ready(function(){
    console.log("Ready!");
    disabledButton();
    $("#submitBtn").click(function(){
        if (checkFormData()) {
            getMark();
            resetForm();
            renderMarkToTable();
            displayElement("#showAvgButton", true);
            displayElement("#deleteAllButton", true);
            displayElement("#deleteRowButton", true);
            $("#notice").text("Nhập dữ liệu thành công!")
        }
        else {
            $("#notice").text("Dữ liệu nhập chưa chính xác, xin nhập lại!");
        };

    });
    $("#showAvgButton").click(caculateAvg);
    $("#isGoodStudentButton").click(isGoodStudent);
  
    $("#deleteAllButton").click(function() {
        location.reload();
        console.log("del all")
    });
    $("#deleteRowButton").click(deleteRow);
});
// TODO: Tắt các nút khi dữ liệu chưa được nhập.
function disabledButton() {
    displayElement("#showAvgButton", false);
    displayElement("#isGoodStudentButton", false);
    displayElement("#deleteAllButton", false);
    displayElement("#deleteRowButton", false);
}
//TODO: Lấy dữ liệu nhập vào trong đối tượng, bao gồm cả tính điểm trung bình.
function getMark() {
    rowIndex++;
    testScore.nameStudent = $("#nameStudent").val();
    testScore.math = $("#math").val();
    testScore.physical = $("#physical").val();
    testScore.chemistry = $("#chemistry").val();
    mathMark = parseFloat(testScore.math);
    physicalMark = parseFloat(testScore.physical);
    chemistryMark = parseFloat(testScore.chemistry);
    const avgMark = (mathMark + physicalMark + chemistryMark) / subjects;
    testScore.avgMark = avgMark;
}
//TODO: Xóa dự liệu trong form.
function resetForm() {
    $("#nameStudent").val("");
    $("#math").val("");
    $("#physical").val("");
    $("#chemistry").val("");
}
//TODO: Hiển thị dữ liệu đang nhập lên bảng
function renderMarkToTable() {
    let text = "";
    text =  "<tr>" +
            "<td>" + rowIndex + "</td>"+
            "<td>" + testScore.nameStudent + "</td>"+
            "<td id=\"mathMark\">" + testScore.math + "</td>"+
            "<td id=\"physicalMark\">" + testScore.physical + "</td>"+
            "<td id=\"chemmistryMark\">" + testScore.chemistry + "</td>"+
            "<td id=\"avg\">" + "?" + "</td>"+
            "<td id=\"grade\">" + "?" + "</td>"+
            "</tr>";
    $("#markTable tr:last").after(text);
}
// TODO: Tính điểm trung bình
function caculateAvg() {
    $("#markTable").children("tbody").children().each(function(){
        let mathMark = $(this).children("#mathMark").text();
        let physicalMark = $(this).children("#physicalMark").text();
        let chemistryMark = $(this).children("#chemmistryMark").text();
        const avgMark = (parseFloat(mathMark) + parseFloat(physicalMark) + parseFloat(chemistryMark)) / subjects;
        $(this).children("#avg").text(avgMark.toFixed(fixedAvg));
    })
    displayElement("#isGoodStudentButton", true);
    $("#notice").text("Đã tính điểm trung bình");
}
// TODO:Xác định học sinh giỏi, khá, trung bình, kém.
function isGoodStudent() {
    $("#markTable").children("tbody").children().each(function(){
        let col = $(this).children("#avg").text();
        switch(true) {
            case (col <= gradeBad):
                $(this).children("#grade").text("Kém");
                break;
            case (col <= gradeNormal):
                $(this).children("#grade").text("Trung bình");
                break;
            case (col < gradeFairly):
                $(this).children("#grade").text("Khá");
                break;
            case (col >= gradeFairly):
                $(this).children("#grade").text("Giỏi");
                $(this).addClass("goodStudent");
                break;
        };
    });
   $("#notice").text("Đã xác định học lực học sinh.");
}
// TODO: Xóa hàng cuối cùng trong bảng.
function deleteRow() {
    $("#markTable tr:last").remove();
    rowIndex--;
    if (rowIndex === 0) {
        disabledButton();
    };
    $("#notice").text("Đã xóa hàng cuối cùng.");
}
// TODO: Kiểm tra dữ liệu nhập vào form.
function checkFormData() {
    let name = $("#nameStudent").val();
    let math = $("#math").val();
    let physical= $("#physical").val();
    let chemistry = $("#chemistry").val();
    if(!regexForName.test(name) || !regexForMark.test(math) || 
    !regexForMark.test(physical)|| !regexForMark.test(chemistry) ||
    name == "" || math == "" || physical == "" || chemistry == ""){
        return false;
    };
    return true;
}

function displayElement(selector, boolean) {
    return $(selector).prop("disabled", !boolean);
}

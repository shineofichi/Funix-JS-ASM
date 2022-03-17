alert("Chào mừng bạn đến với ứng dụng JavaScript đầu tiên");
var name = prompt("Hãy nhập tên của bạn");
var age = Date.getYear();
var city = prompt("Hãy nhập thành phố bạn đang sinh sống");
var phone = prompt("Hãy nhập số điện thoại của bạn ")

function checkage(age){
    if (age < Date.getYear()){
        return true;
    }
        return false;
}
while (checkage(age)){
    age = prompt("Hãy nhập tên của bạn");
}

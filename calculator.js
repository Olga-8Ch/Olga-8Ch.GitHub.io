window.addEventListener('DOMContentLoaded', function() {
});

function calculate() {
    let q = document.getElementsByName("quantity");
    let p = document.getElementsByName("product");
    let r = document.getElementById("result");

    let quantity = q[0].value;
    let price = parseInt(p[0].value);

    let m = quantity.match(/^[1-9]\d*$/);
    if (m === null) {
        r.innerHTML = "Ошибка: введите число";
        return false;
    }

    let total = parseInt(quantity) * price;
    r.innerHTML = "Стоимость: " + total + " руб.";

    return false;
}

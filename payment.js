window.onload = test();
function test() {
    let isSuccess = false;
    const url = window.location.href;
    const arrParams = url.split('&');
    arrParams.forEach(param => {
        if (param.includes("vnp_Amount")) {
            document.getElementById('amount').innerHTML = formatPrice(parseInt(param.split('=')[1]) / 100);

        }
        if (param.includes("vnp_ResponseCode=00")) {
            isSuccess = true;
        }
        if (param.includes("vnp_PayDate")) {
            const time = formatDate(param.split('=')[1]);
            document.getElementById('time').innerHTML = time;
        }
        if (param.includes("vnp_OrderInfo")) {
            document.getElementById('number-order').innerHTML = param.split('=')[1];
        }
    });

    console.log(isSuccess);
    if (isSuccess) {
        document.getElementById('title').innerHTML = 'Giao dịch thành công';       

        const order = JSON.parse(localStorage.getItem("order"));
        const userCurrent = JSON.parse(localStorage.getItem(USER_LOGIN));
        const listOrder = localStorage.getItem(LIST_ORDER) ? JSON.parse(localStorage.getItem(LIST_ORDER)) : [];
        const nextOrderId = localStorage.getItem(NEXT_ID);
        localStorage.setItem(NEXT_ID, parseInt(nextOrderId) + 1);
        listOrder.push(order);
        localStorage.setItem(LIST_ORDER, JSON.stringify(listOrder));
        userCurrent.cart = [];
        localStorage.setItem(USER_LOGIN, JSON.stringify(userCurrent));
        localStorage.removeItem("modalIsShow");
        alert("Đặt hàng thành công!");
        localStorage.removeItem("modalIsShow");
    }
    else {
        document.getElementById('title').innerHTML = 'Giao dịch thất bại';
        document.getElementById('img').innerHTML = `
        <i class="fa-duotone fa-regular fa-circle-xmark" style="--fa-primary-color: #ffffff; --fa-secondary-color: #f05656; --fa-secondary-opacity: 1;"></i>`
        document.getElementById('message').innerHTML = 'Bạn đã huỷ giao dịch. Vui lòng thử lại sau';
    }
    localStorage.removeItem("order");

}
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + " ₫";
}

function formatDate(time) {
    const year = time.slice(0, 4);
    const month = time.slice(4, 6);
    const day = time.slice(6, 8);
    const hours = time.slice(8, 10);
    const minutes = time.slice(10, 12);

    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

document.getElementById('home').addEventListener('click', () => { 
    localStorage.removeItem("modalIsShow");
    window.location.href = '/';
});

document.getElementById('back').addEventListener('click', () => { 
    window.location.href = '/';
});
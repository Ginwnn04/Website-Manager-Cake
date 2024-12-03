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
        const userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
        const listOrder = localStorage.getItem(LIST_ORDER) ? JSON.parse(localStorage.getItem(LIST_ORDER)) : [];
        const nextOrderId = localStorage.getItem(NEXT_ID);
        order.paid = true;
        localStorage.setItem(NEXT_ID, parseInt(nextOrderId) + 1);
        listOrder.push(order);
        localStorage.setItem(LIST_ORDER, JSON.stringify(listOrder));
        userCurrent.cart = [];
        localStorage.setItem(USER_LOGIN, JSON.stringify(userCurrent));
        localStorage.removeItem("modalIsShow");
        showToast("success", "Đặt hàng thành công!");
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
function showToast(type, message) {
    const title = type === 'success' ? "Thành công!" : "Thất bại!";
    
    // Trước khi hiển thị thông báo mới, xóa các thông báo cũ
    const main = document.getElementById("toast");
    if (main) {
      // Xóa tất cả thông báo cũ
      main.innerHTML = '';
    }
  
    toast({
      title: title,
      message: message,
      type: type,
      duration: 5000
    });
  }
  
  function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
        <div class="toast__icon">
          <i class="${icon}"></i>
        </div>
        <div class="toast__body">
          <h3 class="toast__title">${title}</h3>
          <p class="toast__msg">${message}</p>
        </div>
        <div class="toast__close">
          <i class="fas fa-times"></i>
        </div>
      `;
      main.appendChild(toast);
    }
  }
  
  function viewDetailOrder(orderId) {
    listOrder.forEach(order => {   
        if (order.id == orderId) {
            const orderDetailContent = document.getElementById("orderDetailContent");

    // Lặp qua từng sản phẩm để tạo hàng bảng
    let productRows = order.detailsOrder.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>x${item.quantity}</td>
            <td>${formatMoney(item.price)}</td>
        </tr>
    `).join('');

    // Hiển thị chi tiết đơn hàng
    orderDetailContent.innerHTML = `
      <button onclick="closeModal('orderDetailModal')" class="closeDetail">Đóng</button>
      <h2>Chi tiết đơn hàng</h2>
      <div class="boxDetail">
        <div class="boxDetailContent1">
            <p><strong>Mã đơn:</strong> ${order.id}</p>
        </div>
        <div class="boxDetailContent1">
            <p><strong>Tài khoản:</strong> ${order.gmail}</p>
        </div>
        <div class="boxDetailContent2">
            <p><strong>Người nhận:</strong> ${order.name}</p>
        </div>
        <div class="boxDetailContent2">
            <p><strong>SĐT:</strong> ${order.phone}</p>
        </div>
        <div class="boxDetailContent3">
            <p><strong>Ngày đặt:</strong> ${order.timeCreate}</p>
        </div>
        <div class="boxDetailContent3">
            <p><strong>Tổng đơn:</strong> ${formatMoney(order.total)}</p>
        </div>
      </div>
      <p><strong>Địa chỉ:</strong> ${order.address}</p>
      <p><strong>Tình trạng ${order.status}</strong> 
      </p>
      <div class="tableOrder">
          <table>
              <thead>
                  <tr>
                      <th>Tên SP</th>
                      <th>SL</th>
                      <th>Giá tiền</th>
                  </tr>
              </thead>
              <tbody>
                  ${productRows}
              </tbody>
          </table>
      </div>
    `;

    // Mở modal
    document.getElementById("orderDetailModal").style.display = "flex";
        }
    });
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}


document.querySelector("#message > span").addEventListener("click", () => { 
  viewDetailOrder(document.getElementById('number-order').innerHTML);
});
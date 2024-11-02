const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
allSideMenu.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
    });
});

const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sideBar = document.getElementById('sidebar');
const avatar = document.querySelector('#sidebar .avatar');
menuBar.addEventListener('click', function(){
    sideBar.classList.toggle('hide');
    if (avatar.style.visibility === 'hidden') {
        avatar.style.visibility = 'visible';
    } else {
        avatar.style.visibility = 'hidden';
    }
})

if (window.innerWidth < 760) {
    sideBar.classList.add('hide');
    avatar.style.visibility = 'hidden';
}
window.addEventListener('resize', function () {
    if (window.innerWidth < 760) {
        sideBar.classList.add('hide');
        avatar.style.visibility = 'hidden';
    }
});

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');
searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 600) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search-alt', 'bx-x-circle');
        } else {
            searchButtonIcon.classList.replace('bx-x-circle', 'bx-search-alt');
        }
    }
});

const Dashboard = document.querySelector('#dashboard');
const AccountManager = document.querySelector('#account_manager');
const OrderManager = document.querySelector('#order_manager');

AccountManager.style.display = 'none';
OrderManager.style.display = 'none'; 
Dashboard.style.display = 'block';

function showDashboard(event) {
    const selectedItem = event.currentTarget.id;
    if (selectedItem === 'dashboard_show') {
        Dashboard.style.display = 'block';
    } else {
        Dashboard.style.display = 'none';
    }
}

function showAccountManager(event) {
    const selectedItem = event.currentTarget.id;
    if (selectedItem === 'account') {
        AccountManager.style.display = 'block';
    } else {
        AccountManager.style.display = 'none';
    }
}

function showOrderManager(event) {
    const selectedItem = event.currentTarget.id;
    if (selectedItem === 'order') {
        OrderManager.style.display = 'block';
    } else {
        OrderManager.style.display = 'none';
    }
}

allSideMenu.forEach(item => {
    item.addEventListener('click', showAccountManager);
    item.addEventListener('click', showDashboard);
    item.addEventListener('click', showOrderManager);
});

// Quản lý đơn hàng và phân trang
const orderModal = document.getElementById('orderModal');
const addOrderBtn = document.getElementById('addOrderBtn');
const closeModal = document.getElementById('closeModal');
const orderForm = document.getElementById('orderForm');
const orderTableBody = document.querySelector('#order_manager .table_data table tbody');
const statusFilter = document.querySelector('#order_manager .top select');

let currentEditingOrderId = null;
let currentPage = 1;
const ordersPerPage = 8;

// Hàm tải và hiển thị đơn hàng từ localStorage
function loadOrdersFromLocalStorage() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.forEach(order => addOrderToTable(order));
    updateOrderTable();
}

if (addOrderBtn) {
    addOrderBtn.addEventListener('click', function () {
        currentEditingOrderId = null;
        orderModal.style.display = 'flex';
        document.getElementById('orderId').value = generateOrderId();
    });
}

function generateOrderId() {
    let orderCount = parseInt(localStorage.getItem('orderCount')) || 0;
    orderCount++;
    localStorage.setItem('orderCount', orderCount);
    return `id${String(orderCount).padStart(4, '0')}`;
}

if (closeModal) {
    closeModal.addEventListener('click', function () {
        orderModal.style.display = 'none';
    });
}

function updateOrderTable() {
    orderTableBody.innerHTML = '';
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const start = (currentPage - 1) * ordersPerPage;
    const end = start + ordersPerPage;
    const ordersToDisplay = orders.slice(start, end);

    ordersToDisplay.forEach(order => addOrderToTable(order));
    updatePagination(orders.length);
}

function updatePagination(totalOrders) {
    const totalPages = Math.ceil(totalOrders / ordersPerPage);
    const paginationContainer = document.querySelector('#order_manager .pagination');
    paginationContainer.innerHTML = '';

    if (currentPage > 1) {
        const backBtn = document.createElement('button');
        backBtn.innerText = 'Trở lại';
        backBtn.addEventListener('click', function () {
            currentPage--;
            updateOrderTable();
        });
        paginationContainer.appendChild(backBtn);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = i;
        pageBtn.classList.toggle('current', i === currentPage); // Thêm lớp current nếu đây là trang hiện tại
        pageBtn.addEventListener('click', function () {
            currentPage = i;
            updateOrderTable();
        });
        paginationContainer.appendChild(pageBtn);
    }

    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.innerText = 'Tiếp theo';
        nextBtn.addEventListener('click', function () {
            currentPage++;
            updateOrderTable();
        });
        paginationContainer.appendChild(nextBtn);
    }
}

orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newOrder = {
        orderId: document.getElementById('orderId').value,
        customerName: document.getElementById('customerName').value,
        orderDate: document.getElementById('orderDate').value,
        orderStatus: document.getElementById('orderStatus').value,
        totalAmount: document.getElementById('totalAmount').value
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (currentEditingOrderId) {
        const updatedOrders = orders.map(order => order.orderId === currentEditingOrderId ? newOrder : order);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        alert('Cập nhật đơn hàng thành công!');
    } else {
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('Thêm đơn hàng thành công!');
    }

    updateOrderTable();
    orderModal.style.display = 'none';
    orderForm.reset();
});

function addOrderToTable(order) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${order.orderId}</td>
        <td>${order.customerName}</td>
        <td>${order.orderDate}</td>
        <td>${order.orderStatus}</td>
        <td>${order.totalAmount}</td>
        <td>
            <button class="edit-order">Sửa</button>
            <button class="delete-order">Xóa</button>
        </td>
    `;
    orderTableBody.appendChild(row);

    row.querySelector('.delete-order').addEventListener('click', function () {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const updatedOrders = orders.filter(o => o.orderId !== order.orderId);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        row.remove();
        updateOrderTable();
    });

    row.querySelector('.edit-order').addEventListener('click', function () {
        currentEditingOrderId = order.orderId;
        document.getElementById('orderId').value = order.orderId;
        document.getElementById('customerName').value = order.customerName;
        document.getElementById('orderDate').value = order.orderDate;
        document.getElementById('orderStatus').value = order.orderStatus;
        document.getElementById('totalAmount').value = order.totalAmount;
        orderModal.style.display = 'flex';
    });
}

// Tìm kiếm đơn hàng
function performSearch() {
    const searchInput = document.querySelector('#order_manager .top input[type="search"]');
    const searchTerm = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    const filteredOrders = orders.filter(order => {
        const matchesSearchTerm = order.customerName.toLowerCase().includes(searchTerm) || order.orderId.toLowerCase().includes(searchTerm);
        const matchesStatus = selectedStatus === 'all' || order.orderStatus === selectedStatus;
        return matchesSearchTerm && matchesStatus;
    });

    orderTableBody.innerHTML = '';
    filteredOrders.forEach(order => addOrderToTable(order));
}

document.querySelector('.search_order').addEventListener('click', function (e) {
    e.preventDefault();
    performSearch();
});

document.querySelector('#order_manager .top input[type="search"]').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
    }
});

statusFilter.addEventListener('change', performSearch);
window.addEventListener('load', loadOrdersFromLocalStorage);

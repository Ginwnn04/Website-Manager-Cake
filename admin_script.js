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
    avatar.style.visibility = avatar.style.visibility === 'hidden' ? 'visible' : 'hidden';
});

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
        searchButtonIcon.classList.replace(searchForm.classList.contains('show') ? 'bx-search-alt' : 'bx-x-circle', searchForm.classList.contains('show') ? 'bx-x-circle' : 'bx-search-alt');
    }
});

const Dashboard = document.querySelector('#dashboard');
const AccountManager = document.querySelector('#account_manager');
const OrderManager = document.querySelector('#order_manager');
const ProductSeseion=document.querySelector('.product-container');
const CategorySesseion=document.querySelector('.category-container');

Dashboard.style.display = 'block';
AccountManager.style.display = 'none';
OrderManager.style.display = 'none';
ProductSeseion.style.display = 'none';
CategorySesseion.style.display = 'none';

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
function showProductSection(event) {
  const selectedItem = event.currentTarget.id;
  if (selectedItem === 'product') {
    ProductSeseion.style.display='block';
  } else {
    ProductSeseion.style.display='none'; 
  }
}

function showCategorySession(event){
  const selectedItem = event.currentTarget.id;
  if(selectedItem==='category'){
    CategorySesseion.style.display='block';
  }else{
    CategorySesseion.style.display='none';
  }
}

allSideMenu.forEach(item => {
    item.addEventListener('click', showAccountManager);
    item.addEventListener('click', showDashboard);
    item.addEventListener('click', showOrderManager);
    item.addEventListener('click', showProductSection);
    item.addEventListener('click', showCategorySession);
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
        pageBtn.classList.toggle('current', i === currentPage);
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
            <button class="detail-order">Chi tiết</button>
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

    row.querySelector('.detail-order').addEventListener('click', function () {
        document.getElementById('detailOrderId').innerText = `Mã đơn: ${order.orderId}`;
        document.getElementById('detailCustomerName').innerText = `Khách hàng: ${order.customerName}`;
        document.getElementById('detailOrderDate').innerText = `Ngày đặt: ${order.orderDate}`;
        document.getElementById('detailOrderStatus').innerText = `Trạng thái: ${order.orderStatus}`;
        document.getElementById('detailTotalAmount').innerText = `Tổng tiền: ${order.totalAmount}`;
        document.getElementById('detailPhone').innerText = `Điện thoại: ${order.phone}`;
        document.getElementById('detailAddress').innerText = `Địa chỉ: ${order.address}`;
        
        // Hiển thị hình ảnh sản phẩm nếu có
        const productImage = document.getElementById('productImage');
        productImage.src = order.productImage || ''; // Giả định `order.productImage` chứa đường dẫn đến hình ảnh
        productImage.style.display = order.productImage ? 'block' : 'none'; // Hiển thị hoặc ẩn hình ảnh

        document.getElementById('orderDetailModal').style.display = 'flex';
    });
}


// Đóng modal chi tiết đơn hàng
document.getElementById('closeDetailModal').addEventListener('click', function () {
    document.getElementById('orderDetailModal').style.display = 'none';
});

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
// PRODUCT
const Product=document.querySelector('.product-container');
Product.style.display = 'none';
const Category=document.querySelector('.category-container');
Category.style.display = 'none';
document.querySelector('.jsFilter').addEventListener('click',function(){
  document.querySelector('.filter-menu').classList.toggle('active');
});
document.querySelector('.grid').addEventListener('click',function(){
  document.querySelector('.list').classList.remove('active');
  document.querySelector('.grid').classList.add('active');
  document.querySelector('.products-area-wrapper').classList.remove('tableView');
  document.querySelector('.products-area-wrapper').classList.add('gridView');
});
document.querySelector('.list').addEventListener('click',function(){
  document.querySelector('.list').classList.add('action');
  document.querySelector('.grid').classList.remove('action');
  document.querySelector('.products-area-wrapper').classList.remove('gridView');
  document.querySelector('.products-area-wrapper').classList.add('tableView');
});
function toggleAddProductForm(){
  const form=document.getElementById('addProductForm');
  form.style.display=form.style.display==='block' ? 'none':'block';
}
document.querySelector('.product-content-headerButton').addEventListener('click',toggleAddProductForm);

const TotalPages=document.querySelectorAll('.products-page').length;
function navigateToPage(action){
  if(action==='first')
    currentPage=1;
  else if(action === 'last')
    currentPage=TotalPages;
  else if(action === 'prev' && currentPage > 1)
    currentPage--;
  else if(action === 'next' && currentPage < TotalPages)
    currentPage++;
  else if(typeof(action) === 'number')  
    currentPage=action;
  updatePaginationDisplay();
}
function updatePaginationDisplay(){
  Array.from(document.querySelectorAll('.products-page')).forEach((page,index)=>{
    page.style.display= index === (currentPage-1) ? 'block' : 'none';
  });
  const PageButtons=document.querySelector('.page-numbers');
  PageButtons.innerHTML='';
  createButton(1,PageButtons);
  if(currentPage > 3){
    const ellipsis=document.createElement('span');
    ellipsis.textContent='...';
    PageButtons.appendChild(ellipsis);
  }
  const startPage=Math.max(2,currentPage-2);
  const endPage=Math.min(TotalPages-1,currentPage+2);
  for(let i=startPage;i<=endPage;i++)
    createButton(i,PageButtons);
  if(currentPage < TotalPages-2){
    const ellipsis=document.createElement('span');
    ellipsis.textContent='...';
    PageButtons.appendChild(ellipsis);
  }
  if(TotalPages>1)
    createButton(TotalPages,PageButtons);
  document.querySelector('.pagination button[onclick="navigateToPage(\'prev\')"]').disabled=currentPage===1;
  document.querySelector('.pagination button[onclick="navigateToPage(\'next\')"]').disabled=currentPage===TotalPages;
}
function createButton(PageNumber,container){
  const button=document.createElement('button');
  button.textContent=PageNumber;
  button.onclick= () => navigateToPage(PageNumber);
  button.classList.toggle('active',PageNumber === currentPage);
  container.appendChild(button);
}
updatePaginationDisplay();
// PRODUCT
//CATEGORY

function toggleCategoryForm() {
  const form = document.getElementById('categoryForm');
  form.style.display = form.style.display === 'block' ? 'none' : 'block';
}
function resetForm() {
  document.getElementById('categoryName').value = '';
  document.getElementById('description').value = '';
}
function submitCategory() {
  const categoryName = document.getElementById('categoryName').value;
  const description = document.getElementById('description').value;
  
  if (categoryName.trim()) {
      console.log('Tên Loại:', categoryName);
      console.log('Mô Tả:', description);
      resetForm();
      toggleCategoryForm();
  } else {
      alert('Vui lòng nhập tên loại!');
  }
}

function cancelCategory() {
  resetForm(); 
  toggleCategoryForm(); 
}
function toggleAddCategoryForm(){
  const form=document.getElementById('addCategoryForm');
  form.style.display=form.style.display==='block' ? 'none':'block';
}
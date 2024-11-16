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
        showAccount();
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
// Biểu đồ
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Tháng', 'Đơn Hàng'],
    ['Tháng 8',  321],
    ['Tháng 9',  823],
    ['Tháng 10',  432],
    ['Tháng 11',  823]
  ]);

  var options = {
    title: 'Thống Kê Bán Hàng',
    hAxis: {title: 'Tháng',  titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}


// Ẩn/hiện phần thêm account
function showForm() {
  const form = document.getElementById('add_account');
  document.getElementById('save_account').style.display='inline-block';
  document.getElementById('reset_account').style.display='inline-block';
  document.getElementById('update_account').style.display='none';
  form.style.display ='flex';
}
function hideForm() {
  const form = document.getElementById('add_account');
  form.style.display ='none';
  clearForm();
}
function clearForm(){
  document.getElementById('name').value = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('address').value = '';
  document.getElementById('role').value = 'all';
}
// phần thêm account
// Thêm sự kiện keydown để kiểm tra các trường nhập liệu
document.getElementById('add_account_form').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Ngăn hành động mặc định của Enter

    // Lấy giá trị từ các trường nhập liệu
    let name = document.getElementById('name').value.trim();
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let address = document.getElementById('address').value.trim();
    let role = document.getElementById('role').value.trim();

    // Kiểm tra từng trường và focus vào trường đầu tiên bị thiếu
    if (!name) {
      document.getElementById('name').focus();
    } else if (!username) {
      document.getElementById('username').focus();
    } else if (!password) {
      document.getElementById('password').focus();
    } else if (!phone) {
      document.getElementById('phone').focus();
    } else if (!address) {
      document.getElementById('address').focus();
    } else if (!role) {
      document.getElementById('role').focus();
    } else {
      // Nếu tất cả các trường đều có dữ liệu, gọi hàm addNewAccount
      addNewAccount();
    }
  }
});

// Hàm thêm tài khoản
function addNewAccount() {
  // Lấy giá trị từ các trường nhập liệu
  let name = document.getElementById('name').value.trim();
  let username = document.getElementById('username').value.trim();
  let password = document.getElementById('password').value.trim();
  let phone = document.getElementById('phone').value.trim();
  let address = document.getElementById('address').value.trim();
  let role = document.getElementById('role').value.trim();

  // Kiểm tra các trường bắt buộc
  if (!name || !username || !password || !phone || !address || !role) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  // Lấy danh sách tài khoản từ localStorage
  let listAccount = localStorage.getItem("list_account") ? JSON.parse(localStorage.getItem("list_account")) : [];

  // Thêm tài khoản mới vào danh sách
  listAccount.push({
    name: name,
    username: username,
    password: password,
    phone: phone,
    address: address,
    role: role
  });

  // Lưu danh sách tài khoản cập nhật vào localStorage
  localStorage.setItem("list_account", JSON.stringify(listAccount));

  // Đặt lại giá trị các ô nhập liệu về trống
  clearForm();

  // Ẩn form và thông báo thành công
  hideForm();
  alert('Tài khoản đã thêm thành công');

  // Hiển thị danh sách tài khoản
  showAccount();
}


function addNewAccount() {
  // Lấy giá trị từ các trường nhập liệu
  let name = document.getElementById('name').value.trim();
  let username = document.getElementById('username').value.trim();
  let password = document.getElementById('password').value.trim();
  let phone = document.getElementById('phone').value.trim();
  let address = document.getElementById('address').value.trim();
  let role = document.getElementById('role').value.trim();

  // Kiểm tra các trường bắt buộc
  if (!name || !username || !password || !phone || !address || !role) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  // Lấy danh sách tài khoản từ localStorage
  let listAccount = localStorage.getItem("list_account") ? JSON.parse(localStorage.getItem("list_account")) : [];

  // Thêm tài khoản mới vào danh sách
  listAccount.push({
    name: name,
    username: username,
    password: password,
    phone: phone,
    address: address,
    role: role
  });

  // Lưu danh sách tài khoản cập nhật vào localStorage
  localStorage.setItem("list_account", JSON.stringify(listAccount));

  // Đặt lại giá trị các ô nhập liệu về trống
  clearForm()

  // Ẩn form và thông báo thành công
  hideForm();
  alert('Tài khoản đã thêm thành công');

  // Hiển thị danh sách tài khoản
  showAccount(listAccount);
}

function showAccount() {
  let listAccount = localStorage.getItem("list_account") ? JSON.parse(localStorage.getItem("list_account")) : [];
  let account = `<tr>
      <th>Tên</th>
      <th>Tài Khoản</th>
      <th>Mật khẩu</th>
      <th>Số điện thoại</th>
      <th>Role</th>
      <th>Setting</th>
    </tr>`;

  listAccount.map((value, index) => {
    account += `<tr>
        <td>${value.name}</td>
        <td>${value.username}</td>
        <td>${value.password}</td>
        <td>${value.phone}</td>
        <td>${value.role}</td>
        <td>
          <button class="edit_account" onclick=" editAccount(${index}) " >Sửa</button>
          <button class="block_account">Khóa</button>
          <button class="detail_account " onclick="showDetailAccount(${index})">Chi tiết</button>
        </td>
      </tr>`;
  });

  document.getElementById("accountTable").innerHTML = account;
  
  
}



function editAccount (index){
  let listAccount = localStorage.getItem("list_account") ? JSON.parse(localStorage.getItem("list_account")) : [];
  document.getElementById('name').value=listAccount[index].name;
  document.getElementById('username').value=listAccount[index].username;
  document.getElementById('password').value=listAccount[index].password;
  document.getElementById('phone').value=listAccount[index].phone;
  document.getElementById('address').value=listAccount[index].address;
  document.getElementById('role').value=listAccount[index].role;
  document.getElementById('index').value=index;
  showForm();
  document.getElementById('save_account').style.display='none';
  document.getElementById('reset_account').style.display='none';
  document.getElementById('update_account').style.display='inline-block';
  

}

function changeAccount (){
  let listAccount = localStorage.getItem("list_account") ? JSON.parse(localStorage.getItem("list_account")) : [];
  let index = document.getElementById('index').value;
  listAccount[index]={
    name:document.getElementById('name').value,
    username:document.getElementById('username').value,
    password:document.getElementById('password').value,
    phone:document.getElementById('phone').value,
    address:document.getElementById('address').value,
    role:document.getElementById('role').value
  }
  localStorage.setItem("list_account", JSON.stringify(listAccount));
  hideForm();
  showAccount();
}

const formAcc = document.getElementById('add_account');

formAcc.addEventListener('submit', function(event) {
  event.preventDefault(); // Ngăn hành động mặc định của form

  // Kiểm tra nếu đang ở chế độ cập nhật
  const isUpdating = document.getElementById('update_account').style.display === 'inline-block';
  if (isUpdating) {
    changeAccount(); // Gọi hàm cập nhật tài khoản
  } else {
    addNewAccount(); // Gọi hàm thêm tài khoản
  }
});







function showDetailAccount(index) {
  // Lấy danh sách tài khoản từ localStorage
  let listAccount = localStorage.getItem("list_account") ? JSON.parse(localStorage.getItem("list_account")) : [];

  // Kiểm tra xem tài khoản có tồn tại không
  if (listAccount[index]) {
    // Lấy thông tin tài khoản
    const account = listAccount[index];

    // Gán giá trị vào các phần tử <p>
    document.getElementById("detail_name").innerHTML = "Tên: " + account.name;
    document.getElementById("detail_username").innerHTML = "Tài Khoản: " + account.username;
    document.getElementById("detail_password").innerHTML = "Mật khẩu: " + account.password;
    document.getElementById("detail_phone").innerHTML = "Số điện thoại: " + account.phone;
    document.getElementById("detail_address").innerHTML = "Địa chỉ: " + account.address;
    document.getElementById("detail_role").innerHTML = "Role: " + account.role;

    // Hiển thị phần chi tiết tài khoản
    document.getElementById("detail_account").style.display = "flex";
  } else {
    alert("Không tìm thấy tài khoản.");
  }
}

function hideDetailAccount(){
  document.getElementById("detail_account").style.display = "none";
}


function searchAccount(){
  let valueSearchInput = document.getElementById('search_account').value;
  let listAccount = localStorage.getItem("list_account") ? JSON.parse(localStorage.getItem("list_account")) : [];
  let accountSearch = listAccount.filter(value=> {
    return value.name.toLowerCase().includes(valueSearchInput.toLowerCase())
  })
  document.getElementById("accountTable").innerHTML = "";
  showAccountSearch(accountSearch);
}
function showAccountSearch(array) {
  let account = `<tr>
      <th>Tên</th>
      <th>Tài Khoản</th>
      <th>Mật khẩu</th>
      <th>Số điện thoại</th>
      <th>Role</th>
      <th>Setting</th>
    </tr>`;

  array.map((value, index) => {
    account += `<tr>
        <td>${value.name}</td>
        <td>${value.username}</td>
        <td>${value.password}</td>
        <td>${value.phone}</td>
        <td>${value.role}</td>
        <td>
          <button class="edit_account" onclick=" editAccount(${index}) " >Sửa</button>
          <button class="block_account">Khóa</button>
          <button class="detail_account " onclick="showDetailAccount(${index})">Chi tiết</button>
        </td>
      </tr>`;
  });

  document.getElementById("accountTable").innerHTML = account;
}



document.getElementById('search_account_btn').addEventListener('click', () => {
  const searchButtonIcon = document.getElementById('search_account_btn').querySelector('.bx');
  const searchInput = document.getElementById('search_account');
  
  if (searchButtonIcon.classList.contains('bx-x')) {
      // Nếu là dấu 'x', reset tìm kiếm và hiển thị lại toàn bộ danh sách
      searchInput.value = '';
      searchAccount();
  } else {
      // Nếu là kính lúp, thực hiện tìm kiếm
      searchAccount();
  }
});

// Lắng nghe sự kiện nhập liệu để tự động chuyển đổi biểu tượng
document.getElementById('search_account').addEventListener('input', () => {
  const searchButtonIcon = document.getElementById('search_account_btn').querySelector('.bx');
  const searchInput = document.getElementById('search_account');
  
  if (searchInput.value.trim().length > 0) {
      searchButtonIcon.classList.replace('bx-search-alt-2', 'bx-x');
  } else {
      searchButtonIcon.classList.replace('bx-x', 'bx-search-alt-2');
  }
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
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
document.getElementById('accountForm').addEventListener('keydown', function(event) {
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



// ---------------------- Quản lý đơn hàng và phân trang -----------------------------
// Biến toàn cục để quản lý phân trang
const ITEMS_PER_PAGE = 8;  // Số đơn hàng hiển thị mỗi trang
let currentPage = 1;  // Trang hiện tại

// Hiển thị danh sách đơn hàng với phân trang
function displayOrders() {
  const orderList = document.getElementById("orderList");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const searchQuery = document.getElementById("orderSearchInput").value.toLowerCase();
  const filterStatus = document.getElementById("statusFilter").value;
  let startDate = document.getElementById("startDate").value; // Ngày bắt đầu
  let endDate = document.getElementById("endDate").value; // Ngày kết thúc

  // Kiểm tra nếu endDate nhỏ hơn startDate, yêu cầu người dùng sửa
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      alert("Ngày kết thúc không thể nhỏ hơn ngày bắt đầu. Vui lòng chọn lại ngày kết thúc hợp lệ.");
      document.getElementById("endDate").value = ''; // Reset trường ngày kết thúc
      return; // Dừng lại không lọc theo ngày nếu ngày kết thúc không hợp lệ
  }

  const selectedDistrict = document.getElementById("district").value;

  // Lọc danh sách đơn hàng dựa trên quận, trạng thái, từ khóa tìm kiếm, và khoảng thời gian
  const filteredOrders = orders.filter(order => {
    const matchesSearchQuery = order.orderId.toLowerCase().includes(searchQuery) ||
                               order.user.fullName.toLowerCase().includes(searchQuery) ||
                               order.status.toLowerCase().includes(searchQuery);
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    
    // Kiểm tra khớp quận
    const matchesDistrict = selectedDistrict === "" || order.user.district === selectedDistrict;  

    const orderDate = new Date(order.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesDateRange = (!start || orderDate >= start) && (!end || orderDate <= end);

    return matchesSearchQuery && matchesStatus && matchesDateRange && matchesDistrict;
  });




  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  // Lấy các đơn hàng của trang hiện tại
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Hiển thị đơn hàng
  orderList.innerHTML = '';
  currentOrders.forEach(order => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${order.orderId}</td>
          <td>${order.user.fullName}</td>
          <td>${order.user.phone}</td>
          <td>${order.date}</td>
          <td>${order.user.district}</td>
          <td>${order.totalPrice}</td>
          <td>
              <select onchange="updateOrderStatus('${order.orderId}', this.value)">
                  <option value="Chưa xử lý" ${order.status === "Chưa xử lý" ? 'selected' : ''}>Chưa xử lý</option>
                  <option value="Đã xác nhận" ${order.status === "Đã xác nhận" ? 'selected' : ''}>Đã xác nhận</option>
                  <option value="Đã giao thành công" ${order.status === "Đã giao thành công" ? 'selected' : ''}>Đã giao thành công</option>
                  <option value="Đã hủy" ${order.status === "Đã hủy" ? 'selected' : ''}>Đã hủy</option>
              </select>
          </td>
          <td class="actions">
              <button onclick="deleteOrder('${order.orderId}')">Xóa</button>
              <button onclick="viewOrderDetails('${order.orderId}')">Chi tiết</button>
          </td>
      `;
      orderList.appendChild(row);
  });

  // Hiển thị nút phân trang
  displayPagination(totalPages);
}

document.getElementById("resetFilters").addEventListener("click", function() {
  // Đặt lại giá trị của các bộ lọc về mặc định
  document.getElementById("province").value = "";
  document.getElementById("district").value = "";
  document.getElementById("orderSearchInput").value = "";
  document.getElementById("statusFilter").value = "all";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";

  // Hiển thị lại toàn bộ danh sách đơn hàng
  displayOrders();
});


// Lắng nghe thay đổi ngày bắt đầu hoặc ngày kết thúc
document.getElementById("startDate").addEventListener("change", function() {
  displayOrders(); // Cập nhật lại danh sách khi thay đổi ngày bắt đầu
});

document.getElementById("endDate").addEventListener("change", function() {
  displayOrders(); // Cập nhật lại danh sách khi thay đổi ngày kết thúc
});

let listProvince = [];
let listDistrict = [];
let listWard = [];
window.onload = getDataProvince();
async function getDataProvince() {
  const url = "https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/province";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    listProvince = [...data];
    renderProvince(); // Gọi hàm renderProvince ngay sau khi có dữ liệu
  } catch (error) {
    console.error(error.message);
  }
}


async function getDataDistrict(idProvince) {
  const url = "https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/district?idProvince=" + idProvince;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
      const data = await response.json();
      listDistrict = [...data];
      renderDistrict();        
  } catch (error) {
    console.error(error.message);
  }
}


function renderProvince() {
  const selectProvince = document.getElementById("province");
  txtInner = `<option value="" disabled selected>Chọn tỉnh/thành phố</option>`;
  listProvince.forEach(province => {
    
      txtInner += `<option value="${province.idProvince}">${province.name}</option>`;
  });
  selectProvince.innerHTML = txtInner;
}
function renderDistrict() {
  const selectDistrict = document.getElementById("district");
  txtInner = `<option value="" disabled selected>Chọn quận/huyện</option>`;
  listDistrict.forEach(district => {
    
      txtInner += `<option value="${district.name}">${district.name}</option>`;
  });
  selectDistrict.innerHTML = txtInner;
}


const cbxProvince = document.getElementById("province");
cbxProvince.addEventListener("change", () => {
    const idProvince = cbxProvince.value;
    getDataDistrict(idProvince); // Gọi hàm lấy quận/huyện theo idProvince
    
});

const cbxDistrict = document.getElementById("district");
cbxDistrict.addEventListener("change", () => {
    
    displayOrders();
});


// Hiển thị các nút phân trang
function displayPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = '';  // Xóa các nút phân trang cũ

  // Tạo các nút phân trang
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('page-btn');
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.onclick = () => changePage(i);
    pagination.appendChild(pageButton);
  }
}

// Chuyển trang
function changePage(pageNumber) {
  currentPage = pageNumber;
  displayOrders();
}

// Cập nhật tình trạng đơn hàng
function updateOrderStatus(orderId, status) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const order = orders.find(order => order.orderId === orderId);
  if (order) {
      order.status = status;
      localStorage.setItem('orders', JSON.stringify(orders));
      displayOrders(); // Cập nhật lại danh sách khi trạng thái thay đổi
  }
}

// Xóa đơn hàng
function deleteOrder(orderId) {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders = orders.filter(order => order.orderId !== orderId);
  localStorage.setItem('orders', JSON.stringify(orders));
  alert("Đơn hàng đã bị xóa!");
  displayOrders(); // Cập nhật danh sách sau khi xóa
}

// Hiển thị chi tiết đơn hàng
function viewOrderDetails(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(order => order.orderId === orderId);
  
  if (order) {
    const orderDetailContent = document.getElementById("orderDetailContent");
    let productDetails = order.items.map(item => `
        <div class="product-item">
            <img src="${item.image}" alt="${item.name}">
        </div>
    `).join('');  

    orderDetailContent.innerHTML = `
      <button onclick="closeModal('orderDetailModal')" class="closeDetail">Đóng</button>
      <h2>Chi tiết đơn hàng</h2>
      <p><strong>Mã đơn:</strong> ${order.orderId}</p>
      <p><strong>Khách hàng:</strong> ${order.user.fullName}</p>
      <p><strong>Số điện thoại:</strong> ${order.user.phone}</p>
      <p><strong>Địa chỉ:</strong> ${order.user.address}</p>
      <p><strong>Quận/Huyện:</strong>${order.user.district}</p>
      <p><strong>Phường/Xã:</strong>${order.user.ward}</p>
      <p><strong>Tỉnh/Thành:</strong>${order.user.province}</p>
      <p><strong>Sản phẩm:</strong></p>
      <div class="product-item-detail">
        ${productDetails}
      </div>
      <p><strong>Tổng tiền:</strong> ${order.totalPrice} VND</p>
      <p><strong>Tình trạng:</strong> ${order.status}</p>
    `;
    
    // Mở modal
    document.getElementById("orderDetailModal").style.display = "flex";
  }
}

// Đóng modal xem chi tiết
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

const filterOrder = document.querySelector('.filter-order');
const dropdownFilter = filterOrder.querySelector('.dropdown-filter');
const filterIcon = filterOrder.querySelector('.filter-order .bx-filter-alt');

// Thêm sự kiện khi click vào icon filter
filterIcon.addEventListener('click', function (event) {
    event.stopPropagation(); // Ngăn sự kiện lan ra ngoài
    filterOrder.classList.toggle('active'); // Bật/tắt dropdown
});

// Sự kiện để giữ dropdown khi click bên trong dropdown
dropdownFilter.addEventListener('click', function (event) {
    event.stopPropagation(); // Ngăn sự kiện lan ra ngoài
});

// Ẩn dropdown khi click bên ngoài
document.addEventListener('click', function (event) {
    if (!filterOrder.contains(event.target)) {
        filterOrder.classList.remove('active'); // Đóng dropdown nếu click ngoài
    }
});


// Xử lý sự kiện khi người dùng gõ vào ô tìm kiếm hoặc nhấn Enter
document.getElementById("orderSearchInput").addEventListener("input", function() {
  displayOrders();  // Cập nhật lại danh sách khi người dùng thay đổi ô tìm kiếm
});

document.getElementById("orderSearchInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    displayOrders();  // Cập nhật lại danh sách khi người dùng nhấn Enter
  }
});

// Xử lý sự kiện khi người dùng chọn trạng thái từ bộ lọc
document.getElementById("statusFilter").addEventListener("change", function() {
  displayOrders(); // Cập nhật lại danh sách khi người dùng thay đổi trạng thái lọc
});

// Khi trang tải lần đầu
window.onload = function() {
  displayOrders();  // Hiển thị danh sách đơn hàng ngay khi tải trang
};




// --------------------------Quản lý đơn hàng ---------------------------------------------




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
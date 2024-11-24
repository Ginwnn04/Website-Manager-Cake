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
const avatar = document.querySelector('#sidebar #profile-pic');
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
// Lấy các phần tử liên quan
const settingsMenu = document.getElementById('setting'); // Menu "Cài đặt"
const settingsContainer = document.getElementById('settings-container'); // Phần nội dung "Cài đặt"

Dashboard.style.display = 'block';
AccountManager.style.display = 'none';
OrderManager.style.display = 'none';
ProductSeseion.style.display = 'none';
CategorySesseion.style.display = 'none';
settingsContainer.style.display = 'none';

function showDashboard(event) {
    const selectedItem = event.currentTarget.id;
    if (selectedItem === 'dashboard_show') {
        Dashboard.style.display = 'block';
        settingsContainer.style.display = 'none';
    } else {
        Dashboard.style.display = 'none';
        
    }
}

function showAccountManager(event) {
    const selectedItem = event.currentTarget.id;
    if (selectedItem === 'account') {
        AccountManager.style.display = 'block';
        settingsContainer.style.display = 'none';
        showAccount();
    } else {
        AccountManager.style.display = 'none';
    }
}

function showOrderManager(event) {
    const selectedItem = event.currentTarget.id;
    if (selectedItem === 'order') {
        OrderManager.style.display = 'block';
        settingsContainer.style.display = 'none';
    } else {
        OrderManager.style.display = 'none';
    }
}
function showProductSection(event) {
  const selectedItem = event.currentTarget.id;
  if (selectedItem === 'product') {
    ProductSeseion.style.display='block';
    settingsContainer.style.display = 'none';
  } else {
    ProductSeseion.style.display='none'; 
  }
}

function showCategorySession(event){
  const selectedItem = event.currentTarget.id;
  if(selectedItem==='category'){
    CategorySesseion.style.display='block';
    settingsContainer.style.display = 'none';
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




// Ẩn các phần khác
const sections = [Dashboard, AccountManager, OrderManager, ProductSeseion, CategorySesseion, settingsContainer];

// Thêm sự kiện click vào menu "Cài đặt"
settingsMenu.addEventListener('click', function (event) {
    event.preventDefault(); // Ngăn hành động mặc định nếu có
    // Ẩn tất cả các phần
    sections.forEach(section => {
        section.style.display = 'none';
    });
    // Hiển thị phần "Cài đặt"
    settingsContainer.style.display = 'block';
    allSideMenu.forEach(menu => {
      menu.parentElement.classList.remove('active');
    });

});








google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawResponsiveChart);

let chart; // Biến lưu biểu đồ

function drawResponsiveChart() {
    const container = document.getElementById('chart_div');
    const width = container.offsetWidth; // Lấy chiều rộng thực tế của thẻ `div`
    const height = container.offsetHeight; // Lấy chiều cao thực tế của thẻ `div`

    // Dữ liệu biểu đồ
    const data = google.visualization.arrayToDataTable([
        ['Tháng', 'Đơn Hàng'],
        ['Tháng 8', 321],
        ['Tháng 9', 823],
        ['Tháng 10', 432],
        ['Tháng 11', 823]
    ]);

    // Tùy chọn biểu đồ
    const options = {
        title: 'Thống Kê Bán Hàng',
        hAxis: { title: 'Tháng', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
        width: width,  // Sử dụng chiều rộng từ CSS
        height: height // Sử dụng chiều cao từ CSS
    };

    // Vẽ biểu đồ
    chart = new google.visualization.AreaChart(container);
    chart.draw(data, options);
}

// Sự kiện khi kích thước trình duyệt thay đổi
window.addEventListener('resize', drawResponsiveChart);

// Theo dõi thay đổi kích thước của thẻ `div` bằng ResizeObserver
const resizeObserver = new ResizeObserver(() => {
    drawResponsiveChart();
});
resizeObserver.observe(document.getElementById('chart_div'));



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
  document.getElementById('id').value = '';
  document.getElementById('name').value = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('address').value = '';
  document.getElementById('role').value = 'all';
}
document.getElementById('accountForm').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault(); // Ngăn hành động mặc định của Enter

      // Kiểm tra nếu đang ở chế độ cập nhật
      const isUpdating = document.getElementById('update_account').style.display === 'inline-block';

      if (isUpdating) {
          // Gọi hàm cập nhật tài khoản
          changeAccount();
      } else {
          // Gọi hàm thêm tài khoản mới
          let id = document.getElementById('id').value.trim();
          let name = document.getElementById('name').value.trim();
          let username = document.getElementById('username').value.trim();
          let password = document.getElementById('password').value.trim();
          let phone = document.getElementById('phone').value.trim();
          let address = document.getElementById('address').value.trim();
          let role = document.getElementById('role').value.trim();

          // Kiểm tra từng trường và focus vào trường đầu tiên bị thiếu
          if (!id) {
            document.getElementById('id').focus();
          } else
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
              addNewAccount();
          }
      }
  }
});




function addNewAccount() {
  // Lấy giá trị từ các trường nhập liệu
  let id = document.getElementById('id').value.trim();
  let name = document.getElementById('name').value.trim();
  let username = document.getElementById('username').value.trim();
  let password = document.getElementById('password').value.trim();
  let phone = document.getElementById('phone').value.trim();
  let address = document.getElementById('address').value.trim();
  let role = document.getElementById('role').value.trim();

  // Kiểm tra các trường bắt buộc
  if (!id || !name || !username || !password || !phone || !address || !role) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  // Lấy danh sách tài khoản từ localStorage
  let listAccount = localStorage.getItem("list_account") ? JSON.parse(localStorage.getItem("list_account")) : [];

  // Thêm tài khoản mới vào danh sách
  listAccount.push({
    id:id,
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
      <th>ID</th>
      <th>Tên</th>
      <th>Tài Khoản</th>
      <th>Mật khẩu</th>
      <th>Số điện thoại</th>
      <th>Role</th>
      <th>Setting</th>
    </tr>`;

  listAccount.map((value, index) => {
    account += `<tr>
        <td>${value.id}</td>
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
  document.getElementById('id').value=listAccount[index].id;
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
    id:document.getElementById('id').value,
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
    document.getElementById("detail_id").innerHTML = "ID: " + account.id;
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


function searchAccount() {
  let valueSearchInput = document.getElementById('search_account').value;
  let listAccount = localStorage.getItem("list_account") ? JSON.parse(localStorage.getItem("list_account")) : [];

  let accountSearch = listAccount.filter(value => {
    return (
      value.name.toLowerCase().includes(valueSearchInput.toLowerCase()) || 
      value.username.toLowerCase().includes(valueSearchInput.toLowerCase()) ||
      (value.id && value.id.toLowerCase().includes(valueSearchInput.toLowerCase())) // Tìm theo ID
    );
  });

  document.getElementById("accountTable").innerHTML = "";
  showAccountSearch(accountSearch);
}

function showAccountSearch(array) {
  let account = `<tr>
      <th>ID</th>
      <th>Tên</th>
      <th>Tài Khoản</th>
      <th>Mật khẩu</th>
      <th>Số điện thoại</th>
      <th>Role</th>
      <th>Setting</th>
    </tr>`;

  array.map((value, index) => {
    account += `<tr>
        <td>${value.id}</td>
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









// --------------------SETTING-------------------------------------------------
const avatarInput = document.getElementById('avatar_input');
const profilePic = document.getElementById('profile-pic');
const profilePic2 = document.getElementById('avatar-item');

// Khi người dùng chọn file
avatarInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Lấy file từ input
    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            alert('Vui lòng chọn tệp hình ảnh hợp lệ (JPEG, PNG, JPG).');
            return;
        }

        // Đọc file bằng FileReader
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result; // Chuỗi base64 của hình ảnh
            profilePic.src = imageData; // Hiển thị ảnh
            profilePic2.src = imageData;
            localStorage.setItem('profilePicture', imageData); // Lưu vào localStorage
        };
        reader.readAsDataURL(file); // Đọc file dưới dạng URL base64
    }
});

// Khi tải lại trang, kiểm tra hình ảnh đã lưu trong localStorage
window.addEventListener('load', function() {
    const savedImage = localStorage.getItem('profilePicture'); // Lấy dữ liệu từ localStorage
    if (savedImage) {
        profilePic.src = savedImage; // Hiển thị ảnh nếu có
        profilePic2.src = savedImage;
    }
});




const nameInput = document.getElementById('name_input'); // Ô input nhập tên
const nameDisplay2 = document.querySelector('.name-item');  // Thẻ hiển thị tên
const changeNameDiv = document.getElementById('change_name'); // Div thay đổi tên

// Khi nhấn vào "Thay đổi tên"
changeNameDiv.addEventListener('click', function() {
    nameInput.focus(); // Đặt con trỏ vào ô input
});

// Khi người dùng nhập tên
nameInput.addEventListener('change', function() {
    const newName = nameInput.value.trim(); // Lấy tên mới từ input
    if (newName) {
        // Cập nhật hiển thị
        nameDisplay2.textContent = newName;

        // Lưu vào localStorage
        localStorage.setItem('adminName', newName);

        // Xóa nội dung input sau khi lưu
        nameInput.value = '';
    }
});

// Khi tải lại trang, kiểm tra localStorage
window.addEventListener('load', function() {
    const savedName = localStorage.getItem('adminName'); // Lấy tên từ localStorage
    if (savedName) { // Hiển thị tên đã lưu
        nameDisplay2.textContent = savedName;
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




//--------------------------Product and Category-------------------------------------------

document.querySelector('.jsFilter').addEventListener('click', function () {
  document.querySelector('.filter-menu').classList.toggle('active');
});

function InitProductView(){
  const tabltViewButton=document.querySelector('.list');
  const gridViewButton=document.querySelector('.grid');
  const ProductView=document.querySelector('.products-area-wrapper');
  tabltViewButton.classList.add('active');
  gridViewButton.classList.remove('active');
  ProductView.classList.add('tableView');
  ProductView.classList.remove('gridView');
}
InitProductView();
function toggleView(viewType){
  const tabltViewButton=document.querySelector('.list');
  const gridViewButton=document.querySelector('.grid');
  const ProductView=document.querySelector('.products-area-wrapper');
  if(viewType==='table'){
    tabltViewButton.classList.add('active');
    gridViewButton.classList.remove('active');
    ProductView.classList.add('tableView');
    ProductView.classList.remove('gridView');
  }else if(viewType==='grid'){
    tabltViewButton.classList.remove('active');
    gridViewButton.classList.add('active');
    ProductView.classList.remove('tableView');
    ProductView.classList.add('gridView');
  }
}
document.querySelector('.list').addEventListener('click', () => toggleView('table'));
document.querySelector('.grid').addEventListener('click', () => toggleView('grid'));

function randomId(existingId) {
  const now=new Date();
  const time=`${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getFullYear()).slice(-2)}${String(now.getHours()).padStart(2,'0')}`;
  let id;
  let fullid;
  do {
    id = Math.random().toString(36).substring(2, 6).toUpperCase();
    fullid = id+time;
  } while (existingId.includes(fullid));
  return fullid;
}
document.querySelector('.product-content-headerButton').addEventListener('click', toggleAddProductForm);
//PRODUCT
function toggleAddProductForm() {
  formP.style.display = formP.style.display === 'block' ? 'none' : 'block';
}
function resetFormP() {
  document.getElementById('productName').value='';
  document.getElementById('productCategory').value='';
  document.getElementsByName('Status').value='';
  document.getElementById('productDescription').value='';
  document.getElementById('productStock').value='';
  document.getElementById('productPrice').value='';
  const productImageInput = document.getElementById('productImage');
  if (productImageInput) {
    productImageInput.value = '';
  }
  preview.style.display='none';
}
function cancelProduct() {
  resetFormP();
  formP.style.display='none';
  editProductIndex=null;
}
document.getElementById('cancelProduct').addEventListener('click',cancelProduct);

const ImageP = document.getElementById('productImageP');
const formP = document.getElementById('addProductForm');
const preview = document.getElementById('productPreviewImage');
const default_image = "./assets/img/banhkem.jpg"; // Ảnh mặc định
function convertDefaultImageToBase64(imagePath, callback) {
  fetch(imagePath).then((response) => {
      if (!response.ok) {
        throw new Error(`Không thể tải ảnh từ ${imagePath}`);
      }
      return response.blob();
    }).then((blob) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result); // Chuỗi Base64 trả về thông qua callback
      };
      reader.readAsDataURL(blob);
    })
    .catch((error) => {
      console.error("Lỗi chuyển ảnh thành Base64:", error);
    });
}
// convertDefaultImageToBase64(default_image, (base64String) => {
//   default_image = base64String; 
// });
const productPage = document.querySelector('.products-page');
const categoryOption = document.getElementById('productCategory');
const categoryOptionFilter = document.getElementById('productCategoryFilter');
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let editProductIndex = null; 
// Hiển thị danh sách category
function updateCategoryOptions() {
    categoryOption.innerHTML = '<option value="">Chọn loại sản phẩm</option>'; // Thêm tuỳ chọn mặc định
    if (!categories.length) {
        alert('Danh sách loại sản phẩm trống! Vui lòng thêm loại sản phẩm trước.');
        return;
    }
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryOption.appendChild(option);
    });
}
function updateCategoryOptionsFilter() {
    categoryOptionFilter.innerHTML = '<option value="">Chọn loại sản phẩm</option>'; // Thêm tuỳ chọn mặc định
    if (!categories.length) {
        alert('Danh sách loại sản phẩm trống! Vui lòng thêm loại sản phẩm trước.');
        return;
    }
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryOptionFilter.appendChild(option);
    });
}

// Hiển thị preview ảnh khi người dùng chọn ảnh mới
ImageP.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = default_image; 
        preview.style.display = 'block'; 
    }
});

// Xử lý submit form
formP.addEventListener('submit', function (event) {
  event.preventDefault();
  const ProductName = document.getElementById('productName').value.trim();
  const ProductCategory = document.getElementById('productCategory').value;
  const selectedCategory = categories.find(category => category.id === ProductCategory);
  if (!selectedCategory) {
    alert("Loại sản phẩm không hợp lệ!");
    return;
  }
  //const ProductStatus = document.getElementById('Status').value.trim();
  const ProductStatus = document.querySelector('input[name="status"]:checked')?.value;
  if (!ProductStatus) {
    alert("Vui lòng chọn trạng thái!");
    return;
  }
  const ProductDescription = document.getElementById('productDescription').value.trim();
  const ProductStock = document.getElementById('productStock').value.trim();
  const ProductPrice = document.getElementById('productPrice').value.trim();
  if (!ProductName) {
    alert("Tên sản phẩm không được để trống!");
    document.getElementById('productName').focus();
    return;
  }
  if (!ProductStock || isNaN(ProductStock)) {
    alert("Số lượng sản phẩm không hợp lệ!");
    document.getElementById('productStock').focus();
    return;
  }
  if (!ProductPrice || isNaN(ProductPrice)) {
    alert("Giá sản phẩm không hợp lệ!");
    document.getElementById('productPrice').focus();
    return;
  }

  let productData = {
    name: ProductName,
    id: editProductIndex !== null ? products[editProductIndex].id : randomId(products.map(prod => prod.id)),
    category: selectedCategory.name,
    status: ProductStatus,
    description: ProductDescription,
    stock: ProductStock,
    price: ProductPrice,
    image: default_image 
  };
  // Nếu có ảnh mới, thay thế ảnh mặc định
  if (ImageP.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      productData.image = e.target.result; 
      saveProduct(productData);
    };
    reader.readAsDataURL(ImageP.files[0]);
  } else {
    saveProduct(productData); 
  }

  formP.reset();
  formP.style.display='none';
  preview.style.display = 'none';
  displayProducts();
});

// Lưu sản phẩm
function saveProduct(productData) {
  if (editProductIndex !== null) {
    products[editProductIndex] = productData;
    alert("Sản phẩm đã được cập nhật!");
    editProductIndex = null;
  } else {
    products.unshift(productData);
    alert("Sản phẩm đã được thêm!");
  }
  localStorage.setItem('products', JSON.stringify(products));
  cancelProduct();
}
window.addEventListener('load', updateCategoryOptions);
window.addEventListener('load', updateCategoryOptionsFilter);

function deleteP(index) {
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();
}

function confirmDelete(index) {
  if (confirm("Bạn có chắc muốn xoá sản phẩm này không?")) deleteP(index);
}

function editP(index) {
  editProductIndex = index;
  const product = products[index];
  formP.style.display = 'block';
  document.getElementById('productName').value = product.name;
  document.getElementById('productCategory').value = categories.find(cat => cat.name === product.category)?.id || '';
  document.getElementsByName('Status').value = product.status;
  document.getElementById('productDescription').value = product.description;
  document.getElementById('productStock').value = product.stock;
  document.getElementById('productPrice').value = product.price;
  // Hiển thị ảnh nếu có
  if (product.image && product.image !== default_image) {
    preview.src = product.image;
    preview.style.display = 'block';
  } else {
    preview.src=default_image;
    preview.style.display = 'none';
  }
}

let currentPageP = 1;
const maxIndex = 12;

function displayProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  productPage.innerHTML = '';
  const startIndex = (currentPageP - 1) * maxIndex;
  const endIndex = startIndex + maxIndex;
  const View = products.slice(startIndex, endIndex);
  
  View.forEach((product, index) => {
    addInToListP(product, index);
  });

  updatePaginationDisplay(products.length);
}

function addInToListP(product, index) {
  const productItem = document.createElement('div');
  productItem.classList.add('products-row');
  const statusClass = product.status === 'Active' ? 'active' : 'disabled';
  const statusDisplay = `<span class="cell-label">Status:</span>
                         <span class="${statusClass}">${product.status}</span>`;
  productItem.innerHTML = `
    <button class="cell-more-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
    </button>
    <div class="product-cell image">
      <img src="${product.image}">
      <span>${product.name}</span>
    </div>
    <div class="product-cell id">
      <span class="cell-label">Id</span>${product.id}
    </div>
    <div class="product-cell category">
      <span class="cell-label"> Categories:</span>${product.category}
    </div>
    <div class="product-cell status-cell">
      ${statusDisplay}
    </div>
    <div class="product-cell description">
      <span class="cell-label">Description:</span>${product.description}
    </div>
    <div class="product-cell stock">
      <span class="cell-label">Stock:</span>${product.stock}
    </div>
    <div class="product-cell price">
      <span class="cell-label">Price:</span>${product.price}
    </div>    
    <div class="product-cell tools">
      <button class="tool-button" onclick="confirmDelete(${index});">Delete</button>
      <button class="tool-button" onclick="editP(${index});">Edit</button>
    </div>
  `;
  productPage.appendChild(productItem);
}

function navigateToPage(action) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const totalPages = Math.ceil(products.length / maxIndex);
  
  if (action === 'first') currentPageP = 1;
  else if (action === 'last') currentPageP = totalPages;
  else if (action === 'prev' && currentPageP > 1) currentPageP--;
  else if (action === 'next' && currentPageP < totalPages) currentPageP++;
  else if (typeof (action) === 'number') currentPageP = action;
  if (currentPageP < 1) currentPageP = 1;
  currentPageP = Math.min(Math.max(1, currentPageP), totalPages);
  displayProducts();
}
function updatePaginationDisplay(totalProducts) {
  const totalPages = Math.ceil(totalProducts / maxIndex);
  const pageButtons = document.querySelector('.page-numbers');
  pageButtons.innerHTML = '';
  const prevButton = document.querySelector('.pagination button[onclick="navigateToPage(\'prev\')"]');
  prevButton.disabled = currentPageP === 1;
  const nextButton = document.querySelector('.pagination button[onclick="navigateToPage(\'next\')"]');
  nextButton.disabled = currentPageP === totalPages;
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.onclick = () => navigateToPage(i);
    pageButton.classList.toggle('active', i === currentPageP);
    pageButtons.appendChild(pageButton);
  }
}

function createButton(PageNumber, container) {
  const button = document.createElement('button');
  button.textContent = PageNumber;
  button.onclick = () => navigateToPage(PageNumber);
  button.classList.toggle('active', PageNumber === currentPageP);
  container.appendChild(button);
}

updatePaginationDisplay();
document.getElementById('sortByNameP').addEventListener('click', () => sortProduct('nameP'));
document.getElementById('sortByIdP').addEventListener('click', () => sortProduct('idP'));
document.getElementById('sortByStockP').addEventListener('click', () => sortProduct('stockP'));
document.getElementById('sortByCategoryP').addEventListener('click',() => sortProduct('categoryP'));
document.getElementById('sortByPriceP').addEventListener('click',()=>sortProduct('priceP'));
let sortOrderP={name:'asc',id:'asc',stock:'asc',category:'asc',price:'asc'}
function sortProduct(attribute) {
  products = JSON.parse(localStorage.getItem('products')) || [];
  let order=sortOrderP[attribute];
  products.sort((a, b) => {
    if (attribute === 'nameP') {
      return order === 'asc' ? (a.name.localeCompare(b.name)) : (b.name.localeCompare(a.name));
    }
    if (attribute === 'idP') {
      return order === 'asc' ? (a.id.localeCompare(b.id)) : (b.id.localeCompare(a.id));
    }
    if (attribute === 'categoryP') {
      return order === 'asc' ? (a.category.localeCompare(b.category)) : (b.category.localeCompare(a.category));
    }
    if (attribute === 'stockP') {
      return order === 'asc' ? (a.stock - b.stock) : (b.stock - a.stock);
    }
    if (attribute === 'priceP') {
      return order === 'asc' ? (a.price - b.price) : (b.price - a.price);
    }
    return 0;
  });
  sortOrderP[attribute]=order==='asc'?'desc':'asc';
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();
}
const statusOption = document.getElementById('statusOption');
const resetFilterButton = document.getElementById('resetFilter');
const applyFilterButton = document.getElementById('applyFilter');
const SearchInputP=document.getElementById('search-product');
function searchProducts() {
  const searchInputValue = SearchInputP.value.toLowerCase().trim();
  if (!searchInputValue) {
    displayFilteredProducts(products); 
    return;
  }
  const searchTerms = searchInputValue.split(/\s+/);
  const filteredProducts = products.filter(product => {
    let score = 0;
    score += product.name.toLowerCase().includes(searchTerms) ? 10 : 0;
    score += product.category.toLowerCase().includes(searchTerms) ? 8 : 0;
    score += product.description && product.description.toLowerCase().includes(searchTerms) ? 5 : 0;
    score += product.stock.toString().includes(searchTerms) ? 2 : 0;
    score += product.price.toString().includes(searchTerms) ? 2 : 0;
    return score > 0;
  });

  displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
  productPage.innerHTML = '';
  const startIndex = (currentPageP - 1) * maxIndex;
  const endIndex = startIndex + maxIndex;
  const View = filteredProducts.slice(startIndex, endIndex);
  
  View.forEach((product, index) => {
    addInToListP(product, index);
  });
  updatePaginationDisplay(filteredProducts.length);
}
const categoryOptionFilterChoose=document.getElementById('productCategoryFilter');
function filterProducts() {
  products=JSON.parse(localStorage.getItem('products')) || [];
  categories=JSON.parse(localStorage.getItem('categories')) || [];
  const CategoryId = categoryOptionFilterChoose.value;
  let selectedCategoryId = "All Categories";  
  const category = categories.find(category => category.id === CategoryId);
  if (category) {
    selectedCategoryId = category.name;
  }
  const selectedStatus = statusOption.value.toLowerCase().trim();  
  const filteredProducts = products.filter(product => {
    let matchCategory = selectedCategoryId === "All Categories" || product.category === selectedCategoryId;
    let matchStatus = selectedStatus === "All Status" || product.status.toLowerCase() === selectedStatus;
    return matchCategory && matchStatus;
  });
  displayFilteredProducts(filteredProducts); 
}
SearchInputP.addEventListener('input', searchProducts);
applyFilterButton.addEventListener('click', filterProducts);
resetFilterButton.addEventListener('click', () => {
  categoryOption.value = "All Categories";
  statusOption.value = "All Status";
  displayFilteredProducts(products); 
});
displayProducts();
//PRODUCT
//CATEGORY
const formC = document.getElementById('categoryForm');
const Submit = document.getElementById('saveCategoryInput');
let editCategoryIndex=null;
function resetForm() {
  document.getElementById('categoryName').value = '';
  document.getElementById('categoryDescription').value = '';
}
function cancelCategory() {
  resetForm();
  formC.style.display='none';
  editCategoryIndex=null;
}
function toggleAddCategoryForm() {
  formC.style.display = formC.style.display === 'block' ? 'none' : 'block';
}
document.getElementById('openCategoryForm').addEventListener('click',toggleAddCategoryForm);
document.getElementById('cancelCategoryInput').addEventListener('click',cancelCategory);
Submit.addEventListener('click', function (event) {
  event.preventDefault();
  const Categoryname = document.getElementById('categoryName').value;
  const Categorydescription = document.getElementById('categoryDescription').value;
  if(editCategoryIndex!==null){
    categories[editCategoryIndex].name=Categoryname;
    categories[editCategoryIndex].description=Categorydescription;
    alert("Loại sản phẩm đã được cập nhật!");
  }else{
    const category = {
      id: randomId(categories.map(cat => cat.id)),
      name: Categoryname,
      description: Categorydescription,
      stock: 0
    }
    if(categories.some((c,i)=>c.name===Categoryname && i!==editProductIndex)){
      alert("Tên loại sản phẩm đã tồn tại! Vui lòng chọn tên khác!");
      return;
    }
    categories.unshift(category);
    alert("Đã thêm thành công!");
  }
  localStorage.setItem('categories',JSON.stringify(categories));
  formC.reset();
  formC.style.display='none';
  editCategoryIndex=null;
  displayCategories();
});
function updateStock() {
  categories.forEach(category=>{
      const count = products.filter(prod => prod.category === category.name);
      let sumcnt=0;
      count.forEach(cnt=>{
        sumcnt+=parseInt(cnt.stock);
      })
      category.stock = sumcnt.toString();
  });
  localStorage.setItem('categories',JSON.stringify(categories));
}
updateStock();
const categoryPage=document.querySelector('.categories-page');
function displayCategories(){
  categories = JSON.parse(localStorage.getItem('categories')) || [];
  categoryPage.innerHTML = '';
  categories.forEach((category,index) => 
    addInToListC(category,index)
  );
}
function addInToListC(category,index){
  const categoryItem = document.createElement('div');
    categoryItem.classList.add('categories-row');
    categoryItem.innerHTML = `
            <div class="categories-cell id">
                <span class="cell-label">ID</span>${category.id}
            </div>
            <div class="categories-cell name-category">
                <span class="cell-label">Loại sản phẩm</span>${category.name}
            </div>
            <div class="categories-cell description">
                <span class="cell-label">Mô tả</span>${category.description}
            </div>
            <div class="categories-cell stock">
                <span class="cell-label">Số lượng</span>${category.stock}
            </div>
            <div class="categories-cell tool">
                <button class="tool-button" onclick="confirmDeleteC(${index});">Delete</button>
                <button class="tool-button" onclick="editC(${index});">Edit</button>
            </div>
    `;
    categoryPage.appendChild(categoryItem);
}
displayCategories();

function deleteC(index){
  categories=JSON.parse(localStorage.getItem('categories')) || [];
  let categoryDelete=categories[index];
  products = JSON.parse(localStorage.getItem('products')) || [];
  const updatedCategories = categories.filter(category => category.id !== categoryDelete.id);
  const updatedProducts = products.filter(product => product.category !== categoryDelete.name);
  categories.splice(index,1);
  localStorage.setItem('categories', JSON.stringify(updatedCategories));
  localStorage.setItem('products', JSON.stringify(updatedProducts));
  updateStock();
  displayCategories();
  displayProducts();
}
function confirmDeleteC(index){
  if(confirm("Bạn có chắc muốn xoá loại sản phẩm này không?"))
    deleteC(index);
}
function editC(index){
  categories=JSON.parse(localStorage.getItem('categories')) || [];
  editCategoryIndex=index;
  const category=categories[index];
  document.getElementById('categoryName').value=category.name;
  document.getElementById('categoryDescription').value=category.description;
  toggleAddCategoryForm();
}
document.getElementById('sortByNameC').addEventListener('click', () => sortCategories('nameC'));
document.getElementById('sortByIdC').addEventListener('click', () => sortCategories('idC'));
document.getElementById('sortByStockC').addEventListener('click', () => sortCategories('stockC'));
let sortOrderC={name:'asc',id:'asc',stock:'asc'};
function sortCategories(attribute) {
  categories = JSON.parse(localStorage.getItem('categories')) || [];
  let order=sortOrderC[attribute];
  categories.sort((a, b) => {
    if (attribute === 'nameC') {
      return order === 'asc' ? (a.name.localeCompare(b.name)) : (b.name.localeCompare(a.name));
    }
    if (attribute === 'idC') {
      return order === 'asc' ? (a.id.localeCompare(b.id)) : (b.id.localeCompare(a.id));
    }
    if (attribute === 'stockC') {
      return order === 'asc' ? (a.stock - b.stock) : (b.stock - a.stock);
    }
    return 0;
  });
  sortOrderC[attribute]=order==='asc'?'desc':'asc';
  localStorage.setItem('categories', JSON.stringify(categories));
  displayCategories();
}
const SearchButton=document.getElementById('search-submit');
function toggleSearchButton(){
  const SearchInput=document.getElementById('search-category').value;
  SearchButton.style.display=SearchInput?'inline-block':'none';
}
SearchButton.addEventListener('click',function(e){
  e.preventDefault();
  searchCategories();
});
function searchCategories(){
  const SearchInput=document.getElementById('search-category').value.toLowerCase().trim();
  if(!SearchInput){
    displayCategories();
    return;
  }
  const searchTerms=SearchInput.split(/\s+/);
  const filterC=categories.map(category=>({
    ...category,matchScore: MatchScore(category,searchTerms)
  })).filter(category=>category.matchScore>0).sort((a,b)=>b.matchScore - a.matchScore);
  if(filterC.length===0){
    categoryPage.innerHTML='';
    return;
  }
  categoryPage.innerHTML='';
  filterC.forEach((category,index)=>addInToListC(category,index));
}
function MatchScore(category,searchTerms){
  let score=0;
  searchTerms.forEach(term=>{
    if(category.name.toLowerCase().includes(term)){
      score+=10;
      score-=category.name.toLowerCase().indexOf(term);
    }
    if(category.id.includes(term)){
      score+=8;
      score-=category.id.indexOf(term);
    }
    if(category.description && typeof category.description === 'string' && category.description.toLowerCase().includes(term)){
      score+=5;
      score-=category.description.toLowerCase().indexOf(term);
    }
    if(category.stock.toString().includes(term)){
      score+=2;
    }
  });
  return score;
}
//CATEGORY
// PRODUCT,CATEGORY

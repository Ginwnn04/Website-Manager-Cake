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
              addNewAccount();
          }
      }
  }
});




function addNewAccount() {
  // Lấy giá trị từ các trường nhập liệu
  let name = document.getElementById('name').value.trim();
  let username = document.getElementById('username').value.trim();
  let password = document.getElementById('password').value.trim();
  let phone = document.getElementById('phone').value.trim();
  let address = document.getElementById('address').value.trim();
  let role = document.getElementById('role').value.trim();

  // Kiểm tra các trường bắt buộc
  if ( !name || !username || !password || !phone || !address || !role) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  // Lấy danh sách tài khoản từ localStorage
  let listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];

  // Thêm tài khoản mới vào danh sách với các thuộc tính mặc định
  listAccount.push({
    fullName: name,
    username: username,
    password: password,
    phone: phone,
    address: address,
    role: role,
    cart: [],           // Thêm thuộc tính cart mặc định
    districtId: "",     // Thêm districtId mặc định
    wardId: "",         // Thêm wardId mặc định
    provinceId: "",     // Thêm provinceId mặc định
    status: "1"         // Trạng thái mặc định
  });

  // Lưu danh sách tài khoản cập nhật vào localStorage
  localStorage.setItem("listUser", JSON.stringify(listAccount));

  // Đặt lại giá trị các ô nhập liệu về trống
  clearForm();

  // Ẩn form và thông báo thành công
  hideForm();
  alert('Tài khoản đã thêm thành công');

  // Hiển thị danh sách tài khoản
  showAccount(listAccount);
}


function showAccount() {
  let listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];
  let account = `<tr>
      <th>Tên</th>
      <th>Tài Khoản</th>
      <th>Mật khẩu</th>
      <th>Số điện thoại</th>
      <th>Trạng thái</th>
      <th>Setting</th>
    </tr>`;

  listAccount.map((value, index) => {
    // Kiểm tra trạng thái và hiển thị thông báo tương ứng
    let statusText = value.status === "1" ? "Hoạt động" : "Bị khóa";
    
    account += `<tr>
        <td>${value.fullName}</td>
        <td>${value.username}</td>
        <td>${value.password}</td>
        <td>${value.phone}</td>
        <td>${statusText}</td>
        <td>
          <button class="edit_account" onclick="editAccount(${index})">Sửa</button>
          <button class="block_account" onclick="toggleStatus(${index})">${value.status === "1" ? "Khóa" : "Mở khóa"}</button>
          <button class="detail_account" onclick="showDetailAccount(${index})">Chi tiết</button>
        </td>
      </tr>`;
  });

  document.getElementById("accountTable").innerHTML = account;
}


function toggleStatus(index) {
  // Lấy danh sách tài khoản từ localStorage
  let listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];

  // Kiểm tra tài khoản có tồn tại không
  if (listAccount[index]) {
    // Thay đổi trạng thái từ 0 thành 1 hoặc ngược lại
    listAccount[index].status = listAccount[index].status === "1" ? "0" : "1";

    // Lưu lại danh sách đã thay đổi vào localStorage
    localStorage.setItem("listUser", JSON.stringify(listAccount));

    // Hiển thị lại danh sách tài khoản sau khi thay đổi
    showAccount();
  } else {
    alert("Không tìm thấy tài khoản.");
  }
}





function editAccount (index){
  
  let listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];
  document.getElementById('name').value=listAccount[index].fullName;
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

function changeAccount() {
  // Lấy danh sách tài khoản từ localStorage
  let listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];

  // Lấy chỉ số tài khoản đang chỉnh sửa
  let index = document.getElementById('index').value;

  // Lấy thông tin hiện tại từ biểu mẫu
  let updatedAccount = {
    fullName: document.getElementById('name').value.trim(),
    username: document.getElementById('username').value.trim(),
    password: document.getElementById('password').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    address: document.getElementById('address').value.trim(),
    role: document.getElementById('role').value.trim()
  };

  // Xóa các trường rỗng (nếu có)
  Object.keys(updatedAccount).forEach(key => {
    if (updatedAccount[key] === '' || updatedAccount[key] === null || updatedAccount[key] === undefined) {
      delete updatedAccount[key];
    }
  });

  // Kết hợp dữ liệu cũ và dữ liệu mới (giữ nguyên thuộc tính cũ nếu không bị ghi đè)
  listAccount[index] = {
    ...listAccount[index],  // Thuộc tính cũ
    ...updatedAccount       // Thuộc tính mới
  };

  // Lưu lại danh sách vào localStorage
  localStorage.setItem("listUser", JSON.stringify(listAccount));

  // Ẩn form, hiển thị danh sách tài khoản
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
  let listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];

  // Kiểm tra xem tài khoản có tồn tại không và index hợp lệ
  if (listAccount && listAccount.length > 0 && listAccount[index]) {
    // Lấy thông tin tài khoản
    const account = listAccount[index];

    // Gán giá trị vào các phần tử <p>
    document.getElementById("detail_name").innerHTML = "Tên: " + account.fullName;
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

function hideDetailAccount() {
  // Ẩn phần chi tiết tài khoản
  document.getElementById("detail_account").style.display = "none";
}


function searchAccount() {
  let valueSearchInput = document.getElementById('search_account').value.trim(); // Loại bỏ khoảng trắng thừa
  let listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];

  // Chuyển giá trị tìm kiếm về chữ thường
  let searchValueLower = valueSearchInput.toLowerCase();

  // Lọc danh sách tài khoản
  let accountSearch = listAccount.filter(value => {
    // Đảm bảo các trường cần kiểm tra không phải là null/undefined
    let fullName = value.fullName ? value.fullName.toLowerCase() : "";
    let username = value.username ? value.username.toLowerCase() : "";

    return (
      fullName.includes(searchValueLower) ||
      username.includes(searchValueLower) 
    );
  });

  // Hiển thị kết quả tìm kiếm
  document.getElementById("accountTable").innerHTML = "";
  showAccountSearch(accountSearch);
}


function showAccountSearch(array) {
  let account = `<tr>
      <th>Tên</th>
      <th>Tài Khoản</th>
      <th>Mật khẩu</th>
      <th>Số điện thoại</th>
      <th>Trạng thái</th>
      <th>Setting</th>
    </tr>`;

  array.map((value, index) => {
    // Kiểm tra status và hiển thị thông báo tương ứng
    let statusText = value.status === "1" ? "Hoạt động" : "Đã Khóa";
    
    account += `<tr>
        <td>${value.fullName}</td>
        <td>${value.username}</td>
        <td>${value.password}</td>
        <td>${value.phone}</td>
        <td>${statusText}</td> <!-- Hiển thị trạng thái -->
        <td>
          <button class="edit_account" onclick="editAccount(${index})">Sửa</button>
          <button class="block_account" onclick="toggleStatus(${index})">${value.status === "1" ? "Khóa" : "Mở khóa"}</button>
          <button class="detail_account" onclick="showDetailAccount(${index})">Chi tiết</button>
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
        nameInput.value = savedName;
    }
});












// ---------------------- Quản lý đơn hàng và phân trang -----------------------------
// Biến toàn cục để quản lý phân trang
const ITEMS_PER_PAGE = 8;  // Số đơn hàng hiển thị mỗi trang
let currentPageOrder = 1;  // Trang hiện tại

// Hiển thị danh sách đơn hàng với phân trang
function displayOrders() {
  const orderList = document.getElementById("orderList");
  const orders = JSON.parse(localStorage.getItem("listOrder")) || [];
  const searchQuery = document.getElementById("orderSearchInput").value.toLowerCase();
  const filterStatus = document.getElementById("statusFilter").value;
  let startDate = document.getElementById("startDate").value; 
  let endDate = document.getElementById("endDate").value; 
  const selectedDistrict = document.getElementById("district").value;

  // Kiểm tra nếu endDate nhỏ hơn startDate, yêu cầu người dùng sửa
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc. Vui lòng chọn lại!");
    document.getElementById("startDate").value = '';
    document.getElementById("endDate").value = ''; 
    return; 
  }else if( endDate && new Date(endDate) > new Date()){
    alert("Ngày kết thúc không thể lớn hơn ngày hôm nay. Vui lòng chọn lại!");
    document.getElementById("endDate").value = ''; 
    return; 
  }else if( startDate && new Date(startDate) > new Date()){
    alert("Ngày bắt đầu không thể lớn hơn ngày hôm nay. Vui lòng chọn lại!");
    document.getElementById("startDate").value = ''; 
    return;
  }
  // Lọc danh sách đơn hàng dựa trên quận, trạng thái, từ khóa tìm kiếm, và khoảng thời gian
  const filteredOrders = orders.filter(order => {
    const matchesSearchQuery = order.id.toLowerCase().includes(searchQuery) ||
                              order.name.toLowerCase().includes(searchQuery);
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;

    // Kiểm tra khớp quận
    const matchesDistrict = selectedDistrict === "" || order.district === selectedDistrict;
    
    const orderDate = new Date(order.timeCreate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesDateRange = (!start || orderDate >= start) && (!end || orderDate <= end);
    

    return matchesSearchQuery && matchesStatus && matchesDateRange && matchesDistrict ;
  });




  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  // Lấy các đơn hàng của trang hiện tại
  const startIndex = (currentPageOrder - 1) * ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Hiển thị đơn hàng
  orderList.innerHTML = '';
  currentOrders.forEach(order => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.account}</td>
          <td>${order.name}</td>
          <td>${order.phone}</td>
          <td>${order.district}</td>
          <td>${order.total}</td>
          <td>${order.timeCreate}</td>
          <td>${order.status}</td>
          <td class="actions">
              <button onclick="deleteOrder('${order.id}')">Xóa</button>
              <button onclick="viewOrderDetails('${order.id}')">Chi tiết</button>
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
  currentPageOrder = 1;
  displayOrders(); // Cập nhật lại danh sách khi thay đổi ngày bắt đầu
});

document.getElementById("endDate").addEventListener("change", function() {
  currentPageOrder = 1;
  displayOrders(); // Cập nhật lại danh sách khi thay đổi ngày kết thúc
});

let listProvince = [];
let listDistrict = [];

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
    currentPageOrder = 1;
    displayOrders();
});

// Hiển thị nút phân trang
function displayPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ''; 

  if(totalPages > 1){
    // Nút "Quay lại"
    const prevButton = document.createElement('button');
    prevButton.textContent = '<<';
    prevButton.classList.add('page-btn', 'prev-btn');
    prevButton.onclick = () => {
      currentPageOrder = currentPageOrder > 1 ? currentPageOrder - 1 : currentPageOrder; 
      changePageOrder(currentPageOrder);
    };
    pagination.appendChild(prevButton);
  }

  // Hiển thị các nút số trang với logic "..."
  const maxButtons = 4; 
  const halfButtons = Math.floor(maxButtons / 2);

  // Tính toán phạm vi hiển thị
  let startPage = Math.max(1, currentPageOrder - halfButtons);
  let endPage = Math.min(totalPages, currentPageOrder + halfButtons);

  // Điều chỉnh nếu phạm vi nhỏ hơn maxButtons
  if (currentPageOrder <= halfButtons) {
    endPage = Math.min(totalPages, maxButtons);
  }
  if (currentPageOrder > totalPages - halfButtons) {
    startPage = Math.max(1, totalPages - maxButtons + 1);
  }

  
  if (startPage > 1) {
    const firstPageButton = document.createElement('button');
    firstPageButton.textContent = '1';
    firstPageButton.classList.add('page-btn');
    firstPageButton.onclick = () => changePageOrder(1);
    pagination.appendChild(firstPageButton);

    if (startPage > 3) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      dots.classList.add('dots');
      pagination.appendChild(dots);
    }
  }

  // Thêm các nút trong phạm vi
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('page-btn');
    if (i === currentPageOrder) {
      pageButton.classList.add('active');
    }
    pageButton.onclick = () => changePageOrder(i);
    pagination.appendChild(pageButton);
  }

  // Thêm nút "..." và "totalPages"
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      dots.classList.add('dots');
      pagination.appendChild(dots);
    }

    const lastPageButton = document.createElement('button');
    lastPageButton.textContent = totalPages;
    lastPageButton.classList.add('page-btn');
    lastPageButton.onclick = () => changePageOrder(totalPages);
    pagination.appendChild(lastPageButton);
  }
  if(totalPages > 1){
    // Nút "Tiếp theo"
    const nextButton = document.createElement('button');
    nextButton.textContent = '>>';
    nextButton.classList.add('page-btn', 'next-btn');
    nextButton.onclick = () => {
      currentPageOrder = currentPageOrder < totalPages ? currentPageOrder + 1 : currentPageOrder; 
      changePageOrder(currentPageOrder);
    };
    pagination.appendChild(nextButton);
  }
}


// Chuyển trang
function changePageOrder(pageNumber) {
  currentPageOrder = pageNumber;
  displayOrders();
}

// Cập nhật tình trạng đơn hàng
function updateOrderStatus(id, status) {
  const listOrder = JSON.parse(localStorage.getItem('listOrder')) || [];
  const order = listOrder.find(order => order.id === id);
  if (order) {
    order.status = status; // Cập nhật trạng thái
    localStorage.setItem('listOrder', JSON.stringify(listOrder)); // Lưu vào localStorage
    displayOrders(); // Cập nhật danh sách hiển thị
  }
}
// Chế độ bật mở xem sửa đơn hàng 
function toggleEditMode(id, editMode) {
  const statusSelect = document.getElementById('statusSelect');
  const saveBtn = document.getElementById('saveBtn');
  const editBtn = document.getElementById('editBtn');

  if (editMode) {
    // Bật chế độ chỉnh sửa
    statusSelect.disabled = false;
    saveBtn.disabled = false;
    editBtn.disabled = true;

    // Thêm màu 
    saveBtn.style.backgroundColor = 'var(--orange)';
    editBtn.style.backgroundColor = 'var(--grey)';
  } else {
    // Lưu thay đổi trạng thái
    updateOrderStatus(id, statusSelect.value);

    // Tắt chế độ chỉnh sửa
    statusSelect.disabled = true;
    saveBtn.disabled = true;
    editBtn.disabled = false;

    // Thêm màu
    saveBtn.style.backgroundColor = 'var(--grey)';
    editBtn.style.backgroundColor = 'var(--orange)';
  }
}


// Xóa đơn hàng với xác nhận
function deleteOrder(id) {
  const confirmDelete = confirm("Bạn có chắc muốn xóa đơn hàng này không?");
  
  if (confirmDelete) {
    let listOrder = JSON.parse(localStorage.getItem('listOrder')) || [];
    listOrder = listOrder.filter(order => order.id !== id);
    localStorage.setItem('listOrder', JSON.stringify(listOrder));

    // Lấy danh sách đơn hàng hiện tại sau khi xóa để tính toán
    const searchQuery = document.getElementById("orderSearchInput").value.toLowerCase();
    const filterStatus = document.getElementById("statusFilter").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const selectedDistrict = document.getElementById("district").value;

    const filteredOrders = listOrder.filter(order => {
      const matchesSearchQuery = order.id.toLowerCase().includes(searchQuery) ||
                                order.name.toLowerCase().includes(searchQuery);
      const matchesStatus = filterStatus === "all" || order.status === filterStatus;

      const matchesDistrict = selectedDistrict === "" || order.district === selectedDistrict;

      const orderDate = new Date(order.timeCreate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      const matchesDateRange = (!start || orderDate >= start) && (!end || orderDate <= end);

      return matchesSearchQuery && matchesStatus && matchesDateRange && matchesDistrict;
    });

    const totalOrders = filteredOrders.length;
    const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

    // Kiểm tra điều chỉnh về trang hợp lệ
    if (totalOrders === 0) {
      currentPageOrder = 1; 
    } else if (currentPageOrder > totalPages) {
      currentPageOrder = totalPages; 
    }

    alert("Đơn hàng đã bị xóa!");
    displayOrders(); 
  } else {
    alert("Đơn hàng không bị xóa."); // Thông báo khi người dùng hủy
  }
}



// Hiển thị chi tiết đơn hàng
function viewOrderDetails(id) {
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
  const order = listOrder.find(order => order.id === id);

  if (order) {
    const orderDetailContent = document.getElementById("orderDetailContent");
    let productDetails = order.detailsOrder.map(item => `
        <div class="product-item">
            <img src="${item.image}" alt="${item.name}">
        </div>
    `).join('');

    // Hiển thị chi tiết đơn hàng
    orderDetailContent.innerHTML = `
      <button onclick="closeModal('orderDetailModal')" class="closeDetail">Đóng</button>
      <h2>Chi tiết đơn hàng</h2>
      <p><strong>Mã đơn:</strong> ${order.id}</p>
      <p><strong>Tài khoản:</strong> ${order.account}</p>
      <p><strong>Người nhận:</strong> ${order.name}</p>
      <p><strong>SĐT:</strong> ${order.phone}</p>
      <p><strong>Địa chỉ:</strong> ${order.address}</p>
      <p><strong>Ngày đặt:</strong> ${order.timeCreate}</p>
      <p><strong>Sản phẩm:</strong></p>
      <div class="product-item-detail">
        ${productDetails}
      </div>
      <p><strong>Tổng tiền:</strong> ${order.total} VND</p>
      <p><strong>Tình trạng:</strong> 
        <select id="statusSelect" disabled>
          <option value="Chưa xử lý" ${order.status === "Chưa xử lý" ? 'selected' : ''}>Chưa xử lý</option>
          <option value="Đã xác nhận" ${order.status === "Đã xác nhận" ? 'selected' : ''}>Đã xác nhận</option>
          <option value="Đã giao thành công" ${order.status === "Đã giao thành công" ? 'selected' : ''}>Đã giao thành công</option>
          <option value="Đã hủy" ${order.status === "Đã hủy" ? 'selected' : ''}>Đã hủy</option>
        </select>
      </p>
      <div id="editOrder">
        <button id="editBtn" onclick="toggleEditMode('${order.id}', true)">Sửa</button>
        <button id="saveBtn" onclick="toggleEditMode('${order.id}', false)" disabled>Lưu</button>
      </div>
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
  currentPageOrder = 1;
  displayOrders();  // Cập nhật lại danh sách khi người dùng thay đổi ô tìm kiếm
});

document.getElementById("orderSearchInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    currentPageOrder = 1;
    displayOrders();  // Cập nhật lại danh sách khi người dùng nhấn Enter
  }
});

// Xử lý sự kiện khi người dùng chọn trạng thái từ bộ lọc
document.getElementById("statusFilter").addEventListener("change", function() {
  currentPageOrder = 1;
  displayOrders(); // Cập nhật lại danh sách khi người dùng thay đổi trạng thái lọc
});

// Khi trang tải lần đầu
window.onload = function() {
  displayOrders();  // Hiển thị danh sách đơn hàng ngay khi tải trang
};




// --------------------------Quản lý đơn hàng ---------------------------------------------




//--------------------------Product and Category-------------------------------------------
let currentView = 'table';
function InitProductView(){
  const tabltViewButton=document.querySelector('.list');
  const gridViewButton=document.querySelector('.grid');
  const ProductView=document.querySelector('.products-area-wrapper');
  if(currentView === 'table'){  
    tabltViewButton.classList.add('active');
    gridViewButton.classList.remove('active');
    ProductView.classList.add('tableView');
    ProductView.classList.remove('gridView');
    currentView = 'table';
  }
}
InitProductView();
function toggleView(viewType){
  const tabltViewButton=document.querySelector('.list');
  const gridViewButton=document.querySelector('.grid');
  const ProductView=document.querySelector('.products-area-wrapper');
  if (currentView === viewType) return;
  if(viewType === 'table'){
    tabltViewButton.classList.add('active');
    gridViewButton.classList.remove('active');
    ProductView.classList.add('tableView');
    ProductView.classList.remove('gridView');
    currentView = 'table';
  }else if(viewType === 'grid'){
    tabltViewButton.classList.remove('active');
    gridViewButton.classList.add('active');
    ProductView.classList.remove('tableView');
    ProductView.classList.add('gridView');
    currentView = 'grid';
  }
}
const listViewButton = document.querySelector('.list');
const gridViewButton = document.querySelector('.grid');

if (listViewButton) {
  listViewButton.removeEventListener('click', () => toggleView('table'));
  listViewButton.addEventListener('click', () => toggleView('table'));
}

if (gridViewButton) {
  gridViewButton.removeEventListener('click', () => toggleView('grid'));
  gridViewButton.addEventListener('click', () => toggleView('grid'));
}

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
  Array.from(formP.elements).forEach(input=>{
      input.disabled=false;
  });
  formP.style.display = formP.style.display === 'block' ? 'none' : 'block';
}
function resetFormP() {
  document.getElementById('productName').value = ''; 
  document.getElementById('productCategory').value = "All Categories"; 

  const statusRadios = document.getElementsByName('status');
  for (let i = 0; i < statusRadios.length; i++) {
    statusRadios[i].checked = false;
  }
  document.getElementById('productDescription').value = ''; 
  document.getElementById('productStock').value = ''; 
  document.getElementById('productPrice').value = ''; 
  document.getElementById('productImageP').value = '';
  // Ẩn preview hình ảnh
  preview.style.display='none';
  document.getElementById('fileNameLabel').textContent = 'No file selected'; 
  
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
var img = new Image();
img.src = "./assets/img/default.png";
const productPage = document.querySelector('.products-page');
const categoryOption = document.getElementById('productCategory');
const categoryOptionFilter = document.getElementById('productCategoryFilter');
let categories = [];
let listProduct =  [];
let editProductIndex = null; 
// Hiển thị danh sách category
function updateCategoryOptions() {
    categoryOption.innerHTML = '<option value="All Categories">Chọn loại sản phẩm</option>'; 
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryOption.appendChild(option);
    });
}
function updateCategoryOptionsFilter() {
    categoryOptionFilter.innerHTML = '<option value="All Categories">Chọn loại sản phẩm</option>'; // Thêm tuỳ chọn mặc định
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoryOptionFilter.appendChild(option);
    });
}
const fileLabel = document.getElementById('fileNameLabel');
ImageP.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
        fileLabel.textContent = file.name;
    } else {
        preview.src = img.src; 
        preview.style.display = 'block'; 
        fileLabel.textContent = 'No file selected';
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
    document.getElementById('productCategory').focus();
    return;
  }
  const ProductStatus = document.querySelector('input[name="status"]:checked')?.value;
  if (!ProductStatus) {
    alert("Vui lòng chọn trạng thái!");
    document.querySelector('input[name="status"]').focus();
    return;
  }
  const ProductDescription = document.getElementById('productDescription').value.trim();
  const ProductStock = document.getElementById('productStock').value.trim();
  const ProductPrice = document.getElementById('productPrice').value.trim();
  if(listProduct.some((p,i) => p.name===ProductName && i!==editProductIndex)){
    alert("Tên sản phẩm đã tồn tại! Vui lòng chọn tên khác!");
    document.getElementById('productName').focus();
    return;
  }
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
  if(Number(ProductStock) < 0) {
    alert("Số lượng sản phẩm không được âm!");
    document.getElementById('productStock').focus();
    return;
  }
  if (!ProductPrice || isNaN(ProductPrice)) {
    alert("Giá sản phẩm không hợp lệ!");
    document.getElementById('productPrice').focus();
    return;
  }
  if (Number(ProductPrice) < 0) {
    alert("Giá thành sản phẩm không được âm!");
    document.getElementById('productPrice').focus();
    return;
}

  let productData = {
    name: ProductName,
    id: editProductIndex !== null ? listProduct[editProductIndex].id : randomId(listProduct.map(prod => prod.id)),
    category: selectedCategory.name,
    status: ProductStatus,
    description: ProductDescription,
    stock: ProductStock,
    price: ProductPrice,
    image: img.src
  };
  // Nếu có ảnh mới, thay thế ảnh mặc định
  if (ImageP.files[0]) {
    const file=ImageP.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      productData.image = e.target.result; 
      productData.imageName = file.name;
      saveProduct(productData);
    };
    reader.readAsDataURL(ImageP.files[0]);
  }else if(editProductIndex !== null && listProduct[editProductIndex].image){
    productData.image = listProduct[editProductIndex].image;
    productData.imageName = listProduct[editProductIndex].imageName;
    saveProduct(productData);
  }else {
    saveProduct(productData); 
  }

  formP.reset();
  formP.style.display='none';
  preview.style.display = 'none';
  displayProducts();
});
function updateStatus(){
  listProduct.forEach(product => {
    if(Number(product.stock)===0 && product.status !== 'Disabled'){
      product.status='Disabled';
    }
  });
  localStorage.setItem('listProduct',JSON.stringify(listProduct));
  displayProducts();
}
const removeImageBtn = document.getElementById('removeImageBtn');
removeImageBtn.addEventListener('click',function(){
  const fileLabel = document.getElementById('fileNameLabel');
  if(editProductIndex !== null){
    listProduct = JSON.parse(localStorage.getItem('listProduct')) || [];
    listProduct[editProductIndex].image=null;
    listProduct[editProductIndex].imageName=null;
    localStorage.setItem('listProduct',JSON.stringify(listProduct));
  }
  preview.src = img.src;
  ImageP.value='';
  fileLabel.textContent= 'No file selected';
});
formP.addEventListener('blur',updateStock);
// Lưu sản phẩm
function saveProduct(productData) {
  if (editProductIndex !== null) {
    listProduct[editProductIndex] = productData;
    alert("Sản phẩm đã được cập nhật!");
    editProductIndex = null;
  } else {
    listProduct.unshift(productData);
    alert("Sản phẩm đã được thêm!");
  }
  localStorage.setItem('listProduct', JSON.stringify(listProduct));
  cancelProduct();
}
window.addEventListener('load', updateCategoryOptions);
window.addEventListener('blur', updateStatus);
window.addEventListener('blur',updateStock);
window.addEventListener('load', updateCategoryOptionsFilter);
// Các hàm xoá và chỉnh sửa sản phẩm
function deleteP(index) {
  listProduct.splice(index, 1);
  localStorage.setItem('listProduct', JSON.stringify(listProduct));
  displayProducts();
}

function confirmDelete(index) {
  if (confirm("Bạn có chắc muốn xoá sản phẩm này không?")) deleteP(index);
}
const formTitleP = formP.querySelector('h2');
const saveButton = document.getElementById('saveProductInput');
const editButton = document.createElement('button');
saveButton.insertAdjacentElement('beforebegin',editButton);
editButton.id = 'editProductButton';
editButton.type = 'button';
editButton.className = 'btn-save';
editButton.textContent = 'Chỉnh sửa';
editButton.style.display = 'none';

function editP(index) {
  editProductIndex = index;
  const product = listProduct[index];
  formP.style.display = 'block';
  formTitleP.textContent = 'Xem sản phẩm'; 
  document.getElementById('productName').value = product.name;
  document.getElementById('productCategory').value = categories.find(cat => cat.name === product.category)?.id || '';
  document.querySelector(`input[name="status"][value="${product.status}"]`).checked = true;
  document.getElementById('productDescription').value = product.description;
  document.getElementById('productStock').value = product.stock;
  document.getElementById('productPrice').value = product.price;
  // Hiển thị ảnh nếu có
  if (product.image !== null && product.image !== img.src) {
    preview.src = product.image;
    preview.style.display = 'block';
    removeImageBtn.disabled=true;
  } else {
    preview.src=img.src;
    preview.style.display = 'block';
  }
  const fileLabel = document.getElementById('fileNameLabel');
  fileLabel.textContent = product.imageName || 'No file selected';
  Array.from(formP.elements).forEach(input=>{
    if(input.tagName !== 'BUTTON')  
      input.disabled=true;
  });
  saveButton.style.display = 'none';
  editButton.style.display = 'inline-block';
}
editButton.addEventListener('click',()=>{
  formTitleP.textContent='Chỉnh sửa sản phẩm';
  Array.from(formP.elements).forEach(input=>{
    if(input.tagName !== 'BUTTON')
      input.disabled=false;
  });
  removeImageBtn.disabled=false;
  saveButton.style.display = 'inline-block';
  editButton.style.display = 'none';
});
ImageP.addEventListener('change', function () {
  const fileLabel = document.getElementById('fileNameLabel');
  if (ImageP.files[0]) {
      fileLabel.textContent = ImageP.files[0].name; 
  } else {
      fileLabel.textContent = 'No file selected'; 
  }
});
let currentPageP = 1;
const maxIndex = 12;

function displayProducts() {
  listProduct = JSON.parse(localStorage.getItem('listProduct')) || [];
  productPage.innerHTML = '';
  const startIndex = (currentPageP - 1) * maxIndex;
  const endIndex = startIndex + maxIndex;
  const View = listProduct.slice(startIndex, endIndex);
  
  View.forEach((product, index) => {
    addInToListP(product, index);
  });
  if(currentView === 'grid'){
    switchToGridView();
    resetProductButtonsState();
    rebindMoreButtonEvents();
  }
  if(currentView === 'table')
    switchToTableView();
  updatePaginationDisplay(listProduct.length);
}
document.querySelector('.list').addEventListener('click', () => {
  switchToTableView();
});
document.querySelector('.grid').addEventListener('click', () => {
  switchToGridView();
});
function addInToListP(product, index) {
  const productItem = document.createElement('div');
  productItem.classList.add('products-row');
  const statusClass = product.status === 'Active' ? 'active' : 'disabled';
  productItem.innerHTML = `
    <button class="cell-more-button" id="morebutton-${index}" onclick="moreButton(${index});">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
    </button>
    <div class="product-cell image">
      <img src="${product.image}">
    </div>
    <div class="product-cell name">
      <span>${product.name}</span>
    </div>
    <div class="product-cell id">
      <span class="cell-label">Id</span>${product.id}
    </div>
    <div class="product-cell category">
      <span class="cell-label"> Categories:</span>${product.category}
    </div>
    <div class="product-cell status-cell">
      <span class="cell-label">Status:</span>
      <span class="${statusClass}">${product.status}</span>
    </div>
    <div class="product-cell stock">
      <span class="cell-label">Stock:</span>${product.stock}
    </div>
    <div class="product-cell price">
      <span class="cell-label">Price:</span>${product.price}
    </div>    
    <div class="product-cell tools" id="tool-${index}">
      <button class="tool-button" onclick="confirmDelete(${index});">Delete</button>
      <button class="tool-button" onclick="editP(${index});">Detail</button>
    </div>
  `;
  productPage.appendChild(productItem);
}
function moreButton(index){
  if(currentView !== 'grid') return;
  const tools = document.getElementById(`tool-${index}`);
  const isVisible = tools.style.display==='block';
  const moreButton = document.getElementById(`morebutton-${index}`);
  document.querySelectorAll('.product-cell.tools').forEach((tool)=>(tool.style.display='none'));
  document.querySelectorAll('.cell-more-button').forEach(button => (button.style.display = 'block'));
  if(!isVisible){
    tools.style.display='block';
    moreButton.style.display='none';
  }
}
function switchToGridView(){
  document.querySelectorAll('.products-row').forEach(row=>{
    const tools = row.querySelector('.product-cell.tools');
    const moreButton = row.querySelector('.cell-more-button');
    tools.style.display = 'none';
    moreButton.style.display = 'block';
  });
}
function switchToTableView(){
  document.querySelectorAll('.products-row').forEach(row=>{
    const tools = row.querySelector('.product-cell.tools');
    const moreButton = row.querySelector('.cell-more-button');
    tools.style.display = 'block';
    moreButton.style.display = 'none';
  });
}

window.addEventListener('click',e =>{
  if(currentView !== 'grid') return;
  if(!e.target.closest('.tools') && !e.target.closest('.cell-more-button')){
    document.querySelectorAll('.product-cell.tools').forEach((tools)=>
      (tools.style.display = 'none'));
    document.querySelectorAll('.cell-more-button').forEach(button=>
      (button.style.display = 'block'));
  }
});
window.addEventListener('click', e => {
  const filterButton = document.querySelector('.jsFilter');  // Nút filter
  const filterMenu = document.querySelector('.filter-menu'); // Menu filter

  // Kiểm tra nếu click vào nút filter, mở hoặc đóng menu
  if (e.target.closest('.jsFilter')) {
      filterMenu.classList.toggle('active'); 
  } else {
      // Nếu click vào ngoài nút filter và menu, tắt menu
      if (!e.target.closest('.filter-menu') && !e.target.closest('.jsFilter')) {
          filterMenu.classList.remove('active');
      }
  }
});

function navigateToPage(action) {
  const listProduct = JSON.parse(localStorage.getItem('listProduct')) || [];
  const totalPages = Math.ceil(listProduct.length / maxIndex);
  
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
  listProduct = JSON.parse(localStorage.getItem('listProduct')) || [];
  let order=sortOrderP[attribute];
  listProduct.sort((a, b) => {
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
  localStorage.setItem('listProduct', JSON.stringify(listProduct));
  displayProducts();
}
const statusOption = document.getElementById('statusOption');
const resetFilterButton = document.getElementById('resetFilter');
const applyFilterButton = document.getElementById('applyFilter');
const SearchInputP=document.getElementById('search-product');
function searchProducts() {
  const searchInputValue = SearchInputP.value.toLowerCase().trim();
  if (!searchInputValue) {
    displayFilteredProducts(listProduct); 
    return;
  }
  const searchTerms = searchInputValue.split(/\s+/);
  const filteredProducts = listProduct.filter(product => {
    let score = 0;
    score += product.name.toLowerCase().includes(searchTerms) ? 10 : 0;
    score += product.id.toLowerCase().includes(searchTerms) ? 9 :0;
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
  if(currentView === 'grid'){
    resetProductButtonsState();
    rebindMoreButtonEvents();
  }
  updatePaginationDisplay(filteredProducts.length);
}
const categoryOptionFilterChoose=document.getElementById('productCategoryFilter');
function filterProducts() {
  listProduct=JSON.parse(localStorage.getItem('listProduct')) || [];
  categories=JSON.parse(localStorage.getItem('categories')) || [];
  const CategoryId = categoryOptionFilterChoose.value;
  let selectedCategoryId = "All Categories";  
  let filteredProducts = [];
  const category = categories.find(category => category.id === CategoryId);
  if (category) {
    selectedCategoryId = category.name;
  }
  let selectedStatus =  "all status";
  selectedStatus= statusOption.value.toLowerCase().trim();  
  if(selectedCategoryId === "All Categories" && selectedStatus === "all status"){
    filteredProducts = listProduct;
  }
  else if(selectedCategoryId === "All Categories" && selectedStatus !== "all status"){
    filteredProducts = listProduct.filter(product => product.status.toLowerCase() === selectedStatus);
  }
  else if(selectedCategoryId !== "All Categories" && selectedStatus === "all status"){
    filteredProducts = listProduct.filter(product => product.category === selectedCategoryId);
  }
  else if(selectedCategoryId !== "All Categories" && selectedStatus !== "all status"){
    filteredProducts = listProduct.filter(product => {
      const matchCategory = (product.category === selectedCategoryId);
      const matchStatus = (product.status.toLowerCase() === selectedStatus);
      return matchCategory && matchStatus;
    });
  }
  displayFilteredProducts(filteredProducts); 
}
SearchInputP.addEventListener('input', searchProducts);
applyFilterButton.addEventListener('click', filterProducts);
resetFilterButton.addEventListener('click', () => {
  categoryOptionFilterChoose.value = "All Categories";
  statusOption.value = "All Status";
  displayFilteredProducts(listProduct); 
});
function rebindMoreButtonEvents(){
  if(currentView !== 'grid') return;
  const moreButtons = document.querySelectorAll('.cell-more-button');
  moreButtons.forEach(button=>{
    button.removeEventListener('click',toggleProductButtons);
    button.addEventListener('click',toggleProductButtons);
  });
}
function resetProductButtonsState() {
  if(currentView !== 'grid') return;
  const buttons = document.querySelectorAll('.product-cell.tools');
  buttons.forEach(button => {
    button.style.display = 'none';
  });
}
function toggleProductButtons(event){
  if(currentView !== 'grid') return;
  const product = event.target.closest('.products-row');
  const buttons = product.querySelector('.product-cell.tools');
  const isVisible=buttons.style.display === 'block';
  resetProductButtonsState();
  if(isVisible || !buttons.style.display){
    buttons.style.display = 'block'
    const moreButton = product.querySelector('.cell-more-button');
    moreButton.style.display = 'none';
  }else {
    buttons.style.display = 'none';
  }
}
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
      document.getElementById('categoryName').focus();
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
      const count = listProduct.filter(prod => prod.category === category.name);
      let sumcnt=0;
      count.forEach(cnt=>{
        sumcnt+=parseInt(cnt.stock);
      })
      category.stock = sumcnt.toString();
  });
  localStorage.setItem('categories',JSON.stringify(categories));
  displayCategories();
}
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
              ${category.id}
            </div>
            <div class="categories-cell name-category">
              ${category.name}
            </div>
            <div class="categories-cell stock">
                ${category.stock}
            </div>
            <div class="categories-cell tool">
                <button class="tool-button" onclick="confirmDeleteC(${index});">Delete</button>
                <button class="tool-button" onclick="editC(${index});">Detail</button>
            </div>
    `;
    categoryPage.appendChild(categoryItem);
}
displayCategories();

function deleteC(index){
  let categoryDelete=categories[index];
  categories = categories.filter(category => category.id !== categoryDelete.id);
  localStorage.setItem('categories', JSON.stringify(categories));
  listProduct = listProduct.filter(product => product.category !== categoryDelete.name);
  localStorage.setItem('listProduct',JSON.stringify(listProduct));
  updateCategoryOptions();
  displayProducts(); 
  updateStock();
  displayCategories();
}
Submit.addEventListener('blur',updateCategoryOptions);
Submit.addEventListener('blur',updateCategoryOptionsFilter);
function confirmDeleteC(index){
  if(confirm("Bạn có chắc muốn xoá loại sản phẩm này không?"))
    deleteC(index);
}
const formTitleC = formC.querySelector('h2');
const saveButtonC = document.getElementById('saveCategoryInput');
const editButtonC = document.createElement('button');
saveButtonC.insertAdjacentElement('beforebegin',editButtonC);
editButtonC.id = 'editProductButton';
editButtonC.type = 'button';
editButtonC.className = 'btn-save';
editButtonC.textContent = 'Chỉnh sửa';
editButtonC.style.display = 'none';
function editC(index){
  formC.style.display = 'block';
  formTitleC.textContent = 'Xem loại sản phẩm';
  categories=JSON.parse(localStorage.getItem('categories')) || [];
  editCategoryIndex=index;
  const category=categories[index];
  document.getElementById('categoryName').value=category.name;
  document.getElementById('categoryDescription').value=category.description;
  Array.from(formC.elements).forEach(input=>{
    if(input.tagName !== 'BUTTON')  
      input.disabled=true;
  });
  saveButtonC.style.display = 'none';
  editButtonC.style.display = 'inline-block';
}
editButtonC.addEventListener('click',()=>{
  formTitleC.textContent='Chỉnh sửa loại sản phẩm';
  Array.from(formC.elements).forEach(input=>{
    if(input.tagName !== 'BUTTON')
      input.disabled=false;
  });
  saveButtonC.style.display = 'inline-block';
  editButtonC.style.display = 'none';
});
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
const SearchInputC=document.getElementById('search-category');
function searchCategories(){
  const searchInputValue = SearchInputC.value.toLowerCase().trim();
  if(!searchInputValue){
    displayFilteredCategories(categories);
    return;
  }
  const searchTerms = searchInputValue.split(/\s+/);
  const filteredCategories = categories.filter(category => {
    let score = 0;
    score += searchTerms.some(term => category.name.toLowerCase().includes(term)) ? 10 : 0;
    score += searchTerms.some(term => category.id.toString().toLowerCase().includes(term)) ? 8 : 0;
    score += searchTerms.some(term => category.stock.toString().toLowerCase().includes(term)) ? 6 : 0;
    score += category.description && searchTerms.some(term => category.description.toLowerCase().includes(term)) ? 2 : 0;
    return score > 0;
  });
  displayFilteredCategories(filteredCategories);
}
function displayFilteredCategories(filteredCategories){
  categoryPage.innerHTML = '';
  filteredCategories.forEach((category,index) => 
    addInToListC(category,index)
  );
}
SearchInputC.addEventListener('input',searchCategories);
//CATEGORY
// PRODUCT,CATEGORY


let listDistrict1 = [];
let listWard1 = [];

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



const Dashboard = document.querySelector('#dashboard');
const AccountManager = document.querySelector('#account_manager');
const OrderManager = document.querySelector('#order_manager');
const ProductSeseion=document.querySelector('.product-container');
const CategorySesseion=document.querySelector('.category-container');
// Lấy các phần tử liên quan

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
        const selectProvince = document.getElementById("province1");
        txtInner = `<option value="" disabled selected>Chọn tỉnh/thành phố</option>`;
        listProvince.forEach(province => {
            txtInner += `<option value="${province.idProvince}">${province.name}</option>`;
        });
        selectProvince.innerHTML = txtInner;
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
  document.getElementById('street').value = '';
  document.getElementById('role').value = '';
  document.getElementById('province1').value = '';
  document.getElementById('district1').value = '';
  document.getElementById('ward1').value = '';
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
          let street = document.getElementById('street').value.trim();
          let role = document.getElementById('role').value.trim();
          let provinceId = document.getElementById('province1').value.trim();
          let districtId  = document.getElementById('district1').value.trim();
          let wardId  = document.getElementById('ward1').value.trim();

          // Kiểm tra từng trường và focus vào trường đầu tiên bị thiếu
          if (!name) {
              document.getElementById('name').focus();
          } else if (!username) {
              document.getElementById('username').focus();
          } else if (!password) {
              document.getElementById('password').focus();
          } else if (!phone) {
              document.getElementById('phone').focus();
          } else if (!street) {
              document.getElementById('street').focus();
          } else if (!role) {
              document.getElementById('role').focus();
          } else if (!provinceId) {
            document.getElementById('province1').focus();
          } else if (!districtId) {
            document.getElementById('district1').focus();
          } else if (!wardId) {
            document.getElementById('ward1').focus();
          }
          else {
              addNewAccount();
              
          }
      }
  }
});


// ------------------------------------------------- Địa chỉ -------------------------------------



async function getDataDistrict1(idProvince) {
  const url = "https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/district?idProvince=" + idProvince;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
      const data = await response.json();
      listDistrict1 = [...data];
      console.log(listDistrict1, idProvince);
      renderDistrict1();        
  } catch (error) {
    console.error(error.message);
  }
}
async function getDataWard1(idDistrict) {
  const url = "https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/commune?idDistrict=" + idDistrict;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
      const data = await response.json();
      listWard1 = [...data];
      renderWard1();        
  } catch (error) {
    console.error(error.message);
  }
}

document.querySelector("#province1").addEventListener("change", () => {
  const selectProvince = document.getElementById("province1");
  getDataDistrict1(selectProvince.value);
});

function renderDistrict1() {
  const selectProvince = document.getElementById("district1");
  txtInner = `<option value="" disabled selected>Chọn huyện/quận</option>`;
  listDistrict1.forEach(district => {
      txtInner += `<option value="${district.idDistrict}">${district.name}</option>`;
  });
  selectProvince.innerHTML = txtInner;
}

document.querySelector("#district1").addEventListener("change", () => {
  const selectDistrict = document.getElementById("district1");
  getDataWard1(selectDistrict.value);
});

function renderWard1() {
  const selectProvince = document.getElementById("ward1");
  txtInner = `<option value="" disabled selected>Chọn phường/xã</option>`;
  listWard1.forEach(district => {
      txtInner += `<option value="${district.idCommune}">${district.name}</option>`;
  });
  selectProvince.innerHTML = txtInner;
}





// ---------------------------------------------------Tài Khoản ------------------------------------------
function addNewAccount() {
  // Lấy giá trị từ các trường nhập liệu
  let name = document.getElementById('name').value.trim();
  let username = document.getElementById('username').value.trim();
  let password = document.getElementById('password').value.trim();
  let phone = document.getElementById('phone').value.trim();
  let street = document.getElementById('street').value.trim();
  let role = document.getElementById('role').value.trim();
  let provinceId = document.getElementById('province1').value.trim();
  let districtId  = document.getElementById('district1').value.trim();
  let wardId  = document.getElementById('ward1').value.trim();
  // Kiểm tra các trường bắt buộc
  if (!name || !username || !password || !phone || !street || !role || !provinceId || !districtId || !wardId) {
    showToast('error', 'Vui lòng nhập đầy đủ thông tin !');

    return;
  }

  // Kiểm tra định dạng email
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức regex kiểm tra email
  if (!emailRegex.test(username)) {
    showToast('error','Tài khoản phải là địa chỉ email hợp lệ.');
    return;
  }

  // Kiểm tra số điện thoại: phải đủ 10 chữ số và bắt đầu bằng 0
  let phoneRegex = /^0\d{9}$/; // Biểu thức regex kiểm tra số điện thoại
  if (!phoneRegex.test(phone)) {
    showToast('error','Số điện thoại phải có 10 chữ số và bắt đầu bằng 0.');
    return;
  }

  // Lấy danh sách tài khoản từ localStorage
  let listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];

  // Kiểm tra xem email đã tồn tại chưa
  let emailExists = listAccount.some(account => account.gmail === username);
  if (emailExists) {
    showToast('error','Email này đã được sử dụng. Vui lòng chọn email khác.');
    return;
  }

  // Thêm tài khoản mới vào danh sách với các thuộc tính mặc định
  listAccount.push({
    fullName: name,
    gmail: username,
    password: password,
    phone: phone,
    street: street,
    role: role,
    cart: [],           // Thêm thuộc tính cart mặc định
    districtId: districtId,     // Thêm districtId mặc định
    wardId: wardId,         // Thêm wardId mặc định
    provinceId: provinceId,     // Thêm provinceId mặc định
    status: "1"         // Trạng thái mặc định
  });

  // Lưu danh sách tài khoản cập nhật vào localStorage
  localStorage.setItem("listUser", JSON.stringify(listAccount));

  // Đặt lại giá trị các ô nhập liệu về trống
  clearForm();

  // Ẩn form và thông báo thành công
  hideForm();
  showToast('success','Tài khoản đã thêm thành công');

  // Hiển thị danh sách tài khoản
  showAccount(listAccount);
}



let currentPage = 1;
let perPage = 7;
let totalPage = 0;
let listAccount = []; // Mảng người dùng
let perUser = [];

function showAccount() {
  // Lấy danh sách người dùng từ localStorage
  listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];

  async function getUser() {
    try {
      // Phân trang dữ liệu người dùng
      perUser = listAccount.slice(
        (currentPage - 1) * perPage,
        (currentPage - 1) * perPage + perPage
      );
      renderUser();
      renderPageNumber();
    } catch (e) {
      console.log(e);
    }
  }

  getUser();  // Gọi hàm để tải dữ liệu người dùng

  // Gọi hàm render để hiển thị thông tin người dùng
}

function renderPageNumber() {
  // Tính tổng số trang
  totalPage = Math.ceil(listAccount.length / perPage);
  let paginationHTML = '';
  for (let i = 1; i <= totalPage; i++) {
    // Thêm lớp "active" nếu trang hiện tại được chọn
    const activeClass = i === currentPage ? 'active' : '';
    paginationHTML += `<li class="${activeClass}" onclick="changePage(${i})">${i}</li>`;
  }
  document.getElementById("pagination1").innerHTML = paginationHTML;
}

function changePage(page) {
  currentPage = page;
  showAccount(); // Cập nhật lại dữ liệu người dùng khi chuyển trang
}


function renderUser() {
  let account = `<tr>
      <th>Tên</th>
      <th>Tài Khoản</th>
      <th>Mật khẩu</th>
      <th>Số điện thoại</th>
      <th>Trạng thái</th>
      <th>Setting</th>
    </tr>`;

  perUser.map((value, index) => {
    let statusText = value.status === "1" ? "Hoạt động" : "Bị khóa";
    let toggleId = `toggle_${index}`; // Tạo id duy nhất cho mỗi nút bật/tắt

    account += `<tr>
      <td>${value.fullName}</td>
      <td>${value.gmail}</td>
      <td>${value.password}</td>
      <td>${value.phone}</td>
      <td>
        <div class="toggle-switch">
          <input type="checkbox" id="${toggleId}" ${value.status === "1" ? "checked" : ""} 
            onclick="toggleStatus(${index})"/>
          <label for="${toggleId}" class="switch"></label>
        </div>
      </td>
      <td>
        <button class="edit_account" onclick="editAccount(${index})">Sửa</button>
        <button class="detail_account" onclick="showDetailAccount(${index})">Chi tiết</button>
      </td>
    </tr>`;
  });

  document.getElementById("accountTable").innerHTML = account;
}

// Hàm để thay đổi trạng thái tài khoản (bật/tắt)
function toggleStatus(index) {
  listAccount[index].status = listAccount[index].status === "1" ? "0" : "1";
  localStorage.setItem("listUser", JSON.stringify(listAccount)); // Lưu lại thay đổi
  showAccount(); // Cập nhật lại giao diện
}


function toggleStatus(index) {
  let listAccount = JSON.parse(localStorage.getItem("listUser")) || [];
  listAccount[index].status = listAccount[index].status === "1" ? "0" : "1";
  localStorage.setItem("listUser", JSON.stringify(listAccount));
  showAccount(); // Cập nhật giao diện
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
   showToast('error',"Không tìm thấy tài khoản.");
  }
}





async function editAccount(index) {
  let listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];

  // Gán các giá trị cơ bản
  document.getElementById('name').value = listAccount[index].fullName;
  document.getElementById('username').value = listAccount[index].gmail;
  document.getElementById('password').value = listAccount[index].password;
  document.getElementById('phone').value = listAccount[index].phone;
  document.getElementById('street').value = listAccount[index].street;
  document.getElementById('role').value = listAccount[index].role;
  document.getElementById('province1').value = listAccount[index].provinceId;

  // Lấy mã tỉnh, huyện, xã từ tài khoản
  const provinceId = listAccount[index].provinceId;
  const districtId = listAccount[index].districtId;
  const wardId = listAccount[index].wardId;

  // Gọi API để lấy danh sách quận/huyện
  await getDataDistrict1(provinceId);

  // Gán giá trị quận/huyện và gọi API lấy danh sách xã
  document.getElementById('district1').value = districtId;
  await getDataWard1(districtId);

  // Gán giá trị xã
  document.getElementById('ward1').value = wardId;

  // Hiển thị form chỉnh sửa
  document.getElementById('index').value = index;
  showForm();
  document.getElementById('save_account').style.display = 'none';
  document.getElementById('reset_account').style.display = 'none';
  document.getElementById('update_account').style.display = 'inline-block';
}


function changeAccount() {
  // Lấy danh sách tài khoản từ localStorage
  let listAccount = localStorage.getItem("listUser") ? JSON.parse(localStorage.getItem("listUser")) : [];

  // Lấy chỉ số tài khoản đang chỉnh sửa
  let index = document.getElementById('index').value;
  const provinceComponent = document.getElementById("province1");
  const districtComponent = document.getElementById("district1");
  const wardComponent = document.getElementById("ward1");
  const address = [];
    address.push(document.getElementById("street").value);
    address.push(wardComponent[wardComponent.selectedIndex].textContent);
    address.push(districtComponent[districtComponent.selectedIndex].textContent);
    address.push(provinceComponent[provinceComponent.selectedIndex].textContent);
  // Lấy thông tin hiện tại từ biểu mẫu
  let updatedAccount = {
    fullName: document.getElementById('name').value.trim(),
    gmail: document.getElementById('username').value.trim(),
    password: document.getElementById('password').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    street: document.getElementById('street').value.trim(),
    role: document.getElementById('role').value.trim(),
    address: address.join(", "),
    provinceId: document.getElementById('province1').value,
    districtId: document.getElementById('district1').value,
    wardId: document.getElementById('ward1').value
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
    let roleText = account.role === "Admin" ? "Người quản trị" : "Khách hàng";
    document.getElementById("detail_name").innerHTML = "Tên: " + account.fullName;
    document.getElementById("detail_username").innerHTML = "Tài Khoản: " + account.gmail;
    document.getElementById("detail_password").innerHTML = "Mật khẩu: " + account.password;
    document.getElementById("detail_phone").innerHTML = "Số điện thoại: " + account.phone;
    document.getElementById("detail_street").innerHTML = "Địa chỉ: " + account.address;    
    document.getElementById("detail_role").innerHTML = "Vai trò: " + roleText;


    // Hiển thị phần chi tiết tài khoản
    document.getElementById("detail_account").style.display = "flex";
  } else {
    showToast('error',"Không tìm thấy tài khoản.");
  }
}


function hideDetailAccount() {
  // Ẩn phần chi tiết tài khoản
  document.getElementById("detail_account").style.display = "none";
}





function searchAccount() {
  let valueSearchInput = document.getElementById('search_account').value.trim().toLowerCase();

  let listAccount = localStorage.getItem("listUser") 
      ? JSON.parse(localStorage.getItem("listUser")) 
      : [];

  // Lọc tài khoản dựa trên fullName và gmail
  let accountSearch = listAccount.filter(value => {
    let fullName = value.fullName ? value.fullName.toLowerCase() : "";
    let email = value.gmail ? value.gmail.toLowerCase() : "";
    return fullName.includes(valueSearchInput) || email.includes(valueSearchInput);
  });

  // Reset trang tìm kiếm về 1
  currentSearchPage = 1;

  // Hiển thị kết quả tìm kiếm
  renderSearchResults(accountSearch);
}

function renderSearchResults(array) {
  // Phân trang
  const totalPage = Math.ceil(array.length / perPage);
  const start = (currentSearchPage - 1) * perPage;
  const end = start + perPage;

  // Lấy dữ liệu của trang hiện tại
  const paginatedResults = array.slice(start, end);

  // Hiển thị tài khoản tìm kiếm
  showAccountSearch(paginatedResults);

  // Hiển thị số trang
  renderSearchPageNumber(totalPage);
}

function renderSearchPageNumber(totalPage) {
  let paginationHTML = '';
  for (let i = 1; i <= totalPage; i++) {
    const activeClass = i === currentSearchPage ? 'active' : '';
    paginationHTML += `<li class="${activeClass}" onclick="changeSearchPage(${i})">${i}</li>`;
  }
  document.getElementById("pagination1").innerHTML = paginationHTML;
}

function changeSearchPage(page) {
  currentSearchPage = page;

  // Gọi lại `searchAccount` để hiển thị trang mới
  const valueSearchInput = document.getElementById('search_account').value.trim().toLowerCase();
  let listAccount = localStorage.getItem("listUser") 
      ? JSON.parse(localStorage.getItem("listUser")) 
      : [];

  let accountSearch = listAccount.filter(value => {
    let fullName = value.fullName ? value.fullName.toLowerCase() : "";
    let email = value.gmail ? value.gmail.toLowerCase() : "";
    return fullName.includes(valueSearchInput) || email.includes(valueSearchInput);
  });

  renderSearchResults(accountSearch);
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
    let statusText = value.status === "1" ? "Hoạt động" : "Bị khóa";
    let toggleId = `toggle_${index}`; // Tạo id duy nhất cho mỗi nút bật/tắt

    account += `<tr>
      <td>${value.fullName}</td>
      <td>${value.gmail}</td>
      <td>${value.password}</td>
      <td>${value.phone}</td>
      <td>
        <div class="toggle-switch">
          <input type="checkbox" id="${toggleId}" ${value.status === "1" ? "checked" : ""} 
            onclick="toggleStatus(${index})"/>
          <label for="${toggleId}" class="switch"></label>
        </div>
      </td>
      <td>
        <button class="edit_account" onclick="editAccount(${index})">Sửa</button>
        <button class="detail_account" onclick="showDetailAccount(${index})">Chi tiết</button>
      </td>
    </tr>`;
  });

  document.getElementById("accountTable").innerHTML = account;
}










// ------------------------------------- Thống Kê ------------------------------------

// Hàm hiển thị bảng sản phẩm
function showProductSummary(array) {
  let productTable = `<tr>
    <th>Tên sản phẩm</th>
    <th>Giá</th>
    <th>Số lượng</th>
    <th>Tổng thu</th>
    <th>Xem hóa đơn</th>
  </tr>`;

  let totalRevenue = 0; // Tổng tiền tất cả sản phẩm trong danh sách

  array.forEach((product, index) => {
    // Tính tổng thu của sản phẩm
    const productRevenue = product.quantity * product.price;
    totalRevenue += productRevenue;

    productTable += `<tr>
        <td>${product.name}</td>
       <td>${formatMoney(product.price)}</td>
        <td>${product.quantity}</td>
        <td>${formatMoney(productRevenue)}</td>
        <td>
          <button class="view_invoice" onclick="viewInvoice(${index})"><i class='bx bx-detail'></i></button>
        </td>
      </tr>`;
  });

  // Thêm dòng hiển thị tổng tiền
  productTable += `<tr>
    <td colspan="3"><strong>Tổng cộng</strong></td>
    <td colspan="2"><strong>${formatMoney(totalRevenue)}</strong></td>
  </tr>`;

  document.getElementById("product_rank").innerHTML = productTable;
}

// Hàm hiển thị modal với danh sách hóa đơn
function viewInvoice(index) {
  const productName = currentProductSummary.length > 0 ? currentProductSummary[index].name : productSummary[index].name;
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];

  // Lọc danh sách hóa đơn liên quan đến sản phẩm
  const relatedOrders = listOrder.filter(order =>
    order.detailsOrder.some(product => product.name === productName)
  );

  if (relatedOrders.length === 0) {
    showToast('error',"Không tìm thấy hóa đơn liên quan đến sản phẩm này.");
    return;
  }
  document.getElementById("name_product").textContent = `Tên sản phẩm: ${productName}`;

  // Tạo danh sách hóa đơn
  let invoiceHTML = "<ul>";
  relatedOrders.forEach(order => {
    invoiceHTML += `
      <li>
        Mã hóa đơn: <strong>${order.id}</strong>
        <button id="viewOrderDetails" onclick="viewOrderDetails('${order.id}')">Chi tiết</button>
      </li>`;
  });
  invoiceHTML += "</ul>";

  // Hiển thị danh sách hóa đơn trong modal
  document.getElementById("invoiceList").innerHTML = invoiceHTML;
  document.getElementById("invoiceModal").style.display = "block";
}


// Hàm đóng modal
function closeModal2() {
  document.getElementById("invoiceModal").style.display = "none";

}




// Lấy danh sách từ localStorage
let productSummary = []; // Danh sách sản phẩm mặc định
let currentProductSummary = []; // Danh sách sản phẩm hiện tại sau khi tìm kiếm (nếu có)

document.addEventListener("DOMContentLoaded", function () {
  // Lọc các đơn hàng có trạng thái "Đã giao thành công"
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
  const filteredOrders = listOrder.filter(order => order.status === "Đã giao thành công");

  // Xử lý dữ liệu sản phẩm
  filteredOrders.forEach(order => {
    order.detailsOrder.forEach(product => {
      const existingProduct = productSummary.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        productSummary.push({
          name: product.name,
          quantity: product.quantity,
          price: product.price
        });
      }
    });
  });

  // Sắp xếp giảm dần theo số lượng
  productSummary.sort((a, b) => b.quantity - a.quantity);

  // Hiển thị bảng ban đầu
  showProductSummary(productSummary);
});

// Hàm xếp tăng dần
function rankUp() {
  const rankOption = document.getElementById("rank_option").value;
  const sourceData = currentProductSummary.length > 0 ? [...currentProductSummary] : [...productSummary];

  if (sourceData.length === 0) {
    showToast('error',"Không có dữ liệu để xếp hạng.");
    return;
  }

  if (rankOption === "1") {
    sourceData.sort((a, b) => a.quantity - b.quantity);
  } else if (rankOption === "2") {
    sourceData.sort((a, b) => (a.quantity * a.price) - (b.quantity * b.price));
  }

  showProductSummary(sourceData);
}

// Hàm xếp giảm dần
function rankDown() {
  const rankOption = document.getElementById("rank_option").value;
  const sourceData = currentProductSummary.length > 0 ? [...currentProductSummary] : [...productSummary];

  if (sourceData.length === 0) {
    showToast('error',"Không có dữ liệu để xếp hạng.");
    return;
  }

  if (rankOption === "1") {
    sourceData.sort((a, b) => b.quantity - a.quantity);
  } else if (rankOption === "2") {
    sourceData.sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price));
  }

  showProductSummary(sourceData);
}

document.getElementById("search_button_rank").addEventListener("click", function () {
  const startDateValue = document.getElementById("date_start").value;
  const endDateValue = document.getElementById("date_end").value;
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];

  if (!startDateValue || !endDateValue) {
    showToast('error', "Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc.");
    return;
  }

  const startDate = new Date(startDateValue);
  const endDate = new Date(endDateValue);

  if (startDate > endDate) {
    showToast('error', "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc.");
    return;
  }

  // Lọc đơn hàng theo trạng thái và thời gian
  const filteredOrders = listOrder.filter(order => {
    const orderDate = new Date(order.timeCreate);
    return order.status === "Đã giao thành công" && orderDate >= startDate && orderDate <= endDate;
  });

  // Làm mới danh sách hiện tại
  let currentProductSummary = [];
  filteredOrders.forEach(order => {
    order.detailsOrder.forEach(product => {
      const existingProduct = currentProductSummary.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
        existingProduct.revenue += product.quantity * product.price;
      } else {
        currentProductSummary.push({
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          revenue: product.quantity * product.price,
          image: product.image || "placeholder.jpg" // Đường dẫn ảnh mặc định nếu thiếu
        });
      }
    });
  });

  // Sắp xếp sản phẩm theo số lượng bán được
  currentProductSummary.sort((a, b) => b.quantity - a.quantity);

  // Gọi hàm hiển thị sản phẩm
  if (currentProductSummary.length > 0) {
    showProductSummary(currentProductSummary);
    displayTopAndBottomSellers(currentProductSummary); // Gọi hàm trực tiếp ở đây
  } else {
    showToast('error', "Không có sản phẩm nào trong khoảng thời gian đã chọn.");
    document.getElementById("product_rank").innerHTML = `
      <tr>
        <td colspan="5">Không có dữ liệu</td>
      </tr>`;
    document.getElementById("best_seller").innerHTML = "";
    document.getElementById("worst_seller").innerHTML = "";
  }
});




document.getElementById("reset_seach2").addEventListener("click", function () {
  // Reset các ô ngày
  document.getElementById("date_start").value = "";
  document.getElementById("date_end").value = "";

  // Trả lại dữ liệu ban đầu (không có lọc theo ngày)
  let productSummary = []; // Khởi tạo danh sách sản phẩm rỗng

  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
  const filteredOrders = listOrder.filter(order => order.status === "Đã giao thành công");

  // Xử lý dữ liệu sản phẩm
  filteredOrders.forEach(order => {
    order.detailsOrder.forEach(product => {
      const existingProduct = productSummary.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
        existingProduct.revenue += product.quantity * product.price;
      } else {
        productSummary.push({
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          revenue: product.quantity * product.price,
          image: product.image || "placeholder.jpg" // Đường dẫn ảnh mặc định nếu thiếu
        });
      }
    });
  });

  // Sắp xếp danh sách giảm dần theo số lượng
  productSummary.sort((a, b) => b.quantity - a.quantity);

  // Hiển thị lại dữ liệu ban đầu
  showProductSummary(productSummary);

  // Cập nhật lại phần sản phẩm bán chạy và bán ế
  if (productSummary.length > 0) {
    displayTopAndBottomSellers(productSummary); // Gọi hàm hiển thị
  } else {
    // Nếu không có sản phẩm, xóa nội dung hiển thị
    document.getElementById("best_seller").innerHTML = "";
    document.getElementById("worst_seller").innerHTML = "";
    showToast('info', "Không có dữ liệu để hiển thị.");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu đơn hàng từ localStorage
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];

  // 1. Lọc các đơn hàng có trạng thái "Đã giao thành công"
  const successfulOrders = listOrder.filter(order => order.status === "Đã giao thành công");

  // 2. Tính tổng doanh thu cho từng gmail
  const customerRevenue = {};

  successfulOrders.forEach(order => {
    const gmail = order.gmail; // Lấy gmail khách hàng
    const total = order.total; // Tổng doanh thu từ đơn hàng

    // Gộp doanh thu vào gmail khách hàng
    if (customerRevenue[gmail]) {
      customerRevenue[gmail].revenue += total;
      customerRevenue[gmail].orders += 1; // Tăng số lượng đơn hàng
    } else {
      customerRevenue[gmail] = {
        name: order.name, // Tên khách hàng
        revenue: total,
        orders: 1
      };
    }
  });

  // 3. Chuyển đổi dữ liệu từ object thành array và sắp xếp theo doanh thu giảm dần
  const sortedCustomers = Object.entries(customerRevenue)
    .map(([gmail, data]) => ({ gmail, ...data })) // Chuyển đổi thành đối tượng
    .sort((a, b) => b.revenue - a.revenue); // Sắp xếp theo doanh thu giảm dần

  // 4. Hiển thị dữ liệu vào bảng
  const tbody = document.querySelector("#leaderboard tbody");
  tbody.innerHTML = ""; // Xóa nội dung cũ

  sortedCustomers.slice(0, 5).forEach((customer, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td> <!-- Hạng -->
        <td>${customer.name}</td> <!-- Tên người dùng -->
        <td>${customer.orders}</td> <!-- Số đơn hàng -->
        <td>${formatMoney(customer.revenue)}</td> <!-- Tổng doanh thu -->
        <td><button class="view_invoice2" onclick="viewCustomerDetails('${customer.gmail}')"><i class='bx bx-detail'></i></button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  // Lắng nghe sự kiện tìm kiếm (theo thời gian)
  document.getElementById("search_button_rank1").addEventListener("click", function () {
    const startDate = document.getElementById("date_start1").value;
    const endDate = document.getElementById("date_end1").value;

    if (!startDate || !endDate) {
      showToast('error',"Vui lòng chọn ngày bắt đầu và kết thúc.");
      return;
    }
    if (startDate > endDate) {
      showToast('error',"Ngày bắt đầu không thể lớn hơn ngày kết thúc.");
      return;
    }

    // Lọc các đơn hàng trong khoảng thời gian đã chọn
    const filteredOrders = successfulOrders.filter(order => {
      const orderDate = new Date(order.timeCreate); // Chuyển thời gian đơn hàng thành đối tượng Date
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    // Tính lại doanh thu cho từng khách hàng trong phạm vi ngày lọc
    const filteredCustomerRevenue = {};

    filteredOrders.forEach(order => {
      const gmail = order.gmail;
      const total = order.total;

      if (filteredCustomerRevenue[gmail]) {
        filteredCustomerRevenue[gmail].revenue += total;
        filteredCustomerRevenue[gmail].orders += 1;
      } else {
        filteredCustomerRevenue[gmail] = {
          name: order.name,
          revenue: total,
          orders: 1
        };
      }
    });

    // Sắp xếp lại và lấy top 5 khách hàng
    const top5Customers = Object.entries(filteredCustomerRevenue)
      .map(([gmail, data]) => ({ gmail, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Hiển thị lại bảng với top 5 khách hàng trong khoảng thời gian lọc
    tbody.innerHTML = ""; // Xóa nội dung cũ
    top5Customers.forEach((customer, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td> <!-- Hạng -->
          <td>${customer.name}</td> <!-- Tên người dùng -->
          <td>${customer.orders}</td> <!-- Số đơn hàng -->
          <td>${formatMoney(customer.revenue)}</td> <!-- Tổng doanh thu -->
          <td><button class="view_invoice2" onclick="viewCustomerDetails('${customer.gmail}')"><i class='bx bx-detail'></i></button></td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  });
});

document.getElementById("reset_seach1").addEventListener("click", function () {
  // Reset các ô ngày
  document.getElementById("date_start1").value = "";
  document.getElementById("date_end1").value = "";

  // Hiển thị lại top 5 khách hàng theo doanh thu ban đầu (không lọc theo ngày)
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
  const successfulOrders = listOrder.filter(order => order.status === "Đã giao thành công");

  const customerRevenue = {};

  successfulOrders.forEach(order => {
    const gmail = order.gmail;
    const total = order.total;

    if (customerRevenue[gmail]) {
      customerRevenue[gmail].revenue += total;
      customerRevenue[gmail].orders += 1;
    } else {
      customerRevenue[gmail] = {
        name: order.name,
        revenue: total,
        orders: 1
      };
    }
  });

  const sortedCustomers = Object.entries(customerRevenue)
    .map(([gmail, data]) => ({ gmail, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  // Hiển thị lại bảng với dữ liệu ban đầu
  const tbody = document.querySelector("#leaderboard tbody");
  tbody.innerHTML = ""; // Xóa nội dung cũ

  sortedCustomers.slice(0, 5).forEach((customer, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td> <!-- Hạng -->
        <td>${customer.name}</td> <!-- Tên người dùng -->
        <td>${customer.orders}</td> <!-- Số đơn hàng -->
        <td>${formatMoney(customer.revenue)}</td> <!-- Tổng doanh thu -->
        <td><button class="view_invoice2" onclick="viewCustomerDetails('${customer.gmail}')"><i class='bx bx-detail'></i></button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
});



function viewCustomerDetails(gmail) {
  // Lọc danh sách hóa đơn theo gmail khách hàng
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
  const customerOrders = listOrder.filter(order => order.gmail === gmail);

  if (customerOrders.length === 0) {
    showToast('error',"Không tìm thấy hóa đơn nào cho khách hàng này.");
    return;
  }

  // Cập nhật tiêu đề modal thành "Tên người dùng: [Tên khách hàng]"
  const customerName = customerOrders[0].name;  // Lấy tên khách hàng từ đơn hàng đầu tiên
  document.getElementById("name_product").textContent = `Tên người dùng: ${customerName}`;

  // Tạo danh sách hóa đơn
  let invoiceHTML = "<ul>";
  customerOrders.forEach(order => {
    invoiceHTML += `
      <li>
        Mã hóa đơn: <strong>${order.id}</strong>
        <button id="viewOrderDetails" onclick="viewOrderDetails('${order.id}')">Chi tiết</button>
      </li>`;
  });
  invoiceHTML += "</ul>";

  // Hiển thị danh sách hóa đơn trong modal
  const modal = document.getElementById("invoiceModal");
  document.getElementById("invoiceList").innerHTML = invoiceHTML;
  modal.style.display = "block";
}



document.addEventListener("DOMContentLoaded", function () {
  // Khai báo listOrder và productSummary
  const listOrder = JSON.parse(localStorage.getItem('listOrder')) || [];
  const productSummary = [];

  // Lọc các đơn hàng "Đã giao thành công"
  const filteredOrders = listOrder.filter(order => order.status === "Đã giao thành công");

  // Xử lý dữ liệu sản phẩm
  filteredOrders.forEach(order => {
    order.detailsOrder.forEach(product => {
      // Kiểm tra sản phẩm
      const existingProduct = productSummary.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += product.quantity || 0;
        existingProduct.revenue += (product.quantity || 0) * (product.price || 0);
      } else {
        productSummary.push({
          name: product.name,
          quantity: product.quantity || 0,
          price: product.price || 0,
          revenue: (product.quantity || 0) * (product.price || 0),
          image: product.image
        });
      }
    });
  });

  // Sắp xếp sản phẩm
  productSummary.sort((a, b) => {
    if (b.quantity === a.quantity) {
      return b.revenue - a.revenue;
    }
    return b.quantity - a.quantity;
  });

  // Hiển thị kết quả
  displayTopAndBottomSellers(productSummary);
});

function displayTopAndBottomSellers(productSummary) {
  // Kiểm tra danh sách rỗng
  if (!productSummary.length) {
    console.error("Không có sản phẩm nào để hiển thị.");
    return;
  }

  // Phần tử HTML
  const bestSellerElement = document.getElementById("best_seller");
  const worstSellerElement = document.getElementById("worst_seller");

  if (!bestSellerElement || !worstSellerElement) {
    console.error("Phần tử HTML không tồn tại");
    return;
  }

  // Bán chạy nhất
  const bestSeller = productSummary[0];
  bestSellerElement.innerHTML = `
    <h3>Sản phẩm bán chạy nhất</h3>
    <div class="product">
      <img  id="best_img" src="${bestSeller.image}" alt="${bestSeller.name}" />
      <p><strong>${bestSeller.name}</strong></p>
      <p>Đã bán: ${bestSeller.quantity}</p>
      <p>Doanh thu: ${formatMoney(bestSeller.revenue)}</p>
    </div>
  `;

  // Bán ế nhất
  const worstSeller = productSummary[productSummary.length - 1];
  worstSellerElement.innerHTML = `
    <h3>Sản phẩm bán ế nhất</h3>
    <div class="product">
      <img id="worst_img" src="${worstSeller.image}" alt="${worstSeller.name}" />
      <p><strong>${worstSeller.name}</strong></p>
      <p>Đã bán: ${worstSeller.quantity}</p>
      <p>Doanh thu: ${formatMoney(worstSeller.revenue)} VND</p>
    </div>
  `;
}






// -----------------------------Hiển thị tên admin ---------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Lấy thông tin userCurrent từ localStorage
  const userCurrent = JSON.parse(localStorage.getItem("userCurrent"));

  // Kiểm tra nếu tồn tại userCurrent
  if (userCurrent && userCurrent.fullName) {
    // Gán tên vào thẻ <p class="name-item">
    const nameElement = document.querySelector(".name-item");
    if (nameElement) {
      nameElement.textContent = userCurrent.fullName;
    } else {
      console.error("Thẻ <p class='name-item'> không tồn tại.");
    }
  } else {
    console.error("Không tìm thấy thông tin userCurrent hoặc không có fullName.");
  }
});





// ---------------------- Quản lý đơn hàng và phân trang -----------------------------
// Biến toàn cục để quản lý phân trang
const ITEMS_PER_PAGE = 7;  // Số đơn hàng hiển thị mỗi trang
let currentPageOrder = 1;  // Trang hiện tại

// Hiển thị danh sách đơn hàng với phân trang
function displayOrders() {
  const orderList = document.getElementById("orderList");
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
  const searchQuery = document.getElementById("orderSearchInput").value.toLowerCase();
  const filterStatus = document.getElementById("statusFilter").value;
  let startDate = document.getElementById("startDate").value; 
  let endDate = document.getElementById("endDate").value; 
  const selectedDistrict = document.getElementById("district").value;

  // Kiểm tra nếu endDate nhỏ hơn startDate, yêu cầu người dùng sửa
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    showToast('error',"Ngày bắt đầu không thể lớn hơn ngày kết thúc. Vui lòng chọn lại!");
    document.getElementById("startDate").value = '';
    document.getElementById("endDate").value = ''; 
    return; 
  }else if( endDate && new Date(endDate) > new Date()){
    showToast('error',"Ngày kết thúc không thể lớn hơn ngày hôm nay. Vui lòng chọn lại!");
    document.getElementById("endDate").value = ''; 
    return; 
  }else if( startDate && new Date(startDate) > new Date()){
    showToast('error',"Ngày bắt đầu không thể lớn hơn ngày hôm nay. Vui lòng chọn lại!");
    document.getElementById("startDate").value = ''; 
    return;
  }

  // Lọc danh sách đơn hàng dựa trên quận, trạng thái, từ khóa tìm kiếm, và khoảng thời gian
  const filteredOrders = listOrder.filter(order => {
    const matchesSearchQuery = order.id.toLowerCase().includes(searchQuery) ||
                              order.name.toLowerCase().includes(searchQuery);
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;

    // Kiểm tra khớp quận
    const matchesDistrict = selectedDistrict === "" || order.district === selectedDistrict;
    
    const orderDate = new Date(order.timeCreate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesDateRange = (!start || orderDate >= start) && (!end || orderDate <= end);

    return matchesSearchQuery && matchesStatus && matchesDateRange && matchesDistrict;
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
          <td>${order.name}</td>
          <td>${order.phone}</td>
          <td>${order.district}</td>
          <td>${formatMoney(order.total)}</td>
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
  currentPageOrder = 1;
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

    showToast('success',"Đơn hàng đã bị xóa!");
    displayOrders(); 
  } else {
    showToast('error',"Đơn hàng không bị xóa."); // Thông báo khi người dùng hủy
  }
}



// Hiển thị chi tiết đơn hàng
function viewOrderDetails(id) {
  const listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
  const order = listOrder.find(order => order.id === id);

  if (order) {
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
      <p><strong>Tình trạng:</strong> 
          <select id="statusSelect" disabled>
            <option value="Chưa xử lý" ${order.status === "Chưa xử lý" ? 'selected' : ''}>Chưa xử lý</option>
            <option value="Đã xác nhận" ${order.status === "Đã xác nhận" ? 'selected' : ''}>Đã xác nhận</option>
            <option value="Đã giao thành công" ${order.status === "Đã giao thành công" ? 'selected' : ''}>Đã giao thành công</option>
            <option value="Đã hủy" ${order.status === "Đã hủy" ? 'selected' : ''}>Đã hủy</option>
          </select>
          <button id="editBtn" onclick="toggleEditMode('${order.id}', true)">Sửa</button>
          <button id="saveBtn" onclick="toggleEditMode('${order.id}', false)" disabled>Lưu</button>
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
document.addEventListener("DOMContentLoaded", function() {
  getDataProvince();
  displayOrders();  // Hiển thị danh sách đơn hàng ngay khi tải trang
});

function logOut() {
  localStorage.removeItem('userCurrent'); // Xóa thông tin người dùng
}




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
  const time=`${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getFullYear()).slice(-2)}${String(now.getMilliseconds()).padStart(3, '0')}`;
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
const formP = document.getElementById('addProductForm');
const formTitleP = formP.querySelector('h2');
const ImageP = document.getElementById('productImageP');
const preview = document.getElementById('productPreviewImage');
var img = new Image();
img.src = "./assets/img/default.png";
const productPage = document.querySelector('.products-page');
const categoryOption = document.getElementById('productCategory');
const categoryOptionFilter = document.getElementById('productCategoryFilter');
let categories= [];
let listProduct =  [];
let editProductIndex = null; 
let filteredProducts=[];
let isFiltering = false;
const fileLabel = document.getElementById('fileNameLabel');
function toggleAddProductForm() {
  formTitleP.textContent='Thêm sản phẩm';
  Array.from(formP.elements).forEach(input=>{
      input.disabled=false;
  });
  formP.style.display = formP.style.display === 'block' ? 'none' : 'block';
  resetFormP();
}
function resetFormP() {
  document.getElementById('productName').value = ''; 
  document.getElementById('productCategory').value = "All Categories"; 

  const statusRadios = document.getElementsByName('status');
  for (let i = 0; i < statusRadios.length; i++) {
    statusRadios[i].checked = false;
  }
  document.getElementById('productDescription').value = ''; 
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
    showToast('error',"Loại sản phẩm không hợp lệ! Vui lòng nhập lại!");
    document.getElementById('productCategory').focus();
    return;
  }
  if (!isNaN(ProductName)) {
    showToast('error',"Tên sản phẩm không được chỉ toàn số! Vui lòng nhập lại!");
    document.getElementById('productName').focus();
    return;
  }
  const ProductStatus = document.querySelector('input[name="status"]:checked')?.value;
  if (!ProductStatus) {
    showToast('error',"Vui lòng chọn trạng thái!");
    document.querySelector('.form-status').focus();
    return;
  }

  const ProductDescription = document.getElementById('productDescription').value.trim();
  let ProductPrice = document.getElementById('productPrice').value.trim();
  if(listProduct.some((p,i) => p.name===ProductName && i!==editProductIndex)){
    showToast('error',"Tên sản phẩm đã tồn tại! Vui lòng chọn tên khác!");
    document.getElementById('productName').focus();
    return;
  }
  if (!ProductName) {
    showToast('error',"Tên sản phẩm không được để trống!");
    document.getElementById('productName').focus();
    return;
  }
  // Xóa số 0 ở đầu của giá thành
  if (ProductPrice.startsWith("0") && ProductPrice.length > 1) {
    ProductPrice = String(ProductPrice).replace(/^0+/, "");
    document.getElementById('productPrice').value = ProductPrice; // Cập nhật lại giá trị trong input
  }
  if (!ProductPrice || isNaN(ProductPrice)) {
    showToast('error',"Giá sản phẩm không hợp lệ! Vui lòng nhập lại!");
    document.getElementById('productPrice').focus();
    return;
  }
  if (Number(ProductPrice) < 0) {
    showToast('error',"Giá thành sản phẩm không được âm! Vui lòng nhập lại!");
    document.getElementById('productPrice').focus();
    return;
  }

  let productData = {
    name: ProductName,
    id: editProductIndex !== null ? listProduct[editProductIndex].id : randomId(listProduct.map(prod => prod.id)),
    category: selectedCategory.name,
    status: ProductStatus,
    description: ProductDescription,
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
  listProduct = JSON.parse(localStorage.getItem('listProduct')) || [];
  displayProducts(listProduct);
});
formP.addEventListener('blur',function(){
  formTitleP='Thêm sản phẩm';
});
formP.addEventListener('change',() => {
  listProduct=JSON.parse(localStorage.getItem('listProduct')) || [];
  displayProducts(listProduct);
});
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
// Lưu sản phẩm
function saveProduct(productData) {
  if (editProductIndex !== null) {
    listProduct[editProductIndex] = productData;
    showToast('success',"Sản phẩm đã được cập nhật!");
    editProductIndex = null;
  } else {
    listProduct.unshift(productData);
    showToast('success',"Sản phẩm đã được thêm!");
  }
  localStorage.setItem('listProduct', JSON.stringify(listProduct));
  cancelProduct();
}
window.addEventListener('load',updateCategoryOptions);
window.addEventListener('load',updateCategoryOptionsFilter);
// Các hàm xoá và chỉnh sửa sản phẩm
function deleteP(index) {
  listProduct.splice(index, 1);
  localStorage.setItem('listProduct', JSON.stringify(listProduct));
  listProduct = JSON.parse(localStorage.getItem('listProduct')) || [];
  showToast('success',"Sản phẩm đã bị xoá thành công!");
  displayProducts(listProduct);
}

function confirmDelete(index) {
  if (confirm("Bạn có chắc muốn xoá sản phẩm này không?")) deleteP(index);
}
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
  let product;
  if(isFiltering === true){
    product = filteredProducts[index];
  }
  if(isFiltering === false){
    product = listProduct[index];
  }
  formP.style.display = 'block';
  formTitleP.textContent = 'Xem sản phẩm'; 
  document.getElementById('productName').value = product.name;
  document.getElementById('productCategory').value = categories.find(cat => cat.name === product.category)?.id || '';
  document.querySelector(`input[name="status"][value="${product.status}"]`).checked = true;
  document.getElementById('productDescription').value = product.description;
  document.getElementById('productPrice').value = product.price;
  // Hiển thị ảnh nếu có
  if (product.image !== null && product.image !== img.src) {
    preview.src = product.image;
    preview.style.display = 'block';
    removeImageBtn.disabled=true;
  } else {
    removeImageBtn.disabled=true;
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

function displayProducts(listProduct) {
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
  updatePaginationDisplay(listProduct);
  document.getElementById('firstPageBtn').addEventListener('click', () => navigateToPage('first',listProduct));
  document.getElementById('lastPageBtn').addEventListener('click', () => navigateToPage('last',listProduct));
  const prevButton = document.getElementById('prevPageBtn');
  const nextButton = document.getElementById('nextPageBtn');
  prevButton.removeEventListener('click', handlePrevClick);
  nextButton.removeEventListener('click', handleNextClick);
  prevButton.addEventListener('click', handlePrevClick);  
  nextButton.addEventListener('click', handleNextClick);
}
document.querySelector('.list').addEventListener('click', () => {
  switchToTableView();
});
document.querySelector('.grid').addEventListener('click', () => {
  switchToGridView();
});
function handlePrevClick() {
  navigateToPage('prev', listProduct);
}

function handleNextClick() {
  navigateToPage('next', listProduct);
}
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
    <div class="product-cell id">
      <span class="cell-label">Id:</span>${product.id}
    </div>
    <div class="product-cell name">
      <span class="cell-lab">Name:</span>${product.name}
    </div>
    <div class="product-cell category">
      <span class="cell-label"> Categories:</span>${product.category}
    </div>
    <div class="product-cell status-cell">
      <span class="cell-label">Status:</span>
      <span class="${statusClass}">${product.status}</span>
    </div>
    <div class="product-cell price">
      <span class="cell-label">Price:</span>${product.price}
    </div>    
    <div class="product-cell tools" id="tool-${index}">
      <button class="tool-button" onclick="confirmDelete(${index});">Xóa</button>
      <button class="tool-button" onclick="editP(${index});">Chi tiết</button>
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
  document.querySelector('.product-cell.tools').style.display='block';//Thiếu bên main
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
const filterButton = document.querySelector('.jsFilter');
const filterWrapper = document.querySelector('.filter-menu');
if (!filterButton || !filterWrapper) {
    console.error('Không tìm thấy phần tử .jsFilter hoặc .filter-wrapper');
} else {
    filterButton.addEventListener('click', () => {
        filterWrapper.classList.toggle('active'); 
    });
    // Đóng menu khi click bên ngoài
    document.addEventListener('click', (e) => {
        if (!filterButton.contains(e.target) && !filterWrapper.contains(e.target)) {
            filterWrapper.classList.remove('active');
        }
    });
}

function navigateToPage(action,listProduct) {
  const totalPages = Math.ceil(listProduct.length / maxIndex);
  if (action === 'first') currentPageP = 1;
  else if (action === 'last') currentPageP = totalPages;
  else if (action === 'prev' && currentPageP > 1) currentPageP--;
  else if (action === 'next' && currentPageP < totalPages) currentPageP++;
  else if (typeof (action) === 'number') currentPageP = action;
  if (currentPageP < 1) currentPageP = 1;
  currentPageP = Math.min(Math.max(1, currentPageP), totalPages);
  displayProducts(listProduct);
  updatePaginationDisplay(listProduct);
}
function updatePaginationDisplay(listProduct) {
  const totalPages = Math.ceil(listProduct.length / maxIndex);  // Tổng số trang
  const pageButtonsContainer = document.querySelector('.page-numbers');
  pageButtonsContainer.innerHTML = ''; // Xóa các nút phân trang cũ

  if(listProduct.length>0)
  createPaginationButton(1, pageButtonsContainer);
  // Hiển thị các nút ở giữa nếu cần
  if (currentPageP > 4) {
      // Nếu cách xa trang đầu tiên, thêm dấu "..."
      addEllipsis(pageButtonsContainer);
  }

  // Hiển thị các nút xung quanh trang hiện tại
  for (let i = Math.max(2, currentPageP - 2); i <= Math.min(totalPages - 1, currentPageP + 2); i++) {
      createPaginationButton(i, pageButtonsContainer);
  }

  if (currentPageP < totalPages - 3) {
      // Nếu cách xa trang cuối cùng, thêm dấu "..."
      addEllipsis(pageButtonsContainer);
  }

  // Luôn hiển thị nút cho trang cuối cùng
  if (totalPages >= 1) {
      createPaginationButton(totalPages, pageButtonsContainer);
  }

  // Cập nhật trạng thái của nút "Prev" và "Next"
  const prevButton = document.getElementById('prevPageBtn');
  const nextButton = document.getElementById('nextPageBtn');

  if(prevButton) prevButton.disabled = (currentPageP === 1);
  if(nextButton) nextButton.disabled = (currentPageP === totalPages);
}

function createPaginationButton(pageNumber, container) {
  const button = document.createElement('button');
  button.textContent = pageNumber;
  button.className = 'pagination.page-numbers'; // Sử dụng class hợp lệ
  button.onclick = () => navigateToPage(pageNumber, listProduct); // Truyền mảng hiện tại
  if (pageNumber === currentPageP) {
      button.classList.add('active'); // Đánh dấu trang hiện tại
  }
  container.appendChild(button);
}

function addEllipsis(container) {
  const ellipsis = document.createElement('span');
  ellipsis.textContent = '...';
  ellipsis.className = '.pagination.page-numbers'; // Sử dụng class hợp lệ
  container.appendChild(ellipsis);
}
document.getElementById('sortByNameP').addEventListener('click', () => sortProduct('nameP'));
document.getElementById('sortByIdP').addEventListener('click', () => sortProduct('idP'));
document.getElementById('sortByCategoryP').addEventListener('click',() => sortProduct('categoryP'));
document.getElementById('sortByPriceP').addEventListener('click',()=>sortProduct('priceP'));
let sortOrderP={name:'asc',id:'asc',category:'asc',price:'asc'}
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
    if (attribute === 'priceP') {
      return order === 'asc' ? (a.price - b.price) : (b.price - a.price);
    }
    return 0;
  });
  sortOrderP[attribute]=order==='asc'?'desc':'asc';
  localStorage.setItem('listProduct', JSON.stringify(listProduct));
  displayProducts(listProduct);
}

function navigateToPageforFilter(action,filteredProducts) {
  const totalPages = Math.ceil(filteredProducts.length / maxIndex);
  if (action === 'first') currentPageP = 1;
  else if (action === 'last') currentPageP = totalPages;
  else if (action === 'prev' && currentPageP > 1) currentPageP--;
  else if (action === 'next' && currentPageP < totalPages) currentPageP++;
  else if (typeof (action) === 'number') currentPageP = action;
  if (currentPageP < 1) currentPageP = 1;
  currentPageP = Math.min(Math.max(1, currentPageP), totalPages);
  displayFilteredProducts(filteredProducts);
  updatePaginationDisplayforFilter(filteredProducts);
}
function createPaginationButtonforfilter(pageNumber, container) {
  const button = document.createElement('button');
  button.textContent = pageNumber;
  button.className = 'pagination.page-numbers'; 
  button.onclick = () => navigateToPageforFilter(pageNumber, filteredProducts); // Truyền mảng hiện tại
  if (pageNumber === currentPageP) {
      button.classList.add('active'); // Đánh dấu trang hiện tại
  }
  container.appendChild(button);
}
function updatePaginationDisplayforFilter(filteredProducts) {
  const totalPages = Math.ceil(filteredProducts.length / maxIndex);  // Tổng số trang
  const pageButtonsContainer = document.querySelector('.page-numbers');
  pageButtonsContainer.innerHTML = ''; // Xóa các nút phân trang cũ

  // Luôn hiển thị nút cho trang đầu tiên
  if(filteredProducts.length>0)
    createPaginationButtonforfilter(1, pageButtonsContainer);
  // Hiển thị các nút ở giữa nếu cần
  if (currentPageP > 4) {
      // Nếu cách xa trang đầu tiên, thêm dấu "..."
      addEllipsis(pageButtonsContainer);
  }

  // Hiển thị các nút xung quanh trang hiện tại
  for (let i = Math.max(2, currentPageP - 2); i <= Math.min(totalPages - 1, currentPageP + 2); i++) {
      createPaginationButtonforfilter(i, pageButtonsContainer);
  }

  if (currentPageP < totalPages - 3) {
      // Nếu cách xa trang cuối cùng, thêm dấu "..."
      addEllipsis(pageButtonsContainer);
  }

  // Luôn hiển thị nút cho trang cuối cùng
  if (totalPages > 1) {
      createPaginationButtonforfilter(totalPages, pageButtonsContainer);
  }

  // Cập nhật trạng thái của nút "Prev" và "Next"
  const prevButton = document.getElementById('prevPageBtn');
  const nextButton = document.getElementById('nextPageBtn');

  if(prevButton) prevButton.disabled = (currentPageP === 1);
  if(nextButton) nextButton.disabled = (currentPageP === totalPages);
}

function gotoPage() { 
  const input = document.getElementById('gotoPageInput');
  const pageNumber = parseInt(input.value, 10); // Chuyển giá trị input sang số nguyên

  // Xác định nguồn dữ liệu dựa trên trạng thái của `filteredProducts`
  const dataSource = (isFiltering===true) ? filteredProducts : listProduct;
  const totalPages = Math.ceil(dataSource.length / maxIndex); // Tính tổng số trang từ nguồn

  // Kiểm tra và điều hướng trang
  if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      navigateToPage(pageNumber, dataSource); // Điều hướng đến trang phù hợp với trạng thái
      input.value = ''; // Xóa giá trị input sau khi chuyển trang
  } else {
      // Thông báo lỗi nếu giá trị không hợp lệ
      let messagegotoPage=String(`Giá trị nhập vào phải nằm trong khoảng từ 1 đến ${totalPages}! Vui lòng nhập lại`);
      showToast('error',messagegotoPage);
      input.focus(); // Đặt lại tiêu điểm vào ô nhập
  }
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
  updatePaginationDisplayforFilter(filteredProducts);
  document.getElementById('firstPageBtn').addEventListener('click', () => navigateToPageforFilter('first',filteredProducts));
  document.getElementById('lastPageBtn').addEventListener('click', () => navigateToPageforFilter('last',filteredProducts));
  document.getElementById('firstPageBtn').addEventListener('click', () => navigateToPageforFilter('first',filteredProducts));
  document.getElementById('lastPageBtn').addEventListener('click', () => navigateToPageforFilter('last',filteredProducts));
  const prevButton = document.getElementById('prevPageBtn');
  const nextButton = document.getElementById('nextPageBtn');
  prevButton.removeEventListener('click', handlePrevClickforfilter);
  nextButton.removeEventListener('click', handleNextClickforfilter);
  prevButton.addEventListener('click', handlePrevClickforfilter);  
  nextButton.addEventListener('click', handleNextClickforfilter);
}
function handlePrevClickforfilter() {
  navigateToPageforFilter('prev', filteredProducts);
}

function handleNextClickforfilter() {
  navigateToPageforFilter('next', filteredProducts);
}
const statusOption = document.getElementById('statusOption');
const resetFilterButton = document.getElementById('resetFilter');
const applyFilterButton = document.getElementById('applyFilter');
const SearchInputP=document.getElementById('search-product');
function searchProducts() {
  categoryOptionFilterChoose.value = "All Categories";
    statusOption.value = "All Status";
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
  const searchInputValue = SearchInputP.value.toLowerCase().trim(); 
  if (!searchInputValue) {
      filteredProducts = [...listProduct]; // Lấy toàn bộ sản phẩm
      currentPageP = 1
      displayProducts(listProduct); 
      return;
  }
  const searchTerms = searchInputValue.split(/\s+/); // Tách chuỗi tìm kiếm thành các từ khóa

  filteredProducts = listProduct.filter(product => {
      // Kiểm tra nếu tất cả các từ khóa đều phù hợp với ít nhất một thuộc tính
      return searchTerms.every(term => {
          return (
              product.name.toLowerCase().includes(term) ||
              product.id.toLowerCase().includes(term) 
          );
      });
  });
  isFiltering=true;
  displayFilteredProducts(filteredProducts); // Hiển thị sản phẩm đã lọc
}
// Gắn sự kiện cho ô tìm kiếm sản phẩm
const searchProduct = document.getElementById('search-product');
searchProduct.addEventListener('input', searchProducts);
if(searchProduct.value === null){
  document.getElementById('gotoPageBtn').addEventListener('click',gotoPage);
}else{
  document.getElementById('gotoPageBtn').addEventListener('click',gotoPage);
}
const categoryOptionFilterChoose=document.getElementById('productCategoryFilter');
function filterProducts() {
    SearchInputP.value = '';
    filteredProducts = [...listProduct];
    let minPriceInput = document.getElementById('minPrice').value.trim();
    let maxPriceInput = document.getElementById('maxPrice').value.trim();

    // Loại bỏ các số 0 ở đầu nếu là chuỗi hợp lệ
    minPriceInput = minPriceInput.replace(/^0+/, "") || "0";
    maxPriceInput = maxPriceInput.replace(/^0+/, "") || "Infinity";

    // Chuyển đổi giá trị sang số
    const minPrice = parseFloat(minPriceInput);
    const maxPrice = parseFloat(maxPriceInput);

    // Kiểm tra giá trị hợp lệ của minPrice và maxPrice
    if (isNaN(minPrice)) {
        showToast('error',"Giá nhỏ nhất không hợp lệ! Vui lòng nhập lại!");
        document.getElementById('minPrice').focus();
        return;
    }
    if (minPrice < 0) {
        showToast('error',"Giá nhỏ nhất không được âm! Vui lòng nhập lại");
        document.getElementById('minPrice').focus();
        return;
    }
    if (isNaN(maxPrice)) {
        showToast('error',"Giá lớn nhất không hợp lệ! Vui lòng nhập lại!");
        document.getElementById('maxPrice').focus();
        return;
    }
    if (maxPrice < 0) {
        showToast('error',"Giá lớn nhất không được âm! Vui lòng nhập lại!");
        document.getElementById('maxPrice').focus();
        return;
    }
    if (minPrice > maxPrice) {
        showToast('error',"Giá lớn nhất không được nhỏ hơn giá nhỏ nhất! Vui lòng nhập lại!");
        document.getElementById('maxPrice').focus();
        return;
    }
  listProduct=JSON.parse(localStorage.getItem('listProduct')) || [];
  categories=JSON.parse(localStorage.getItem('categories')) || [];
  const CategoryId = categoryOptionFilterChoose.value;
  let selectedCategoryId = "All Categories";  
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
  isFiltering=true;
  //Lọc theo giá
  filteredProducts = filteredProducts.filter(product => parseFloat(product.price) >= minPrice && parseFloat(product.price) <= maxPrice);
  displayFilteredProducts(filteredProducts); 
}
SearchInputP.addEventListener('input', searchProducts);
applyFilterButton.addEventListener('click', filterProducts);
resetFilterButton.addEventListener('click', () => {
  categoryOptionFilterChoose.value = "All Categories";
  statusOption.value = "All Status";
  document.getElementById('minPrice').value='';
  document.getElementById('maxPrice').value='';
  // Reset filteredProducts và trạng thái lọc
  filteredProducts = []; // Reset filteredProducts về mảng trống
  isFiltering = false; // Đặt lại trạng thái lọc
  listProduct = JSON.parse(localStorage.getItem('listProduct')) || [];
  // Hiển thị lại toàn bộ sản phẩm
  displayProducts(listProduct); 
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
listProduct = JSON.parse(localStorage.getItem('listProduct')) || [];
window.onload =  displayProducts(listProduct);

//PRODUCT
//CATEGORY
const formC = document.getElementById('categoryForm');
formC.addEventListener('blur', updateCategoryOptions);
formC.addEventListener('blur', updateCategoryOptionsFilter);
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
  formTitleC.textContent = "Thêm loại sản phẩm";
  resetForm();
}
document.getElementById('openCategoryForm').addEventListener('click',toggleAddCategoryForm);
document.getElementById('cancelCategoryInput').addEventListener('click',cancelCategory);
Submit.addEventListener('click', function (event) {
  event.preventDefault();
  const Categoryname = document.getElementById('categoryName').value.trim();
  const Categorydescription = document.getElementById('categoryDescription').value.trim();
  if((Categoryname !== "Bánh kem") && (Categoryname !== "Bánh mì que") && (Categoryname !== "Bánh lạnh") && (Categoryname !== "Bánh nướng") && (Categoryname !== "Bánh quy")){
    showToast('error',"Không thể nhập loại bánh khác ngoại trừ các loại bánh sau: Bánh kem, Bánh mì que, Bánh lạnh, Bánh nướng, Bánh quy! Vui lòng nhập lại!");
    document.getElementById('categoryName').focus();
      return;
  }
  // Kiểm tra nếu đang chỉnh sửa một loại sản phẩm
  if (editCategoryIndex !== null) {
    
      const oldCategoryName = categories[editCategoryIndex].name; // Lưu lại tên loại cũ

      // Cập nhật thông tin loại sản phẩm
      categories[editCategoryIndex].name = Categoryname;
      categories[editCategoryIndex].description = Categorydescription;

      // Cập nhật tên loại trong danh sách sản phẩm
      listProduct = listProduct.map(product => {
          if (product.category === oldCategoryName) {
              product.category = Categoryname; // Thay đổi tên loại cũ bằng tên mới
          }
          return product;
      });

      // Lưu lại danh sách sản phẩm vào localStorage
      localStorage.setItem('listProduct', JSON.stringify(listProduct));
      localStorage.setItem('categories', JSON.stringify(categories));

      showToast('success', "Loại sản phẩm đã được cập nhật và các sản phẩm liên quan cũng đã được thay đổi!");
  }
      // Xử lý thêm mới loại sản phẩm
      if (categories.some((c, i) => c.name === Categoryname && i !== editProductIndex)) {
          showToast('error', "Tên loại sản phẩm đã tồn tại! Vui lòng chọn tên khác!");
          document.getElementById('categoryName').focus();
          return;
      }
      if (!isNaN(Categoryname)) {
          showToast('error', "Tên loại sản phẩm không được chỉ toàn số! Vui lòng nhập lại!");
          document.getElementById('categoryName').focus();
          return;
      }

      // Tạo loại sản phẩm mới
      const category = {
          id: randomId(categories.map(cat => cat.id)),
          name: Categoryname,
          description: Categorydescription
      };
      categories.unshift(category);

      // Lưu danh sách loại sản phẩm vào localStorage
      localStorage.setItem('categories', JSON.stringify(categories));

      showToast('success', "Đã thêm thành công!");
  formC.reset();
  formC.style.display='none';
  // Cập nhật giao diện sau khi thay đổi
  displayCategories(categories); // Cập nhật danh sách loại sản phẩm
  displayProducts(listProduct); // Cập nhật danh sách sản phẩm
});
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
            <div class="categories-cell tool">
                <button class="tool-button" onclick="confirmDeleteC(${index});">Xóa</button>
                <button class="tool-button" onclick="editC(${index});">Chi tiết</button>
    `;
    categoryPage.appendChild(categoryItem);
}
displayCategories();
function loadCategory(){
    if (localStorage.getItem("categories") === null) {
      categories = [
          { "id" : "A4TC271124346", "name" : "Bánh kem", "description" : "" },
          { "id" : "BVSW271124272", "name" : "Bánh lạnh", "description": "" },
          { "id" : "6I9O271124822", "name" : "Bánh nướng", "description" : "" },
          { "id" : "NMWR271124205", "name" : "Bánh quy", "description" : "" },
          { "id" : "L2BA271124222", "name" : "Bánh mì que", "description" : "" }
      ];
      localStorage.setItem("categories", JSON.stringify(categories));
    }
    categories = JSON.parse(localStorage.getItem('categories'));
    displayCategories();
}
window.onload = loadCategory();
function deleteC(index){
  let categoryDelete=categories[index];
  categories = categories.filter(category => category.id !== categoryDelete.id);
  localStorage.setItem('categories', JSON.stringify(categories));
  listProduct = listProduct.filter(product => product.category !== categoryDelete.name);
  localStorage.setItem('listProduct',JSON.stringify(listProduct));
  showToast('success',"Loại sản phẩm đã bị xoá thành công!");
  updateCategoryOptions();
  listProduct=JSON.parse(localStorage.getItem('listProduct')) || [];
  displayProducts(listProduct); 
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
let sortOrderC={name:'asc',id:'asc'};
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
    // Kiểm tra nếu tất cả các từ khóa đều phù hợp với ít nhất một thuộc tính
    return searchTerms.every(term => {
      return (
        category.name.toLowerCase().includes(term) ||
        category.id.toLowerCase().includes(term) 
      );
    });
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
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
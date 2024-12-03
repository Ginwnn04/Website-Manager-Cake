document.addEventListener("DOMContentLoaded", () => {
    
    let userData = JSON.parse(localStorage.getItem("userCurrent"));
    let listUser=JSON.parse(localStorage.getItem("listUser"))

    if (!userData) {
        showToast("warning", "Bạn chưa đăng nhập!");
        window.location.href = "index.html";
        return;
    }

    // Hiển thị thông tin cá nhân từ localStorage
    const populateUserInfo = () => {
        document.getElementById("user-name").value = userData.fullName;
        document.getElementById("user-phone").value = userData.phone;
        document.getElementById("user-gmail").value = userData.gmail;
        document.getElementById("address-summary").value = userData.address || "Chưa cập nhật";
        document.getElementById("street").value = userData.street;
        if (userData.provinceId) {
            document.getElementById("province").value = userData.provinceId;
            loadDistricts(userData.provinceId, userData.districtId, userData.wardId);
        }
    };
    
    async function fetchAPI(url) {
        try {
            const response = await fetch(url);
    
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status} - URL: ${url}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();

            return Array.isArray(result) ? result : result.data || [];
        } catch (error) {
            console.error("Error fetching data from API:", error, "URL:", url);
            return [];
        }
    }
    

    function populateSelect(element, data, textKey, valueKey) {

        if (data.length === 0) {
            console.warn(`No data available for dropdown: ${element.id}`);
        }
        element.innerHTML = '<option value="">Chọn</option>';
        data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item[valueKey];
            option.textContent = item[textKey];
            element.appendChild(option);
        });
    }
    

    // Khởi tạo danh sách tỉnh
    async function initializeProvinces() {
        const provinces = await fetchAPI("https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/province");
        populateSelect(document.getElementById("province"), provinces, "name", "idProvince");

        if (userData.provinceId) {
            document.getElementById("province").value = userData.provinceId;
            await loadDistricts(userData.provinceId, userData.districtId, userData.wardId);
        }
    }

    // Load danh sách quận/huyện
    async function loadDistricts(provinceCode, selectedDistrictCode, selectedWardCode) {
        const districts = await fetchAPI(`https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/district?idProvince=${provinceCode}`);
        populateSelect(document.getElementById("district"), districts, "name", "idDistrict");

        if (selectedDistrictCode) {
            document.getElementById("district").value = selectedDistrictCode;
            await loadWards(selectedDistrictCode, selectedWardCode);
        }
    }

    // Load danh sách phường/xã
    async function loadWards(districtCode, selectedWardCode) {
        listWard = await fetchAPI(`https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/commune?idDistrict=${districtCode}`);
        populateSelect(document.getElementById("ward"), listWard, "name", "idCommune");

        if (selectedWardCode) {
            document.getElementById("ward").value = selectedWardCode;
        }
    }

    // Cập nhật địa chỉ tóm tắt
    function updateAddressSummary() {
        const street = document.getElementById("street").value.trim() || "";
        const province = document.getElementById("province").options[document.getElementById("province").selectedIndex]?.text || "";
        const district = document.getElementById("district").options[document.getElementById("district").selectedIndex]?.text || "";
        const ward = document.getElementById("ward").options[document.getElementById("ward").selectedIndex]?.text || "";
    
        const addressSummary = `${province}, ${district}, ${ward}, ${street}`.replace(/, ,/g, ',').trim();
        document.getElementById("address-summary").value = addressSummary || "Chưa cập nhật";
    
        // Lưu địa chỉ vào userCurrent
        userData.address = addressSummary;
        userData.provinceId = document.getElementById("province").value;
        userData.districtId = document.getElementById("district").value;
        userData.wardId = document.getElementById("ward").value;
        userData.street = document.getElementById("street").value;
    
        localStorage.setItem("userCurrent", JSON.stringify(userData));
    }
    

    // thay đổi tỉnh
    document.getElementById("province").addEventListener("change", async (event) => {
        const provinceCode = event.target.value;
        document.getElementById("district").innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        document.getElementById("ward").innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (provinceCode) {
            await loadDistricts(provinceCode);
        }
    });

    // thay đổi quận/huyện
    document.getElementById("district").addEventListener("change", async (event) => {
        const districtCode = event.target.value;
        document.getElementById("ward").innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (districtCode) {
            await loadWards(districtCode);
        }
    });

// chỉnh sửa thông tin
document.getElementById("edit-btn").addEventListener("click", () => {
    const editButton = document.getElementById("edit-btn");
    const isEditing = editButton.textContent === "Sửa";

    if (isEditing) {
        editButton.textContent = "Lưu";
    } else {
        if (!validateForm()) {
            return;
        }

        // Lấy giá trị từ form
        const name = document.getElementById("user-name").value.trim();
        const phone = document.getElementById("user-phone").value.trim();
        const provinceId = document.getElementById("province").value;
        const districtId = document.getElementById("district").value;
        const wardId = document.getElementById("ward").value;
        const street = document.getElementById("street").value;

        // Cập nhật thông tin người dùng
        userData.fullName = name;
        userData.phone = phone;
        userData.provinceId = provinceId;
        userData.districtId = districtId;
        userData.wardId = wardId;
        userData.street = street;

        updateAddressSummary();

        let listUser = JSON.parse(localStorage.getItem("listUser")) || [];

        listUser = listUser.map(user => {
            if (user.gmail === userData.gmail) {
                return { ...userData };
            }
            return user;
        });

        localStorage.setItem("listUser", JSON.stringify(listUser));
        localStorage.setItem("userCurrent", JSON.stringify(userData));

        showToast("success", "Thông tin đã được cập nhật!");

        editButton.textContent = "Sửa";
    }

    // Gmail luôn luôn không thể chỉnh sửa
    document.getElementById("user-gmail").disabled = true;

    const inputs = document.querySelectorAll("#info-form input, #info-form select");
    const addressFields = document.getElementById("address-fields");
    const addressSummary = document.getElementById("address-summary");

    addressFields.style.display = isEditing ? "flex" : "none";
    addressSummary.style.display = isEditing ? "none" : "block";

    inputs.forEach((input) => {
        if (input.id !== "user-gmail") {
            input.disabled = !isEditing;
        }
    });

    function validateForm() {
        const name = document.getElementById("user-name").value.trim();
        const phone = document.getElementById("user-phone").value.trim();
        const provinceId = document.getElementById("province").value;
        const districtId = document.getElementById("district").value;
        const wardId = document.getElementById("ward").value;
        const street = document.getElementById("street").value;

        if (!name) {
            showToast("error", "Tên không được để trống.");
            return false;
        }
        const phonePattern = /^[0-9]{10,15}$/;
        if (!phonePattern.test(phone)) {
            showToast("error", "Số điện thoại không hợp lệ. Vui lòng nhập lại.");
            return false;
        }
        if (!provinceId || !districtId || !wardId || !street) {
            showToast("warning", "Vui lòng chọn đầy đủ thông tin địa chỉ.");
            return false;
        }
        return true;
    }
});

    
    function loadDataUserCurrent() {
        userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
    
        if (!userCurrent) {
            const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
            userCurrent = registeredUsers.find(user => user.username === (userCurrent?.username || ""));
        }
    
        if (userCurrent) {
            localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
        }
    }
    
// Kiểm tra và gán sự kiện nếu phần tử tồn tại
const changePasswordBtn = document.getElementById("change-password-btn");
const cancelChangePasswordBtn = document.getElementById("cancel-change-password-btn");
const savePasswordBtn = document.getElementById("save-password-btn");
const changePasswordForm = document.getElementById("change-password-form");
const overlay = document.getElementById("overlay");

if (changePasswordBtn && cancelChangePasswordBtn && savePasswordBtn && changePasswordForm && overlay) {

    changePasswordBtn.addEventListener("click", () => {
        changePasswordForm.style.display = "block";
        overlay.style.display = "block";
    });

    cancelChangePasswordBtn.addEventListener("click", () => {
        changePasswordForm.style.display = "none";
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", () => {
        changePasswordForm.style.display = "none";
        overlay.style.display = "none";
    });

    savePasswordBtn.addEventListener("click", () => {
        const currentPassword = document.getElementById("current-password").value.trim();
        const newPassword = document.getElementById("new-password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        
        const userData = JSON.parse(localStorage.getItem("userCurrent") || "{}");
        const listUser = JSON.parse(localStorage.getItem("listUser") || "[]");

        
        if (!userData || !userData.password) {
            showToast("error", "Không tìm thấy thông tin người dùng hiện tại!");
            return;
        }

        
        if (currentPassword !== userData.password) {
            showToast("error", "Mật khẩu hiện tại không chính xác!");
            return;
        }

        
        if (newPassword === currentPassword) {
            showToast("error", "Mật khẩu mới không được trùng với mật khẩu cũ!");
            return;
        }

        
        if (newPassword.length < 6) {
            showToast("error", "Mật khẩu mới phải có ít nhất 6 ký tự!");
            return;
        }

        
        if (newPassword !== confirmPassword) {
            showToast("error", "Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        
        userData.password = newPassword;

        const userIndex = listUser.findIndex(user => user.gmail === userData.gmail);
        if (userIndex !== -1) {
            listUser[userIndex].password = newPassword;
        } else {
            showToast("error", "Không tìm thấy người dùng trong danh sách!");
            return;
        }

        
        localStorage.setItem("userCurrent", JSON.stringify(userData));
        localStorage.setItem("listUser", JSON.stringify(listUser));

        
        changePasswordForm.style.display = "none";
        overlay.style.display = "none";
        showToast("success", "Mật khẩu đã được thay đổi thành công!");
    });
} else {
    console.error("Một hoặc nhiều phần tử không tồn tại trong DOM!");
}

    // Xử lý sự kiện chuyển tab
    const menuButtons = document.querySelectorAll(".menu-btn");
    const sections = document.querySelectorAll("section");

    menuButtons.forEach((button) => {
        button.addEventListener("click", () => {
            menuButtons.forEach((btn) => btn.classList.remove("active"));
            sections.forEach((section) => section.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(button.dataset.tab).classList.add("active");

            myListOrder();
        });
    });

    // Xử lý quay về trang chủ
    document.querySelector(".return-home-btn").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Khởi tạo dữ liệu
    initializeProvinces();
    populateUserInfo();
});

// Danh sách don hang

function myListOrder() {
    const body = document.querySelector('tbody');
    const listOrder = JSON.parse(localStorage.getItem('listOrder'));
    const userLogin = JSON.parse(localStorage.getItem('userCurrent'));
    myOrder = listOrder.filter(order => order.gmail === userLogin.gmail);
    renderData(1);
    renderButtonPage(myOrder);
}


function renderButtonPage(myOrder) {
    document.querySelector('.group-btn').innerHTML = "";
    totalPage = Math.ceil(myOrder.length / 10);
    console.log(myOrder.length, totalPage);
    for (let i = 1; i <= totalPage; i++) {
        if (i === 1) {
            document.querySelector('.group-btn').innerHTML += `<button class="btn-active" onclick="loadPage(this)">${i}</button>`;
        }
        else {
            document.querySelector('.group-btn').innerHTML += `<button onclick="loadPage(this)">${i}</button>`;
        }
    }
}

function loadPage(obj) {
    const currentPage = parseInt(obj.textContent);
    renderData(currentPage);
}

function renderData(currentPage) {
    let start = (currentPage - 1) * 10;
    let end = currentPage * 10;
    if (end > myOrder.length) { 
        end = myOrder.length;
    }
    document.querySelector('tbody').innerHTML = '';
    for (let i = start; i < end; i++) {
        document.querySelector('tbody').innerHTML += `<tr>
                        <td>${myOrder[i].id}</td>
                        <td>${myOrder[i].total}</td>
                        <td>${myOrder[i].timeCreate}</td>
                        <td>${myOrder[i].status}</td>
                    </tr>`;
    }
}
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
  
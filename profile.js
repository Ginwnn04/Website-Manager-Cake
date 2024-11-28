document.addEventListener("DOMContentLoaded", () => {
    // Lấy thông tin người dùng từ localStorage
    let userData = JSON.parse(localStorage.getItem("userCurrent"));

    // Kiểm tra nếu chưa đăng nhập
    if (!userData) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "index.html";
        return;
    }

    // Hiển thị thông tin cá nhân từ localStorage
    const populateUserInfo = () => {
        document.getElementById("user-name").value = userData.fullName || "Chưa cập nhật";
        document.getElementById("user-phone").value = userData.phone || "Chưa cập nhật";
        document.getElementById("user-email").value = userData.email || "Chưa cập nhật";
        document.getElementById("user-password").value = userData.password || "";
        document.getElementById("address-summary").value = userData.address || "Chưa cập nhật";

        if (userData.provinceId) {
            document.getElementById("province").value = userData.provinceId;
            loadDistricts(userData.provinceId, userData.districtId, userData.wardId);
        }
    };
    document.getElementById('toggle-password').addEventListener('click', function() {
        var passwordField = document.getElementById('user-password');
        var passwordFieldType = passwordField.type;
    
        // Chuyển đổi giữa password và text
        if (passwordFieldType === "password") {
            passwordField.type = "text";
        } else {
            passwordField.type = "password";
        }
    });
    
    
    // Hàm fetch API với log chi tiết
    async function fetchAPI(url) {
        try {
            console.log("Fetching data from:", url);
            const response = await fetch(url);
    
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status} - URL: ${url}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log("Raw API response:", result);
    
            // Trả về mảng trực tiếp nếu API không có thuộc tính `data`
            return Array.isArray(result) ? result : result.data || [];
        } catch (error) {
            console.error("Error fetching data from API:", error, "URL:", url);
            return [];
        }
    }
    

    function populateSelect(element, data, textKey, valueKey) {
        console.log("Populating dropdown:", element.id, "with data:", data);
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
    
        // Lưu địa chỉ và các mã liên quan vào userCurrent
        userData.address = addressSummary;
        userData.provinceId = document.getElementById("province").value;
        userData.districtId = document.getElementById("district").value;
        userData.wardId = document.getElementById("ward").value;
    
        localStorage.setItem("userCurrent", JSON.stringify(userData));
    }
    

    // Xử lý sự kiện thay đổi tỉnh
    document.getElementById("province").addEventListener("change", async (event) => {
        const provinceCode = event.target.value;
        console.log("Province selected:", provinceCode);
        document.getElementById("district").innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        document.getElementById("ward").innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (provinceCode) {
            await loadDistricts(provinceCode);
        }
    });

    // Xử lý sự kiện thay đổi quận/huyện
    document.getElementById("district").addEventListener("change", async (event) => {
        const districtCode = event.target.value;
        console.log("District selected:", districtCode);
        document.getElementById("ward").innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (districtCode) {
            await loadWards(districtCode);
        }
    });

    /// Xử lý sự kiện chỉnh sửa thông tin
document.getElementById("edit-btn").addEventListener("click", () => {
    const editButton = document.getElementById("edit-btn");
    const isEditing = editButton.textContent === "Sửa";
    editButton.textContent = isEditing ? "Lưu" : "Sửa";

    const inputs = document.querySelectorAll("#info-form input, #info-form select");
    const addressFields = document.getElementById("address-fields");
    const addressSummary = document.getElementById("address-summary");

    
    document.getElementById("user-email").disabled = true; // Email luôn luôn không thể chỉnh sửa

    addressFields.style.display = isEditing ? "flex" : "none";
    addressSummary.style.display = isEditing ? "none" : "block";

    // Chỉ bật/tắt các trường nhập liệu khác ngoài email
    inputs.forEach((input) => {
        if (input.id !== "user-email") { // Đảm bảo email không bị thay đổi
            input.disabled = !isEditing;
        }
    });

    if (!isEditing) {
        // Cập nhật thông tin cá nhân
        userData.fullName = document.getElementById("user-name").value.trim();
        userData.phone = document.getElementById("user-phone").value.trim();
        userData.provinceId = document.getElementById("province").value;
        userData.districtId = document.getElementById("district").value;
        userData.wardId = document.getElementById("ward").value;

        // Lưu mật khẩu mới nếu có thay đổi
        const newPassword = document.getElementById("user-password").value.trim();
        if (newPassword) {
            userData.password = newPassword;  // Lưu mật khẩu vào userData
        }

        updateAddressSummary();

        // Đồng bộ với danh sách người dùng đã đăng ký
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const userIndex = registeredUsers.findIndex(user => user.username === userData.username);
        if (userIndex !== -1) {
            registeredUsers[userIndex] = { ...userData };
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
        }

        // Lưu thông tin cập nhật vào localStorage
        localStorage.setItem("userCurrent", JSON.stringify(userData));
        alert("Thông tin đã được cập nhật!");
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
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    myOrder = listOrder.filter(order => order.account === userLogin.username);
    renderData(1);
    renderButtonPage(myOrder);
}


function renderButtonPage(myOrder) {
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
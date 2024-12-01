document.addEventListener("DOMContentLoaded", () => {
    // Lấy thông tin người dùng từ localStorage
    let userData = JSON.parse(localStorage.getItem("userCurrent"));
    let listUser=JSON.parse(localStorage.getItem("listUser"))

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
        document.getElementById("user-email").value = userData.gmail || "Chưa cập nhật";
        document.getElementById("address-summary").value = userData.address || "Chưa cập nhật";

        if (userData.provinceId) {
            document.getElementById("province").value = userData.provinceId;
            loadDistricts(userData.provinceId, userData.districtId, userData.wardId);
        }
    };
    
    
    // Hàm fetch API với log chi tiết
    async function fetchAPI(url) {
        try {
            // console.log("Fetching data from:", url);
            const response = await fetch(url);
    
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status} - URL: ${url}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            // console.log("Raw API response:", result);
    
            // Trả về mảng trực tiếp nếu API không có thuộc tính `data`
            return Array.isArray(result) ? result : result.data || [];
        } catch (error) {
            console.error("Error fetching data from API:", error, "URL:", url);
            return [];
        }
    }
    

    function populateSelect(element, data, textKey, valueKey) {
        // console.log("Populating dropdown:", element.id, "with data:", data);
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
        userData.street = document.getElementById("street").value;
    
        localStorage.setItem("userCurrent", JSON.stringify(userData));
    }
    

    // Xử lý sự kiện thay đổi tỉnh
    document.getElementById("province").addEventListener("change", async (event) => {
        const provinceCode = event.target.value;
        // console.log("Province selected:", provinceCode);
        document.getElementById("district").innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        document.getElementById("ward").innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (provinceCode) {
            await loadDistricts(provinceCode);
        }
    });

    // Xử lý sự kiện thay đổi quận/huyện
    document.getElementById("district").addEventListener("change", async (event) => {
        const districtCode = event.target.value;
        // console.log("District selected:", districtCode);
        document.getElementById("ward").innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (districtCode) {
            await loadWards(districtCode);
        }
    });

 // Xử lý sự kiện chỉnh sửa thông tin
document.getElementById("edit-btn").addEventListener("click", () => {
    const editButton = document.getElementById("edit-btn");
    const isEditing = editButton.textContent === "Sửa";
    editButton.textContent = isEditing ? "Lưu" : "Sửa";  // Chuyển đổi giữa Sửa và Lưu

    const inputs = document.querySelectorAll("#info-form input, #info-form select");
    const addressFields = document.getElementById("address-fields");
    const addressSummary = document.getElementById("address-summary");

    // Email luôn luôn không thể chỉnh sửa
    document.getElementById("user-email").disabled = true;

    // Chỉ bật/tắt các trường nhập liệu khác ngoài email
    addressFields.style.display = isEditing ? "flex" : "none";
    addressSummary.style.display = isEditing ? "none" : "block";

    // Chỉ bật/tắt các trường nhập liệu khác ngoài email
    inputs.forEach((input) => {
        if (input.id !== "user-email") { // Đảm bảo email không bị thay đổi
            input.disabled = !isEditing;
        }
    });

    if (!isEditing) {
        // Lấy giá trị từ form
        const name = document.getElementById("user-name").value.trim();
        const phone = document.getElementById("user-phone").value.trim();
        const provinceId = document.getElementById("province").value;
        const districtId = document.getElementById("district").value;
        const wardId = document.getElementById("ward").value;

        // Lưu mật khẩu mới nếu có thay đổi
        // const newPassword = document.getElementById("user-password").value.trim();
        // if (newPassword) {
        //     if (newPassword.length < 6) { // Kiểm tra độ dài mật khẩu
        //         alert("Mật khẩu phải có ít nhất 6 ký tự!");
        //         return;
        //     }
        //     userData.password = newPassword;  // Lưu mật khẩu vào userData
        // }

        // Cập nhật thông tin người dùng
        userData.fullName = name;
        userData.phone = phone;
        userData.provinceId = provinceId;
        userData.districtId = districtId;
        userData.wardId = wardId;

        // Cập nhật địa chỉ tóm tắt
        updateAddressSummary();

        // Đồng bộ với danh sách người dùng trong listUser
        let listUser = JSON.parse(localStorage.getItem("listUser")) || [];

        // Sử dụng map để cập nhật người dùng trong listUser
        listUser = listUser.map(user => {
            if (user.email === userData.email) {
                return { ...userData };  // Cập nhật thông tin người dùng trong danh sách
            }
            return user;  // Giữ nguyên các người dùng khác
        });

        // Lưu lại danh sách người dùng đã cập nhật vào localStorage
        localStorage.setItem("listUser", JSON.stringify(listUser));

        // Lưu thông tin cập nhật vào localStorage
        localStorage.setItem("userCurrent", JSON.stringify(userData));

        // Console log để kiểm tra
        console.log("Updated userData: ", userData);  // Kiểm tra thông tin người dùng sau khi cập nhật
        console.log("Updated listUser: ", listUser);  // Kiểm tra danh sách người dùng sau khi cập nhật

        alert("Thông tin đã được cập nhật!");
    }
});


console.log("Updated userData: ", userData);  // Kiểm tra thông tin người dùng sau khi cập nhật
console.log("Updated registeredUsers: ", listUser);  // Kiểm tra danh sách người dùng sau khi cập nhật

    
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
    // Lắng nghe sự kiện khi người dùng nhấn vào nút "Đổi mật khẩu"
    changePasswordBtn.addEventListener("click", () => {
        changePasswordForm.style.display = "block";
        overlay.style.display = "block";
    });

    // Lắng nghe sự kiện khi người dùng nhấn vào nút "Hủy"
    cancelChangePasswordBtn.addEventListener("click", () => {
        changePasswordForm.style.display = "none";
        overlay.style.display = "none";
    });

    // Lắng nghe sự kiện khi người dùng nhấn vào lớp nền mờ
    overlay.addEventListener("click", () => {
        changePasswordForm.style.display = "none";
        overlay.style.display = "none";
    });

    // Lắng nghe sự kiện khi người dùng nhấn vào nút "Lưu"
    savePasswordBtn.addEventListener("click", () => {
        const currentPassword = document.getElementById("current-password").value.trim();
        const newPassword = document.getElementById("new-password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        // Lấy dữ liệu từ localStorage
        const userData = JSON.parse(localStorage.getItem("userCurrent") || "{}");
        const listUser = JSON.parse(localStorage.getItem("listUser") || "[]");

        // Kiểm tra dữ liệu userCurrent
        if (!userData || !userData.password) {
            alert("Không tìm thấy thông tin người dùng hiện tại!");
            return;
        }

        // Kiểm tra mật khẩu hiện tại
        if (currentPassword !== userData.password) {
            alert("Mật khẩu hiện tại không chính xác!");
            return;
        }

        // Kiểm tra mật khẩu mới không được trùng với mật khẩu cũ
        if (newPassword === currentPassword) {
            alert("Mật khẩu mới không được trùng với mật khẩu cũ!");
            return;
        }

        // Kiểm tra độ dài mật khẩu mới
        if (newPassword.length < 6) {
            alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
            return;
        }

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        // Cập nhật mật khẩu mới
        userData.password = newPassword;

        const userIndex = listUser.findIndex(user => user.email === userData.email);
        if (userIndex !== -1) {
            listUser[userIndex].password = newPassword;
        } else {
            alert("Không tìm thấy người dùng trong danh sách!");
            return;
        }

        // Lưu dữ liệu mới vào localStorage
        localStorage.setItem("userCurrent", JSON.stringify(userData));
        localStorage.setItem("listUser", JSON.stringify(listUser));

        // Ẩn form đổi mật khẩu và thông báo
        changePasswordForm.style.display = "none";
        overlay.style.display = "none";
        alert("Mật khẩu đã được thay đổi thành công!");
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
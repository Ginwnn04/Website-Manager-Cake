document.addEventListener("DOMContentLoaded", () => {
    // Lấy thông tin người dùng từ localStorage
    let userData = JSON.parse(localStorage.getItem("userLogin"));

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
        document.getElementById("address-summary").value = userData.address || "Chưa cập nhật";

        if (userData.provinceId) {
            document.getElementById("province").value = userData.provinceId;
            loadDistricts(userData.provinceId, userData.districtId, userData.wardId);
        }
    };

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
        const wards = await fetchAPI(`https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/commune?idDistrict=${districtCode}`);
        populateSelect(document.getElementById("ward"), wards, "name", "idWard");

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

        // Lưu lại vào localStorage
        userData.address = addressSummary;
        localStorage.setItem("userLogin", JSON.stringify(userData));
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

    // Xử lý sự kiện chỉnh sửa thông tin
    document.getElementById("edit-btn").addEventListener("click", () => {
        const editButton = document.getElementById("edit-btn");
        const isEditing = editButton.textContent === "Sửa";
        editButton.textContent = isEditing ? "Lưu" : "Sửa";

        const inputs = document.querySelectorAll("#info-form input, #info-form select");
        const addressFields = document.getElementById("address-fields");
        const addressSummary = document.getElementById("address-summary");

        addressFields.style.display = isEditing ? "flex" : "none";
        addressSummary.style.display = isEditing ? "none" : "block";

        inputs.forEach((input) => (input.disabled = !isEditing));

        if (!isEditing) {
            userData.fullName = document.getElementById("user-name").value.trim();
            userData.phone = document.getElementById("user-phone").value.trim();
            userData.email = document.getElementById("user-email").value.trim();
            userData.provinceId = document.getElementById("province").value;
            userData.districtId = document.getElementById("district").value;
            userData.wardId = document.getElementById("ward").value;

            updateAddressSummary();
            localStorage.setItem("userLogin", JSON.stringify(userData));
            alert("Thông tin đã được cập nhật!");
        }
    });

    // Xử lý sự kiện chuyển tab
    const menuButtons = document.querySelectorAll(".menu-btn");
    const sections = document.querySelectorAll("section");

    menuButtons.forEach((button) => {
        button.addEventListener("click", () => {
            menuButtons.forEach((btn) => btn.classList.remove("active"));
            sections.forEach((section) => section.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(button.dataset.tab).classList.add("active");
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

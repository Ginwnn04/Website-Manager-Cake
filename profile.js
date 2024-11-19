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

    async function fetchAPI(url) {
        try {
            const response = await fetch(url);
            const result = await response.json();
            return result.data?.data || [];
        } catch (error) {
            console.error("Error fetching data from API:", error);
            return [];
        }
    }

    function populateSelect(element, data, textKey, valueKey) {
        element.innerHTML = '<option value="">Chọn</option>';
        data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item[valueKey];
            option.textContent = item[textKey];
            element.appendChild(option);
        });
    }

    async function initializeProvinces() {
        const provinces = await fetchAPI("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1");
        populateSelect(document.getElementById("province"), provinces, "name_with_type", "code");

        // Tự động điền nếu có dữ liệu từ localStorage
        if (userData.provinceId) {
            document.getElementById("province").value = userData.provinceId;
            await loadDistricts(userData.provinceId, userData.districtId, userData.wardId);
        }
    }

    async function loadDistricts(provinceCode, selectedDistrictCode, selectedWardCode) {
        const districts = await fetchAPI(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`);
        populateSelect(document.getElementById("district"), districts, "name_with_type", "code");

        if (selectedDistrictCode) {
            document.getElementById("district").value = selectedDistrictCode;
            await loadWards(selectedDistrictCode, selectedWardCode);
        }
    }

    async function loadWards(districtCode, selectedWardCode) {
        const wards = await fetchAPI(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`);
        populateSelect(document.getElementById("ward"), wards, "name_with_type", "code");

        if (selectedWardCode) {
            document.getElementById("ward").value = selectedWardCode;
        }
    }

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

    document.getElementById("province").addEventListener("change", async (event) => {
        const provinceCode = event.target.value;
        document.getElementById("district").innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        document.getElementById("ward").innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (provinceCode) {
            await loadDistricts(provinceCode);
        }
    });

    document.getElementById("district").addEventListener("change", async (event) => {
        const districtCode = event.target.value;
        document.getElementById("ward").innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (districtCode) {
            await loadWards(districtCode);
        }
    });

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
            // Lưu thông tin mới
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

    document.querySelector(".return-home-btn").addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Khởi tạo dữ liệu
    initializeProvinces();
    populateUserInfo();
});

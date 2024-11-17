document.addEventListener("DOMContentLoaded", () => {
    // Lấy thông tin người dùng từ localStorage
    const userData = JSON.parse(localStorage.getItem("userLogin"));

    // Kiểm tra nếu chưa đăng nhập
    if (!userData) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "index.html";
        return;
    }

    // Hiển thị thông tin cá nhân từ localStorage
    document.getElementById("user-name").value = userData.fullName || "Chưa cập nhật";
    document.getElementById("user-phone").value = userData.phone || "Chưa cập nhật";
    document.getElementById("user-email").value = userData.email || "Chưa cập nhật";

    async function fetchAPI(url) {
        try {
            const response = await fetch(url);
            const result = await response.json();
            return result.data.data;
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
    }

    function updateAddressSummary() {
        const street = document.getElementById("street").value || "";
        const ward = document.getElementById("ward").options[document.getElementById("ward").selectedIndex]?.text || "";
        const district = document.getElementById("district").options[document.getElementById("district").selectedIndex]?.text || "";
        const province = document.getElementById("province").options[document.getElementById("province").selectedIndex]?.text || "";

        document.getElementById("address-summary").value = `${street}, ${ward}, ${district}, ${province}`;
    }

    document.getElementById("province").addEventListener("change", async (event) => {
        const provinceCode = event.target.value;
        const districtDropdown = document.getElementById("district");
        const wardDropdown = document.getElementById("ward");

        districtDropdown.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        wardDropdown.innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (provinceCode) {
            const districts = await fetchAPI(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`);
            populateSelect(districtDropdown, districts, "name_with_type", "code");
            districtDropdown.disabled = false;
        } else {
            districtDropdown.disabled = true;
            wardDropdown.disabled = true;
        }
    });

    document.getElementById("district").addEventListener("change", async (event) => {
        const districtCode = event.target.value;
        const wardDropdown = document.getElementById("ward");

        wardDropdown.innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (districtCode) {
            const wards = await fetchAPI(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`);
            populateSelect(wardDropdown, wards, "name_with_type", "code");
            wardDropdown.disabled = false;
        } else {
            wardDropdown.disabled = true;
        }
    });

    // Sự kiện cho nút "Sửa" và "Lưu"
    const editButton = document.getElementById("edit-btn");
    editButton.addEventListener("click", () => {
        const isEditing = editButton.textContent === "Sửa";
        editButton.textContent = isEditing ? "Lưu" : "Sửa";

        // Lấy các trường thông tin
        const inputs = document.querySelectorAll("#info-form input");
        const provinceDropdown = document.getElementById("province");
        const districtDropdown = document.getElementById("district");
        const wardDropdown = document.getElementById("ward");
        const streetInput = document.getElementById("street");
        const addressFields = document.getElementById("address-fields");
        const addressSummary = document.getElementById("address-summary");

        // Chuyển đổi hiển thị
        addressFields.style.display = isEditing ? "flex" : "none";
        addressSummary.style.display = isEditing ? "none" : "block";

        // Bật hoặc tắt khả năng chỉnh sửa cho các trường thông tin
        inputs.forEach((input) => (input.disabled = !isEditing));
        provinceDropdown.disabled = !isEditing;
        districtDropdown.disabled = !isEditing;
        wardDropdown.disabled = !isEditing;
        streetInput.disabled = !isEditing;

        if (!isEditing) {
            // Lưu dữ liệu sau khi chỉnh sửa
            const updatedData = {
                ...userData,
                fullName: document.getElementById("user-name").value,
                phone: document.getElementById("user-phone").value,
                email: document.getElementById("user-email").value,
                address: `${streetInput.value || ""}, ${wardDropdown.options[wardDropdown.selectedIndex]?.text || ""}, ${districtDropdown.options[districtDropdown.selectedIndex]?.text || ""}, ${provinceDropdown.options[provinceDropdown.selectedIndex]?.text || ""}`,
            };

            localStorage.setItem("userLogin", JSON.stringify(updatedData));
            updateAddressSummary(); // Cập nhật ô hiển thị tóm tắt
            alert("Thông tin đã được cập nhật!");
        }
    });

    // Chuyển đổi tab
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

    // Xử lý sự kiện nút "Quay về Trang Chính"
    document.querySelector('.return-home-btn').addEventListener('click', () => {
        window.location.href = "index.html"; // Đường dẫn đến trang chính
    });

    initializeProvinces();
    updateAddressSummary(); // Hiển thị địa chỉ tóm tắt khi tải trang
});

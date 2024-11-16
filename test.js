const USER_LOGIN = "userLogin";
let listProduct = [];
let listProductFilter = [];
let listProvince = [];
let listDistrict = [];
let listWard = [];



// const userLogin = {
//     fullName: "Nguyen Nhat Quang",
//     phone: "0123456789",
//     password: "123456",
//     dateCreate: "2022-10-10",
//     status: "1",
//     cart: []
// };
// localStorage.setItem(USER_LOGIN, JSON.stringify(userLogin));

window.onload = loadDataProduct();
window.onload = getDataProvince();

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + " ₫";
}

async function getDataProvince() {
    const url = "https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/province";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
        const data = await response.json();
        listProvince = [...data];

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
async function getDataWard(idDistrict) {
    const url = "https://api-tinh-thanh-git-main-toiyours-projects.vercel.app/commune?idDistrict=" + idDistrict;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
        const data = await response.json();
        listWard = [...data];
        renderWard();        
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
      
        txtInner += `<option value="${district.idDistrict}">${district.name}</option>`;
    });
    selectDistrict.innerHTML = txtInner;
}
function renderWard() {
    const selectWard = document.getElementById("ward");
    txtInner = `<option value="" disabled selected>Chọn phường/xã</option>`;
    listWard.forEach(ward => {
        txtInner += `<option value="${ward.idCommune}">${ward.name}</option>`;
    });
    selectWard.innerHTML = txtInner;
}


function parsePrice(priceString) {
    const price = priceString.replace(/[^\d]/g, '');
    return parseInt(price); 
}

function loadDataProduct() {
    listProduct = localStorage.getItem(LIST_PRODUCT) ? JSON.parse(localStorage.getItem(LIST_PRODUCT)) : [];
    listProductFilter = [...listProduct];
    renderProducts(listProduct);
}


// Hàm hiển thị sản phẩm
function renderProducts(productsToRender) {
    const productContainer = document.getElementsByClassName("list-product")[0];
    productContainer.innerHTML = "";
    let txtHtml = "";
    productsToRender.forEach((product, index) => {
        txtHtml += `<div class="product-item" onclick="openProductDetail(${index})">
            <div class="img-product">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="info-product">
                <h3 class="name-product">${product.name}</h3>
                <div class="bottom-product">
                    <h3 class="price-product">${formatPrice(product.price)}</h3>
                    <button class="btn">
                        <i class="fa-solid fa-cart-plus"></i> Thêm
                    </button>
                </div>
            </div>
        </div>`;
    });
    productContainer.innerHTML = txtHtml;
}



// Hàm mở form chi tiết sản phẩm
function openProductDetail(index) {
    const product = listProduct[index];
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = formatPrice(product.price);
    document.getElementById("product-description").textContent = product.description;

    document.getElementById("quantity-product-details").value = 1;

    // Lưu giá gốc của sản phẩm và cập nhật tổng thanh toán ban đầu
    const basePrice = product.price;
    updateTotalPrice(basePrice);

    // Hiển thị form chi tiết sản phẩm
    document.getElementById("product-detail-modal").style.display = "flex";
}

// Hàm tổng thanh toán
function updateTotalPrice(basePrice) {
    const quantity = parseInt(document.getElementById("quantity-product-details").value);
    const totalPrice = basePrice * quantity;
    document.getElementById("total-price").textContent = formatPrice(totalPrice);
}

// đóng form chi tiết sản phẩm
function closeProductDetail() {
    document.getElementById("product-detail-modal").style.display = "none";
}

// Hàm tăng số lượng
function increaseQuantity(obj, index) {
    const quantityInput = obj.parentNode.querySelector(".quantity");
    newQuantity = parseInt(quantityInput.value) + 1;
    quantityInput.value = newQuantity;
    
    

    if (obj.parentNode.getAttribute('value') === 'details-product') {
        const basePrice = parsePrice(document.querySelector("#product-price").textContent);
        updateTotalPrice(basePrice);
    }
    else if (obj.parentNode.getAttribute('value') === 'checkout-product') {
        const userCurrent = JSON.parse(localStorage.getItem(USER_LOGIN));
        userCurrent.cart[index].quantity = newQuantity;
        let totalPrice = 0;
        userCurrent.cart.forEach((product) => {
            totalPrice += product.quantity * product.price;
        });
        localStorage.setItem(USER_LOGIN, JSON.stringify(userCurrent));
        const totalPriceComponent = document.querySelector(".total-price-cart");
        totalPriceComponent.innerHTML = formatPrice(totalPrice);
    }
}

// Hàm giảm số lượng
function decreaseQuantity(obj, index) {
    const quantityInput = obj.parentNode.querySelector(".quantity");
    if (parseInt(quantityInput.value) > 1) {
        newQuantity = parseInt(quantityInput.value) - 1;
        quantityInput.value = newQuantity;
        
        if (obj.parentNode.getAttribute('value') === 'details-product') {
            const basePrice = parsePrice(document.querySelector("#product-price").textContent);
            updateTotalPrice(basePrice);
        }
        else if (obj.parentNode.getAttribute('value') === 'checkout-product') {
            const userCurrent = JSON.parse(localStorage.getItem(USER_LOGIN));
            userCurrent.cart[index].quantity = newQuantity;
            let totalPrice = 0;
            userCurrent.cart.forEach((product) => {
                totalPrice += product.quantity * product.price;
            });
            localStorage.setItem(USER_LOGIN, JSON.stringify(userCurrent));
            const totalPriceComponent = document.querySelector(".total-price-cart");
            totalPriceComponent.innerHTML = formatPrice(totalPrice);
        }
        
    }
}

// Hàm thêm vào giỏ hàng
function addToCart() {
    if (localStorage.getItem(USER_LOGIN) === null) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
    }
    
    const userCurrent = JSON.parse(localStorage.getItem(USER_LOGIN));
    const productCheckout = {};
    productCheckout.name = document.getElementById("product-name").textContent;
    productCheckout.quantity = parseInt(document.getElementById("quantity-product-details").value);
    // alert(document.getElementById("quantity").value);
    productCheckout.price = parsePrice(document.getElementById("product-price").textContent);
    productCheckout.image = document.getElementById("product-image").src;
    userCurrent.cart.push(productCheckout);
    alert(`Đã thêm ${productCheckout.quantity} x ${productCheckout.name} vào giỏ hàng.`);
    localStorage.setItem(USER_LOGIN, JSON.stringify(userCurrent));
    closeProductDetail();
}


// Sự kiện khi người dùng cuộn trang để ẩn/hiện thanh điều hướng
window.addEventListener('scroll', () => {
    const navbar = document.getElementsByClassName("navbar")[0];
    if (window.pageYOffset >= 20) {
        navbar.classList.add("hide");  
    } else {
        navbar.classList.remove("hide"); 
    }
});

// Xử lý hiển thị giỏ hàng
const btnCart = document.getElementsByClassName("btn-cart")[0];
btnCart.addEventListener("click", () => {
    const modal = document.getElementsByClassName("modal")[0];
    const cart = document.getElementsByClassName("cart")[0];

    const userCurrent = localStorage.getItem(USER_LOGIN) ? JSON.parse(localStorage.getItem(USER_LOGIN)) : null;
    const listItemComponent = document.querySelector(".list-cart-item");
    if (userCurrent === null || userCurrent.cart.length === 0) {
        const cartEmpty = `
                    <div class="empty-cart"
                        style="height: 100%;display: flex;align-items: center;justify-content: center;/* flex-wrap: wrap; */flex-direction: column;">
                        <img src="./rb_5858.png" alt="" style="height: 300px; width: 300px; display: block;">
                        <h1 style="font-size: 20px;font-weight: 500;">Rất tiếc, ban chưa chọn món!</h1>
                    </div>
                    `;
        listItemComponent.innerHTML = cartEmpty;
    }
    else {
        renderCart(userCurrent.cart);
    }
    modal.classList.add("show-modal");
    cart.classList.add("show-cart");
});

function renderCart(cart) {
    let cartContent = "";
        cart.forEach((product, index) => {
            cartContent += `
                    <div class="cart-item">
                        <div class="img-product">
                            <img src="${product.image}" alt="">
                        </div>
                        <div class="infor-checkout">
                            <span class="name-product-checkout">${product.name}</span>
                            <div>
                                <span>Đơn giá: </span>
                                <span class="unit-product-checkout">${product.price}</span>
                            </div>
                            <span class="quantity-product-checkout">Số lượng</span>
                            <div class="btnCustom" value="checkout-product">
                                <input type="text" class="txtCustom quantity" value="${product.quantity}">
                                <button class="btnCustomDesc" onclick="increaseQuantity(this, ${index})">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                                <button class="btnCustomAsc" onclick="decreaseQuantity(this, ${index})">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <button class="btn-delete-checkout" onclick="deleteProduct(${index})">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>`  
        });
    const listItemComponent = document.querySelector(".list-cart-item");
    listItemComponent.innerHTML = cartContent;
    let totalPrice = 0;
    cart.forEach(product => {
        totalPrice += product.quantity * product.price;
    });
    const totalPriceComponent = document.querySelector(".total-price-cart");
    totalPriceComponent.innerHTML = formatPrice(totalPrice);
}

function deleteProduct(index) {
    const userCurrent = JSON.parse(localStorage.getItem(USER_LOGIN));
    userCurrent.cart.splice(index, 1);
    localStorage.setItem(USER_LOGIN, JSON.stringify(userCurrent));
    renderCart(userCurrent.cart);
}

const btnPayment = document.querySelector('.btnPayment');
btnPayment.addEventListener("click", () => {
    document.querySelector(".modal-payment").classList.add("modal-payment--show");
    renderProvince();
});

const cbxProvince = document.getElementById("province");
cbxProvince.addEventListener("change", () => {
    const idProvince = cbxProvince.value;
    const cbxWard = document.getElementById("ward");
    cbxWard.innerHTML = `<option value="" disabled selected>Chọn phường/xã</option>`;
    getDataDistrict(idProvince);
});

const cbxDistrict = document.getElementById("district");
cbxDistrict.addEventListener("change", () => {
    const idDistrict = cbxDistrict.value;
    getDataWard(idDistrict);
});
    


const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener("click", () => {
    document.querySelector(".modal-payment").classList.remove("modal-payment--show");
});

// Đóng giỏ hàng khi click ra ngoài modal
const wrapper = document.getElementsByClassName("modal")[0];
wrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("show-modal")) {
        wrapper.classList.remove("show-modal");
        const cart = document.getElementsByClassName("cart")[0];
        cart.classList.remove("show-cart");
    }
});


// Hàm sắp xếp sản phẩm đã lọc
function sortProducts(order) {
    listProductFilter.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    renderProducts(listProductFilter);
}

const searchInput = document.querySelector(".search-txt");
searchInput.addEventListener("click", () => {
    const productContent = document.querySelector(".product-content");
    const fixedPosition = window.pageYOffset + productContent.getBoundingClientRect().top - 140;
    window.scrollTo({ top: fixedPosition, behavior: "smooth" });
});
    
const filterProduct = document.querySelector(".filter-products");
filterProduct.addEventListener("click", () => {
    const filterBar = document.querySelector(".navbar-filter");
    if (filterBar.classList.contains("filter-bar--open")) {
        filterBar.classList.remove("filter-bar--open");
    }
    else {
        filterBar.classList.add("filter-bar--open");
        const productContent = document.querySelector(".product-content");
        const fixedPosition = window.pageYOffset + productContent.getBoundingClientRect().top - 140;
        window.scrollTo({ top: fixedPosition, behavior: "smooth" });  
    }
});

const btnClose = document.querySelector(".btn-close");
btnClose.addEventListener("click", () => {
    const filterBar = document.querySelector(".navbar-filter");
    filterBar.classList.remove("filter-bar--open");
});

const btnHeader = document.querySelectorAll(".btn-nav-header");
btnHeader.forEach(btn => {
    btn.addEventListener("click", () => {
        const productContent = document.querySelector(".product-content");
        const fixedPosition = window.pageYOffset + productContent.getBoundingClientRect().top - 140;
        window.scrollTo({ top: fixedPosition, behavior: "smooth" });  
        if (btn.getAttribute("value") === "") {
            renderProducts(listProduct);
        }
        else {
            const listProductFilter = listProduct.filter(product => product.category === btn.getAttribute("value"));
            renderProducts(listProductFilter);
        }

    });  
});

// const test = document.getElementById("category-filter");
// test.addEventListener("change", () => { 
//     if (test.value === "") {
//         renderProducts(products);
//     }
//     else {
//         const listProductFilter = products.filter(product => product.category === test.value);
//         renderProducts(listProductFilter);
//     }

// });



document.addEventListener("DOMContentLoaded", function () {
    // Lấy các phần tử cần thiết
    const searchInput = document.querySelector(".search-txt");
    const logo = document.querySelector(".logo img");

    

    renderProducts(listProductFilter);



    // Lọc sản phẩm theo từ khóa
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.trim().toLowerCase();
        if (keyword === "") {
            renderProducts(listProductFilter);
        } else {
            const keywordFilteredProducts = listProductFilter.filter(product => {
                return product.name.toLowerCase().includes(keyword) ||
                        product.category.toLowerCase().includes(keyword);
            });
            renderProducts(keywordFilteredProducts);
        }
    });

    document.getElementById("apply-filter").addEventListener("click", () => {
        const category = document.getElementById("category-filter").value;
        const minPrice = document.getElementById("min-price").value || 0;
        const maxPrice = document.getElementById("max-price").value || Infinity;

        // alert(category + " " + minPrice + " " + maxPrice);
 
        // Lọc sản phẩm theo tiêu chí
        listProductFilter = listProduct.filter(product => {
            if (category !== "") {
                return product.category === category && product.price >= minPrice && product.price <= maxPrice;
            }
            else {
                return product.price >= minPrice && product.price <= maxPrice;
            }
        });
        renderProducts(listProductFilter);

    });
    const btnAsc = document.querySelector(".btn-asc");
    const btnDesc = document.querySelector(".btn-desc");
    btnAsc.addEventListener("click", () => {
        if (btnAsc.classList.contains("btn--active")) {
            btnAsc.classList.remove("btn--active");  
            renderProducts(listProductFilter);
        }
        else {
            btnAsc.classList.add("btn--active");
            if (btnDesc.classList.contains("btn--active")) {
                btnDesc.classList.remove("btn--active");
            }
            const listProductFilterSort = [...listProductFilter].sort((a, b) => a.price - b.price);
            renderProducts(listProductFilterSort);
        }
    });
    btnDesc.addEventListener("click", () => {
        if (btnDesc.classList.contains("btn--active")) {
            btnDesc.classList.remove("btn--active");  
            renderProducts(listProductFilter);
        }
        else {
            btnDesc.classList.add("btn--active");
            if (btnAsc.classList.contains("btn--active")) {
                btnAsc.classList.remove("btn--active");
            }
            const listProductFilterSort = [...listProductFilter].sort((a, b) => b.price - a.price);
            renderProducts(listProductFilterSort);
        }
    });
    const btnReset = document.querySelector(".btn-reset");
    btnReset.addEventListener("click", () => {
        if (btnAsc.classList.contains("btn--active")) {
            btnAsc.classList.remove("btn--active");  
        }
        else {
            btnDesc.classList.remove("btn--active");
        }
        document.getElementById("category-filter").value = "";
        document.getElementById("min-price").value = "";
        document.getElementById("max-price").value = "";
        renderProducts(listProduct);
    });


    // sortButton.addEventListener("click", function (event) {
    //     event.stopPropagation();
    //     sortOptions.style.display = sortOptions.style.display === "none" ? "block" : "none";
    // });

    // sortOptions.addEventListener("click", (e) => {
    //     const sortOrder = e.target.getAttribute("data-sort");
    //     if (sortOrder) {
    //         sortProducts(sortOrder);
    //         sortOptions.style.display = "none";
    //     }
    // });

    // document.addEventListener("click", function (e) {
    //     if (!sortButton.contains(e.target) && !sortOptions.contains(e.target)) {
    //         sortOptions.style.display = "none";
    //     }
    // });

    //  click vào logo cuộn lên đầu trang
    if (logo) {
        logo.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
            renderProducts(products);
        });
    } else {
        console.error("Không tìm thấy logo. Hãy kiểm tra lại selector của logo.");
    }

    // Hàm gợi ý giá
    function suggestPriceByRounding(inputId, prefix) {
        const inputElement = document.getElementById(inputId);
        const suggestionBox = document.createElement("div");
        suggestionBox.className = "price-suggestion";
    
        const oldSuggestion = document.querySelector(`#${inputId} + .price-suggestion`);
        if (oldSuggestion) oldSuggestion.remove();
    
        if (!prefix || isNaN(prefix)) return;
    
        // gợi ý giá chẵn
        const baseNumber = parseInt(prefix);
        const suggestedPrices = [];
        for (let i = 1; i <= 5; i++) {
            const price = baseNumber * Math.pow(10, i);
            if (price >= 1000 && price <= 1000000) {
                suggestedPrices.push(price);
            }
        }
    
        // Hiển thị gợi ý giá chẵn
        suggestionBox.innerHTML = suggestedPrices.map(price => `<div>${price.toLocaleString()} ₫</div>`).join("");
        if (suggestedPrices.length > 0) {
            inputElement.parentNode.insertBefore(suggestionBox, inputElement.nextSibling);
    
            const inputRect = inputElement.getBoundingClientRect();
            suggestionBox.style.position = "absolute";
            suggestionBox.style.left = `${inputRect.left}px`;
            suggestionBox.style.top = `50px`;
            suggestionBox.style.width = `${inputRect.width}px`;
        }
    
        suggestionBox.addEventListener("click", function (e) {
            inputElement.value = e.target.textContent.replace(/[^0-9]/g, "");
            suggestionBox.remove();
        });
    }

    // Gợi ý giá
    document.getElementById("min-price").addEventListener("input", function () {
        if (this.value < 0) this.value = 0;
        suggestPriceByRounding("min-price", this.value);
    });

    document.getElementById("max-price").addEventListener("input", function () {
        if (this.value < 0) this.value = 0;
        suggestPriceByRounding("max-price", this.value);
    });
});

// Danh sách tài khoản mẫu
const users = [
    { username: 'nguyenminhvu591@gmail.com', password: '1', fullName: 'Nguyen Minh Vu', phone: '0123456789', email: 'nguyenminhvu591@gmail.com', cart: [] },
    { username: '0123456789', password: '2', fullName: 'Nguyen Van B', phone: '0123456789', email: 'nguyenvanb@gmail.com', cart: [] },
    { username: 'sgu@gmail.com', password: '3', fullName: 'Nguyen Van C', phone: '0987654321', email: 'sgu@gmail.com', cart: [] }
];

// Hàm xử lý đăng nhập
function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Tìm thông tin người dùng trong danh sách tài khoản
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Đăng nhập thành công: lưu trạng thái và thông tin người dùng
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userLogin', JSON.stringify(user)); // Lưu thông tin người dùng
        alert("Đăng nhập thành công!");
        closeForm('loginForm'); // Đóng form đăng nhập
        updateLoginButton(); // Cập nhật trạng thái nút đăng nhập
    } else {
        alert("Thông tin đăng nhập không chính xác.");
    }
}

// Nút icon
function updateLoginButton() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.querySelector(".login-btn") || document.querySelector(".user-icon");

    if (isLoggedIn && loginBtn) {
        // Nếu đã đăng nhập, chuyển nút thành icon người dùng
        loginBtn.innerHTML = '<i class="fa-solid fa-user"></i>';
        loginBtn.classList.remove("login-btn");
        loginBtn.classList.add("user-icon");

        // Thêm sự kiện hiển thị tùy chọn người dùng
        loginBtn.onclick = toggleUserOptions;
    } else if (loginBtn) {
        // Nếu chưa đăng nhập, hiển thị nút "Đăng nhập"
        loginBtn.innerHTML = "Đăng nhập";
        loginBtn.classList.remove("user-icon");
        loginBtn.classList.add("login-btn");
        loginBtn.onclick = () => openForm('loginForm'); // Mở form đăng nhập
    }
}

// Hàm hiển thị/ẩn form tùy chọn tài khoản khi nhấn vào icon người dùng
function toggleUserOptions() {
    const userOptions = document.getElementById("userOptions");
    userOptions.style.display = userOptions.style.display === "block" ? "none" : "block";
}

// Hàm đăng xuất tài khoản
function logoutUser() {
    localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập
    localStorage.removeItem('userLogin'); // Xóa thông tin người dùng
    updateLoginButton(); // Cập nhật lại nút thành "Đăng nhập"
    document.getElementById("userOptions").style.display = "none"; // Ẩn tùy chọn tài khoản
    alert("Bạn đã đăng xuất thành công!");
    window.location.href = "index.html"; // Quay về trang chính
}

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener("DOMContentLoaded", updateLoginButton);

// Sự kiện gọi hàm đăng nhập khi nhấn nút đăng nhập trong form
document.querySelector(".form-container").addEventListener("submit", (e) => {
    e.preventDefault();
    loginUser();
});

// Đăng ký sự kiện click ngoài form để ẩn form tùy chọn khi nhấn ra ngoài
document.addEventListener("click", function (e) {
    const userOptions = document.getElementById("userOptions");
    const userIcon = document.querySelector(".user-icon");

    if (userOptions && !userOptions.contains(e.target) && !userIcon.contains(e.target)) {
        userOptions.style.display = "none";
    }
});

// Chuyển đến trang thông tin cá nhân
function viewProfile() {
    window.location.href = "profile.html";
}

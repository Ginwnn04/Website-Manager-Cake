let listProduct = [];
let listUser = [];
let listProductFilter = [];
let listProvince = [];
let listDistrict = [];
let listWard = [];
let nextOrderId = 1; 
let userCurrent = null;
let listOrder = [];
let pageCurrent = 1;
let totalPage = 1;
const perPage = 15;





window.onload = loadAllData();

function loadAllData() {
    loadDataProduct();
    getDataProvince();
    loadNextOrderId();
    loadDataUserCurrent();
    loadListOrder();
    callBackVnPay();
    loadDataProvince();
}


function loadDataProvince() {
    listProvince = localStorage.getItem("listProvince") ? JSON.parse(localStorage.getItem("listProvince")) : [];
}


function openTransfer(orderId, total) {
    fetch("http://localhost:8080/vnpay", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      
        body: JSON.stringify({
          directionTable: orderId,
          amount: total
        })
      })
      .then( (response) => { 
          response.json().then((data) => {
              window.location.href = data.paymentUrl;
           });
      });
}

function callBackVnPay() {
    const modalIsShow = localStorage.getItem("modalIsShow") ? true : false;
    if (modalIsShow) {
        renderPayment();
    }
}

function loadDataUserCurrent() {
    userCurrent = localStorage.getItem("userCurrent") ? JSON.parse(localStorage.getItem("userCurrent")) : null;
}


function loadListOrder() {
    listOrder = localStorage.getItem(LIST_ORDER) ? JSON.parse(localStorage.getItem(LIST_ORDER)) : [];
}

function loadDataProduct() {
    listProduct = localStorage.getItem(LIST_PRODUCT) ? JSON.parse(localStorage.getItem(LIST_PRODUCT)) : [];
    listProductFilter = [...listProduct];
    totalPage = Math.ceil(listProduct.length / perPage);
    renderBtnPage();
    renderProducts(listProduct);
}

function loadNextOrderId() {
    nextOrderId = localStorage.getItem("nextOrderId") ? parseInt(localStorage.getItem("nextOrderId")) : 1;
    localStorage.setItem(NEXT_ID, nextOrderId);
};
function parsePrice(priceString) {
    const price = priceString.replace(/[^\d]/g, '');
    return parseInt(price); 
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
    loadDataProvince();
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


// Hàm hiển thị sản phẩm
function renderProducts(productsToRender) {
    const productContainer = document.getElementsByClassName("list-product")[0];
    productContainer.innerHTML = "";
    let txtHtml = "";
    let start = (pageCurrent - 1) * perPage;
    let end = (pageCurrent - 1) * perPage + perPage;
    if (end > productsToRender.length) { 
        end = productsToRender.length;
    }
    for (let i = start; i < end; i++) {
        const product = productsToRender[i];
        txtHtml += `<div class="product-item" onclick="openProductDetail(${i})">
                <div class="img-product">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="info-product">
                    <h3 class="name-product">${product.name}</h3>
                    <div class="bottom-product">
                        <h3 class="price-product">${formatMoney(product.price)}</h3>
                        <button class="btn">
                            <i class="fa-solid fa-cart-plus"></i> Thêm
                        </button>
                    </div>
                </div>
            </div>`;
    }
    productContainer.innerHTML = txtHtml;
}



// Hàm mở form chi tiết sản phẩm
function openProductDetail(index) {
    const product = listProductFilter[index];
    if (product.quantity === 0) { 
        showToast("error", "Sản phẩm đã hết hàng.");
        return;
    };
    const txt = `
        <div class="product-detail-content">
            <span class="close-btn" onclick="closeProductDetail()">&times;</span>
            <div class="product-detail-left">
                <img id="product-image" src="${product.image}" alt="Product Image">
            </div>
            <div class="product-detail-right">
                <h2 id="product-name">${product.name}</h2>
                <p class="product-price" id="product-price">Giá: ${formatMoney(product.price)}</p>
                <p id="product-description">${product.description}</p>
                <label for="note">Ghi chú:</label>
                <textarea id="note" placeholder="Ghi chú cho đơn hàng..."></textarea>
                <div class="quantity-wrapper">
                    <span>Số lượng:</span>
                    <div class="btnCustom" value="details-product">
                        <button class="btnCustomAsc" onclick="decreaseQuantity(this, ${index})">-</button>
                        <input type="text" class="txtCustom quantity" id="quantity-product-details" value="1" min="1"
                            oninput="inputQuantity(this, ${index})">
                        <button class="btnCustomDesc" onclick="increaseQuantity(this, ${index})">+</button>
                    </div>
                </div>
                <div class="total-price">
                    <p>Thành tiền: <span id="total-price"></span></p>
                </div>
                <button class="btn add-to-cart" onclick="addToCart()">Thêm vào giỏ hàng</button>
            </div>
        </div>`;
    
    document.getElementById("product-detail-modal").innerHTML = txt;
    document.getElementById("product-detail-modal").style.display = "flex";
    
    const basePrice = product.price;
    updateTotalPrice(basePrice);

}

// Hàm tổng thanh toán
function updateTotalPrice(basePrice) {
    const quantity = parseInt(document.getElementById("quantity-product-details").value);
    const totalPrice = basePrice * quantity;
    document.getElementById("total-price").textContent = formatMoney(totalPrice);
}

// đóng form chi tiết sản phẩm
function closeProductDetail() {
    document.getElementById("product-detail-modal").style.display = "none";
}

// Hàm tăng số lượng
function increaseQuantity(obj, index) {
    const quantityInput = parseInt(obj.parentNode.querySelector(".quantity").value);
    newQuantity = quantityInput + 1;
    
    obj.parentNode.querySelector(".quantity").value = newQuantity;
    
    if (obj.parentNode.getAttribute('value') === 'details-product') {
        const basePrice = parsePrice(document.querySelector("#product-price").textContent);
        updateTotalPrice(basePrice);
    }
    else if (obj.parentNode.getAttribute('value') === 'checkout-product') {
        userCurrent.cart[index].quantity = newQuantity;
        let totalPrice = 0;
        userCurrent.cart.forEach((product) => {
            totalPrice += product.quantity * product.price;
        });
        localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
        const totalPriceComponent = document.querySelector(".total-price-cart");
        totalPriceComponent.innerHTML = formatMoney(totalPrice);
    }
}

// Hàm giảm số lượng
function decreaseQuantity(obj, index) {
    const quantityInput = parseInt(obj.parentNode.querySelector(".quantity").value);

    if (quantityInput > 1) {
        newQuantity = quantityInput - 1;
        obj.parentNode.querySelector(".quantity").value = newQuantity;
        
        if (obj.parentNode.getAttribute('value') === 'details-product') {
            const basePrice = parsePrice(document.querySelector("#product-price").textContent);
            updateTotalPrice(basePrice);
        }
        else if (obj.parentNode.getAttribute('value') === 'checkout-product') {
            userCurrent.cart[index].quantity = newQuantity;
            let totalPrice = 0;
            userCurrent.cart.forEach((product) => {
                totalPrice += product.quantity * product.price;
            });
            localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
            const totalPriceComponent = document.querySelector(".total-price-cart");
            totalPriceComponent.innerHTML = formatMoney(totalPrice);
        }
        
    }
}

function inputQuantity(obj, index) {
    setTimeout(() => {
        const quantityInput = parseInt(obj.parentNode.querySelector(".quantity").value);
        if (quantityInput < 1) {
            showToast("warning", "Số lượng phải lớn hơn 0.");
            obj.parentNode.querySelector(".quantity").value = 1;
        }
        if (obj.parentNode.getAttribute('value') === 'details-product') {
            const basePrice = parsePrice(document.querySelector("#product-price").textContent);
            updateTotalPrice(basePrice);
        }
        else if (obj.parentNode.getAttribute('value') === 'checkout-product') {
            userCurrent.cart[index].quantity = quantityInput;
            let totalPrice = 0;
            userCurrent.cart.forEach((product) => {
                totalPrice += product.quantity * product.price;
            });
            localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
            const totalPriceComponent = document.querySelector(".total-price-cart");
            totalPriceComponent.innerHTML = formatMoney(totalPrice);
        }
     }, 500);
};

// Hàm thêm vào giỏ hàng
function addToCart() {
    if (userCurrent === null) {
        showToast("warning", "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
    }
    else if (userCurrent.status === "0") { 
        showToast("error", "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
        return;
    }
    const productCheckout = {};
    productCheckout.name = document.getElementById("product-name").textContent;
    productCheckout.quantity = parseInt(document.getElementById("quantity-product-details").value);
    // alert(document.getElementById("quantity").value);
    productCheckout.price = parsePrice(document.getElementById("product-price").textContent);
    productCheckout.image = document.getElementById("product-image").src;

    findProduct = userCurrent.cart.find(product => product.name === productCheckout.name);
    findProductInList = listProduct.find(product => product.name === productCheckout.name);
    console.log(findProductInList);
    if (findProduct !== undefined) {

        findProduct.quantity += productCheckout.quantity;
    }
    else {
        userCurrent.cart.push(productCheckout);
    }

    showToast("success", `Đã thêm ${productCheckout.quantity} x ${productCheckout.name} vào giỏ hàng.`);
    localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
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

    const userCurrent = localStorage.getItem("userCurrent") ? JSON.parse(localStorage.getItem("userCurrent")) : null;
    const listItemComponent = document.querySelector(".list-cart-item");
    if (userCurrent === null || userCurrent.cart.length === 0) {
        const cartEmpty = `
                    <div class="empty-cart"
                        style="height: 400px;display: flex;align-items: center;justify-content: center;/* flex-wrap: wrap; */flex-direction: column;">
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

function renderItemCheckout(listItem) {
    let txtHtml = "";
    let totalPrice = 0;
    listItem.forEach(product => {
        totalPrice += product.quantity * product.price;
        txtHtml += `
                    <div class="item">
                        <span class="quantity-item">${product.quantity}x</span>
                        <span class="name-item">${product.name}</span>
                        <span class="price-item">${formatMoney(product.price)}</span>
                    </div>`;
    });
    const listItemComponent = document.querySelector(".list-details");
    listItemComponent.innerHTML = txtHtml;
    const totalAmountPayment = document.querySelector(".amount-payment");
    totalAmountPayment.innerHTML = formatMoney(totalPrice);

    const totalPricePayment = document.querySelector(".total-price-payment");
    totalPricePayment.innerHTML = formatMoney(totalPrice + 50000);


}

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
                                <span class="unit-product-checkout">${formatMoney(product.price)}</span>
                            </div>
                            <span class="quantity-product-checkout">Số lượng</span>
                            <div class="btnCustom" value="checkout-product">
                                <input type="text" class="txtCustom quantity" value="${product.quantity}" oninput="inputQuantity(this, ${index})">
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
    totalPriceComponent.innerHTML = formatMoney(totalPrice);
}

function deleteProduct(index) {
    userCurrent = JSON.parse(localStorage.getItem("userCurrent")); // Đúng key
    userCurrent.cart.splice(index, 1);
    localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
    renderCart(userCurrent.cart);
}

const btnPayment = document.querySelector('.btnPayment');
btnPayment.addEventListener("click", renderPayment);

function renderPayment() {
    if (userCurrent === null || userCurrent.cart.length === 0) {
        showToast("error", "Không thể thanh toán khi giỏ hàng đang trống.");
        return;
    }
    document.querySelector(".modal-payment").classList.add("modal-payment--show");
    document.querySelector("body").style.overflow = "hidden";
    localStorage.setItem("modalIsShow", "true");
    renderProvince();
    renderInforUser();
    renderItemCheckout(userCurrent.cart);
}


function renderInforUser() {
    const userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
    document.getElementById("txtName").value = userCurrent.fullName;
    document.getElementById("txtPhone").value = userCurrent.phone;
    document.getElementById("txtAddress").value = userCurrent.street;
    listProvince.forEach((province, index) => {
        if (province.idProvince === userCurrent.provinceId) {
            document.getElementById("province").selectedIndex = index + 1;
            renderDistrict(userCurrent.provinceId);
        }
    });
    getDataDistrict(userCurrent.provinceId);
    getDataWard(userCurrent.districtId);
    setTimeout(() => {
        listDistrict.forEach((district, index) => {
            if (district.idDistrict === userCurrent.districtId) {
                console.log("2");
                document.getElementById("district").selectedIndex = index + 1;
                renderWard(userCurrent.districtId);
                return;
            }    
        });
        
        listWard.forEach((ward, index) => {
            console.log("3");
            if (ward.idCommune === userCurrent.wardId) {
                document.getElementById("ward").selectedIndex = index + 1;
                return;
            }
        });
    }, 500);
}

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
    
const btnCustom = document.querySelectorAll(".btn-custom");
for (let i = 0; i < btnCustom.length; i++) {
    btnCustom[i].addEventListener("click", () => {
        btnCustom.forEach(btn => {
            btn.classList.remove("btn-custom--active");    
        });
        btnCustom[i].classList.add("btn-custom--active");
        if (i === 0) {
            renderInforUser();
        }
        else if (i === 1) {
            document.getElementById("txtName").value = "";
            document.getElementById("txtPhone").value = "";
            document.getElementById("txtAddress").value = "";
            renderProvince();
            listDistrict = [];
            listWard = [];
            renderDistrict();
            renderWard();
            
        }
    });
    
}

const btnPaymentSubmit = document.querySelector(".btn-order");
btnPaymentSubmit.addEventListener("click", () => {
    const name = document.getElementById("txtName").value;
    const phone = document.getElementById("txtPhone").value;
    const province = document.getElementById("province");
    const district = document.getElementById("district");
    const street = document.getElementById("txtAddress").value;
    const ward = document.getElementById("ward");
    if (name === "") {
        showToast("error", "Vui lòng nhập tên.");
        document.getElementById("txtName").focus();
        return;
    }
    else if (phone === "") {
        showToast("error", "Vui lòng nhập số điện thoại.");
        document.getElementById("txtPhone").focus();
        return;
    }
    else if (street === "") {
        showToast("error", "Vui lòng nhập địa chỉ.");
        document.getElementById("txtAddress").focus();
        return;    
    }
    else if (province.selectedIndex === 0) {
        showToast("error", "Vui lòng chọn tỉnh/thành phố.");
        return;
    }
    else if (district.selectedIndex === 0) {
        showToast("error", "Vui lòng chọn quận/huyện.");
        return;
    }
    else if (ward.selectedIndex === 0) {
        showToast("error", "Vui lòng chọn phường/xã.");
        return;
    }    
    const address = [];
    address.push(document.getElementById("txtAddress").value);
    address.push(ward[ward.selectedIndex].textContent);
    address.push(district[district.selectedIndex].textContent);
    address.push(province[province.selectedIndex].textContent);
    order = {
        id: `${nextOrderId++}`,
        gmail: userCurrent.gmail,
        name: name,
        phone: phone,
        address: address.join(", "),
        district: district[district.selectedIndex].textContent,
        detailsOrder: userCurrent.cart,
        timeCreate: new Date().toISOString().slice(0, 10),
        status: "Chưa xử lý",
        paid: false,
        total: userCurrent.cart.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0)
    }
    const methodPayment = document.querySelector('input[name="chb-cash"]:checked').value;
    if (methodPayment === "transfer") {
        openTransfer(order.id, order.total + 50000);
        localStorage.setItem("order", JSON.stringify(order));

    }
    else {
        userCurrent.cart.forEach(product => {
            const findProduct = listProduct.find(item => item.name === product.name);
            findProduct.quantity -= product.quantity;
        });
        localStorage.setItem(LIST_PRODUCT, JSON.stringify(listProduct));
        localStorage.setItem(NEXT_ID, JSON.stringify(nextOrderId));
        listOrder = JSON.parse(localStorage.getItem('listOrder')) || [];
        listOrder.unshift(order);
        localStorage.setItem(LIST_ORDER, JSON.stringify(listOrder));
        userCurrent.cart = [];
        localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
        showToast("success", "Đặt hàng thành công!. Sau 5s sẽ chuyển về trang chủ.");
        localStorage.removeItem("modalIsShow");
        console.log(order.id);
        viewDetailOrder(order.id);
        setTimeout(() => { 
            window.location.href = '/';
        }, 5000);
    }
    



});

const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener("click", () => {
    document.querySelector(".modal-payment").classList.remove("modal-payment--show");
    document.querySelector("body").style.overflow = "auto";
    localStorage.removeItem("modalIsShow");
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
            totalPage = Math.ceil(listProduct.length / perPage);
            renderProducts(listProduct);
            renderBtnPage();

        }
        else {
            listProductFilter = listProduct.filter(product => product.category === btn.getAttribute("value"));
            totalPage = Math.ceil(listProductFilter.length / perPage);
            renderProducts(listProductFilter);
            console.log(totalPage);
            renderBtnPage();
        }

    });  
});





// Lọc sản phẩm theo từ khóa
searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    if (keyword === "") {
        renderProducts(listProductFilter);
    } else {
        const keywordFilteredProducts = listProductFilter.filter(product => {
            return product.name.toLowerCase().includes(keyword);
        });
        console.log(keywordFilteredProducts);
        totalPage = Math.ceil(keywordFilteredProducts.length / perPage);
        renderBtnPage();
        renderProducts(keywordFilteredProducts);
    }
});

document.getElementById("apply-filter").addEventListener("click", () => {
    const category = document.getElementById("category-filter").value;
    const minPrice = document.getElementById("min-price").value || 0;
    const maxPrice = document.getElementById("max-price").value || Infinity;

    // alert(category + " " + minPrice + " " + maxPrice);

    // Lọc sản phẩm theo tiêu chí
    listProductFilter = listProductFilter.filter(product => {
        if (category !== "") {
            return product.category === category && product.price >= minPrice && product.price <= maxPrice;
        }
        else {
            return product.price >= minPrice && product.price <= maxPrice;
        }
    });
    console.log(listProductFilter.length);
    totalPage = Math.ceil(listProductFilter.length / perPage);
    console.log(totalPage);
    renderBtnPage();
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
        listProductFilter = [...listProductFilter].sort((a, b) => a.price - b.price);
        renderProducts(listProductFilter);
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
        listProductFilter = [...listProductFilter].sort((a, b) => b.price - a.price);
        renderProducts(listProductFilter);
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


// Pagin

function renderBtnPage() {
    const btnPage = document.querySelector(".pagination");
    btnPage.innerHTML = "";
    let txtHtml = "";
    for (let i = 1; i <= totalPage; i++) {
        if (i === 1) {
            txtHtml += `<li class="btn-page btn-page--active" onclick="selectedPage(this)">${i}</li>`;
        }
        else {
            txtHtml += `<li class="btn-page" onclick="selectedPage(this)">${i}</li>`;

        }
    }
    btnPage.innerHTML = txtHtml;
}
 
function selectedPage(obj) {
    const btnPage = document.querySelectorAll(".btn-page");
    console.log(btnPage);
    btnPage.forEach(btn => {
        btn.classList.remove("btn-page--active");
    });
    obj.classList.add("btn-page--active");
    pageCurrent = parseInt(obj.textContent);
    console.log(pageCurrent);
    console.log(listProductFilter);
    renderProducts(listProductFilter);
}







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
// if (logo) {
//     logo.addEventListener("click", function () {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         renderProducts(products);
//     });
// } else {
//     console.error("Không tìm thấy logo. Hãy kiểm tra lại selector của logo.");
// }

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



// đăng ký tài khoản
function registerUser() {
    let listUser = JSON.parse(localStorage.getItem("listUser")) || [];

    const fullName = document.getElementById("signup-fullname").value.trim();
    const phone = document.getElementById("signup-phone").value.trim();
    const gmail = document.getElementById("signup-gmail").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();
    const address = "";
    const street = "";

    if (!fullName || !phone || !gmail || !password || !confirmPassword) {
        showToast('error', "Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (password.length < 6) {
        showToast('error', "Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    if (password !== confirmPassword) {
        showToast('error', "Mật khẩu nhập lại không khớp!");
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(gmail)) {
        showToast('error', "Email không đúng định dạng");
        return;
    }

    const phonePattern = /^0[0-9]{9}$/;
    if (!phonePattern.test(phone)) {
        showToast('error', "Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số!");
        return;
    }

    const existingUser = listUser.find(user => user.gmail === gmail);
    if (existingUser) {
        showToast('error', "Gmail đã được sử dụng!");
        return;
    }

    const newUser = {
        gmail: gmail,
        password: password,
        fullName: fullName,
        phone: phone,
        cart: [],
        address: address,
        street: street,
        status: 1,
        role: "User"
    };

    listUser.push(newUser);

    localStorage.setItem("listUser", JSON.stringify(listUser));
    localStorage.setItem("userCurrent", JSON.stringify(newUser));

    loadDataUserCurrent();
    updateLoginButton();
    closeForm("signupForm");
    showToast('success', "Đăng ký thành công! Bạn có thể mua sắm ngay bây giờ.");
}

// đăng nhập tài khoản
function loginUser() {
    const gmail = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let listUser = JSON.parse(localStorage.getItem("listUser")) || [];

    userCurrent = listUser.find(user =>
        (user.gmail === gmail) && user.password === password
    );

    if (userCurrent) {
        localStorage.setItem("userCurrent", JSON.stringify(userCurrent));
        showToast('success', "Đăng nhập thành công!");
        closeForm('loginForm');
        updateLoginButton();
    } else {
        showToast('error', "Thông tin đăng nhập không chính xác.");
    }
}


// Nút icon
function updateLoginButton() {
    const loginBtn = document.querySelector(".login-btn") || document.querySelector(".user-icon");

    if (userCurrent !== null && loginBtn) {
        
        loginBtn.innerHTML = '<i class="fa-solid fa-user"></i>';
        loginBtn.classList.remove("login-btn");
        loginBtn.classList.add("user-icon");

        loginBtn.onclick = toggleUserOptions;
    } else if (loginBtn) {

        loginBtn.innerHTML = `
                                <i class="fa-regular fa-user"></i>
                                <span>Tài khoản</span>
                                `;
        loginBtn.classList.remove("user-icon");
        loginBtn.classList.add("login-btn");
        loginBtn.onclick = () => openForm('loginForm');
    }
}

function toggleUserOptions() {
    const userOptions = document.getElementById("userOptions");
    userOptions.style.display = userOptions.style.display === "block" ? "none" : "block";
    if (userCurrent.role === "Admin") {
        document.getElementById('admin').style.display = 'block';
    }
}

// Hàm đăng xuất tài khoản
function logoutUser(isModal = false) {
    localStorage.removeItem("userCurrent");
    if (isModal) closeLogoutModal();
    showToast("success", "Bạn đã đăng xuất thành công!");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", updateLoginButton);

document.querySelector(".form-container").addEventListener("submit", (e) => {
    e.preventDefault();
    loginUser();
});

// Xử lý sự kiện nút đăng ký
document.addEventListener("DOMContentLoaded", () => {
    updateLoginButton();
    document.querySelector("#signupForm .btn").addEventListener("click", (e) => {
        e.preventDefault();
        registerUser();
    });
});

// Chuyển đến trang thông tin cá nhân
function viewProfile() {
    window.location.href = "profile.html";
}
// Hiển thị modal đăng xuất cùng overlay
function openLogoutModal() {
    const logoutModal = document.getElementById("logoutModal");
    const logoutOverlay = document.getElementById("logoutOverlay");

    if (logoutModal && logoutOverlay) {
        logoutModal.style.display = "block";
        logoutOverlay.classList.add("show");
    }

}

function closeLogoutModal() {
    const logoutModal = document.getElementById("logoutModal");
    const logoutOverlay = document.getElementById("logoutOverlay");

    if (logoutModal && logoutOverlay) {
        logoutModal.style.display = "none";
        logoutOverlay.classList.remove("show");
    }
}


// Gọi đăng xuất từ modal
function confirmLogout() {
    listUser = JSON.parse(localStorage.getItem(LIST_USER)) || [];
    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].gmail === userCurrent.gmail) {
            listUser[i] = userCurrent;
        }
    }
    localStorage.setItem(LIST_USER, JSON.stringify(listUser));
    
    logoutUser(true);
    

}
function updateUserInfo() {
    const name = document.getElementById("user-name").value.trim();
    const phone = document.getElementById("user-phone").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const address = document.getElementById("address-summary").value.trim();

    // Kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        showToast("error", "Email không hợp lệ!");
        return;
    }

    // Kiểm tra số điện thoại (đơn giản chỉ kiểm tra số)
    const phoneRegex = /^[0-9]{10}$/;
    if (phone && !phoneRegex.test(phone)) {
        showToast("error", "Số điện thoại phải chỉ chứa 10 chữ số!");
        return;
    }

    // Kiểm tra xem người dùng có tồn tại không
    if (!userCurrent) {
        showToast("error", "Không tìm thấy thông tin người dùng.");
        return;
    }

    // Cập nhật thông tin người dùng
    userCurrent.fullName = name;
    userCurrent.phone = phone;
    userCurrent.email = email;
    userCurrent.address = address;

    let listUser = JSON.parse(localStorage.getItem("ListUser")) || [];

    // Tìm và cập nhật người dùng trong danh sách
    const index = listUser.findIndex(user => user.email === userCurrent.email);
    if (index !== -1) {
        listUser[index] = { ...userCurrent };
    }

    localStorage.setItem("ListUser", JSON.stringify(listUser));
    localStorage.setItem("userCurrent", JSON.stringify(userCurrent));

    showToast("success", "Thông tin cá nhân đã được cập nhật!");
}


var x = window.matchMedia("(max-width: 767.98px)");

if (x.matches) {
    document.querySelector(".search-icon").addEventListener("click", () => {
        openSearchBar();
        // document.querySelector(".login-btn").style.display = "none";
        // document.querySelector(".btn-cart").style.display = "none";
        document.querySelector(".search-close").removeAttribute("style");
        document.querySelector(".header-right").style.display = "none";
        document.querySelector(".header-left").style.display = "none";
        document.querySelector(".header-center").style.width = "80%";
        
    });
    document.querySelector(".search-close").addEventListener("click", () => { 
        hiddenSearchBar();
        openButton();
    });
}

function openButton() {
    // document.querySelector(".login-btn").removeAttribute("style");
    // document.querySelector(".btn-cart").removeAttribute("style");
    document.querySelector(".search-close").style.display = "none";
    document.querySelector(".header-right").removeAttribute("style");
    document.querySelector(".header-left").removeAttribute("style");
    document.querySelector(".header-center").removeAttribute("style");

    
}

function openSearchBar() {
    document.querySelector(".search .search-icon").style.display = "none";
    document.querySelector(".search-txt").style.display = "unset";
    document.querySelector(".filter-products").style.display = "unset";
}



function hiddenSearchBar() {
    document.querySelector(".search .search-icon").removeAttribute("style");
    document.querySelector(".search-txt").removeAttribute("style");
    document.querySelector(".filter-products").removeAttribute("style");
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
function viewDetailOrder(orderId) {
    listOrder.forEach(order => {   
        if (order.id == orderId) {
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
      <p><strong>Tình trạng ${order.status}</strong> 
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
    });
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

  
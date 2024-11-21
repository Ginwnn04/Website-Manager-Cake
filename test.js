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
    userCurrent = localStorage.getItem(USER_LOGIN) ? JSON.parse(localStorage.getItem(USER_LOGIN)) : null;
}


function loadListOrder() {
    listOrder = localStorage.getItem(LIST_ORDER) ? JSON.parse(localStorage.getItem(LIST_ORDER)) : [];
}

function loadDataProduct() {
    listProduct = localStorage.getItem(LIST_PRODUCT) ? JSON.parse(localStorage.getItem(LIST_PRODUCT)) : [];
    listProductFilter = [...listProduct];
    totalPage = Math.ceil(listProduct.length / perPage);
    console.log(totalPage);
    renderBtnPage();
    renderProducts(listProduct);
}

function loadNextOrderId() {
    nextOrderId = localStorage.getItem("nextOrderId") ? parseInt(localStorage.getItem("nextOrderId")) : 1;
    localStorage.setItem(NEXT_ID, nextOrderId);
};
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + " ₫";
}
function parsePrice(priceString) {
    const price = priceString.replace(/[^\d]/g, '');
    return parseInt(price); 
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


// Hàm hiển thị sản phẩm
function renderProducts(productsToRender) {
    const productContainer = document.getElementsByClassName("list-product")[0];
    productContainer.innerHTML = "";
    let txtHtml = "";
    // productsToRender.forEach((product, index) => {
    //     txtHtml += `<div class="product-item" onclick="openProductDetail(${index})">
    //         <div class="img-product">
    //             <img src="${product.image}" alt="${product.name}">
    //         </div>
    //         <div class="info-product">
    //             <h3 class="name-product">${product.name}</h3>
    //             <div class="bottom-product">
    //                 <h3 class="price-product">${formatPrice(product.price)}</h3>
    //                 <button class="btn">
    //                     <i class="fa-solid fa-cart-plus"></i> Thêm
    //                 </button>
    //             </div>
    //         </div>
    //     </div>`;
    // });
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
                        <h3 class="price-product">${formatPrice(product.price)}</h3>
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

function inputQuantity(obj, index) {
    const quantityInput = obj.parentNode.querySelector(".quantity").value;
    if (parseInt(quantityInput) < 1) {
        alert("Số lượng phải lớn hơn 1.");
    }
    else {        
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
            localStorage.setItem(USER_LOGIN, JSON.stringify(userCurrent));
            const totalPriceComponent = document.querySelector(".total-price-cart");
            totalPriceComponent.innerHTML = formatPrice(totalPrice);
        }
    }
};

// Hàm thêm vào giỏ hàng
function addToCart() {
    if (userCurrent === null) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
    }
    const productCheckout = {};
    productCheckout.name = document.getElementById("product-name").textContent;
    productCheckout.quantity = parseInt(document.getElementById("quantity-product-details").value);
    // alert(document.getElementById("quantity").value);
    productCheckout.price = parsePrice(document.getElementById("product-price").textContent);
    productCheckout.image = document.getElementById("product-image").src;

    findProduct = userCurrent.cart.find(product => product.name === productCheckout.name);
    if (findProduct !== undefined) {
        findProduct.quantity += productCheckout.quantity;
    }
    else {
        userCurrent.cart.push(productCheckout);
    }

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

function renderItemCheckout(listItem) {
    let txtHtml = "";
    let totalPrice = 0;
    listItem.forEach(product => {
        totalPrice += product.quantity * product.price;
        txtHtml += `
                    <div class="item">
                        <span class="quantity-item">${product.quantity}x</span>
                        <span class="name-item">${product.name}</span>
                        <span class="price-item">${formatPrice(product.price)}</span>
                    </div>`;
    });
    const listItemComponent = document.querySelector(".list-details");
    listItemComponent.innerHTML = txtHtml;
    const totalAmountPayment = document.querySelector(".amount-payment");
    totalAmountPayment.innerHTML = formatPrice(totalPrice);

    const totalPricePayment = document.querySelector(".total-price-payment");
    totalPricePayment.innerHTML = formatPrice(totalPrice + 50000);


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
                                <span class="unit-product-checkout">${product.price}</span>
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
    totalPriceComponent.innerHTML = formatPrice(totalPrice);
}

function deleteProduct(index) {
    userCurrent = JSON.parse(localStorage.getItem(USER_LOGIN));
    userCurrent.cart.splice(index, 1);
    localStorage.setItem(USER_LOGIN, JSON.stringify(userCurrent));
    renderCart(userCurrent.cart);
}

const btnPayment = document.querySelector('.btnPayment');
btnPayment.addEventListener("click", renderPayment);

function renderPayment() {
    if (userCurrent === null || userCurrent.cart.length === 0) {
        alert("Không thể thanh toán khi giở hàng đang trống.");
        return;    
    }
    document.querySelector(".modal-payment").classList.add("modal-payment--show");
    localStorage.setItem("modalIsShow", "true");
    renderProvince();
    renderInforUser();
    renderItemCheckout(JSON.parse(localStorage.getItem(USER_LOGIN)).cart);
}


function renderInforUser() {
    const userCurrent = JSON.parse(localStorage.getItem(USER_LOGIN));
    document.getElementById("txtName").value = userCurrent.fullName;
    document.getElementById("txtPhone").value = userCurrent.phone;
    document.getElementById("txtAddress").value = userCurrent.address;
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
btnCustom.forEach(btn => { 
    btn.addEventListener("click", () => {
        btnCustom.forEach(btn => {
            btn.classList.remove("btn-custom--active");    
        });
        btn.classList.add("btn-custom--active");

    });

});

const btnPaymentSubmit = document.querySelector(".btn-order");
btnPaymentSubmit.addEventListener("click", () => {
    const name = document.getElementById("txtName").value;
    const phone = document.getElementById("txtPhone").value;
    const province = document.getElementById("province");
    const district = document.getElementById("district");
    const ward = document.getElementById("ward");
    const address = [];
    address.push(document.getElementById("txtAddress").value);
    address.push(ward[ward.selectedIndex].textContent);
    address.push(district[district.selectedIndex].textContent);
    address.push(province[province.selectedIndex].textContent);
    order = {
        id: `HD-${nextOrderId++}`,
        account: userCurrent.username,
        name: name,
        phone: phone,
        address: address.join(", "),
        detailsOrder: userCurrent.cart,
        timeCreate: new Date().toLocaleString(),
        status: "Chưa xử lí",
        total: userCurrent.cart.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0)
    }
    const methodPayment = document.querySelector('input[name="chb-cash"]:checked').value;
    if (methodPayment === "transfer") {
        openTransfer(order.id, order.total + 50000);
        localStorage.setItem("order", JSON.stringify(order));

    }
    else {
        localStorage.setItem(NEXT_ID, JSON.stringify(nextOrderId));
        listOrder.push(order);
        localStorage.setItem(LIST_ORDER, JSON.stringify(listOrder));
        userCurrent.cart = [];
        localStorage.setItem(USER_LOGIN, JSON.stringify(userCurrent));
        
        alert("Đặt hàng thành công!");
        localStorage.removeItem("modalIsShow");
    }
    



});

const btnBack = document.querySelector('.btn-back');
btnBack.addEventListener("click", () => {
    document.querySelector(".modal-payment").classList.remove("modal-payment--show");
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
            renderProducts(listProduct);
        }
        else {
            const listProductFilter = listProduct.filter(product => product.category === btn.getAttribute("value"));
            renderProducts(listProductFilter);
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


// Pagin

function renderBtnPage() {
    const btnPage = document.querySelector(".pagination");
    let txtHtml = "";
    for (let i = 1; i <= totalPage; i++) {
        txtHtml += `<li class="btn-page" onclick="selectedPage(this)">${i}</li>`;
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


// xử lý đăng ký tài khoản
function registerUser() {
    listUser = JSON.parse(localStorage.getItem(LIST_USER)) || [];
    const phone = document.getElementById("signup-phone").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();

    
    if (!phone || !email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    // Kiểm tra xem tài khoản đã tồn tại chưa
    const existingUser = listUser.find(user => user.phone === phone || user.email === email);
    if (existingUser) {
        alert("Số điện thoại hoặc email đã được sử dụng!");
        return;
    }
    // Thêm tài khoản mới vào danh sách
    const newUser = {
        username: email,
        password: password,
        fullName: "Người dùng mới",
        phone: phone,
        email: email,
        cart: []
    };
    listUser.push(newUser);
    localStorage.setItem(LIST_USER, JSON.stringify(listUser)); // Lưu vào localStorage
    localStorage.setItem(USER_LOGIN, JSON.stringify(newUser)); // Lưu vào localStorage
    loadDataUserCurrent();
    updateLoginButton();
    closeForm("signupForm"); // Đóng form đăng ký
    alert("Đăng ký thành công! Bạn có thể mua sản phẩm ngay bây giờ.");
}


// Hàm xử lý đăng nhập
function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Tìm thông tin người dùng trong danh sách tài khoản
    listUser = JSON.parse(localStorage.getItem(LIST_USER)) || [];
    userCurrent = listUser.find(user => user.username === username && user.password === password);
    console.log(userCurrent);
    if (userCurrent) {
        // Đăng nhập thành công: lưu trạng thái và thông tin người dùng
        localStorage.setItem(USER_LOGIN, JSON.stringify(userCurrent)); // Lưu thông tin người dùng
        alert("Đăng nhập thành công!");
        closeForm('loginForm'); // Đóng form đăng nhập
        updateLoginButton(); // Cập nhật trạng thái nút đăng nhập
    } else {
        alert("Thông tin đăng nhập không chính xác.");
    }
}

// Nút icon
function updateLoginButton() {
    const loginBtn = document.querySelector(".login-btn") || document.querySelector(".user-icon");

    if (userCurrent !== null && loginBtn) {
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
    localStorage.removeItem('userLogin'); // Xóa thông tin người dùng
    loadDataUserCurrent();
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

document.addEventListener("DOMContentLoaded", () => {
    updateLoginButton();

    // nút "Đăng ký"
    document.querySelector("#signupForm .btn").addEventListener("click", (e) => {
        e.preventDefault(); // Ngăn form tải lại trang
        registerUser();
    });

    // nút "Đăng nhập"
    // document.querySelector(".form-container").addEventListener("submit", (e) => {
    //     e.preventDefault();
    //     loginUser();
    // });
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

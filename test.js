const USER_LOGIN = "userLogin";
let listProduct = [];
let listProductFilter = [];



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


function formatPrice(price) {
    return price.toLocaleString('vi-VN') + " ₫";
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

    document.getElementById("quantity").value = 1;

    // Lưu giá gốc của sản phẩm và cập nhật tổng thanh toán ban đầu
    const basePrice = product.price;
    updateTotalPrice(basePrice);

    // Hiển thị form chi tiết sản phẩm
    document.getElementById("product-detail-modal").style.display = "flex";
}

// Hàm tổng thanh toán
function updateTotalPrice(basePrice) {
    const quantity = parseInt(document.getElementById("quantity").value);
    const totalPrice = basePrice * quantity;
    document.getElementById("total-price").textContent = formatPrice(totalPrice);
}

// đóng form chi tiết sản phẩm
function closeProductDetail() {
    document.getElementById("product-detail-modal").style.display = "none";
}

// Hàm tăng số lượng
function increaseQuantity(obj) {
    const quantityInput = obj.parentNode.querySelector(".quantity");
    quantityInput.value = parseInt(quantityInput.value) + 1;

    if (obj.parentNode.getAttribute('value') === 'details-product') {
        const basePrice = parsePrice(document.querySelector("#product-price").textContent);
        updateTotalPrice(basePrice);
    }
    else if (obj.parentNode.getAttribute('value') === 'checkout-product') {
        const userCurrent = JSON.parse(localStorage.getItem(USER_LOGIN));
        const listItemComponent = document.querySelector(".list-cart-item");
        let totalPrice = 0;
        listItemComponent.childNodes.forEach((element, index) => {
            const quantityProduct = parseInt(element.querySelector('.quantity').value);
            totalPrice += quantityProduct * userCurrent.cart[index].price;
            console.log(quantityProduct, userCurrent.cart[index].price);
        });
        const totalPriceComponent = document.querySelector(".total-price-cart");
        totalPriceComponent.innerHTML = formatPrice(totalPrice);
    }
}

// Hàm giảm số lượng
function decreaseQuantity(obj) {
    const quantityInput = obj.parentNode.querySelector(".quantity");
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
        
        if (obj.parentNode.getAttribute('value') === 'details-product') {
            const basePrice = parsePrice(document.querySelector("#product-price").textContent);
            updateTotalPrice(basePrice);
        }
        else if (obj.parentNode.getAttribute('value') === 'checkout-product') {
            const userCurrent = JSON.parse(localStorage.getItem(USER_LOGIN));
            const listItemComponent = document.querySelector(".list-cart-item");
            let totalPrice = 0;
            listItemComponent.childNodes.forEach((element, index) => {
                const quantityProduct = parseInt(element.querySelector('.quantity').value);
                totalPrice += quantityProduct * userCurrent.cart[index].price;
                console.log(quantityProduct, userCurrent.cart[index].price);
            });
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
    productCheckout.quantity = document.getElementById("quantity").value;
    alert(document.getElementById("quantity").value);
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

    const userCurrent = localStorage.getItem(USER_LOGIN) ? JSON.parse(localStorage.getItem(USER_LOGIN)) : {};
    if (userCurrent.cart === undefined || userCurrent.cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống.");
        return;
    }
    else {
        let cartContent = "";
        userCurrent.cart.forEach(product => {
            cartContent += `<div class="cart-item">
                        <div class="img-product">
                            <img src="${product.image}" alt="">
                        </div>
                        <div class="infor-checkout">
                            <span class="name-product-checkout">${product.name}</span>
                            <span>Đơn giá: </span>
                            <span class="unit-product-checkout">${product.price}</span>
                            <span class="quantity-product-checkout">Số lượng</span>
                            <div class="btnCustom" value="checkout-product">
                                <input type="text" class="txtCustom quantity" value="${product.quantity}">
                                <button class="btnCustomDesc" onclick="increaseQuantity(this)">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                                <button class="btnCustomAsc" onclick="decreaseQuantity(this)">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <button class="btn-delete-checkout">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>`  
        });
        const listItemComponent = document.querySelector(".list-cart-item");
        listItemComponent.innerHTML = cartContent;
        let totalPrice = 0;
        listItemComponent.childNodes.forEach((element, index) => {
            const quantityProduct = parseInt(element.parentNode.querySelector('.quantity').value);
            totalPrice += quantityProduct * userCurrent.cart[index].price;
            console.log(quantityProduct, userCurrent.cart[index].price);
        });
        const totalPriceComponent = document.querySelector(".total-price-cart");
        totalPriceComponent.innerHTML = formatPrice(totalPrice);
    }
    modal.classList.add("show-modal");
    cart.classList.add("show-cart");
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

// Hàm lọc sản phẩm
function applyFilters() {
    const category = document.getElementById("category-filter").value;
    const minPrice = parseInt(document.getElementById("min-price").value) || 0;
    const maxPrice = parseInt(document.getElementById("max-price").value) || Infinity;

    // Lọc sản phẩm theo tiêu chí
    listProductFilter = products.filter(product => {
        const productPrice = parseInt(product.price.replace(/[^0-9]/g, ""));
        const categoryMatch = !category || product.category === category;
        const priceMatch = productPrice >= minPrice && productPrice <= maxPrice;
        return categoryMatch && priceMatch;
    });

}

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

const test = document.getElementById("category-filter");
test.addEventListener("change", () => { 
    if (test.value === "") {
        renderProducts(products);
    }
    else {
        const listProductFilter = products.filter(product => product.category === test.value);
        renderProducts(listProductFilter);
    }

});



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

    document.getElementById("apply-filter").addEventListener("click", applyFilters);

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
            suggestionBox.style.top = `${inputRect.bottom + window.scrollY}px`;
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



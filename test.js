const url = 'http://127.0.0.1:5500/assets/data.json';

let listProduct = [];
let listProductCheckout = [];


fetch(url)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('listProduct', JSON.stringify(data.products));
        console.log("Data saved to localStorage.");
    })
    .catch(error => console.log(error));

listProduct = JSON.parse(localStorage.getItem('listProduct'));

let filteredProducts = [...listProduct]; // Biến toàn cục lưu trữ danh sách sản phẩm đã lọc hoặc danh sách ban đầu

// Lấy phần tử hiển thị danh sách sản phẩm
const productContainer = document.getElementsByClassName("list-product")[0];

// Hàm hiển thị sản phẩm
function renderProducts(productsToRender) {
    productContainer.innerHTML = "";
    productsToRender.forEach((product, index) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <div class="img-product" onclick="openProductDetail(${index})">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="info-product">
                <h3 class="name-product" onclick="openProductDetail(${index})">${product.name}</h3>
                <div class="bottom-product">
                    <h3 class="price-product">${product.price}</h3>
                    <button class="btn">
                        <i class="fa-solid fa-cart-plus"></i> Thêm
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(productItem);
    });
}

renderProducts(listProduct);

// Hàm mở form chi tiết sản phẩm
function openProductDetail(index) {
    const product = filteredProducts[index];

    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-description").textContent = product.description;

    document.getElementById("quantity").value = 1;

    // Lưu giá gốc của sản phẩm và cập nhật tổng thanh toán ban đầu
    const basePrice = parseInt(product.price.replace(/[^0-9]/g, ''));
    updateTotalPrice(basePrice);

    // Hiển thị form chi tiết sản phẩm
    document.getElementById("product-detail-modal").style.display = "flex";
}

// Hàm tổng thanh toán
function updateTotalPrice(basePrice) {
    const quantity = parseInt(document.getElementById("quantity").value);
    const totalPrice = basePrice * quantity;
    document.getElementById("total-price").textContent = `${totalPrice.toLocaleString()} ₫`;
}

// đóng form chi tiết sản phẩm
function closeProductDetail() {
    document.getElementById("product-detail-modal").style.display = "none";
}

// Hàm tăng số lượng
function increaseQuantity() {
    const quantityInput = document.getElementById("quantity");
    quantityInput.value = parseInt(quantityInput.value) + 1;

    const basePrice = parseInt(document.getElementById("product-price").textContent.replace(/[^0-9]/g, ''));
    updateTotalPrice(basePrice);
}

// Hàm giảm số lượng
function decreaseQuantity() {
    const quantityInput = document.getElementById("quantity");
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;

        const basePrice = parseInt(document.getElementById("product-price").textContent.replace(/[^0-9]/g, ''));
        updateTotalPrice(basePrice);
    }
}

// Hàm thêm vào giỏ hàng
function addToCart() {
    const product = {};
    product.name = document.getElementById("product-name").textContent;
    product.quantity = document.getElementById("quantity").value;
    listProductCheckout.push(product);
    alert(`Đã thêm ${product.quantity} x ${product.productName} vào giỏ hàng.`);
    localStorage.setItem("listProductCheckout", JSON.stringify(listProductCheckout));
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
    filteredProducts = products.filter(product => {
        const productPrice = parseInt(product.price.replace(/[^0-9]/g, ""));
        const categoryMatch = !category || product.category === category;
        const priceMatch = productPrice >= minPrice && productPrice <= maxPrice;
        return categoryMatch && priceMatch;
    });

}

// Hàm sắp xếp sản phẩm đã lọc
function sortProducts(order) {
    filteredProducts.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    renderProducts(filteredProducts);
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
            renderProducts(products);
        }
        else {
            const listProductFilter = products.filter(product => product.category === btn.getAttribute("value"));
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

    

    renderProducts(filteredProducts);



    // Lọc sản phẩm theo từ khóa
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.trim().toLowerCase();
        if (keyword === "") {
            renderProducts(filteredProducts);
        } else {
            const keywordFilteredProducts = filteredProducts.filter(product => {
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

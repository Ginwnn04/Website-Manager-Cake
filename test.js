const products = [
    {
        "name": "Banana Chocolate",
        "price": "24,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02971_optimized.png",
        "description": "Bánh mì mềm mại, thơm lừng với sự kết hợp hoàn hảo của bơ và tỏi băm nhuyễn, mang đến hương vị đậm đà và hấp dẫn.",
        "category": "Buns"
    },
    {
        "name": "Bacon Cheese Onion",
        "price": "32,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03115_optimized.png",
        "description": "Bánh mì tươi ngon được phủ lớp phô mai béo ngậy, hoàn hảo cho bữa sáng hoặc bữa ăn nhẹ.",
        "category": "Buns"
    },
    {
        "name": "Banana Peanut",
        "price": "24,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02946_optimized.png",
        "description": "Một món bánh ngọt ngào với nhân sô cô la tan chảy, mang đến trải nghiệm thú vị cho vị giác của bạn.",
        "category": "Buns"
    },
    {
        "name": "Cheese Croissant",
        "price": "28,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03375_optimized.png",
        "description": "Bánh mì nướng giòn rụm, lớp bơ tỏi thơm lừng, tuyệt vời cho bữa sáng hoặc ăn kèm với súp.",
        "category": "Buns"
    },
    {
        "name": "Cheese Boat",
        "price": "22,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03256_optimized.png",
        "description": "Bánh mì nướng vàng ruộm, với lớp phô mai tan chảy tạo nên hương vị tuyệt vời cho mọi bữa ăn.",
        "category": "Buns"
    },
    {
        "name": "Chocolate Cookies",
        "price": "99,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03142_optimized.png",
        "description": "Những chiếc bánh quy sô cô la thơm ngon, lớp vỏ giòn và nhân mềm mịn, thích hợp cho những buổi trà chiều.",
        "category": "Cookies"
    },
    {
        "name": "Almond Cookies",
        "price": "99,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03146_optimized.png",
        "description": "Bánh quy hạnh nhân giòn tan, với hương vị ngọt nhẹ và thơm mát, là lựa chọn lý tưởng cho những ai yêu thích món ngọt.",
        "category": "Cookies"
    },
    {
        "name": "Brioche",
        "price": "92,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02364_optimized.png",
        "description": "Bánh brioche mềm mại, giàu bơ và hương vị thơm ngon, hoàn hảo cho bữa sáng hoặc ăn nhẹ.",
        "category": "Toasts"
    },
    {
        "name": "California Toast",
        "price": "55,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02270_optimized.png",
        "description": "Bánh mì nướng California giòn rụm, thích hợp để ăn kèm với salad hoặc súp.",
        "category": "Toasts"
    },
    {
        "name": "Dark Rye Toast",
        "price": "55,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02286_optimized-1.png",
        "description": "Bánh mì nướng đen với hương vị đậm đà, rất tốt cho sức khỏe, là lựa chọn tuyệt vời cho bữa sáng.",
        "category": "Toasts"
    },
    {
        "name": "Fresh Baguette",
        "price": "48,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02384_optimized.png",
        "description": "Bánh baguette tươi ngon, lớp vỏ giòn rụm và bên trong mềm mại, lý tưởng để ăn kèm với các món ăn khác.",
        "category": "Toasts"
    },
    {
        "name": "Hokkaido Roll",
        "price": "169,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2024/01/HOKKAIDO-ROLL-169K_SP-ROLL-1.jpg",
        "description": "Cuộn Hokkaido mềm mịn với hương vị tinh tế, mang đến trải nghiệm ẩm thực tuyệt vời.",
        "category": "Dry Cakes"
    },
    {
        "name": "Japan Light Cheese",
        "price": "138,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02649_optimized.png",
        "description": "Bánh phô mai nhẹ nhàng, hương vị thanh mát, phù hợp cho những ai yêu thích sự nhẹ nhàng.",
        "category": "Dry Cakes"
    },
    {
        "name": "Combo Drycake 3pcs",
        "price": "85,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02769_optimized.png",
        "description": "Bộ ba bánh khô đa dạng, mỗi chiếc mang đến một hương vị riêng biệt, là sự lựa chọn hoàn hảo cho những buổi tiệc.",
        "category": "Dry Cakes"
    },
    {
        "name": "Banana Cake",
        "price": "139,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02662_optimized.png",
        "description": "Bánh chuối ngọt ngào, với độ ẩm hoàn hảo và hương vị thơm ngon, là món tráng miệng tuyệt vời.",
        "category": "Dry Cakes"
    },
    {
        "name": "Pandan Japan Light Cheese",
        "price": "138,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2024/04/Pandan-Japan-Light-Cheese_129k.png",
        "description": "Bánh phô mai Nhật Bản vị lá dứa, mang đến hương vị độc đáo và thú vị.",
        "category": "Dry Cakes"
    },
    {
        "name": "Bánh kem Blueberry",
        "price": "490,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02564_optimized.png",
        "description": "Bánh kem blueberry ngọt ngào, với lớp kem mịn màng và vị trái cây tươi mát, lý tưởng cho các buổi tiệc.",
        "category": "Cakes"
    },
    {
        "name": "Fresh Cream",
        "price": "420,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/z5288998176966_5d5e76e5a65947c69e8490722cd4df32.jpg",
        "description": "Bánh kem tươi với lớp kem ngọt ngào, mềm mại, phù hợp cho những ai yêu thích vị ngọt thanh.",
        "category": "Cakes"
    },
    {
        "name": "Black Forest C",
        "price": "550,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02466_optimized.png",
        "description": "Bánh Black Forest truyền thống với lớp kem chocolate và việt quất, mang đến trải nghiệm ẩm thực tuyệt vời.",
        "category": "Cakes"
    },
    {
        "name": "Party Pink",
        "price": "600,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02474_optimized.png",
        "description": "Bánh tiệc hồng nổi bật, với lớp kem trang trí và hương vị phong phú, là tâm điểm cho mọi buổi tiệc.",
        "category": "Cakes"
    },
    {
        "name": "Rainbow Bliss C",
        "price": "550,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02437_optimized.png",
        "description": "Bánh cầu vồng ngọt ngào với nhiều lớp màu sắc, mang đến không gian tươi vui và sống động.",
        "category": "Cakes"
    },
    {
        "name": "Rainbow Fresh Cream",
        "price": "460,000 ₫",
        "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/z5288430562579_36de56043d15079eb6f1064890b7109b.jpg",
        "description": "Bánh kem tươi ngọt ngào, với lớp kem mềm mịn và hương vị nhẹ nhàng, phù hợp cho những dịp đặc biệt.",
        "category": "Cakes"
    }
    // Thêm sản phẩm khác...
];

let filteredProducts = [...products]; // Biến toàn cục lưu trữ danh sách sản phẩm đã lọc hoặc danh sách ban đầu

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

renderProducts(products);

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
    const productName = document.getElementById("product-name").textContent;
    const quantity = document.getElementById("quantity").value;
    alert(`Đã thêm ${quantity} x ${productName} vào giỏ hàng.`);
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
    }
});

const btnClose = document.querySelector(".btn-close");
btnClose.addEventListener("click", () => {
    const filterBar = document.querySelector(".navbar-filter");
    filterBar.classList.remove("filter-bar--open");
});

document.addEventListener("DOMContentLoaded", function () {
    // Lấy các phần tử cần thiết
    const filterBar = document.querySelector(".navbar-filter");
    const searchInput = document.querySelector(".search-txt");
    const navLinks = document.querySelectorAll(".btn-nav-header");
    const logo = document.querySelector(".logo img");
    const sortButton = document.getElementById("sort-button");
    const sortOptions = document.getElementById("sort-options");

    

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

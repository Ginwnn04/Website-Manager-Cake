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

const productContainer = document.getElementsByClassName("list-product")[0];
function renderProducts() {
    productContainer.innerHTML = "";
    products.forEach(product => {
        const productItem = document.createElement("div");
            productItem.classList.add("product-item");

            productItem.innerHTML = `
                <div class="img-product">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="info-product">
                    <h3 class="name-product">${product.name}</h3>
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
renderProducts();


window.addEventListener('scroll', () => {
    var navbar = document.getElementsByClassName("navbar")[0];
    if (window.pageYOffset >= 30) {
      navbar.classList.add("hide");  
      
    }
    else {
      navbar.classList.remove("hide"); 
    
    }
});
  

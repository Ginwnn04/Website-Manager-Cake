const LIST_PRODUCT = "listProduct";
const LIST_USER = "listUser";
const USER_LOGIN = "userLogin";
const NEXT_ID = "nextOrderId";
const LIST_ORDER = "listOrder";



function loadDataToLocal() {
    if (localStorage.getItem(LIST_PRODUCT) === null) {
        const listProduct = [
            {
                "id": 1,
                "name": "Banana Chocolate",
                "price": 24000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02971_optimized.png",
                "description": "Bánh mì mềm mại, thơm lừng với sự kết hợp hoàn hảo của bơ và tỏi băm nhuyễn, mang đến hương vị đậm đà và hấp dẫn.",
                "category": "Buns"
            },
            {
                "id": 2,
                "name": "Bacon Cheese Onion",
                "price": 32000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03115_optimized.png",
                "description": "Bánh mì tươi ngon được phủ lớp phô mai béo ngậy, hoàn hảo cho bữa sáng hoặc bữa ăn nhẹ.",
                "category": "Buns"
            },
            {
                "id": 3,
                "name": "Banana Peanut",
                "price": 24000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02946_optimized.png",
                "description": "Một món bánh ngọt ngào với nhân sô cô la tan chảy, mang đến trải nghiệm thú vị cho vị giác của bạn.",
                "category": "Buns"
            },
            {
                "id": 4,
                "name": "Cheese Croissant",
                "price": 28000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03375_optimized.png",
                "description": "Bánh mì nướng giòn rụm, lớp bơ tỏi thơm lừng, tuyệt vời cho bữa sáng hoặc ăn kèm với súp.",
                "category": "Buns"
            },
            {
                "id": 5,
                "name": "Cheese Boat",
                "price": 22000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03256_optimized.png",
                "description": "Bánh mì nướng vàng ruộm, với lớp phô mai tan chảy tạo nên hương vị tuyệt vời cho mọi bữa ăn.",
                "category": "Buns"
            },
            {
                "id": 6,
                "name": "Chocolate Cookies",
                "price": 99000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03142_optimized.png",
                "description": "Những chiếc bánh quy sô cô la thơm ngon, lớp vỏ giòn và nhân mềm mịn, thích hợp cho những buổi trà chiều.",
                "category": "Cookies"
            },
            {
                "id": 7,
                "name": "Almond Cookies",
                "price": 99000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03146_optimized.png",
                "description": "Bánh quy hạnh nhân giòn tan, với hương vị ngọt nhẹ và thơm mát, là lựa chọn lý tưởng cho những ai yêu thích món ngọt.",
                "category": "Cookies"
            },
            {
                "id": 8,
                "name": "Brioche",
                "price": 92000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02364_optimized.png",
                "description": "Bánh brioche mềm mại, giàu bơ và hương vị thơm ngon, hoàn hảo cho bữa sáng hoặc ăn nhẹ.",
                "category": "Toasts"
            },
            {
                "id": 9,
                "name": "California Toast",
                "price": 55000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02270_optimized.png",
                "description": "Bánh mì nướng California giòn rụm, thích hợp để ăn kèm với salad hoặc súp.",
                "category": "Toasts"
            },
            {
                "id": 10,
                "name": "Dark Rye Toast",
                "price": 55000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02286_optimized-1.png",
                "description": "Bánh mì nướng đen với hương vị đậm đà, rất tốt cho sức khỏe, là lựa chọn tuyệt vời cho bữa sáng.",
                "category": "Toasts"
            },
            {
                "id": 11,
                "name": "Fresh Baguette",
                "price": 48000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02384_optimized.png",
                "description": "Bánh baguette tươi ngon, lớp vỏ giòn rụm và bên trong mềm mại, lý tưởng để ăn kèm với các món ăn khác.",
                "category": "Toasts"
            },
            {
                "id": 12,
                "name": "Hokkaido Roll",
                "price": 169000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2024/01/HOKKAIDO-ROLL-169K_SP-ROLL-1.jpg",
                "description": "Cuộn Hokkaido mềm mịn với hương vị tinh tế, mang đến trải nghiệm ẩm thực tuyệt vời.",
                "category": "Dry Cakes"
            },
            {
                "id": 13,
                "name": "Japan Light Cheese",
                "price": 138000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02649_optimized.png",
                "description": "Bánh phô mai nhẹ nhàng, hương vị thanh mát, phù hợp cho những ai yêu thích sự nhẹ nhàng.",
                "category": "Dry Cakes"
            },
            {
                "id": 14,
                "name": "Combo Drycake 3pcs",
                "price": 85000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02769_optimized.png",
                "description": "Bộ ba bánh khô đa dạng, mỗi chiếc mang đến một hương vị riêng biệt, là sự lựa chọn hoàn hảo cho những buổi tiệc.",
                "category": "Dry Cakes"
            },
            {
                "id": 15,
                "name": "Banana Cake",
                "price": 139000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02662_optimized.png",
                "description": "Bánh chuối ngọt ngào, với độ ẩm hoàn hảo và hương vị thơm ngon, là món tráng miệng tuyệt vời.",
                "category": "Dry Cakes"
            },
            {
                "id": 16,
                "name": "Pandan Japan Light Cheese",
                "price": 138000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2024/04/Pandan-Japan-Light-Cheese_129k.png",
                "description": "Bánh phô mai Nhật Bản vị lá dứa, mang đến hương vị độc đáo và thú vị.",
                "category": "Dry Cakes"
            },
            {
                "id": 17,
                "name": "Bánh kem Blueberry",
                "price": 490000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02564_optimized.png",
                "description": "Bánh kem blueberry ngọt ngào, với lớp kem mịn màng và vị trái cây tươi mát, lý tưởng cho các buổi tiệc.",
                "category": "Cakes"
            },
            {
                "id": 18,
                "name": "Fresh Cream",
                "price": 420000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/z5288998176966_5d5e76e5a65947c69e8490722cd4df32.jpg",
                "description": "Bánh kem tươi với lớp kem ngọt ngào, mềm mại, phù hợp cho những ai yêu thích vị ngọt thanh.",
                "category": "Cakes"
            },
            {
                "id": 19,
                "name": "Black Forest C",
                "price": 550000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02466_optimized.png",
                "description": "Bánh Black Forest truyền thống với lớp kem chocolate và việt quất, mang đến trải nghiệm ẩm thực tuyệt vời.",
                "category": "Cakes"
            },
            {
                "id": 20,
                "name": "Party Pink",
                "price": 600000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02474_optimized.png",
                "description": "Bánh tiệc hồng nổi bật, với lớp kem trang trí và hương vị phong phú, là tâm điểm cho mọi buổi tiệc.",
                "category": "Cakes"
            },
            {
                "id": 21,
                "name": "Rainbow Bliss C",
                "price": 550000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc02437_optimized.png",
                "description": "Bánh cầu vồng ngọt ngào với nhiều lớp màu sắc, mang đến không gian tươi vui và sống động.",
                "category": "Cakes"
            },
            {
                "id": 22,
                "name": "Rainbow Fresh Cream",
                "price": 460000,
                "image": "https://breadtalkvietnam.com/wp-content/uploads/2023/06/z5288430562579_36de56043d15079eb6f1064890b7109b.jpg",
                "description": "Bánh kem tươi ngọt ngào, với lớp kem mềm mịn và hương vị nhẹ nhàng, phù hợp cho những dịp đặc biệt.",
                "category": "Cakes"
            }
        ];
        localStorage.setItem(LIST_PRODUCT, JSON.stringify(listProduct));
    }
}

function loadAccountToLocal() {
    // Danh sách tài khoản mẫu
    const users = [
        {
            username: 'nguyenminhvu591@gmail.com',
            password: '1',
            fullName: 'Nguyen Minh Vu',
            phone: '0123456789',
            email: 'nguyenminhvu591@gmail.com',
            cart: [],
            provinceId: "01",
            address: "294 An Dương Vương",
            districtId: "005",
            wardId: "00169",
            status: "1",
        },
    ];
    localStorage.setItem(LIST_USER, JSON.stringify(users));
}



window.onload = loadDataToLocal();
window.onload = loadAccountToLocal();

"use strict";
// Lấy form từ DOM
const form = document.getElementById('iForm');
const productPicInput = document.getElementById('id_pic');
const PreviewImage = document.getElementById('preview');
const productList = document.getElementById('productList'); // Phần hiển thị danh sách sản phẩm
productPicInput.addEventListener('change',function(){
    const file=productPicInput.files[0];
    if(file){
        const reader=new FileReader();
        reader.onload=function(e){
            PreviewImage.src=e.target.result;
            PreviewImage.style.display='block';
        };
        reader.readAsDataURL(file);
    }else{
        PreviewImage.src = "";
        PreviewImage.style.display = 'none';
    }
});
// Lắng nghe sự kiện submit của form
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn hành vi mặc định của form (tải lại trang)

    // Lấy giá trị từ các input
    const productName = document.getElementById('id_name').value;
    const productInformation = document.getElementById('id_information').value;
    const productQuantity = document.getElementById('id_quantity').value;
    const productPrice = document.getElementById('id_price').value;
    const productPic=productPicInput.files[0];
    if(!productPic){
        alert('Vui lòng chọn hình ảnh để chèn');
        return ;
    }
    // Tạo object chứa thông tin sản phẩm
    const productData = {
        name: productName,
        infomation: productInformation,
        quantity: productQuantity,
        price: productPrice,
        pic: null
    };
    // Sử dụng FileReader để đọc tệp hình ảnh dưới dạng base64
    const reader=new FileReader();
    reader.onload=function(e){
        productData.pic=e.target.result;
        // Lấy dữ liệu hiện có từ localStorage (nếu có)
        let products = JSON.parse(localStorage.getItem('products')) || [];

        // Thêm sản phẩm mới vào mảng
        products.push(productData);

        // Lưu lại toàn bộ mảng sản phẩm vào localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Thông báo người dùng và reset form
        alert('Sản phẩm đã được lưu vào LocalStorage!');
        form.reset(); // Reset form sau khi lưu
    }
    //Đọc hình ảnh dưới dạng file url
    if(productPic)
        reader.readAsDataURL(productPic);
    else   
        alert('Vui lòng chọn hình ảnh để chèn');
});

// Để xem sản phẩm đã lưu trong localStorage
const savedProducts = JSON.parse(localStorage.getItem('products'));
if (savedProducts) {
    console.log('Các sản phẩm đã lưu:', savedProducts);
    savedProducts.forEach((products,index) => {
        console.log('Sản phẩm ${index + 1}:');
        console.log(`Tên: ${products.name}`);
        console.log(`Giá: ${products.price}`);
        console.log(`Mô tả: ${products.infomation}`);
        console.log(`Số lượng: ${products.quantity}`);
        console.log(`Hình ảnh (Base64):`, products.pic);
    });
}
/*// Hàm hiển thị danh sách sản phẩm
function displayProducts() {
    // Lấy dữ liệu từ localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Xóa nội dung cũ của danh sách sản phẩm
    productList.innerHTML = '';

    // Tạo danh sách sản phẩm
    products.forEach((product, index) => {
        // Tạo phần tử div cho mỗi sản phẩm
        let productItem = document.createElement('div');
        productItem.innerHTML = `
            <h3>Sản phẩm ${index + 1}: ${product.name}</h3>
            <p>Giá: ${product.price}</p>
            <p>Mô tả: ${product.description}</p>
            <p>Số lượng: ${product.quantity}</p>
            <img src="${product.image}" alt="${product.name}" style="max-width: 150px;">
            <hr>
        `;

        // Thêm sản phẩm vào danh sách
        productList.appendChild(productItem);
    });
}

// Hiển thị danh sách sản phẩm khi tải trang
window.onload = displayProducts;*/
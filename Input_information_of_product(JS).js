"use strict";
let editProductIndex=null;
let sortOrder = 'asc';
const form = document.getElementById('iForm');
const productPicInput = document.getElementById('id_pic');
const PreviewImage = document.getElementById('preview');
const ProductList = document.getElementById('productList'); 
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
document.getElementById('id_name').addEventListener('input',function(){
    const productName=this.value;
    const products=JSON.parse(localStorage.getItem('products')) || [];
    if(products.some((p,i) => p.name===productName && i!==editProductIndex)){
        alert("Tên sản phẩm đã tồn tại! Vui lòng chọn tên khác!");
        return;
    }
});
//Đưa thông tin trong input form vào localStorage
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const productName = document.getElementById('id_name').value;
    const productInformation = document.getElementById('id_information').value;
    const productQuantity = document.getElementById('id_quantity').value;
    const productPrice = document.getElementById('id_price').value;
    const productPic=productPicInput.files[0];
    const productData = {
        name: productName,
        infomation: productInformation,
        quantity: productQuantity,
        price: productPrice,
        pic: null
    };
    // if(!productPic && editProductIndex===null){
    //     alert('Vui lòng chọn hình ảnh để chèn');
    //     return ;
    // }
    const products=JSON.parse(localStorage.getItem('products')) || [];
    if(products.some((p,i) => p.name===productName && i!==editProductIndex)){
        alert("Tên sản phẩm đã tồn tại! Vui lòng chọn tên khác!");
        return;
    }
    if(productPic){
        // Nếu có hình ảnh mới được chọn, sử dụng FileReader để đọc và lưu hình ảnh mới
        const reader=new FileReader();
        reader.onload=function(e){
            productData.pic=e.target.result;
            SaveP(productData);
        };
        reader.readAsDataURL(productPic);
    }else if(productPic===null && editProductIndex===null){
        productData.pic='default.png';
        SaveP(productData);
    }else{
        // Nếu không có hình ảnh mới, giữ lại hình ảnh cũ (trong trường hợp chỉnh sửa)
        if (editProductIndex !== null) {    
            try {
                const products = JSON.parse(localStorage.getItem('products')) || [];
                productData.pic = products[editProductIndex].pic; // Giữ lại hình ảnh cũ
                SaveP(productData);
            } catch (error) {
                console.error("Lỗi khi phân tích JSON:", error);
            }
        }
    }
});
// Hàm lưu hoặc cập nhật sản phẩm vào localStorage
function SaveP(productData){
    let products=JSON.parse(localStorage.getItem('products')) || [];
    if(editProductIndex!==null){    
        products[editProductIndex]=productData;
        alert('Sản phẩm đã được cập nhật!');
        editProductIndex=null;
    }else{
        products.push(productData);
        alert('Sản phẩm đã được lưu vào LocalStorage!');
    }
    localStorage.setItem('products',JSON.stringify(products));
    form.reset();
    PreviewImage.style.display='none';
    displayProducts();
}
//Hiện danh sách lên table
function displayProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    ProductList.innerHTML = '';
    products.forEach((product,index) => {
        let productItem = document.createElement('tr');
        productItem.innerHTML = `
            <td>${index + 1}</td> 
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.infomation}</td>
            <td>${product.quantity}</td>
            <td><img src="${product.pic}" alt="${product.name}" style="max-width: 150px;"></td>
            <td>
                <button onclick="editP(${index})">Chỉnh sửa</button>
                <button onclick="confirmDelete(${index})">Xoá</button>
            </td>
        `;

        ProductList.appendChild(productItem);
    });
};
function confirmDelete(index){
    if(confirm("Bạn có chắc chắn muốn xoá sản phẩm này không"))
        deleteP(index);
}
//Hàm xoá sản phẩm
function deleteP(index){
    let products=JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products',JSON.stringify(products));
    displayProducts();
}
//Hàm chỉnh sửa
function editP(index){
    let products = JSON.parse(localStorage.getItem('products')) || [];
    editProductIndex=index; 
    const product=products[index];
    document.getElementById('id_name').value=product.name;
    document.getElementById('id_information').value=product.infomation;
    document.getElementById('id_quantity').value=product.quantity;
    document.getElementById('id_price').value=product.price;
    PreviewImage.src=product.pic;
    PreviewImage.style.display='block'; 
    productPicInput.value='';
}
document.getElementById('sortL').addEventListener('click',function(){
    sortOrder=sortOrder==='asc'? 'desc' : 'asc';
    this.setAttribute=('title',`Sắp xếp theo tên (${sortOrder==='asc' ? 'Tăng dần' : 'Giảm dần'})`);
    document.getElementById('sorticon').src=sortOrder==='asc' ? 'up.png' : 'down.png';
    sortProduct('name',sortOrder);
});
function sortProduct(attribute,order){
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.sort((a, b) => {
        if (attribute === 'name') {
            return order === 'asc' ? (a.name.localeCompare(b.name)) : (b.name.localeCompare(a.name));
        }
        return 0;
    });
    localStorage.setItem('products',JSON.stringify(products));
    displayProducts();
}
// Hiển thị danh sách sản phẩm khi tải trang
window.onload=displayProducts;

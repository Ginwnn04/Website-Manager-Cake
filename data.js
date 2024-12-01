const LIST_PRODUCT = "listProduct";
const LIST_USER = "listUser";
const USER_LOGIN = "userLogin";
const NEXT_ID = "nextOrderId";
const LIST_ORDER = "listOrder";



function loadDataToLocal() {
    if (localStorage.getItem(LIST_PRODUCT) === null) {
      const listProduct = [
        {
          "id" : "GEIN301124346",
          "name" : "Bánh kem nhân dâu",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh%20kem%20nhan%20dau/Banh-Kem-Dau-1.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Lớp bánh mềm mịn kết hợp nhân dâu ngọt dịu, mang đến vị tươi mới khó quên."
        },
        {
          "id" : "8OPT011224125",
          "name" : "Bánh kem bắp",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh%20kem%20bap/Banh-Kem-Bap-1-2.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem thơm bùi, được làm từ bắp tươi, tạo nên hương vị đặc trưng và độc đáo."
        },
        {
          "id" : "J92O011224125",
          "name" : "Bánh kem bắp",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh%20kem%20bap/Banh-Kem-Bap-Kieu-2.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem thơm bùi, được làm từ bắp tươi, tạo nên hương vị đặc trưng và độc đáo."
        },
        {
          "id" : "50MT011224125",
          "name" : "Bánh kem bắp",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh%20kem%20bap/Banh-Kem-Bap-Kieu-3.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem thơm bùi, được làm từ bắp tươi, tạo nên hương vị đặc trưng và độc đáo."
        },
        {
          "id" : "KS6V011224125",
          "name" : "Bánh kem bắp",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh%20kem%20bap/Banh-Kem-Bap-Kieu-4.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem thơm bùi, được làm từ bắp tươi, tạo nên hương vị đặc trưng và độc đáo."
        },
        {
          "id" : "Y6AA011224125",
          "name" : "Bánh kem bắp",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh%20kem%20bap/Banh-Kem-Bap-Kieu-5.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem thơm bùi, được làm từ bắp tươi, tạo nên hương vị đặc trưng và độc đáo."
        },
        {
          "id" : "7KY5011224125",
          "name" : "Bánh kem cam sữa chua mật ong",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Cam-sua-chua-mat-ong/04.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hương cam chua ngọt kết hợp cùng mật ong và sữa chua, mang lại cảm giác thanh mát tuyệt vời."
        },
        {
          "id" : "KSJT011224125",
          "name" : "Bánh kem cam sữa chua mật ong",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Cam-sua-chua-mat-ong/3.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hương cam chua ngọt kết hợp cùng mật ong và sữa chua, mang lại cảm giác thanh mát tuyệt vời."
        },
        {
          "id" : "8INT011224125",
          "name" : "Bánh kem nhân thơm",
          "price" : 305000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-kem-nhan-thom/Banh-Kem-Thom-1.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Nhân thơm ngọt nhẹ hòa quyện với lớp kem béo ngậy, hoàn hảo cho mọi bữa tiệc."
        },
        {
          "id" : "NH5N011224125",
          "name" : "Bánh kem nhân dâu",
          "price" : 360000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh%20kem%20nhan%20dau/Banh-Kem-Dau-Vuong.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Lớp bánh mềm mịn kết hợp nhân dâu ngọt dịu, mang đến vị tươi mới khó quên."
        },
        {
          "id" : "28YG011224125",
          "name" : "Bánh kem nhân thơm",
          "price" : 305000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-kem-nhan-thom/Banh-Kem-Thom-10-1.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Nhân thơm ngọt nhẹ hòa quyện với lớp kem béo ngậy, hoàn hảo cho mọi bữa tiệc."
        },
        {
          "id" : "B5U8011224125",
          "name" : "Bánh kem nhân thơm",
          "price" : 285000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-kem-nhan-thom/Banh-Kem-Thom-8.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Nhân thơm ngọt nhẹ hòa quyện với lớp kem béo ngậy, hoàn hảo cho mọi bữa tiệc."
        },
        {
          "id" : "1AXW011224125",
          "name" : "Bánh kem Tiramisu",
          "price" : 315000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-kem-Tiramisu/Banh-Kem-Tira-Kieu-3.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hương vị Ý truyền thống, kết hợp giữa cà phê đậm đà và kem mịn màng."
        },
        {
          "id" : "ME01011224125",
          "name" : "Bánh kem Tiramisu",
          "price" : 315000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-kem-Tiramisu/Banh-Kem-Tira-Kieu-2.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hương vị Ý truyền thống, kết hợp giữa cà phê đậm đà và kem mịn màng."
        },
        {
          "id" : "UAI3011224125",
          "name" : "Bánh kem Tiramisu",
          "price" : 315000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-kem-Tiramisu/Banh-Kem-Tira-2.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hương vị Ý truyền thống, kết hợp giữa cà phê đậm đà và kem mịn màng."
        },
        {
          "id" : "TWA0011224125",
          "name" : "Bánh kem khoai môn",
          "price" : 315000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-khoai-mon/Banh-Kem-Khoaimon-Version1.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem khoai môn bùi béo, được chế biến từ khoai môn tươi, phù hợp cho mọi khẩu vị."
        },
        {
          "id" : "LTB5011224125",
          "name" : "Bánh kem Kiosi",
          "price" : 315000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-kem-kiosi/Banh-Kem-Kiosi.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh độc đáo với sự pha trộn của các hương vị ngọt ngào và mềm mịn, dành riêng cho thực khách."
        },
        {
          "id" : "7IT3011224125",
          "name" : "Bánh kem Matcha",
          "price" : 360000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-tra-xanh-dau-do/Banh-Kem-Tra-Xanh-1.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Matcha nguyên chất kết hợp với kem tươi, tạo nên hương vị Nhật Bản đầy thanh tao."
        },
        {
          "id" : "XFJP011224125",
          "name" : "Bánh kem Matcha",
          "price" : 360000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-tra-xanh-dau-do/Banh-Kem-Tra-Xanh-2.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Matcha nguyên chất kết hợp với kem tươi, tạo nên hương vị Nhật Bản đầy thanh tao."
        },
        {
          "id" : "QBCB011224125",
          "name" : "Bánh Tiramisu Mousse Cheesecake",
          "price" : 395000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Cheese-cake/Cheese-Tira-1.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh mousse mềm mịn với lớp cheese đậm đà, mang đậm phong cách châu Âu."
        },
        {
          "id" : "AF7X011224125",
          "name" : "Bánh Passion Mousse Cheesecake",
          "price" : 395000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Cheese-cake/Cheese-Passon1.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hương chanh dây chua ngọt, kết hợp với lớp cheese, tạo nên sự cân bằng hoàn hảo."
        },
        {
          "id" : "OO3K011224125",
          "name" : "Bánh Red Velvet Mousse Cheesecake",
          "price" : 395000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Cheese-cake/Cheese-Redvelvet.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Lớp bánh đỏ quyến rũ, hòa quyện cùng mousse và cheese thơm ngon."
        },
        {
          "id" : "2QM0011224125",
          "name" : "Bánh Chocolate Mousse Cheesecake",
          "price" : 395000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Cheese-cake/Cheese-Choco.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Socola đậm vị hòa quyện với mousse và lớp cheese, dành cho người yêu thích sự ngọt ngào."
        },
        {
          "id" : "II19011224125",
          "name" : "Bánh Small - Tiramisu Mousse Cheesecake",
          "price" : 59000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-lanh/Cheese-cake/370-Fw-Tiramisu-Mousse-Cheesecake.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Phiên bản nhỏ gọn, dễ dàng thưởng thức, giữ nguyên hương vị Tiramisu đặc trưng."
        },
        {
          "id" : "SHG4011224125",
          "name" : "Bánh Small - Passion Mousse Cheesecake",
          "price" : 59000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-lanh/Cheese-cake/370-Fw-Passion-Mousse-Cheesecake.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hương vị chanh dây chua ngọt trong từng miếng bánh nhỏ gọn, tiện lợi."
        },
        {
          "id" : "TMO3011224125",
          "name" : "Bánh Small - Red Velvet Mousse Cheesecake",
          "price" : 55000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-lanh/Cheese-cake/370-Fw-Red-Velvet-Mousse-Cheesecake.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh nhỏ xinh, quyến rũ với sắc đỏ của Red Velvet và lớp mousse mềm mại."
        },
        {
          "id" : "HTZO011224125",
          "name" : "Bánh Small - Chocolate Mousse Cheesecake",
          "price" : 55000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-lanh/Cheese-cake/370-Fw-Chocolate-Mousse-Cheesecake.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Phiên bản mini của cheesecake socola, đậm đà và hấp dẫn."
        },
        {
          "id" : "NXWQ011224125",
          "name" : "Bánh kem Cashew",
          "price" : 360000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-socola-hat-dieu/02.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hạt điều thơm bùi hòa quyện với lớp kem mịn, tạo nên món bánh độc đáo."
        },
        {
          "id" : "THIE011224125",
          "name" : "Bánh kem khoai môn",
          "price" : 315000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-khoai-mon/Banh-Kem-Khoaimon-044.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem khoai môn bùi béo, được chế biến từ khoai môn tươi, phù hợp cho mọi khẩu vị."
        },
        {
          "id" : "R9IE011224126",
          "name" : "Bánh kem Kiosi",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-kem-kiosi/Banh-Kem-Kiosi027.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh độc đáo với sự pha trộn của các hương vị ngọt ngào và mềm mịn, dành riêng cho thực khách."
        },
        {
          "id" : "PIHZ011224126",
          "name" : "Bánh kem khoai môn",
          "price" : 315000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-khoai-mon/Banh-Kem-Khoaimon-0550.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem khoai môn bùi béo, được chế biến từ khoai môn tươi, phù hợp cho mọi khẩu vị."
        },
        {
          "id" : "0YQI011224126",
          "name" : "Bánh kem khoai môn",
          "price" : 315000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-khoai-mon/Banh-Kem-Khoaimon-035.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem khoai môn bùi béo, được chế biến từ khoai môn tươi, phù hợp cho mọi khẩu vị."
        },
        {
          "id" : "R83S011224126",
          "name" : "Bánh kem nhân thơm",
          "price" : 285000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-Kem-Cam-20-1.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Nhân thơm ngọt nhẹ hòa quyện với lớp kem béo ngậy, hoàn hảo cho mọi bữa tiệc."
        },
        {
          "id" : "XTZ8011224126",
          "name" : "Bánh kem nhân dâu",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh%20kem%20nhan%20dau/8-3.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Lớp bánh mềm mịn kết hợp nhân dâu ngọt dịu, mang đến vị tươi mới khó quên."
        },
        {
          "id" : "KW72011224126",
          "name" : "Bánh kem cam sữa chua mật ong",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Cam-sua-chua-mat-ong/image-4496.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hương cam chua ngọt kết hợp cùng mật ong và sữa chua, mang lại cảm giác thanh mát tuyệt vời."
        },
        {
          "id" : "507A011224126",
          "name" : "Bánh Mousse Cà Phê Muối Hồng Himalaya",
          "price" : 375000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/Banh-Muoi-Hong-1-Banh.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Mousse cà phê kết hợp muối hồng Himalaya độc đáo, đem lại trải nghiệm mới lạ."
        },
        {
          "id" : "2IR6011224126",
          "name" : "Bánh Chocolate Mousse Cheesecake",
          "price" : 395000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/Z5835353455468-Fd66E9Bed645Bbf569D1C79Bc87A86F6.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Socola đậm vị hòa quyện với mousse và lớp cheese, dành cho người yêu thích sự ngọt ngào."
        },
        {
          "id" : "HY3A011224126",
          "name" : "Bánh Passion Mousse Cheesecake",
          "price" : 395000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/Z5840247797995-2B57Fb574F0Ff3635278Fd1E951917A2.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hương chanh dây chua ngọt, kết hợp với lớp cheese, tạo nên sự cân bằng hoàn hảo."
        },
        {
          "id" : "FZKA011224126",
          "name" : "Bánh Tiramisu Mousse Cheesecake",
          "price" : 395000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/Z5840247797492-6A09E743787Da37017E0588C939515Ae.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh mousse mềm mịn với lớp cheese đậm đà, mang đậm phong cách châu Âu."
        },
        {
          "id" : "FO3T011224126",
          "name" : "Bánh kem cam sữa chua mật ong",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/463397834-966096138881647-3148949566473031690-N.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Hương cam chua ngọt kết hợp cùng mật ong và sữa chua, mang lại cảm giác thanh mát tuyệt vời."
        },
        {
          "id" : "GQLR011224126",
          "name" : "Bánh kem nhân bắp",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/463414314-966096128881648-3368742391105447895-N.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem thơm bùi, được làm từ bắp tươi, tạo nên hương vị đặc trưng và độc đáo."
        },
        {
          "id" : "OXMK011224126",
          "name" : "Bánh kem nhân thơm",
          "price" : 285000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/463365896-966096172214977-5041333375071558854-N.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Nhân thơm ngọt nhẹ hòa quyện với lớp kem béo ngậy, hoàn hảo cho mọi bữa tiệc."
        },
        {
          "id" : "NZMQ011224126",
          "name" : "Bánh kem khoai môn",
          "price" : 315000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/463485128-966096125548315-9141321505537297164-N.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem khoai môn bùi béo, được chế biến từ khoai môn tươi, phù hợp cho mọi khẩu vị."
        },
        {
          "id" : "L4IM011224126",
          "name" : "Bánh kem nhân bắp",
          "price" : 335000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/429772979-812850054206257-84342229220100885-N.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Bánh kem thơm bùi, được làm từ bắp tươi, tạo nên hương vị đặc trưng và độc đáo."
        },
        {
          "id" : "30P3011224126",
          "name" : "Bánh kem nhân thơm",
          "price" : 285000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Nhaan-Thom-Edit-0111.jpg",
          "category" : "Bánh kem",
          "status" : "Active",
          "description" : "Nhân thơm ngọt nhẹ hòa quyện với lớp kem béo ngậy, hoàn hảo cho mọi bữa tiệc."
        },
        {
          "id" : "D5YK011224126",
          "name" : "Bánh Flan",
          "price" : 12000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-lanh/Banh-Flan-2.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Lớp flan mịn màng, béo thơm vị caramel, tan chảy ngay trong miệng."
        },
        {
          "id" : "CHH8011224126",
          "name" : "Bánh bông lan cuộn nhỏ",
          "price" : 22000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-lanh/Banh-Bong-Lan-Cuon-Nho-1.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh mềm mịn, cuộn nhân kem ngọt nhẹ, thích hợp cho các bữa ăn nhẹ."
        },
        {
          "id" : "2A7J011224126",
          "name" : "Bánh su kem",
          "price" : 33000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-lanh/436234970-841978384626757-6998579166814659493-N.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Vỏ bánh giòn xốp kết hợp nhân kem mịn, đem lại cảm giác ngọt ngào khi thưởng thức."
        },
        {
          "id" : "BMDS011224126",
          "name" : "Bánh su socola",
          "price" : 24000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-lanh/436236178-840731064751489-1746733262501694799-N.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh su thơm béo với lớp nhân socola đặc trưng, hấp dẫn khó cưỡng."
        },
        {
          "id" : "I4VP011224126",
          "name" : "Ốc kem",
          "price" : 13000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-lanh/Oc-Kem.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Hình ốc xinh xắn, nhân kem ngọt mát, làm say lòng bất kỳ thực khách nào."
        },
        {
          "id" : "84L9011224126",
          "name" : "Teabreak",
          "price" : 60000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-lanh/429757913-811061727718423-3643360537386017546-N.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Gói món ăn nhẹ đa dạng, gồm bánh và nước uống, lý tưởng cho các buổi họp mặt hoặc tiệc trà."
        },
        {
          "id" : "72DU011224126",
          "name" : "Smallcake Tiramisu",
          "price" : 40000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Small-cake/Smallcake-Tiramisu.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh nhỏ hương vị Tiramisu, kết hợp hài hòa giữa cà phê và lớp kem mềm mịn."
        },
        {
          "id" : "65US011224126",
          "name" : "Smallcake Opera",
          "price" : 40000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Small-cake/Smallcake-Opera.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh opera nhỏ nhiều lớp, pha trộn tinh tế giữa sô cô la và cà phê."
        },
        {
          "id" : "8QRE011224126",
          "name" : "Smallcake Trio Chocolate",
          "price" : 40000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Small-cake/Smallcake-Trio-Chocolate.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh nhỏ ba tầng, mỗi tầng mang một vị sô cô la độc đáo."
        },
        {
          "id" : "JAET011224126",
          "name" : "Smallcake Passion Cheese",
          "price" : 40000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Small-cake/Smallcake-Passion-Cheese.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh nhỏ vị chanh dây, hòa quyện cùng lớp phô mai béo ngậy."
        },
        {
          "id" : "YELW011224126",
          "name" : "Smallcake Cashew Chocolate",
          "price" : 40000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Small-cake/Smallcake-Cashew-Chocolate.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh nhỏ hương sô cô la thơm ngon, kết hợp cùng hạt điều bùi bùi."
        },
        {
          "id" : "BTBW011224126",
          "name" : "Smallcake Strawberry Mousse",
          "price" : 40000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Small-cake/Smallcake-Strawberry-Mousse.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Mousse dâu tây mềm mịn, ngọt nhẹ, với hương vị tươi mới."
        },
        {
          "id" : "V5XS011224126",
          "name" : "Minbong",
          "price" : 23000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Minbong-2.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh tròn nhỏ, mềm mại với lớp nhân thơm ngọt độc đáo."
        },
        {
          "id" : "2VES011224126",
          "name" : "Bánh quy bơ đậu phộng",
          "price" : 25000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Quy-Bo-Dau-Phong-2.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh quy giòn rụm, thơm ngậy vị bơ đậu phộng, thích hợp làm món ăn nhẹ."
        },
        {
          "id" : "110K011224126",
          "name" : "Bánh hình sâu kem Custard",
          "price" : 16000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Sau-Kem.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh mềm hình sâu đáng yêu, nhân kem Custard béo ngậy tan chảy."
        },
        {
          "id" : "PFMD011224126",
          "name" : "Bánh Croissant trứng muối",
          "price" : 20000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Sung-Trau-1.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Croissant giòn tan với nhân trứng muối chảy hấp dẫn, béo ngậy."
        },
        {
          "id" : "FJQG011224126",
          "name" : "Mini Orange",
          "price" : 35000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bong-Lan-Cam-02.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh mini vị cam, thơm mát, mềm mịn, thích hợp để nhâm nhi cùng trà."
        },
        {
          "id" : "O1T9011224126",
          "name" : "Bánh bông lan cam hạt chia",
          "price" : 19000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bong-Lan-Cam-Hat-Chia-02.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh bông lan vị cam tươi, thêm hạt chia giúp bổ sung dinh dưỡng."
        },
        {
          "id" : "N5AM011224126",
          "name" : "Castella sữa",
          "price" : 30000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bong-Lan-Sua-2.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh bông lan kiểu Nhật mềm mịn, thơm nhẹ hương sữa tươi."
        },
        {
          "id" : "RZY5011224126",
          "name" : "Bánh bông lan sô cô la",
          "price" : 19000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/370-Fw-Bong-Lan-Socola.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh mềm mại, hương vị sô cô la đậm đà, tan chảy trong miệng."
        },
        {
          "id" : "9FP4011224126",
          "name" : "Bánh dừa lưới",
          "price" : 19000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Dua-Luoi.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh thơm vị dừa, lớp vỏ giòn nhẹ, nhân bên trong ngọt dịu."
        },
        {
          "id" : "T858011224126",
          "name" : "Mexico sữa dừa",
          "price" : 14000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Mexico-Sua-Dua.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh Mexico mềm, với nhân sữa dừa béo ngậy, hương vị đặc trưng."
        },
        {
          "id" : "SQRH011224126",
          "name" : "Donut",
          "price" : 17000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Donnut.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh vòng truyền thống, giòn bên ngoài, mềm xốp bên trong, có nhiều lớp phủ độc đáo."
        },
        {
          "id" : "D5W4011224126",
          "name" : "Hotdog bun",
          "price" : 30000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bun-Lat.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh mì kẹp xúc xích mềm mịn, thích hợp để ăn nhẹ mọi lúc."
        },
        {
          "id" : "1RA6011224126",
          "name" : "Bun lạt tròn",
          "price" : 30000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bun-Lat-Tron.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh mì tròn không gia vị, dễ dàng kết hợp với nhiều loại nhân."
        },
        {
          "id" : "A2NV011224126",
          "name" : "Bánh chà bông gà",
          "price" : 22000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Mi-Cha-Bong-Ga.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh mặn với lớp phủ chà bông gà thơm ngon, đậm đà."
        },
        {
          "id" : "806W011224126",
          "name" : "Bánh chà bông heo",
          "price" : 22000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Mi-Cha-Bong-Heo.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh mặn với chà bông heo truyền thống, phù hợp khẩu vị mọi người."
        },
        {
          "id" : "7PHB011224126",
          "name" : "Bánh chà bông heo cay",
          "price" : 22000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Mi-Cha-Bong-Heo-Cay.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh chà bông heo với vị cay nồng, kích thích vị giác."
        },
        {
          "id" : "80F9011224126",
          "name" : "Bánh cua bơ",
          "price" : 13000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Cua-Bo.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh hình cua thơm, nhân bơ tan chảy, mềm mịn."
        },
        {
          "id" : "0FMV011224126",
          "name" : "Bánh cua mini",
          "price" : 19000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Cua-Mini.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh cua nhỏ gọn, dễ ăn, lớp vỏ vàng giòn, nhân thơm béo."
        },
        {
          "id" : "RB2W011224126",
          "name" : "Bánh cua phô mai",
          "price" : 12000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Cua-Pho-Mai.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh cua với nhân phô mai béo ngậy, tan chảy ngay khi thưởng thức."
        },
        {
          "id" : "QKZE011224126",
          "name" : "Standard sausage",
          "price" : 19000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Xuc-Xich-Standard-Sausage.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Xúc xích cơ bản, hương vị nguyên bản thơm ngon, lý tưởng để nướng hoặc chiên."
        },
        {
          "id" : "YG9I011224126",
          "name" : "Cheese sausage",
          "price" : 22000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Xuc-Xich-Pho-Mai-Cheese-Sausage.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Xúc xích phô mai, kết hợp giữa vị thịt và phô mai tan chảy hấp dẫn."
        },
        {
          "id" : "XIEV011224126",
          "name" : "Cookies mini",
          "price" : 15000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Quy-Nho.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh quy nhỏ giòn, nhiều hương vị, lý tưởng để dùng kèm trà."
        },
        {
          "id" : "DF9O011224126",
          "name" : "Bánh mì bơ tỏi",
          "price" : 35000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Mi-Bo-Toi.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh mì nướng với lớp bơ tỏi thơm phức, giòn tan bên ngoài."
        },
        {
          "id" : "GOLV011224126",
          "name" : "Bánh bông lan chuối",
          "price" : 16000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bong-Lan-Chuoi.jpg",
          "category" : "Bánh lạnh",
          "status" : "Active",
          "description" : "Bánh bông lan mềm mịn, hương vị chuối tự nhiên, thích hợp cho mọi lứa tuổi."
        },
        {
          "id" : "Q7ZO011224126",
          "name" : "Minbong",
          "price" : 23000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Minbong-2.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh nhỏ mềm mịn, có hương vị ngọt nhẹ, phù hợp làm món ăn nhẹ."
        },
        {
          "id" : "BXME011224126",
          "name" : "Bánh quy bơ đậu phộng",
          "price" : 25000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Quy-Bo-Dau-Phong-2.jpg",
          "category" : "Bánh quy",
          "status" : "Active",
          "description" : "Bánh quy giòn tan, ngậy vị bơ đậu phộng, là món ăn vặt hoàn hảo."
        },
        {
          "id" : "P4KI011224126",
          "name" : "Bánh hình sâu kem Custard",
          "price" : 16000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Sau-Kem.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh hình sâu đáng yêu, nhân kem custard mềm mịn, béo ngậy."
        },
        {
          "id" : "80O3011224126",
          "name" : "Bánh Croissant trứng muối",
          "price" : 20000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Sung-Trau-1.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Croissant giòn xốp với nhân trứng muối tan chảy, hương vị độc đáo."
        },
        {
          "id" : "457M011224126",
          "name" : "Mini Orange",
          "price" : 35000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bong-Lan-Cam-02.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh nhỏ vị cam tươi, thơm ngon và giàu năng lượng."
        },
        {
          "id" : "O2H4011224126",
          "name" : "Bánh bông lan cam hạt chia",
          "price" : 19000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bong-Lan-Cam-Hat-Chia-02.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh bông lan cam mềm mịn, thêm hạt chia giúp cân bằng dinh dưỡng."
        },
        {
          "id" : "1AKK011224126",
          "name" : "Castella sữa",
          "price" : 30000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bong-Lan-Sua-2.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh bông lan Nhật Bản mềm xốp, thơm nhẹ hương sữa tươi."
        },
        {
          "id" : "KO9B011224126",
          "name" : "Bánh bông lan sô cô la",
          "price" : 19000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/370-Fw-Bong-Lan-Socola.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh bông lan thơm ngọt, đậm đà vị sô cô la, phù hợp cho mọi dịp."
        },
        {
          "id" : "WGV2011224126",
          "name" : "Bánh dừa lưới",
          "price" : 19000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Dua-Luoi.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh thơm lừng vị dừa, với lớp vỏ giòn nhẹ và nhân ngọt ngào."
        },
        {
          "id" : "NUFY011224126",
          "name" : "Mexico sữa dừa",
          "price" : 14000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Mexico-Sua-Dua.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh Mexico mềm thơm, kết hợp hoàn hảo giữa sữa và dừa."
        },
        {
          "id" : "7TPB011224126",
          "name" : "Donut",
          "price" : 17000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Donnut.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh vòng tròn truyền thống, có lớp phủ đường hoặc sô cô la hấp dẫn."
        },
        {
          "id" : "MU9F011224127",
          "name" : "Hotdog bun",
          "price" : 30000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bun-Lat.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh mì xúc xích mềm mại, dễ dàng kết hợp với các loại nhân khác."
        },
        {
          "id" : "2ZHJ011224127",
          "name" : "Bun lạt tròn",
          "price" : 30000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bun-Lat-Tron.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh mì tròn không vị, thích hợp để làm bánh sandwich hoặc kẹp nhân tùy thích."
        },
        {
          "id" : "X99X011224127",
          "name" : "Bánh chà bông gà",
          "price" : 22000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Mi-Cha-Bong-Ga.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh mặn phủ đầy chà bông gà thơm ngon, giàu dinh dưỡng."
        },
        {
          "id" : "J7D3011224127",
          "name" : "Bánh chà bông heo",
          "price" : 22000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Mi-Cha-Bong-Heo.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh mềm với lớp chà bông heo mặn vừa, hợp khẩu vị đa số thực khách."
        },
        {
          "id" : "Y5C8011224127",
          "name" : "Bánh chà bông heo cay",
          "price" : 22000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Mi-Cha-Bong-Heo-Cay.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Phiên bản bánh chà bông heo thêm chút cay nồng, kích thích vị giác."
        },
        {
          "id" : "058I011224127",
          "name" : "Bánh cua bơ",
          "price" : 13000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Cua-Bo.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh hình cua giòn nhẹ, nhân bơ béo ngậy thơm phức."
        },
        {
          "id" : "XIK0011224127",
          "name" : "Bánh cua mini",
          "price" : 19000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Cua-Mini.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Phiên bản mini của bánh cua, nhỏ gọn, tiện lợi khi mang theo."
        },
        {
          "id" : "P5RM011224127",
          "name" : "Bánh cua phô mai",
          "price" : 12000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Cua-Pho-Mai.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh cua với nhân phô mai tan chảy, vị béo thơm đầy hấp dẫn."
        },
        {
          "id" : "9Y3D011224127",
          "name" : "Standard sausage",
          "price" : 19000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Xuc-Xich-Standard-Sausage.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Xúc xích cơ bản, hương vị truyền thống, lý tưởng cho các món nướng."
        },
        {
          "id" : "M5Y9011224142",
          "name" : "Cheese sausage",
          "price" : 22000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Xuc-Xich-Pho-Mai-Cheese-Sausage.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Xúc xích phô mai thơm ngon, với lớp nhân phô mai tan chảy hấp dẫn."
        },
        {
          "id" : "WX4U011224142",
          "name" : "Cookies mini",
          "price" : 15000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Quy-Nho.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh quy nhỏ nhiều hương vị, thích hợp làm món ăn nhẹ hoặc quà tặng."
        },
        {
          "id" : "K4BS011224142",
          "name" : "Bánh mì bơ tỏi",
          "price" : 35000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Mi-Bo-Toi.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh mì giòn thơm với lớp bơ tỏi hấp dẫn, phù hợp làm món khai vị."
        },
        {
          "id" : "GSMT011224142",
          "name" : "Bánh bông lan chuối",
          "price" : 16000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Bong-Lan-Chuoi.jpg",
          "category" : "Bánh nướng",
          "status" : "Active",
          "description" : "Bánh bông lan chuối mềm thơm, giữ nguyên hương vị tự nhiên của chuối."
        },
        {
          "id" : "O85R011224142",
          "name" : "Bánh Quy Socola hạnh nhân",
          "price" : 55000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Banh-Quy-Socola-Hanh-Nhan.jpg",
          "category" : "Bánh quy",
          "status" : "Active",
          "description" : "Bánh quy sô cô la giòn rụm, thêm hạnh nhân bùi bùi hấp dẫn."
        },
        {
          "id" : "DRH1011224142",
          "name" : "Bánh Quy Vani hạnh nhân",
          "price" : 55000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-nuong/Quy-Hanh-Nhan-01.jpg",
          "category" : "Bánh quy",
          "status" : "Active",
          "description" : "Bánh quy vị vani thơm nhẹ, hòa quyện cùng hạnh nhân giòn tan."
        },
        {
          "id" : "68RY011224142",
          "name" : "Bánh Quy Hạnh Nhân Savouré",
          "price" : 39000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/4-Version1.jpg",
          "category" : "Bánh quy",
          "status" : "Active",
          "description" : "Bánh quy truyền thống với hạnh nhân rang vàng, giòn và thơm phức."
        },
        {
          "id" : "Y7X0011224142",
          "name" : "Bánh Macaron Mini",
          "price" : 49000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/3-Version1.jpg",
          "category" : "Bánh quy",
          "status" : "Active",
          "description" : "Macaron nhỏ xinh, với vỏ giòn tan và nhân kem ngọt ngào, nhiều hương vị."
        },
        {
          "id" : "EG9V011224142",
          "name" : "Bánh Quy Trái Cây",
          "price" : 55000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/5.jpg",
          "category" : "Bánh quy",
          "status" : "Active",
          "description" : "Bánh quy thơm ngon kết hợp các loại trái cây khô, giàu dinh dưỡng."
        },
        {
          "id" : "0UY8011224142",
          "name" : "Bánh Quy Cà Phê",
          "price" : 49000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/1.jpg",
          "category" : "Bánh quy",
          "status" : "Active",
          "description" : "Bánh quy thơm lừng hương cà phê, thích hợp làm món ăn nhẹ cùng trà."
        },
        {
          "id" : "SOIX011224142",
          "name" : "Bánh Quy Số Cô La Hạnh Nhân",
          "price" : 45000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/6-Version1.jpg",
          "category" : "Bánh quy",
          "status" : "Active",
          "description" : "Bánh quy sô cô la thơm ngon với hạnh nhân bùi béo, giòn rụm."
        },
        {
          "id" : "MQ7S011224142",
          "name" : "Bánh Quy Dừa",
          "price" : 39000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/2-Version2.jpg",
          "category" : "Bánh quy",
          "status" : "Active",
          "description" : "Bánh quy thơm ngậy vị dừa, phù hợp cho mọi lứa tuổi."
        },
        {
          "id" : "AEVI011224142",
          "name" : "Bánh mì que Cá ngừ bắp xốt Mayonnaise",
          "price" : 49000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-mi-que/Mock-Up-900X900-With-Nhan-07.jpg",
          "category" : "Bánh mì que",
          "status" : "Active",
          "description" : "Bánh mì que nhân cá ngừ và bắp ngọt, phủ sốt mayonnaise béo ngậy."
        },
        {
          "id" : "ZR9I011224142",
          "name" : "Bánh mì que Gà xé phô mai",
          "price" : 49000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-mi-que/Mock-Up-900X900-With-Nhan-03.jpg",
          "category" : "Bánh mì que",
          "status" : "Active",
          "description" : "Bánh mì que nhân gà xé và phô mai tan chảy, hấp dẫn và tiện lợi."
        },
        {
          "id" : "I9IL011224142",
          "name" : "Bánh mì que Pate truyền thống",
          "price" : 49000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-mi-que/Mock-Up-900X900-With-Nhan-08.jpg",
          "category" : "Bánh mì que",
          "status" : "Active",
          "description" : "Bánh mì que với nhân pate đậm vị, mang hương vị truyền thống."
        },
        {
          "id" : "HLC5011224142",
          "name" : "Bánh mì que Gà xé Sate cay nồng",
          "price" : 49000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-mi-que/Mock-Up-900X900-With-Nhan-06.jpg",
          "category" : "Bánh mì que",
          "status" : "Active",
          "description" : "Nhân gà xé sốt sate cay nồng, phù hợp cho những ai yêu thích vị cay."
        },
        {
          "id" : "LTVX011224142",
          "name" : "Bánh mì que Xá xíu thịt xông khói",
          "price" : 49000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-mi-que/Mock-Up-900X900-With-Nhan-05.jpg",
          "category" : "Bánh mì que",
          "status" : "Active",
          "description" : "Bánh mì que kết hợp xá xíu và thịt xông khói đậm đà, thơm lừng."
        },
        {
          "id" : "F9FY011224142",
          "name" : "Bánh mì que Gà xé xốt thịt nướng",
          "price" : 49000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-mi-que/Mock-Up-900X900-With-Nhan-04.jpg",
          "category" : "Bánh mì que",
          "status" : "Active",
          "description" : "Nhân gà xé sốt thịt nướng đậm đà, thêm chút vị khói thơm ngon."
        },
        {
          "id" : "T5BZ011224142",
          "name" : "Bánh mì que Nhân chay đặc biệt",
          "price" : 49000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/san-pham/Banh-mi-que/Mock-Up-900X900-With-Nhan-02.jpg",
          "category" : "Bánh mì que",
          "status" : "Active",
          "description" : "Phiên bản bánh mì que nhân chay, với rau củ và sốt đặc biệt thơm ngon."
        },
        {
          "id" : "ZUQZ011224142",
          "name" : "Set 5 bánh sừng trâu nhỏ",
          "price" : 55000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/2-Version1.jpg",
          "category" : "Bánh mì que",
          "status" : "Active",
          "description" : "Gói 5 bánh sừng trâu nhỏ giòn xốp, thích hợp dùng cho bữa tiệc nhẹ."
        },
        {
          "id" : "LNF4011224142",
          "name" : "Set 5 bánh hồ đào",
          "price" : 65000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/Banh-Ho-Dao-Maple-Pecan.jpg",
          "category" : "Bánh mì que",
          "status" : "Active",
          "description" : "Gói 5 bánh hồ đào thơm lừng, giòn giòn và béo bùi."
        },
        {
          "id" : "LMF4011224436",
          "name" : "Set 5 bánh xoắn Sô cô la",
          "price" : 80000,
          "image" : "https://savourebakery.com/temp/500-500/savourebakery.com/storage/images/Banh-Xoan-So-Co-La-Chocolate-Twist.jpg",
          "category" : "Bánh mì que",
          "status" : "Active",
          "description" : "Gói 5 bánh xoắn sô cô la thơm ngon, đậm vị, thích hợp làm quà tặng."
        }
      ];
      localStorage.setItem(LIST_PRODUCT, JSON.stringify(listProduct));
    }
}

function loadAccountToLocal() {
    // Danh sách tài khoản mẫu
    if(localStorage.getItem(LIST_USER) === null){
      const listUser = [
        {
            gmail: 'nguyenminhvu591@gmail.com',
            password: '1',
            fullName: 'Nguyen Minh Vu',
            phone: '0123456789',
            cart: [],
            address: "294 An Dương Vương, Phường 4, Quận 5, TP.HCM",
            street: "294 An Dương Vương",
            provinceId: "01",
            districtId: "005",
            wardId: "00169",
            status: "0",
            role: 'User',
        },
        {
            gmail: 'quang123@gmail.com',
            password: '2',
            fullName: 'Nguyen Nhat Quang',
            phone: '0123456789',
            cart: [],
            address: "294 An Dương Vương, Phường 4, Quận 5, TP.HCM",
            street: "294 An Dương Vương",
            provinceId: "79",
            districtId: "777",
            wardId: "27454",
            status: "1",
            role: 'Admin',
        },
        {
            gmail: 'hihihaha@gmail.com',
            password: '3',
            fullName: 'Nguyen Van Teo',
            phone: '0123456789',
          cart: [],
            address: "294 An Dương Vương, Phường 4, Quận 5, TP.HCM",
            street: "432 Võ Thị Sáu",
            provinceId: "77",
            districtId: "747",
            wardId: "26536",
            status: "1",
            role: 'User',
        }
      ];
      localStorage.setItem(LIST_USER, JSON.stringify(listUser));
    }
 }



window.onload = loadDataToLocal();
window.onload = loadAccountToLocal();

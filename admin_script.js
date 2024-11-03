const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
allSideMenu.forEach(item=>{
    const li =item.parentElement;
    item.addEventListener('click',function(){
        allSideMenu.forEach(i=>{
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
})

const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sideBar = document.getElementById('sidebar');
const avatar = document.querySelector('#sidebar .avatar');
menuBar.addEventListener('click', function(){
    sideBar.classList.toggle('hide');
    if (avatar.style.visibility === 'hidden') {
        avatar.style.visibility = 'visible';
    } else {
        avatar.style.visibility = 'hidden';
    }
})


if(window.innerWidth < 760){
    sideBar.classList.add('hide');
    avatar.style.visibility = 'hidden';
} 
window.addEventListener('resize', function() {
    if (window.innerWidth < 760) {
        sideBar.classList.add('hide');
        avatar.style.visibility = 'hidden';
    // } else {
    //     sideBar.classList.remove('hide');
    //     avatar.style.visibility = 'visible'; 
    // } 
    // PHẦN TRÊN KHI MUỐN PHÓNG TO TRANG VÀ HIỂN THỊ LẠI TOÀN BỘ THANH SIDEBAR VÀ AVATAR
    }
});
    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');
    
    searchButton.addEventListener('click', function(e){
        if(window.innerWidth < 600){
        e.preventDefault();
        searchForm.classList.toggle('show');
        if(searchForm.classList.contains('show')){
            searchButtonIcon.classList.replace('bx-search-alt', 'bx-x-circle');
        } else{
            searchButtonIcon.classList.replace('bx-x-circle','bx-search-alt');
        }
    }
})
// Chuyển đổi qua lại giữa các phần trong menu
const Dashboard = document.querySelector('#dashboard');
const AccountManager=document.querySelector('#account_manager');
AccountManager.style.display = 'none';
Dashboard.style.display = 'block';
function showDashboard(event){
  const selectedItem = event.currentTarget.id;
  if(selectedItem==='dashboard_show'){
    Dashboard.style.display='block';
  }else{
    Dashboard.style.display='none';
  }
}



function showAccountManager(event){
  const selectedItem = event.currentTarget.id;
  if(selectedItem==='account'){
    AccountManager.style.display='block';
  }else{
    AccountManager.style.display='none';
  }
}
allSideMenu.forEach(item =>{
  item.addEventListener('click',showAccountManager);
  item.addEventListener('click',showDashboard);
});
function toggleForm() {
  const form = document.querySelector('.add_account');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
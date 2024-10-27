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
window.onload = function() {
    var ctx1 = document.getElementById('revenueChart').getContext('2d');
    var revenueChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue',
                data: [12, 19, 3, 5, 2, 3, 7],
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            }
        }
    });
};

btnHeader = document.querySelectorAll('.btn-nav-header');
btnHeader.forEach(btn => {
    btn.addEventListener("click", function () {
        hiddenAllContent();
        switch (btn.id) {
            case 'header-home':
                document.getElementById('page-home').style.display = 'block';
                break;
            case 'header-introduct':
                document.getElementById('page-introduct').style.display = 'block';

                break;
            case 'header-news':
                document.getElementById('page-news').style.display = 'block';

                break;
            case 'header-contact':
                document.getElementById('page-contact').style.display = 'block';

                break;
        }
    });
});

function hiddenAllContent() {
    const content = document.getElementById('main-content').children;
    [...content].forEach(x => {
        x.style.display = 'none';
    });
}

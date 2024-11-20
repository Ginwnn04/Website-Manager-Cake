window.onload = test();


function test() {
    const url = window.location.href;
    const arrParams = url.split('&');

    const isSuccess = arrParams.some(param => {
        if (param.includes('vnp_ResponseCode')) {
            if (param.split('=')[1] === '00') {
                return true;
            }
        }
    });
    console.log(isSuccess);
    if (isSuccess) {
        // document.getElementById('title').innerHTML = 'Thanh toán thành công';
    }
    else {
        // document.getElementById('title').innerHTML = 'Thanh toán thất bại';

    }

}
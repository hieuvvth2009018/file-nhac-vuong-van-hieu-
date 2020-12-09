// lấy mã token
var token = localStorage.getItem('token');
// đưa về login-form nếu token không tồn tại
if(token === null || token === undefined)
{
    window.location.href = 'login.html';
}
// lấy function của nút
var btnSubmit = document.forms['song-form']['btn-submit'];
btnSubmit.onclick = function()
{
    // gọi hàm với theo dạng (var cận object = document.form['name-form']['HTML Object Name'].//value//)
    var name = document.forms['song-form']['name'].value;
    var singer = document.forms['song-form']['singer'].value;
    var author = document.forms['song-form']['author'].value;
    var thumbnail = document.forms['song-form']['thumbnail'].value;
    var link = document.forms['song-form']['link'].value;
    //Gọi Object
    var obj = {
        'name': name,
        'singer': singer,
        'author': author,
        'thumbnail': thumbnail,
        'link': link
    };
    //Gọi chuỗi Obj qua JSON với hàm stringify
    var jsonObj = JSON.stringify(obj);
    //Request XML HTTP
    var xmlHttpRequest = new XMLHttpRequest();
    //đảm bảo Request đc gửi đến server
    xmlHttpRequest.onreadystatechange = function()
    {
        //Nếu load đủ 4
        if(this.readyState === 4)
        {
            //Nếu Status ở dạng thành công
            if(this.status === 201)
            {
                // Nhận chuỗi json và trả về là JavaScript
                var responseObj = JSON.parse(this.responseText);
                console.log(responseObj);
                alert('Submit Success!');
                window.location.href = 'main.html'
            }
            else
            {
                alert('Failed! PLease Try Again!');
                window.location.reload(true);
            }
        }
        else
        {
            console.log('Bad Request!!!');
        }
    }
    xmlHttpRequest.open('POST', 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs');
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttpRequest.setRequestHeader('Authorization', `Basic ${token}`);
    xmlHttpRequest.send(jsonObj);
}

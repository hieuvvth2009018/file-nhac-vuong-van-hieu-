var btnLogin = document.forms['login-form']['btn-login'];

btnLogin.onclick = function ()
{
    var email = document.forms['login-form']['email'].value;
    var password = document.forms['login-form']['password'].value;

    if (email.length === 0)
    {}

    var obj = {
        'email': email,
        'password': password,
    };

    var jsonObj = JSON.stringify(obj);

    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function ()
    {
        if (xmlHttpRequest.readyState === 4)
        {
            if (xmlHttpRequest.status === 201)
            {
                var responseObj = JSON.parse(this.responseText);
                console.log(responseObj.token);
                localStorage.setItem('token', responseObj.token);
                alert('Success!')
                window.location.href = 'main.html';
            }
            else
            {
                alert('Login Failed!')
                window.location.reload(true);
            }
        }
        else
        {
            console.log('Bad Request !!!');
        }
    }
    xmlHttpRequest.open('POST', 'https://2-dot-backup-server-002.appspot.com/_api/v2/members/authentication');
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttpRequest.send(jsonObj);
    alert(1);
}
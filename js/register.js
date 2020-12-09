var btnRegister = document.forms['register-form']['btn-register'];

btnRegister.onclick = function()
{
    var firstName = document.forms['register-form']['firstName'].value;
    var lastName = document.forms['register-form']['lastName'].value;
    var password = document.forms['register-form']['password'].value;
    var address = document.forms['register-form']['address'].value;
    var phone = document.forms['register-form']['phone'].value;
    var avatar = document.forms['register-form']['avatar'].value;
    var gender = document.forms['register-form']['gender'].value;
    var email = document.forms['register-form']['email'].value;
    var birthday = document.forms['register-form']['birthday'].value;

    var obj = {
        'firstName': firstName,
        'lastName': lastName,
        'password': password,
        'address': address,
        'phone': phone,
        'avatar': avatar,
        'gender': gender,
        'email': email,
        'birthday': birthday,
    };

    var jsonObj = JSON.stringify(obj);

    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function ()
    {
        if (this.readyState === 4)
        {
            if (this.status === 201)
            {
                var responseObj = JSON.parse(this.responseText);
                console.log(responseObj);
                alert('Register Success!');
                window.location.href = 'login.html'
            }
            else
            {
                alert('Register Failed!');
                window.location.reload(true);
            }
        }
        else
        {
            console.log('Bad Request!!!');
        }
    }
    xmlHttpRequest.open('POST', 'https://2-dot-backup-server-002.appspot.com/_api/v2/members');
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttpRequest.send(jsonObj);
}
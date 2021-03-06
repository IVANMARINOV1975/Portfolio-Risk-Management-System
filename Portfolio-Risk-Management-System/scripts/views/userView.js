
class UserView{

    constructor(wrapperSelector,mainContentSelector){
        this._wrapperSelector=wrapperSelector;
        this._mainContentSelector=mainContentSelector;
    }

    showLoginPage(isLoggedIn){

        let _that=this;


        let  templateUrl="templates/form-guest.html";


        $.get(templateUrl,function (template){
             let renderedWrapper=Mustache.render(template,null);
             $(_that._wrapperSelector).html(renderedWrapper);
             $.get('templates/login.html',function (template) {
                 let rendered=Mustache.render(template,null);
                 $(_that._mainContentSelector).html(rendered);
                 $("#login-request-button").on('click',function (ev) {
                     let username=$("#username").val();
                     let password=$("#password").val();
                     let appsecret=$("#app-secret").val();
                     let data={
                         username:username,
                         password:password,
                         appsecret:appsecret
                     };
                     triggerEvent('login',data);
                 })
             })
        })
    }

    showRegisterPage(isLoggedIn){

        let _that=this;
        let templateUrl;

        if(isLoggedIn){
            templateUrl="templates/welcome-admin-user.html";
        }
        else{
            templateUrl="templates/form-guest.html";
        }

        $.get(templateUrl,function (template){
            let renderedWrapper=Mustache.render(template,null);
            $(_that._wrapperSelector).html(renderedWrapper);
            $.get('templates/register.html',function (template) {
                let rendered=Mustache.render(template,null);
                $(_that._mainContentSelector).html(rendered);
                $("#register-request-button").on('click',function (ev) {
                    let username=$("#username").val();
                    let fullname=$("#full-name").val();
                    let password=$("#password").val();
                    let confirmPassword=$("#pass-confirm").val();
                    let isadmin=$("#is-admin").val();
                    let appsecret=$("#app-secret").val();

                    let data={
                        username:username,
                        fullname:fullname,
                        password:password,
                        confirmPassword:confirmPassword,
                        isadmin:isadmin,
                        appsecret:appsecret
                    };
                    triggerEvent('register',data);
                })
            })

        })
    }

}
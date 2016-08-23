class  UserController {
    constructor(userView, requester, baseUrl, appKey) {

        this._userView = userView;
        this._requester = requester;
        this._baseServiceUrl = baseUrl+"/user/"+appKey+"/";
        this._appKey = appKey;

    }

    showLoginPage(isLoggedIn){
        this._userView.showLoginPage(isLoggedIn);
    }
    showRegisterPage(isLoggedIn){
        this._userView.showRegisterPage(isLoggedIn);
    }
    register(requestData){
        if(requestData.username.length<5){
            showPopup('error',"Username must consist at least 5 symbols.");
            return;
        }
        if(requestData.fullname.length<8){
            showPopup('error',"Fullname must consist at least 8 symbols.");
            return;
        }
        if(requestData.password.length<6){
            showPopup('error',"Password must consist at least 6 symbols.");
            return;
        }
        if(requestData.password!==requestData.confirmPassword){
            showPopup('error',"Password do not match!");
            return;
        }
        delete requestData['confirmPassword'];
        let requestUrl=this._baseServiceUrl;
        this._requester.post(requestUrl,requestData,
            function success(data){
                showPopup('success',"You are successfully registered.");
                redirectUrl("#/");
            },
            function error(data){
                showPopup('error',"An error occured while attempting to register.");
            }

        )

    }
    login(requestData){
        let requestUrl=this._baseServiceUrl+"login";
        this._requester.post(requestUrl,requestData,
            function success(data){
                showPopup('success',"You are successfully logged in.");
                sessionStorage['_authToken']=data._kmd.authtoken;
                sessionStorage['username']=data.username;
                sessionStorage['fullname']=data.fullname;
                sessionStorage['is-admin']=data.isadmin;
                redirectUrl("#/");
            },
            function error(data){
                showPopup('error',"An error occured while attempting to login.");
            }

        )

    }
    logout(){
        sessionStorage.clear();
        redirectUrl("#/");

    }


}
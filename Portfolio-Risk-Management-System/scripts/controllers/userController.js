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
    
    login(requestData){
        
        let requestUrl=this._baseServiceUrl+"login";
        let header=btoa("kid_BJXUdYMu" + ":" + requestData.appsecret);
        let requestHeaders={'Authorization':'Basic'+ ' ' +header,'Content-Type': 'application/json'};
        
        delete requestData['appsecret'];
        
        this._requester.postRegister(requestUrl,requestHeaders,requestData,
            function success(data){
                showPopup('success',"You are successfully logged in.");
                sessionStorage['_authToken']=data._kmd.authtoken;
                sessionStorage['username']=data.username;
                sessionStorage['fullname']=data.fullname;
               
                redirectUrl("#/");
            },
            function error(data){
                showPopup('error',"An error occured while attempting to login.");
            }
        )
    }
    
    register(requestData){
        
        let _that=this;
        let requestUrl=this._baseServiceUrl;
        
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
        
        let header=btoa("kid_BJXUdYMu" + ":" + requestData.appsecret);
        let registerHeaders={'Authorization':'Basic'+ ' ' +header,'Content-Type': 'application/json'};
        delete requestData['appsecret'];

        this._requester.postRegister(requestUrl,registerHeaders,requestData,
            function success(data){
                showPopup('success',"User is successfully registered.");
                redirectUrl("#/");
            },
            function error(data){
                showPopup('error',"An error occured while attempting to register new User.");
            }

        )

    }

    logout(){
        sessionStorage.clear();
        redirectUrl("#/");

    }
   
   


}
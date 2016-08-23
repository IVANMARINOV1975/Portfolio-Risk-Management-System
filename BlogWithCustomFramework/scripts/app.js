(function () {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_BJXUdYMu"; // Place your appKey from Kinvey here...
    let appSecret = "2d8ef1a094f4433c8a195634ddc9c07e"; // Place your appSecret from Kinvey here...
    var _guestCredentials = "47159876-63e2-4f00-8180-207e7482e83c.H+ywzcaFoPb7rq3Bp7bN1vGXM625aZgFq2vFmIE5SCM=";
    // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...

    //Create AuthorizationService and Requester

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";

    let authService=new AuthorizationService(baseUrl,appKey,appSecret,_guestCredentials);

    authService.initAuthorizationType("Kinvey");
    let requester=new Requester(authService);

    let homeView=new HomeView(selector,mainContentSelector);
    let homeController=new HomeController(homeView,requester,baseUrl,appKey);

    let userView=new UserView(selector,mainContentSelector);
    let userController=new UserController(userView,requester,baseUrl,appKey);

    let postView=new PostView(selector,mainContentSelector);
    let postController=new PostController(postView,requester,baseUrl,appKey);

    let assetView=new AssetView(selector,mainContentSelector);
    let assetController=new AssetController(assetView,requester,baseUrl,appKey);

    // Create HomeView, HomeController, UserView, UserController, PostView and PostController

    initEventServices();

    onRoute("#/", function () {
        if(!authService.isLoggedIn()){
            homeController.showGuestPage();
        }
        else{
            homeController.showUserPage();
        }
    });

    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
        let top=$("post-"+this.params[id]).position().top;
        $(window).scrollTop(top);
    });

    onRoute("#/login", function () {
        // Show the login page...
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        // Show the register page...
        userController.showRegisterPage(authService.isLoggedIn())
    });

    onRoute("#/logout", function () {
        // Logout the current user...
        userController.logout();
    });

    onRoute('#/valuation/edit/prices', function () {
        // Show the new post page...
        let data={fullname:sessionStorage['fullname']};
        postController.showCreatePostPage(data,authService.isLoggedIn());
    });
    onRoute('#/valuation/edit/assets', function () {
        // Show the new post page...

        homeController.showUserPageAssets();
    });
    onRoute('#/valuation', function () {
        // Show the new post page...

        homeController.showUserPage_();
    });
    bindEventHandler('login', function (ev, data) {
        // Login the user...
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        // Create a new post...
        postController.createPost(data);
    });
    bindEventHandler('deleteAsset', function (ev, data) {
        // Create a new post...
        assetController.deleteAsset(data);
    });
    bindEventHandler('SaveNewAsset', function (ev, data) {
        // Create a new post...
        homeController.saveNewAsset(data);
    });
    bindEventHandler('EditNewAsset', function (ev, data) {
        // Create a new post...
        assetController.editNewAsset(data);
    });
    
    
    run('#/');
})();

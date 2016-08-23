
class  PostController {

    constructor(postView, requester, baseUrl, appKey) {

        this._postView = postView;
        this._requester = requester;
        this._baseServiceUrl = baseUrl+"/appdata/"+appKey+"/prices/57b3543681c9e8bf3599cd7c";
        this._appKey = appKey;

    }

    showCreatePostPage(data,isLoggedIn){
        this._postView.showCreatePostPage(data,isLoggedIn);
    }

    createPost(requestData){
        // if(requestData.title.length<5){
        //     showPopup('error',"Post title must consist at least 5 symbols.");
        //     return;
        // }
        // if(requestData.content.length<50){
        //     showPopup('error',"Post content must consist at least 8 symbols.");
        //     return;
        // }
        let requestUrl=this._baseServiceUrl;
        this._requester.put(requestUrl,requestData,
            function success(data){
                showPopup('success',"Prices table was successfully updated.");
                redirectUrl("#/valuation");
            },
            function error(data){
                showPopup('error',"An error occured while attempting to update Prices table.");
            }

        )
    }


}
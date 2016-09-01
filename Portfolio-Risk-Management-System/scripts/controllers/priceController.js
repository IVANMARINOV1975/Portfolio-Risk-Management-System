
class  PriceController {

    constructor(priceView, requester, baseUrl, appKey) {

        this._priceView = priceView;
        this._requester = requester;
        this._baseServiceUrl = baseUrl+"/appdata/"+appKey+"/prices/57c746cbf6fd4a253f256b68";
        this._appKey = appKey;

    }

    showCreatePricePage(data,isLoggedIn){
        this._priceView.showCreatePricePage(data,isLoggedIn);
    }

    createPrice(requestData){

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
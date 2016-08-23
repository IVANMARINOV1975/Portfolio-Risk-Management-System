class  AssetController {

    constructor(assetView, requester, baseUrl, appKey) {

        this._assetView = assetView;
        this._requester = requester;
        this._baseServiceUrl = baseUrl+"/appdata/"+appKey+"/equites/";
        this._appKey = appKey;



    }
    deleteAsset(isin){
        let requestUrl=this._baseServiceUrl+`?query={"ISIN":"${isin}"}`;

        this._requester.delete(requestUrl,null,
            function success(data){
                showPopup('success',"Asset successfully deleted.");
                redirectUrl("#/valuation/edit/assets");
            },
            function error(data){
                showPopup('error',"An error occured while attempting to delete asset.");
            })

    }
    editNewAsset(data){
        let requestUrl=this._baseServiceUrl+data._id;

        this._requester.put(requestUrl,data,
            function success(data){
                showPopup('success',"Prices table was successfully updated.");
                redirectUrl("#/valuation/edit/assets");
            },
            function error(data){
                showPopup('error',"An error occured while attempting to update Prices table.");
            }

        )}



}

class  AssetController {

    constructor(assetView, requester, baseUrl, appKey) {

        this._assetView = assetView;
        this._requester = requester;
        this._baseServiceUrl = baseUrl+"/appdata/"+appKey+"/equites/";
        this._appKey = appKey;



    }
    showUserPageAssets(){
        
        let _that=this;
        
        let requestUrl=this._baseServiceUrl;
        
        this._requester.get(requestUrl,
            function success(data){
                _that._assetView.showUserPageAssets(data);
            },
            function error(dataPrices){
                showPopup('error',"Error loading prices!");
            }
        )

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
            })
    }

    
    
    saveNewAsset(data){
        let requestUrl=this._baseServiceUrl+"/appdata/"+this._appKey+"/equites";
        this._requester.post(requestUrl,data,
            function success(data){
                showPopup('success',"Asset  was successfully added.");
                redirectUrl("#/valuation/edit/assets");
            },
            function error(data){
                showPopup('error',"Asset  wasn't  added.");
            })
    };

}

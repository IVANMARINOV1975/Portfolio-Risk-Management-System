class  HomeController{
    constructor(homeView,requester,baseServiceUrl,appKey){

        this._homeView=homeView;
        this._requester=requester;
        this._baseServiceUrl=baseServiceUrl;
        this._appKey=appKey;

    }

    showGuestPage(){

                this._homeView.showGuestPage();
    }


    showUserPageAssets(){
        let _that=this;
        let recentPosts=[];
        let requestUrl=this._baseServiceUrl+"/appdata/"+this._appKey+"/equites";
        this._requester.get(requestUrl,
            function success(data){

                _that._homeView.showUserPageAssets(data);
                
            }
            ,
            function error(dataPrices){
                showPopup('error',"Error loading prices!");
            }
        )   
            
    }
    
    
    
    
    showUserPage_(){
        let _that=this;
        let recentPosts=[];
        let requestUrl=this._baseServiceUrl+"/appdata/"+this._appKey+"/equites";
        let requestUrlPrices=this._baseServiceUrl+"/appdata/"+this._appKey+"/prices";
        let requestUrlArchieve=this._baseServiceUrl+"/appdata/"+this._appKey+"/archieve"

        this._requester.get(requestUrl,
            function success(data){

                // data.sort(function(elem1,elem2){
                //     let date1=new Date(elem1._kmd.ect);
                //     let date2=new Date(elem2._kmd.ect);
                //     return date2-date1;
                // })
                //
                // let currentId=1;
                //
                // for(let i=0;i<data.length && i<5;i++){
                //     data[i].postId=currentId;
                //     currentId++;
                //     recentPosts.push(data[i]);
                // }
                let valuation;
                let arr=[];
                _that._requester.get(requestUrlPrices,
                    function success(dataPrices){
                        let total=0;let lastDate=dataPrices[0].AssetPrices[0].Date;
                        for(let i=0;i<data.length;i++){
                            for(let j=0;i<dataPrices[0].AssetPrices.length;j++){
                                if(data[i].ISIN===dataPrices[0].AssetPrices[j].ISIN){
                                    valuation=data[i].Quantity*dataPrices[0].AssetPrices[j].Price;
                                    data[i].Value=Math.round(valuation*100)/100;data[i].Price=dataPrices[0].AssetPrices[j].Price;

                                    arr.push(data);

                                    total=total+data[i].Value;break;
                                }
                            }
                        }
                       let newobj={Date:lastDate,Valuation:arr};

                        _that._requester.post(requestUrlArchieve,newobj,
                            function success(data){
                            showPopup('success',"ok!");
                                 _that._homeView.showUserPage_(newobj,total,lastDate);
                            },

                            function error(data){
                            showPopup('error',"Error loading achieve!");
                            }
                         );

                    }
                    ,
                    function error(dataPrices){
                        showPopup('error',"Error loading prices!");
                    }
                )




            }
            ,
            function error(data){
                showPopup('error',"Error loading posts!");
            }
        )


    }

    showUserPage(){
        let _that=this;
        let recentPosts=[];
        let requestUrl=this._baseServiceUrl+"/appdata/"+this._appKey+"/archieve";

        this._requester.get(requestUrl,
            function success(data){

                data.sort(function(elem1,elem2){
                    let date1=moment(elem1.valuation.Date,"DD.MM.YYYY");
                    let date2=moment(elem2.valuation.Date,"DD.MM.YYYY");
                    return date2-date1;
                })
                let lastData=data[data.length-1].valuation.Valuation;
                let lastDate=data[data.length-1].valuation.Date;
                let total=0;
                for(let i=0;i<lastData.length;i++){
                   total=total+ lastData[i].Value;
                }

                _that._homeView.showUserPage(lastData, total,lastDate);

            }
            ,
            function error(data){
                showPopup('error',"Error loading posts!");
            }
        )


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

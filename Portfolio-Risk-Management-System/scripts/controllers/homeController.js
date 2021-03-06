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

    showUserPage(){
        
        let _that=this;
        let recentPosts=[];
        let requestUrl=this._baseServiceUrl+"/appdata/"+this._appKey+"/archieve";

        this._requester.get(requestUrl,
            function success(data){

                data.sort(function(elem1,elem2){
                    let date1=moment(elem1.Date,"DD.MM.YYYY");
                    let date2=moment(elem2.Date,"DD.MM.YYYY");
                    return date1-date2;
                })
                
                let lastData=data[data.length-1].Valuation;
                let lastDate=data[data.length-1].Date;
                let total=0;
                
                for(let i=0;i<lastData.length;i++){
                    total=total+ lastData[i].Value;
                }

                _that._homeView.showUserPage(lastData, total,lastDate,"Home");

            }
            ,
            function error(data){
                showPopup('error',"Error loading posts!");
            }
        )


    }

    showActualTable(){

        let _that=this;
        let recentPosts=[];
        let requestUrl=this._baseServiceUrl+"/appdata/"+this._appKey+"/equites";
        let requestUrlPrices=this._baseServiceUrl+"/appdata/"+this._appKey+"/prices";
        let requestUrlArchieve=this._baseServiceUrl+"/appdata/"+this._appKey+"/archieve/";

        this._requester.get(requestUrl,

            function success(data){

                let valuation;
                let arr=[];
                _that._requester.get(requestUrlPrices,
                    function success(dataPrices){
                        let total=0;let lastDate=dataPrices[0].AssetPrices[0].Date;
                        for(let i=0;i<data.length;i++){ let flag=false;
                            for(let j=0;i<dataPrices[0].AssetPrices.length;j++){
                                if(data[i].ISIN===dataPrices[0].AssetPrices[j].ISIN){ flag=true;
                                    valuation=data[i].Quantity*dataPrices[0].AssetPrices[j].Price;
                                    data[i].Value=Math.round(valuation*100)/100;data[i].Price=dataPrices[0].AssetPrices[j].Price;
                                    let obj={};
                                    obj.Name=data[i].Name;
                                    obj.ISIN=data[i].ISIN;
                                    obj.Quantity=data[i].Quantity;
                                    obj.Price=data[i].Price;
                                    obj.Value=data[i].Value;
                                    arr.push(obj);

                                    total=total+data[i].Value;break;
                                }
                            }
                            if(!flag){alert("Missing price!");throw new Error("Missing price!")}
                        }

                        
                        let newobj={};
                        newobj.Date=lastDate;
                        newobj.Valuation=arr;

                        let requestArchieveId=_that._baseServiceUrl+"/appdata/"+_that._appKey+ '/archieve/?query={"Date":'+ '"'+ newobj.Date +'"' +"}";
                        _that._requester.get(requestArchieveId,
                            function success(data) {
                                if(data.length===0) {

                                    _that._requester.post(requestUrlArchieve, newobj,
                                        function success(data) {
                                            _that._homeView.showUserPage(newobj.Valuation, total, lastDate, "Valuation");
                                        },
                                        function error(data) {
                                            showPopup('error', "Error loading achieve!");
                                        }
                                    );
                                }
                                else{
                                    requestUrlArchieve=requestUrlArchieve+data[0]._id
                                    _that._requester.put(requestUrlArchieve, newobj,
                                        function success(data) {
                                            _that._homeView.showUserPage(newobj.Valuation, total, lastDate, "Valuation");
                                        },
                                        function error(data) {
                                            showPopup('error', "Error loading achieve!");
                                        }
                                    );



                                }

                            },
                            function error(data){
                                showPopup('error',"Assets  weren't  find.");
                            }
                        )

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









    showDates(){
        this._homeView.showDates();
    }
    takeAssets(dateVal){
        let _that=this;
        let requestUrl=this._baseServiceUrl+"/appdata/"+this._appKey+ '/archieve/?query={"Date":'+ '"'+ dateVal +'"' +"}";

        this._requester.get(requestUrl,
            function success(data) {
                let total=0;
                   for(let i=0;i<data[0].Valuation.length;i++){
                       total=total+ data[0].Valuation[i].Value;
                   }

                _that._homeView.showUserPage(data[0].Valuation, total,dateVal,"Assets by Date")
            },
             function error(data){
                 showPopup('error',"Assets  weren't  find.");
             }
        )

    }

}

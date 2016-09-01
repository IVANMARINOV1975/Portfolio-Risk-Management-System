class PriceView {

    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreatePricePage(data,isLoggedIn){
        let _that=this;
        let templateUrl;
        if(isLoggedIn){
            templateUrl="templates/form-user.html";
        }
        else{
            templateUrl="templates/form-guest.html";
        }
        $.get(templateUrl,function (template){
            let renderedWrapper=Mustache.render(template,null);
            $(_that._wrapperSelector).html(renderedWrapper);
            $.get('templates/prices.html',function (template) {
                let rendered=Mustache.render(template,null);
                $(_that._mainContentSelector).html(rendered);

                $("#author").val(data.fullname);
                let date=moment().format('DD.MM.YYYY');
                $("#title").val(date);

                $("#create-new-post-request-button").on('click',function (ev) {
                    let stringContent = '{"AssetPrices":' + $("#content").val() + '}';
                    try {
                        var datajson=JSON.parse(stringContent);
                    }
                    catch(e){alert("Problem with content.No content or not a JSON!");throw new Error("Problem with content!")}
                   
                    
                    triggerEvent('createPrice',datajson);
                })
            })

        })


    }











}
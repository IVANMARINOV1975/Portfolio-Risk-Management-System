class PostView {

    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreatePostPage(data,isLoggedIn){
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
            $.get('templates/create-post.html',function (template) {
                let rendered=Mustache.render(template,null);
                $(_that._mainContentSelector).html(rendered);

                $("#author").val(data.fullname);
                let date=moment().format('DD.MM.YYYY');
                $("#title").val(date);

                $("#create-new-post-request-button").on('click',function (ev) {
                    let stringContent='{"AssetPrices":'+$("#content").val()+'}';

                    let data=JSON.parse(stringContent);
                   
                    
                    triggerEvent('createPost',data);
                })
            })

        })


    }











}
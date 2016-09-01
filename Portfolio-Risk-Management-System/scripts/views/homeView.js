'use strict'

class HomeView{

    constructor(wrapperSelector,mainContentSelector){
        this._wrapperSelector=wrapperSelector;
        this._mainContentSelector=mainContentSelector;
    }

    showGuestPage(){
        let _that=this;

        $.get('templates/welcome-guest.html',function (template) {

            let renderedWrapper=Mustache.render(template,null);
            $(_that._wrapperSelector).html(renderedWrapper);

        });
    }

    showUserPage(mainData,total,lastDate,title){

        let _that=this;
        let templateUrl="templates/welcome-admin-user.html";


        $.get(templateUrl,function (template) {

            let renderedWrapper=Mustache.render(template,null);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/assets.html',function (template) {

                let blogPosts={blogPosts:mainData,total:total,lastDate:lastDate,title:title};
                let renderedPosts=Mustache.render(template,blogPosts);
                $('#articleUser').html(renderedPosts);

            });
        });
    }


    


    


  
    showDates(){

        let _that=this;
        let templateUrl="templates/form-user-archieve.html";

        $.get(templateUrl,function (template) {

            let renderedWrapper=Mustache.render(template,null);
            $(_that._wrapperSelector).html(renderedWrapper);



            $.get('templates/archieve-dates.html',function (template) {


                
                let renderedPosts=Mustache.render(template,null);
                $('#assetvaluation').html(renderedPosts);


                $("#getvaluation").on("click", function (ev) {
                    var dateVal = $("#dates").val();
                    dateVal=moment(dateVal,"YYYY-MM-DD").format("DD.MM.YYYY");
                    let reUrl="#/archieve/"+dateVal;
                    redirectUrl(reUrl);
                    



                })


            });

        });
    }

    


}
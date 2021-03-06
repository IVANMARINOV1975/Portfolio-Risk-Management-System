
class AssetView {


    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showUserPageAssets(mainData){
        let _that=this;


        let templateUrl="templates/form-user.html";

        $.get(templateUrl,function (template) {

            let renderedWrapper=Mustache.render(template,null);
            $(_that._wrapperSelector).html(renderedWrapper);



            $.get('templates/postsassets.html',function (template) {


                let blogPosts={blogPosts:mainData};
                let renderedPosts=Mustache.render(template,blogPosts);
                $('#assetvaluation').html(renderedPosts);

                $('#btnAdd').on('click', function () {

                    $("#ValuationTable tbody").append(
                        "<tr>" +
                        "<td><input type='text'/></td>" +
                        "<td><input type='text'/></td>" +
                        "<td><input type='text'/></td>" +
                        "<td><img src='images/save.png' class='btnSave'><img src='images/delete.png' class='btnDelete1'/></td>" +
                        "</tr>");


                    $(".btnSave").on("click", function (ev) {
                        let td = $(this).parent().parent();
                        let tdName = td.children("td:nth-child(1)");
                        let tdISIN = td.children("td:nth-child(2)");
                        let tdQuantity = td.children("td:nth-child(3)");

                        tdName.html(tdName.children("input[type=text]").val());
                        tdISIN.html(tdISIN.children("input[type=text]").val());
                        tdQuantity.html(tdQuantity.children("input[type=text]").val());

                        let data = {
                            Name: $(tdName).html(),
                            ISIN: $(tdISIN).html(),
                            Quantity: parseInt($(tdQuantity).html())
                        }
                        triggerEvent('SaveNewAsset', data);

                    });
                    $(".btnDelete1").on('click', function (ev) {
                        var par = $(this).parent().parent();
                        par.remove();


                    })

                })
                $(".btnDelete").on('click',function (ev) {
                    let par= $(this).parent().parent();
                    let isin=par.children("td:nth-child(2)").html();

                    triggerEvent('deleteAsset',isin);
                });

                $(".btnEdit").on('click',function (ev) {
                    let td= $(this).parent().parent();

                    let tdQuantity = td.children("td:nth-child(3)");
                    let tdButtons = td.children("td:nth-child(4)");


                    tdQuantity.html("<input type='text' id='txtEmail' value='"+tdQuantity.html()+"'/>");
                    tdButtons.html("<img src='images/save.png' class='btnSave1'/>");

                    $(".btnSave1").on("click", function (ev) {
                        let td= $(this).parent().parent();
                        let tdName = td.children("td:nth-child(1)");
                        let tdISIN = td.children("td:nth-child(2)");
                        let tdQuantity = td.children("td:nth-child(3)");

                        tdName.html(tdName.children("input[type=text]").val());
                        tdISIN.html(tdISIN.children("input[type=text]").val());
                        tdQuantity.html(tdQuantity.children("input[type=text]").val());
                        for(let i=0;i<mainData.length;i++){

                        }
                        let data={
                            Name:$(tdName).html(),
                            ISIN:$(tdISIN).html(),
                            Quantity:parseInt($(tdQuantity).html())

                        }
                        let id;
                        for(let i=0;i<mainData.length;i++){
                            if(mainData[i].ISIN===data.ISIN){id=mainData[i]._id;break;}
                        }
                        data._id=id;
                        triggerEvent('EditNewAsset',data);


                    });

                });

            })

        })
    }

}
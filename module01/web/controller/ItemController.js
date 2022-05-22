loadAllItems();
$("#btnSaveItem").click(function () {


    var item={
        code : $("#txtItemCode").val(),
        desc : $("#txtItemName").val(),
        unitPrice : $("#txtItemUnitPrice").val(),
        qty :  $("#txtItemQty").val()
    }

    $.ajax({

        url : "item",
        method : "POST",
        contentType : "application/json",
        data : JSON.stringify(item),

        success : function (res){
            alert(res.message)
        }

    })


});


//search item
$("#btnsearch").click(function (){

$.ajax({
    url: "item?option=GETONE&id="+$("#txtSearchItemCode").val(),
    method: "GET",

    success : function (res){
        if (res.status==200){

           $("#txtItemCode").val(res.data.code);
           $("#txtItemName").val(res.data.desc);
           $("#txtItemUnitPrice").val(res.data.unitPrice);
           $("#txtItemQty").val(res.data.qty);

        }else if (res.status==400){
            alert("Item not found");
        }
    },

    error : function (res){
        alert("System Error");
    }


})


});

$("#btnDeleteItem").click(function (){

    $.ajax({
        url :"item?id="+$("#txtItemCode").val(),
        method : "DELETE",
        success : function (res){

            if (res.status == 200){
                alert(res.message);
            }else if(res.status == 400){
                alert(res.message);
            }

        },

        error : function (){
            alert("System error");
        }


    });


})

//update Items
$("#btnUpdateItem").click(function (){





    $.ajax({

        url : "item",
        method : "PUT",
        contentType: "application/json",
    })


});





//load All Items
function loadAllItems(){

    $.ajax({
        url: "item?option=GETALL",
        method: "GET",

        success : function (res){
            if (res.status==200){

                $("#itemTable").empty();
                for (const item of res.data){
                    let row = `<tr><td>${item.code}</td><td>${item.desc}</td><td>${item.qty}</td><td>${item.unitPrice}</td></tr>`;
                    $("#itemTable").append(row);
                }

            }else if (res.status==400){
                alert("Item not found");
            }
        },

        error : function (res){
            alert("System Error");
        }


    })


   /* $("#itemTable").empty();
    itemDB.forEach(function (i) {
        let row = `<tr><td>${i.getId()}</td><td>${i.getName()}</td><td>${i.getQty()}</td><td>${i.getPrice()}</td></tr>`;
        $("#itemTable").append(row);
    });*/
}
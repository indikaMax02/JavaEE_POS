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




})

function loadAllItems(){
   /* $("#itemTable").empty();
    itemDB.forEach(function (i) {
        let row = `<tr><td>${i.getId()}</td><td>${i.getName()}</td><td>${i.getQty()}</td><td>${i.getPrice()}</td></tr>`;
        $("#itemTable").append(row);
    });*/
}
$("#btnSaveItem").click(function () {
    console.log("ok");
 var id=  $("#txtItemCode").val();
 var name=  $("#txtItemName").val();
 var qty=  $("#txtItemQty").val();
 var unitPrice=  $("#txtItemUnitPrice").val();
 var discount=  $("#txtItemDiscount").val();

  itemDB.push(new Item(id,name,qty,unitPrice,discount));
  alert("Item Added Completed");
  loadAllItems();

});


function loadAllItems(){
    $("#itemTable").empty();
    itemDB.forEach(function (i) {
        let row = `<tr><td>${i.getId()}</td><td>${i.getName()}</td><td>${i.getQty()}</td><td>${i.getPrice()}</td></tr>`;
        $("#itemTable").append(row);
    });
}
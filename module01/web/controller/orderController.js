

//search Item start
$("#txtSelectItemCode").on('keyup',function (e) {
      console.log(e.key);
    var existItem=0;
    if (e.key=="Enter") {
        var itemCode = $("#txtSelectItemCode").val();

        for (var i in itemDB) {
            if (itemCode == itemDB[i].getId()) {
                $("#txtSelectItemDescription").val(itemDB[i].getName());
                $("#txtSelectItemPrice").val(itemDB[i].getPrice());
                $("#txtSelectQTYOnHand").val(itemDB[i].getQty());
                $("#txtSelectItemDiscount").val(itemDB[i].getDiscount());
                 existItem=1;
            }
        }
        if (existItem==0){
            $("#txtSelectItemDescription").val('');
            $("#txtSelectItemPrice").val('');
            $("#txtxtICodetSelectQTYOnHand").val('');
            $("#txtSelectItemDiscount").val('');
            alert("No Such as Item..!");
        }

    }
});
//search Item End





//add to cart start
$("#btnAddToTable").click(function () {

   var itemCode= $("#txtSelectItemCode").val();
   var itemName= $("#txtSelectItemDescription").val();
   var itemPrice= $("#txtSelectItemPrice").val();
   var qtyOnHand=$("#txtSelectQTYOnHand").val();


  var qty=parseInt( $("#txtQty").val());

  //var itemFinallyPrice= itemPrice-((discount/100)*itemPrice);
  var totalItemPrice=itemPrice*qty;


      var itemExist=0;
      for(var i in cartItems){
          if (cartItems[i].getItemCode()==itemCode){

             var oldItemQty =cartItems[i].getItemQty();
             var newItemQty=oldItemQty+qty;

              cartItems[i].setItemQty(newItemQty);
              cartItems[i].setItemPrice(itemPrice);
              cartItems[i].setTotalItemPrice(totalItemPrice);
              itemExist=1;
              loadCart();
              break;
          }
      }
      if (itemExist==0){
          var orderCart = new OrderCart(itemCode,itemName,qty,itemPrice,totalItemPrice);
          cartItems.push(orderCart);
          loadCart();
      }




});


function loadCart(){
    var total=0;

    $("#orderTable").empty();
    cartItems.forEach(function (i) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td><td>${i.getTotalItemPrice()}</td></tr>`;
        total+=i.getTotalItemPrice();
        $("#orderTable").append(row);
    });

    $("#total").text('');
    $("#total").text(total);
    $("#subtotal").text('');
    $("#subtotal").text(total);


}


$("#txtCash,#txtDiscount").on('keyup',function (e) {
         keyPress();
});




function keyPress() {
    var total=$("#total").text();
    var cash= $("#txtCash").val();
    var discount=$("#txtDiscount").val();




           if (cash!=''){
               $("#txtBalance").val('');
               $("#txtBalance").val(cash-total);

               if (discount!=''){
                   var itemFinallytotal= total-((discount/100)*total);
                   $("#subtotal").text('');
                   $("#subtotal").text(itemFinallytotal);
                   $("#txtBalance").val('');
                   $("#txtBalance").val(cash-$("#subtotal").text());
               }else {
                   $("#subtotal").text('');
                   $("#subtotal").text(total);
                   $("#txtBalance").val('');
                   $("#txtBalance").val(cash-total);
               }

           }else {
               $("#txtBalance").val('');
           }


        /*  if (discount!='' && cash!=''){

              alert("ok");
               /!* $("#subtotal").text(itemFinallytotal);

                if (cash==''){
                    alert("cash");
                    $("#txtBalance").val('');
                }else {
                    alert("cashFound");}
              $("#txtBalance").val('');
              $("#txtBalance").val(cash-subTotal);

          }else {
              $("#subtotal").text('');
              $("#subtotal").text(total);*!/
          }else {
              alert("no");
          }*/
/*
          if(discount==''){

          }*/




 /*   if (discount!=''){
        var balance=cash-subTotal;
        $("#txtBalance").val('');
        $("#txtBalance").val(balance);

    }else {
        $("#subtotal").text(total);
        var balance=cash-subTotal;
        $("#txtBalance").val('');
        $("#txtBalance").val(balance);
    }

    if (cash!=''){
        var balance=cash-subTotal;
        $("#txtBalance").val('');
        $("#txtBalance").val(balance);


    }else {
        $("#txtBalance").val('');
    }
*/

}





/*
function genarateOrderId() {
    var array=new Array();

    for (var i in customerDB){
        if ((customerDB[i].getCustomerOrder().length)!=0){

            var orderArray=customerDB[i].getCustomerOrder();
            array.push( orderArray[orderArray.length-1].getOrderId());
        }
    }
    array.sort();
    alert(array[array.length-1]);
}*/


//customer search start
$("#btnOrderCusSearch").click(function () {
         let id = $("#orderCustomerID").val();

         var customerExist=0
         for (var i in customerDB){
             if (id==customerDB[i].getId()){
                 $("#orderCustomerName").val(customerDB[i].getName());
                 $("#orderCustomerTp").val(customerDB[i].getTp());
                 $("#orderCustomerAddress").val(customerDB[i].getAddress());
                 customerExist=1;
                 break;
             }
         }
         if (customerExist==0){
             alert("No Such as Customer ..!");
         }


});
//customer search End

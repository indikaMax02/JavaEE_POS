

//search Item start
$("#txtSelectItemCode").on('keyup',function (e) {
      console.log(e.key);
    var existItem=0;
    if (e.key=="Enter") {

        $.ajax({
            url: "item?option=GETONE&id="+$("#txtSelectItemCode").val(),
            method: "GET",

            success : function (res){
                if (res.status==200){


                    $("#txtSelectItemDescription").val(res.data.desc);
                    $("#txtSelectItemPrice").val(res.data.unitPrice);
                    $("#txtSelectQTYOnHand").val(res.data.qty);

                }else if (res.status==400){
                    alert("Item not found");
                }
            },

            error : function (res){
                alert("System Error");
            }


        })

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

  /*  var itemFinallyPrice= itemPrice-((discount/100)*itemPrice);*/
  /*  var totalItemPrice=itemPrice*qty;*/


  //var itemFinallyPrice= itemPrice-((discount/100)*itemPrice);
  var totalItemPrice=itemPrice*qty;
  console.log(totalItemPrice);


      var itemExist=0;
      for(var i in cartItems){
          if (cartItems[i].getItemCode()==itemCode){

             var oldItemQty =parseInt(cartItems[i].getItemQty());
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
       let orderCart = new OrderCart(itemCode,itemName,qty,itemPrice,totalItemPrice)
          cartItems.push(orderCart);
          loadCart();
      }
});


function loadCart(){
    var total=0;


    $("#orderTable").empty();
    cartItems.forEach(function (i) {
        alert("loop");
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

    $.ajax({
        url :"customer?option=GETONE&id="+id,
        method : "GET",
        success : function (res){
            if (res.status==200){
                $("#orderCustomerName").val(res.data.name);
                $("#orderCustomerTp").val(res.data.tp);
                $("#orderCustomerAddress").val(res.data.address);



            }else if(res.status==400){
                alert(res.message);
            }
        }



    });


});
//customer search End

$("#btnSubmitOrder").click(function (){

    var order={
        orderId : $("#txtOrderID").val(),
        custId : $("#orderCustomerID").val(),
        date : $("#txtDate").val()

    }


    $.ajax({
        url : "order",
        method : "POST",
        contentType : "application/json",
        data : JSON.stringify(order),
        success : function (res) {
             if (res.status==200){
                 alert(res.message);
             }else if (res==400){
                 alert(res.message);
             }


        },
        error : function (res){

            alert("System Error");

        }

    })



});



genarateCustomerId();



$("#btnSaveOrUpdate").click(function () {


    alert("ok");

    var customer={
        id   : $("#txtCusId").val(),
        name : $("#txtCusName").val(),
        tp   : $("#txtCusTp").val(),
        address : $("#txtCusAddress").val()
    }



      $.ajax({

          url:"customer",
          method : "POST",
          contentType : "application/json",
          data : JSON.stringify(customer),

          success : function (res){

          }

      });


     /* customerDB.push(new Customer(id,name,tp,address));
      alert("Customer Added Completed..");
      clearCustomerText();
      genarateCustomerId();
      loadAllCustomer();*/

});

function clearCustomerText() {
    $("#txtCusId").val("");
    $("#txtCusName").val("");
     $("#txtCusTp").val("");
   $("#txtCusAddress").val("");
}


function loadAllCustomer(){

}



function genarateCustomerId() {

}

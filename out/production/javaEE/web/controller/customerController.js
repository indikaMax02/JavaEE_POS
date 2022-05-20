


genarateCustomerId();



$("#btnSaveOrUpdate").click(function () {




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
              if (res.status==200){
                  alert(res.message);
              }else if (res.status==400){
                  alert(res.data)
              }else {
                  alert(res.data);
              }

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

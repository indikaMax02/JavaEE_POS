


loadAllCustomer();





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

                  loadAllCustomer();




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





//search customer
$("#btnCustomerSearch").click(function (){
    $.ajax({
        url :"customer?option=GETONE&id="+$("#txtSearchCusID").val(),
        method : "GET",
        success : function (res){
               if (res.status==200){
                  $("#txtCusId").val(res.data.id);
                     $("#txtCusName").val(res.data.name);
                     $("#txtCusTp").val(res.data.tp);
                       $("#txtCusAddress").val(res.data.address);



               }else if(res.status==400){
                   alert(res.message);
               }
        }



    });
});

//delete Customer
$("#btnDeleteCustomer").click(function (){


    $.ajax({
        url :"customer?id="+$("#txtSearchCusID").val(),
        method : "DELETE",
        success : function (res){

            if (res.status == 200){
                alert(res.message);
            }else if(res.status == 400){
                alert(res.message);
            }


        }




    });
});




function clearCustomerText() {
    $("#txtCusId").val("");
    $("#txtCusName").val("");
     $("#txtCusTp").val("");
   $("#txtCusAddress").val("");
}


function loadAllCustomer(){

    alert("load all Customer;")

    $("#tblCustomerBody").empty();

    $.ajax({
        url:"customer?option=GETALL",
        method : "GET",
        success : function (resp){


            for (const customer of resp.data){
                let row=`<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.tp}</td><td>${customer.address}</td></tr>`;
                $("#tblCustomerBody").append(row);
            }

        }

    });

}



function genarateCustomerId() {

}

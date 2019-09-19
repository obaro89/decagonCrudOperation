$(document).ready(function(){
    //when the add design button is click
    $(".add_designs2").click(function(){

        var d_name = $("#DesignName").val();
        var d_stylist = $("#StylistName").val();
        var photo = $("#DesignPhoto").val();
        d_pics = "design_photos/"+photo;
            if(!d_name=="" && !d_stylist=="" && !d_pics=="")
            {
                $.ajax({
                    url: 'http://localhost:3000/designs',
                    method: 'POST',
                    data: JSON.stringify({ d_name,d_stylist,d_pics}), 
                    contentType: 'application/json',
                }).done((d)=>{
                    $("#DesignName").val("");
                     $("#StylistName").val("");
                   $("#DesignPhoto").val("");
                    d_pics = "";

                    $("#successpost").prepend(`<div class="alert alert-success alert-dismissible fade show" role="alert" ><strong>Great!</strong>A new design has been added.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button></div>`);

                    $('#postform', ".h_modal_add").fadeOut('hide');
                    $('#Modal').modal('hide');
                    //$("#modal-body").append(`<img src="design_photos/check.gif"/>`);

                        $("#design_display").append(`<div class="col-lg-4 col-md-6 mb-4 shadow" id="display_${data[i].id}">
        <div class="card h-100">
          <a href="#"><img class="edit_${data[i].id} card-img-top" src="${data[i].d_pics}" alt="" height="225" width="100"></a>
          <div class="card-body">
           
            <p class="card-text">${data[i].d_name}</p>
          </div>
          <div class="card-footer">
          <p><i class="fas fa-cut"><small class="text-muted"> by ${data[i].d_stylist}</small></i></p>
              <div class="btn-group">
                  <a href="#" class="btn btn-sm btn-primary edit_${data[i].id}"  value="${data[i].id}" data-toggle="modal" data-target="#exampleModal"><i class="far fa-edit"></i></a>
                  <button type="button" class="btn btn-sm btn-danger" id="delete_${data[i].id}"  value="${data[i].id}" data-toggle="modal" data-target="#Modal_${data[i].id}"><i class="far fa-trash-alt"></i></button>
                </div>
            
          </div>
        </div>
      </div>`);
                        $("#del_"+ data[i].id +"").click(function(){
                            $.ajax({
                                url: 'http://localhost:3000/designs/'+ data[i].id +'',
                                method: 'DELETE',
                                contentType: 'application/json',
                                success: function(result) {
                                   
                                   $("#display_"+ data[i].id + "").slideUp(1000);
                                }
                                
                            });
                        })
                })
            }
            else{
              $(".modal-content").prepend(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Oops!</strong> You are required to complete all fields.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>`);  
            }
    })
  })
 


  //when the page is ready, load designs from database

  $(document).ready(function(){
    $.ajax({
      url:"http://localhost:3000/designs",
      type: "GET",
    }).done((data)=>{
  
      for (let i=0; i< data.length; i++)
      {
        $("#design_display").append(`
        <div class="col-lg-4 col-md-6 mb-4 shadow" id="display_${data[i].id}">
        <div class="card h-100">
          <a href="#"><img class="edit_${data[i].id} card-img-top" src="${data[i].d_pics}" alt="" height="auto" width="auto"></a>
          <div class="card-body">
           
            <p class="card-text">${data[i].d_name}</p>
          </div>
          <div class="card-footer">
          <p><i class="fas fa-cut"><small class="text-muted"> by ${data[i].d_stylist}</small></i></p>
              <div class="btn-group">
                  <a href="#" class="btn btn-sm btn-primary edit_${data[i].id}"  value="${data[i].id}" data-toggle="modal" data-target="#exampleModal"><i class="far fa-edit"></i></a>
                  <button type="button" class="btn btn-sm btn-danger" id="delete_${data[i].id}"  value="${data[i].id}" data-toggle="modal" data-target="#Modal_${data[i].id}"><i class="far fa-trash-alt"></i></button>
                </div>
            
          </div>
        </div>
      </div>
        `);
        
        //adding event listeners to dynamically appended element
        $(document).on('click', '.edit_'+data[i].id+'', function(){
         localStorage.setItem("id",""+data[i].id+"");
          window.location.href='viewstyle.html';
        })
        
       
     
        //appending dialog model for each item
        $("#modal").append(`<div class="modal fade" id="Modal_${data[i].id}" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="Modal_${data[i].id}">Are you sure you want to discard ${data[i].d_name} ?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <a href="#"><img class="card-img-top" src="${data[i].d_pics}" alt="" height="auto" width="auto"></a>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" id="del_${data[i].id}" data-dismiss="modal"><i class="far fa-trash-alt"></i> Proceed</button>
            </div>
          </div>
        </div>
      </div>`);

      $("#del_"+ data[i].id +"").click(function(){
        $.ajax({
            url: 'http://localhost:3000/designs/'+ data[i].id +'',
            method: 'DELETE',
            contentType: 'application/json',
            success: function(result) {
               
               $("#display_"+ data[i].id + "").slideUp(500);
            }
            
        });
    })
    }
    })
  })
  


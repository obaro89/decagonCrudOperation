
  $(document).ready(function(){

    
    var id=localStorage.getItem('id');
    $.ajax({
      url:"http://localhost:3000/designs/"+id+"",
      type: "GET",
    }).done((data)=>{

        $("#style_display").append(`
          
        <div class="modal-body " id="modalbdy"><div>
        <span class="v_style">
            <a href="#"><img class="card-img-top" src="${data.d_pics}" alt="" height="auto" width="auto"></a>
        </span>
            </div></div>


       `);

      $("#editform").append(`<form>
      <div class="form-group row">
        <div class="col">
          <input type="text" class="form-control" id="DesignName" value="${data.d_name}">
        </div>
      </div>
      <div class="form-group row">
        <div class="col">
          <input type="text" class="form-control" id="StylistName" value="${data.d_stylist}">
        </div>
      </div>

      <div class="form-group row">
          <div class="col">
            <input type="text" class="form-control" id="DesignPhoto" value="${data.d_pics}">
          </div>
        </div>
      
      <div class="form-group row">
        <div class="col">
          <button type="button" id="upd" class="btn btn-primary btn-lg btn-block"><i class="far fa-edit"></i> Update Design</button>
        </div>
      </div>
    </form>`)

    })

    $(document).on("click", "#upd", function(){
       
        var d_name = $("#DesignName").val();
        var d_stylist = $("#StylistName").val();
        var d_pics = $("#DesignPhoto").val();
        if(!d_name=="" && !d_stylist==""&& !d_pics=="")
        {
        $.ajax({
            url: 'http://localhost:3000/designs/'+ id +'',
            method: 'PUT',
            data: JSON.stringify({ d_name,d_stylist,d_pics}), 
            contentType: 'application/json',
            success: function(result) {
               // alert("Record was successfully updated.")
                $("#modalbdy").hide(700);

            }
        })

        $(".gifsuccess").removeClass("gifsuccess").fadeOut(2300);

        window.setTimeout(function (){ document.location.reload();}, 2200);
        
       
        }else{

            alert("Hi! Please you are required to input new record.");
        }
 
    })
    
})
  
      

    
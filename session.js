 if(sessionStorage.getItem("sessionID"))
  {
    var session = sessionStorage.getItem("sessionID");
    $.ajax({
        url:"http://localhost:3000/admin/"+session+"",
        type: "GET",
      }).done((result)=>{

        $("#welcome").append(`<span> Hi ${result.a_name}</span>`);
        
      })
  }
  

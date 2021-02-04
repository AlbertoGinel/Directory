let DepartmentByLocation = []


function filterArray(array,field,regExp){ 
  if(regExp==""){
    return array
  }else{
    var regEx = new RegExp(regExp);
    var newArray = array.filter(function(elem){
      return regEx.test(elem[field])
    })
    return newArray
  }
}


function filterAndSort(array,by,field){

  var listFiltered = filterArray(array,by,field)
  listFiltered.sort(function(a,b){  //var listFiltSort = 

    var textA = a[by] ?? ""
    var textB = b[by] ?? ""

    textA = textA.toUpperCase()
    textB = textB.toUpperCase()

    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });


  return listFiltered

}

async function searchMain(type,by,field){

  //let listSearch = [];

  if(type=="Department"){
    let departmentList = await getAllDepartments()
    return filterAndSort(departmentList.data,by,field)
  }else{
    let personnelList = await getAllPersonnel()
    return filterAndSort(personnelList.data,by,field)
  }

}


function populateTableSearch(array, type){

  if(type=="Department"){

    $("#tableSearchPer").html("<tr><th>Department</th><th>Location</th></tr>")

    currentDiv("tableSearchDepScreen")

    array.forEach(elem => {
      $("#tableSearchDep").append(
        "<tr><td class='tableElem' data-type='Department' data-ID='"+ elem.departmentID +"' >" + (elem.Department ?? "---") + 
        "</td><td class='tableElem' data-type='Location' data-ID='"+ elem.locationID +"'>" + (elem.Location ?? "---") + 
        "</td></tr>")
    })
  }else{

    $("#tableSearchPer").html("<tr><th>First Name</th><th>Last Name</th><th>Job</th><th>Email</th><th>Department</th><th>Location</th></tr>")

    currentDiv("tableSearchPerScreen")

    array.forEach(elem => {

      $("#tableSearchPer").append(
        "<tr><td class='tableElem' data-type='Personnel' data-ID='"+ elem.personnelID +"'>" + (elem.firstName ?? "---")  + 
        "</td><td class='tableElem' data-type='Personnel' data-ID='"+ elem.personnelID +"'>" + (elem.lastName ?? "---")  + 
        "</td><td class='tableElem' data-type='Personnel' data-ID='"+ elem.personnelID +"'>" + (elem.jobTitle ?? "---")  + 
        "</td><td class='tableElem' data-type='Personnel' data-ID='"+ elem.personnelID +"'>" + (elem.email ?? "---")  + 
        "</td><td class='tableElem' data-type='Department' data-ID='"+ elem.departmentID +"'>" + (elem.Department ?? "---") + 
        "</td><td class='tableElem' data-type='Location' data-ID='"+ elem.locationID +"'>" + (elem.Location ?? "---") + 
        "</td></tr>")
    })
  }
}

async function setViewScreen(type, id){

  switch(type) {
    case "Personnel": {
      let personnelELEM = await getPersonnelByID(id)
      $("#elemViewPerFirstName").html(personnelELEM.data.personnel[0].firstName)
      $("#elemViewPerLastName").html(personnelELEM.data.personnel[0].lastName)
      $("#elemViewPerJob").html(personnelELEM.data.personnel[0].jobTitle)
      $("#elemViewPerEmail").html(personnelELEM.data.personnel[0].email)
      $("#elemViewPerDepartment").html(personnelELEM.data.personnel[0].Department)
      $("#elemViewPerLocation").html(personnelELEM.data.personnel[0].Location)
      //console.log("Reciente: " + personnelELEM.data.personnel[0])
      return ""
    }
    break;
    case "Department": {
      let departmentELEM = await getDepartmentByID(id)
      //console.log(departmentELEM.data.departments[0].Department)
      $("#elemViewDepDepartment").html(departmentELEM.data.departments[0].Department)
      $("#elemViewDepLocation").html(departmentELEM.data.departments[0].Location)

      let output = departmentELEM.data.NumDep.NumbPers

      return output
    }
    break;
    case "Location": {
      
    }
    break;
}
}

async function getAllDepartmentsByLocation(){

  let final = {"London":[], "Chicago":[], "Paris":[], "Munich":[], "Rome":[]}
  let departmentList = await getAllDepartments()
  departmentList.data.forEach(elem => {
    final[elem.Location].push({"name":elem.Department, "id":elem.departmentID})
  })
  return final
}


/**********************************************************/


async function getAllPersonnel() {

  const result = await $.ajax({

    url: "./libs/php/getAllPersonnel.php",
    type: 'GET',
    dataType: 'json',

    //success: function(result) {},

    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });

  return result;
}

async function getAllDepartments() {

  const result = await $.ajax({

    url: "./libs/php/getAllDepartments.php",
    type: 'GET',
    dataType: 'json',

    //success: function(result) {},

    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });

  return result;
}

async function getDepartmentByID(idDepartment) {
  const result = await $.ajax({

    url: "./libs/php/getDepartmentByID.php",
    type: 'GET',
    dataType: 'json',
    data:  {id:idDepartment},

    //success: function(result) {},

    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });
  return result;
}

async function getPersonnelByID(idPersonnel) {
  const result = await $.ajax({
    url: "./libs/php/getPersonnelByID.php",
    type: 'GET',
    dataType: 'json',
    data:  {id:idPersonnel},

    //success: function(result) {},

    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });
  return result;
}

async function insertPersonnel(name, surname, job, mail, departmentID) {

  //console.log(name + " " + surname + " " + job + " " + mail + " " + departmentID)

  const result = await $.ajax({
    url: "./libs/php/insertPersonnel.php",
    type: 'GET',
    dataType: 'json',
    data:  {name:name, surname:surname, job:job, mail:mail, departmentID:departmentID},

    //success: function(result) {},

    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });
  return result;
}

async function insertDepartment(name, locationID) {

  const result = await $.ajax({
    url: "./libs/php/insertDepartment.php",
    type: 'GET',
    dataType: 'json',
    data:  {name:name, locationID: locationID},

    //success: function(result) {},

    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });
  return result;
}

async function deleteDepartment(departmentID) {

  const result = await $.ajax({
    url: "./libs/php/deleteDepartmentByID.php",
    type: 'GET',
    dataType: 'json',
    data:  {id: departmentID},

    //success: function(result) {},

    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });
  return result;
}


async function deletePersonnel(personnelID) {

  const result = await $.ajax({
    url: "./libs/php/deletePersonnelByID.php",
    type: 'GET',
    dataType: 'json',
    data:  {id: personnelID},

    //success: function(result) {},

    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });
  return result;
}




function currentDiv (curr){


  $("#mainViewScreen, #tableSearchPerScreen, #tableSearchDepScreen, #elemViewPerScreen, #elemViewDepScreen, #formViewPerScreen, #formViewDepScreen").attr("hidden",true);
  $("#" + curr).attr("hidden",false);
 
}



$( document ).ready(function() {

  currentDiv("mainViewScreen")

  
  //update main dropdown
  $("#typeDropdownMain").on('change', function() {

    $("#byDropdownMain").val('Department');

    if($(this).val()=="Department"){
      $(".DrDwnHid").attr("hidden",true);
    }else{
      $(".DrDwnHid").attr("hidden",false);
    }
  });

  $( "#typeDropdownMain" ).trigger( "change" );

    $("#searchBtn").click(async function() {

      let typeDropdownValue = $('#typeDropdownMain').val();
      let fieldDropdownValue = $('#byDropdownMain').val();
      let fnameValue = $('#fieldInputMain').val();

      let result = await searchMain(typeDropdownValue,fieldDropdownValue,fnameValue)

      //los metemos en la tabla

      populateTableSearch(result, typeDropdownValue)

    $(".tableElem").click(async function(){

      let type = $(this).data("type")
      let id = $(this).data("id")

      let depDependency = await setViewScreen(type,id)

      //set delete button
      if(type=="Personnel"){

        currentDiv("elemViewPerScreen")

        $("#deletePerBtn").click(function(){
          deletePersonnel(id)
          currentDiv("mainViewScreen")
        })
      }else{

        if(type=="Department"){
        currentDiv("elemViewDepScreen")

        if(depDependency==0){
          $("#deleteDepBtn").html("Delete")
          $("#deleteDepBtn").prop('disabled', false);

          $("#deleteDepBtn").click(function(){
            deleteDepartment(id)
            currentDiv("mainViewScreen")
          })
        }else{
          
          $("#deleteDepBtn").html("Undeletable (" + depDependency + ")")
          $("#deleteDepBtn").prop('disabled', true);
        }
      }
      }
      })
    });


    

    //al dar al boton de create 
    $("#createBtn").click(async function() {

      //Load al the existing departments for dropdown
      let type = $("#typeDropdownCreate").val()
      if(type=="Personnel"){
        DepartmentByLocation = await getAllDepartmentsByLocation()
        currentDiv("formViewPerScreen")
      }else{
        currentDiv("formViewDepScreen")
      }

      $( "#formPerLocName" ).trigger( "change" );

    })

    $("#formPerLocName").on("change", function() {
      let currentType = $("#formPerLocName").val()
      $("#formPerDepName").html("")

      let departs = DepartmentByLocation[currentType]
     
      departs.forEach(dep => {
        //console.log(dep)
        $("#formPerDepName").append("<option value='" + dep.id + "'>" + dep.name + "</option>")
      })
      

    })


    $("#saveFormPer").click(function(){
      if(!($("#formPerFirstName").val()=="") && !($("#formPerLastName").val()=="")){
        currentDiv("mainViewScreen") //#mainViewScreen, #tableSearchPerScreen, #tableSearchDepScreen, #elemViewPerScreen, #elemViewDepScreen, #formViewPerScreen, #formViewDepScreen")
        var retrieveID = {"London":1,"Chicago":2,"Paris":3,"Munich":4,"Rome":5}
        insertPersonnel($("#formPerFirstName").val(), $("#formPerLastName").val(), $("#formPerJob").val(), $("#formPerEmail").val(), $("#formPerDepName").val()) 
      }
    })

    $("#saveFormDep").click(function(){

      if($("#formDepName").val()!=""){
        currentDiv("mainViewScreen")
        insertDepartment($("#formDepName").val(), $("#formDepLocName").val())
      }
    })

    $(".backtoMain").click(function(){

      currentDiv("mainViewScreen")
    
    })



})
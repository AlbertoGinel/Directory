let privateDB = {

  "searchSelection":"", //perNam perSur deps locs singleDep singleLoc
  "currentID":"",
  "currentType":"",
  "data": {}

}


function currentDiv (curr){


  $("#mainViewScreen, #viewerViewScreen, #viewerEditScreen, #viewerCreateScreen").attr("hidden",true);
  $("#" + curr).attr("hidden",false);


 
}


async function getAll(){

  const result = await $.ajax({

    url: "./libs/php/getAll.php",
    type: 'GET',
    dataType: 'json',

    
    //success: function(data) {},
    

    error: function(jqXHR, textStatus, errorThrown) {

      return (jqXHR + " " + textStatus + " " + errorThrown )

        /*console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);*/
    }
  });

  return result.data;

}


function getPerIndByID(id){
  let ids = String(id)
  return privateDB.data.dataPersonnel.findIndex(elem  => { return elem.personnelID == ids });
}

function getDepIndByID(id){
  let ids = String(id)
  return privateDB.data.dataDepartment.findIndex(elem  => { return elem.departmentID == ids });
}

function getLocIndByID(id){
  let ids = String(id)
  return privateDB.data.dataLocation.findIndex(elem  => { return elem.locationID == ids });
}


function getAllPerFilter(mainField,regExp){

  let output 

  if(regExp==""){
    output = privateDB.data.dataPersonnel
  }else{
    let regEx = new RegExp(regExp, "i");
    output = privateDB.data.dataPersonnel.filter(elem => { return regEx.test(elem[mainField]) })
  }

  output.sort(function(a,b){  //var listFiltSort = 

    var textA = a[mainField] ?? ""
    var textB = b[mainField] ?? ""

    textA = textA.toUpperCase()
    textB = textB.toUpperCase()

    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  return output

}

function getAllDepFilter(mainField,regExp){

  let output 

  if(regExp==""){
    output = privateDB.data.dataDepartment
  }else{
    let regEx = new RegExp(regExp, "i");
    output = privateDB.data.dataDepartment.filter(elem => { return regEx.test(elem[mainField]) })
  }

  output.sort(function(a,b){

    var textA = a[mainField] ?? ""
    var textB = b[mainField] ?? ""

    textA = textA.toUpperCase()
    textB = textB.toUpperCase()

    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  return output

}

function getAllLocFilter(mainField,regExp){

  let output 

  if(regExp==""){
    output = privateDB.data.dataLocation
  }else{
    let regEx = new RegExp(regExp, "i");
    output = privateDB.data.dataLocation.filter(elem => { return regEx.test(elem[mainField]) })
  }

  output.sort(function(a,b){  //var listFiltSort = 

    var textA = a[mainField] ?? ""
    var textB = b[mainField] ?? ""

    textA = textA.toUpperCase()
    textB = textB.toUpperCase()

    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  return output

}

//Modiy uses SQL and resets privateDB

async function modifyLocation(id, Newname){

  const result = await $.ajax({

    url: "./libs/php/modifyLocationByID.php",
    type: 'GET',
    dataType: 'json',
    data: {id: id , name: Newname},

    //success: function(data) {},
  
    error: function(jqXHR, textStatus, errorThrown) {
        /*console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);*/
    }
  });

  reset()

  return result;

}

async function modifyDepartment(id, NewName, NewLocationID){

  //http://localhost/Directory/libs/php/modifyDepartmentByID.php?name=Services&locationID=1&id=5

  const result = await $.ajax({

    url: "./libs/php/modifyDepartmentByID.php",
    type: 'GET',
    dataType: 'json',
    data: {id: id , name: NewName, locationID: NewLocationID },

    //success: function(data) {},
  
    error: function(jqXHR, textStatus, errorThrown) {
        /*console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);*/
    }
  });

  reset()

  return result;
}

async function modifyPersonnel(id, NewName, NewSurname, NewJob, NewEmail, NewDepartmentID){

  //http://localhost/Directory/libs/php/modifyPersonnel.php?name=URLo&surname=URL&job=URL&mail=URL&departmentID=3&id=128

  //  departmentID id

  const result = await $.ajax({

    url: "./libs/php/modifyPersonnelByID.php",
    type: 'GET',
    dataType: 'json',
    data: {id: id, name: NewName, surname: NewSurname, job: NewJob, mail: NewEmail, departmentID: NewDepartmentID },

    //success: function(data) {},
  
    error: function(jqXHR, textStatus, errorThrown) {
        /*console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);*/
    }
  });

  reset()

  return result;

}


async function deletePerByID(id){

  const result = await $.ajax({

    url: "./libs/php/deletePersonnelByID.php",
    type: 'GET',
    dataType: 'json',
    data: {id: id},

    //success: function(data) {},
  
    error: function(jqXHR, textStatus, errorThrown) {
        /*console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);*/
    }
  });

  reset()
  return result;

}

async function deleteDepByID(id){

  const result = await $.ajax({

    url: "./libs/php/deleteDepartmentByID.php",
    type: 'GET',
    dataType: 'json',
    data: {id: id},

    //success: function(data) {},
  
    error: function(jqXHR, textStatus, errorThrown) {
        /*console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);*/
    }
  });

  reset()
  return result;

}

async function deleteLocByID(id){

  const result = await $.ajax({

    url: "./libs/php/deleteLocationByID.php",
    type: 'GET',
    dataType: 'json',
    data: {id: id},

    //success: function(data) {},
  
    error: function(jqXHR, textStatus, errorThrown) {
        /*console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);*/
    }
  });

  reset()
  return result;

}


async function insertLocation(Newname){

  const result = await $.ajax({

    url: "./libs/php/insertLocation.php",
    type: 'GET',
    dataType: 'json',
    data: {name: Newname},

    //success: function(data) {},
  
    error: function(jqXHR, textStatus, errorThrown) {
        /*console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);*/
    }
  });

  reset()

  return result;

}

async function insertDepartment(NewName, NewLocationID){

  //http://localhost/Directory/libs/php/modifyDepartmentByID.php?name=Services&locationID=1&id=5

  const result = await $.ajax({

    url: "./libs/php/insertDepartment.php",
    type: 'GET',
    dataType: 'json',
    data: {name: NewName, locationID: NewLocationID },

    //success: function(data) {},
  
    error: function(jqXHR, textStatus, errorThrown) {
        /*console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);*/
    }
  });

  reset()

  return result;
}

async function insertPersonnel(NewName, NewSurname, NewJob, NewEmail, NewDepartmentID){

  //http://localhost/Directory/libs/php/modifyPersonnel.php?name=URLo&surname=URL&job=URL&mail=URL&departmentID=3&id=128

  //  departmentID id

  const result = await $.ajax({

    url: "./libs/php/insertPersonnel.php",
    type: 'GET',
    dataType: 'json',
    data: {name: NewName, surname: NewSurname, job: NewJob, mail: NewEmail, departmentID: NewDepartmentID },

    //success: function(data) {},
  
    error: function(jqXHR, textStatus, errorThrown) {
        /*console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);*/
    }
  });

  reset()

  return result;

}


function launchSearch(){


  privateDB.searchSelection = $("#selectTypeDrop").val()

  populateListSearch()

  $(".elementBlock").off("click");

  $(".elementBlock").on('click', function(){

    privateDB.currentID = $(this).attr("data-id")
    privateDB.currentType = $(this).attr("data-type")

    launchViewer()

  })

  $("#createBtn").off("click");

  $("#createBtn").on('click', function(){

    launchCreate()

  })


  $("#searchInput").on("input", function(){
    populateListSearch()
  })



  currentDiv ("mainViewScreen")

}

function launchViewer(){

  let id = privateDB.currentID 
  let type = privateDB.currentType

  let index
  let elem

  $("#editBtn").off("click");

  $("#editBtn").on('click', function(){
    launchEdit()
  })



  switch(type) {
    case "personnel":
      {
        index = getPerIndByID(id)
        elem = privateDB.data.dataPersonnel[index]
        $("#portraitPhoto").attr("src","./libs/css/images/iconUser.svg");
        $("#portraitName").html((elem.firstName ?? "" ) + " " + (elem.lastName ?? "" ) )
        $("#portraitSubTitle").html((elem.department ?? "" ) + " | " + (elem.location ?? "" ) )
        $("#viewFeaturesList").html("")
        $("#viewFeaturesList").append('<li class="list-group-item"><p>First Name</p><h6>' + (elem.firstName ?? "" ) + '</h6></li>')
        $("#viewFeaturesList").append('<li class="list-group-item"><p>Last Name</p><h6>' + (elem.lastName ?? "" ) + '</h6></li>')
        $("#viewFeaturesList").append('<li class="list-group-item"><p>Job Title</p><h6>' + (elem.jobTitle ?? "" ) + '</h6></li>')
        $("#viewFeaturesList").append('<li class="list-group-item"><p>Email</p><h6>' + (elem.email ?? "" ) + '</h6></li>')
        $("#viewFeaturesList").append('<li class="list-group-item"><p>Department</p><h6>' + (elem.department ?? "") + '</h6></li>')
        $("#viewFeaturesList").append('<li class="list-group-item"><p>Location</p><h6>' + (elem.location ?? "" ) + '</h6></li>')
        $("#viewMembers").hide();
        $("#viewDepartments").hide();

      }
      break;
    case "department":
      {
        index = getDepIndByID(id) 
        elem = privateDB.data.dataDepartment[index]
        $("#portraitPhoto").attr("src","./libs/css/images/iconDep.svg");

        $("#portraitName").html((elem.Department ?? "" ))
        $("#portraitSubTitle").html("")
        $("#viewFeaturesList").html("")
        $("#viewFeaturesList").append('<li class="list-group-item"><p>Department Name</p><h6>' + (elem.Department ?? "" ) + '</h6></li>')
        $("#viewFeaturesList").append('<li class="list-group-item"><p>Location Name</p><h6>' + (elem.Location ?? "" ) + '</h6></li>')
        $("#viewFeaturesList").append('<li class="list-group-item"><p>Number of members</p><h6>' + (elem.dependency ?? "" ) + '</h6></li>')

        $("#viewDepartments").hide();
        $("#viewMembers").show();
        $( "#viewMembersList" ).html("")

        $("#viewMembers").prop('disabled', false);

        list = getAllPerFilter("department", (elem.Department ?? "" ))
        list.forEach(element => {
          $( "#viewMembersList" ).append( '<div data-id="' + (element.personnelID ?? "" ) + '" data-type="personnel" class="elementBlock"><img class="logo" src="./libs/css/images/iconUser.svg"><h6>' + (element.firstName ?? "" ) + " " + (element.lastName ?? "" ) + '</h6></div>' );
        });

        if(list.length == 0){
          $("#viewMembers").prop('disabled', true);
        }



        //elementBlock

        $(".elementBlock").off("click");

        $(".elementBlock").on('click', function(){

          privateDB.currentID = $(this).attr("data-id")
          privateDB.currentType = "personnel"
      
          launchViewer()
        })
      }
      break;
    case "location":{

      

      index = getLocIndByID(id) 
      elem = privateDB.data.dataLocation[index]
      $("#portraitPhoto").attr("src","./libs/css/images/iconLoc.svg");

      $("#portraitName").html((elem.Location ?? "" ))
      $("#portraitSubTitle").html("")
      $("#viewFeaturesList").html("")
      $("#viewFeaturesList").append('<li class="list-group-item"><p>Location Name</p><h6>' + (elem.Location ?? "" ) + '</h6></li>')
      $("#viewFeaturesList").append('<li class="list-group-item"><p>Number of Departments</p><h6>' + (elem.dependency ?? "" ) + '</h6></li>')


      $("#viewDepartments").show();
      $( "#viewDepartmentsList" ).html("")



      list = getAllDepFilter("Location", (elem.Location ?? "" ))
      list.forEach(element => {
        $( "#viewDepartmentsList" ).append( '<div data-id="' + (element.departmentID ?? "" ) + '" data-type="department" class="elementBlock"><img class="logo" src="./libs/css/images/iconDep.svg"><h6>' + (element.Department ?? "" ) + '</h6></div>' );
      });

      if(list.length == 0){
        $("#viewDepartments").hide();
      }

      $("#viewMembers").show();
      $( "#viewMembersList" ).html("")


      list = getAllPerFilter("location", (elem.Location ?? "" ))
      list.forEach(element => {
        $( "#viewMembersList" ).append( '<div data-id="' + (element.personnelID ?? "" ) + '" data-type="personnel" class="elementBlock"><img class="logo" src="./libs/css/images/iconUser.svg"><h6>' + (element.firstName ?? "" ) + " " + (element.lastName ?? "" ) + '</h6></div>' );
      });

      if(list.length == 0){
        $("#viewMembers").hide();
      }


      $("#viewFeaturesList").append('<li class="list-group-item"><p>Number of Members</p><h6>' + list.length + '</h6></li>')

      //elementBlock
      $(".elementBlock").off("click");

      $(".elementBlock").on('click', function(){

        privateDB.currentID = $(this).attr("data-id")
        privateDB.currentType = $(this).attr("data-type")
    
        launchViewer()
      })

    }
      break;
    default:
      // code block
  } 



  currentDiv("viewerViewScreen")
}


function launchEdit(){

  let id = privateDB.currentID 
  let type = privateDB.currentType

  let index
  let elem

  $("#deleteBtn").prop('disabled', false);
  $("#deleteBtn").html("Delete")

  switch(type) {
    case "personnel":
      {
        index = getPerIndByID(id)
        elem = privateDB.data.dataPersonnel[index]

        $("#portraitEditPhoto").attr("src","./libs/css/images/iconUser.svg");
        $("#portraitEditName").html(elem.firstName + " " + elem.lastName )
        $("#portraitEditSubTitle").html(elem.department + " | " + elem.location )

        $("#viewEditFeaturesList").html("")

        //    

        $("#viewEditFeaturesList").append('<li class="list-group-item"><p>First Name</p><input type="text" id="inputFirstName" value="' + elem.firstName + '"></li>')
        $("#viewEditFeaturesList").append('<li class="list-group-item"><p>Last Name</p><input type="text" id="inputLastName" value="' + elem.lastName + '"></li>')
        $("#viewEditFeaturesList").append('<li class="list-group-item"><p>Job Title</p><input type="text" id="inputJobTitle" value="' + elem.jobTitle + '"></li>')
        $("#viewEditFeaturesList").append('<li class="list-group-item"><p>Email</p><input type="text" id="inputEmail" value="' + elem.email + '"></li>')
        $("#viewEditFeaturesList").append('<li class="list-group-item"><p>Department</p><select id="editDepSelect"></select></li>')

        deps = getAllDepFilter("Department","")
        $("#editDepSelect").append('<option value="">No Department</option>')
        deps.forEach(element => {
          $("#editDepSelect").append('<option value="' + element.departmentID + '">' + element.Department + " (" + element.Location + ')</option>')
        });

        $("#editDepSelect").val(elem.departmentID);

        $("#viewMembers").hide();
        $("#viewDepartments").hide();

        $("#deleteBtn").attr("data-id", elem.personnelID)

        $("#deleteBtn").off("click");

        $("#deleteBtn").on('click', async function(){
          await deletePerByID($(this).attr("data-id"))
          reset().then((value) => {launchSearch()})

        })

        $("#saveBtn").off("click");

        $("#saveBtn").on('click', async function(){

          await modifyPersonnel(privateDB.currentID, $("#inputFirstName").val(), $("#inputLastName").val(), $("#inputJobTitle").val(), $("#inputEmail").val(), $("#editDepSelect").val())
          reset().then((value) => {launchSearch()})
    
        })

      }
      break;
    case "department":
      {
        index = getDepIndByID(id)
        elem = privateDB.data.dataDepartment[index]

        $("#portraitEditPhoto").attr("src","./libs/css/images/iconDep.svg");
        $("#portraitEditName").html(elem.Department )
        $("#portraitEditSubTitle").html("")

        $("#viewEditFeaturesList").html("")

        $("#viewEditFeaturesList").append('<li class="list-group-item"><p>Department Name</p><input type="text" id="inputDepartment" value="' + elem.Department + '"></li>')
        $("#viewEditFeaturesList").append('<li class="list-group-item"><p></p><select name="editLocSelect" id="editLocSelect"></select></li>')

        $("#editDepSelect").html("")

        locs = getAllLocFilter("Location","")

        $("#editLocSelect").append('<option value="">No Location</option>')
        locs.forEach(element => {
          $("#editLocSelect").append('<option value="' + element.locationID + '">' + element.Location + '</option>')
        });

        $('#editLocSelect').val(elem.locationID);

        $("#viewMembers").hide();
        $("#viewDepartments").hide();

        $("#deleteBtn").attr("data-id", elem.departmentID)

        $("#deleteBtn").off("click");

        if(elem.dependency == 0){
          $("#deleteBtn").on('click', async function(){
            await deleteDepByID($(this).attr("data-id"))
            reset().then(launchSearch())
          })
        }else{
          $("#deleteBtn").prop('disabled', true);
          $("#deleteBtn").html("(" + elem.dependency + ") Members")
        }

        $("#saveBtn").off("click");

        $("#saveBtn").on('click', async function(){
          await modifyDepartment(privateDB.currentID, $("#inputDepartment").val(), $("#editLocSelect").val() )
          reset().then(launchSearch())
        })
        
      }
      break;
    case "location":{

      index = getLocIndByID(id) 
      elem = privateDB.data.dataLocation[index]

      $("#portraitEditPhoto").attr("src","./libs/css/images/iconLoc.svg");

      $("#portraitEditName").html(elem.Location)
      $("#portraitEditSubTitle").html("")
      $("#viewEditFeaturesList").html("")
      
      $("#viewEditFeaturesList").append('<li class="list-group-item"><p>Location Name</p><input type="text" id="inputLocation" value="' + elem.Location + '"></li>')

      $("#deleteBtn").attr("data-id", elem.locationID)

      $("#deleteBtn").off("click");

      if(elem.dependency == 0){
        $("#deleteBtn").on('click', async function(){
          await deleteLocByID($(this).attr("data-id"))
          reset().then(launchSearch())
        })
      }else{
        $("#deleteBtn").prop('disabled', true);
        $("#deleteBtn").html("(" + elem.dependency + ") Departments")
      }

      $("#saveBtn").off("click");

      $("#saveBtn").on('click', async function(){
        await modifyLocation(privateDB.currentID, $("#inputLocation").val())
        reset().then(launchSearch())
      })

    }

  
    break;
    default:
      // code block
  } 

  currentDiv("viewerEditScreen")
}

function launchCreate(){

  let type = privateDB.currentType

  //let index
  //let elem

  switch(type) {
    case "personnel":
      {
        
        $("#portraitCreatePhoto").attr("src","./libs/css/images/iconUser.svg");
        $("#portraitCreateName").html("New Personnel")

        $("#viewCreateFeaturesList").html("")

        $("#viewCreateFeaturesList").append('<li class="list-group-item"><p>First Name</p><input type="text" id="inputFirstName" value=""></li>')
        $("#viewCreateFeaturesList").append('<li class="list-group-item"><p>Last Name</p><input type="text" id="inputLastName" value=""></li>')
        $("#viewCreateFeaturesList").append('<li class="list-group-item"><p>Job Title</p><input type="text" id="inputJobTitle" value=""></li>')
        $("#viewCreateFeaturesList").append('<li class="list-group-item"><p>Email</p><input type="text" id="inputEmail" value=""></li>')
        $("#viewCreateFeaturesList").append('<li class="list-group-item"><p>Department</p><select id="createDepSelect"></select></li>')
        
        deps = getAllDepFilter("Department","")
        $("#createDepSelect").append('<option value="">No Department</option>')
        deps.forEach(element => {
          $("#createDepSelect").append('<option value="' + element.departmentID + '">' + element.Department + " (" + element.Location + ')</option>')
        });


        $("#saveCreateBtn").off("click");

        $("#saveCreateBtn").on('click', async function(){
          await insertPersonnel($("#inputFirstName").val(), $("#inputLastName").val(), $("#inputJobTitle").val(), $("#inputEmail").val(), $("#createDepSelect").val())
          reset().then((value) => {launchSearch()})
        })
      }
      break;
    case "department":
      {

        $("#portraitCreatePhoto").attr("src","./libs/css/images/iconDep.svg");
        $("#portraitCreateName").html("New Department")

        $("#viewCreateFeaturesList").html("")

        $("#viewCreateFeaturesList").append('<li class="list-group-item"><p>Department Name</p><input type="text" id="inputDepartment" value=""></li>')
        $("#viewCreateFeaturesList").append('<li class="list-group-item"><p>Location</p><select id="createLocSelect"></select></li>')

        let locs = getAllLocFilter("Location","")

        $("#createLocSelect").append('<option value="">No Location</option>')
        locs.forEach(element => {
          $("#createLocSelect").append('<option value="' + element.locationID + '">' + element.Location + '</option>')
        });

        $("#saveCreateBtn").off("click");

        $("#saveCreateBtn").on('click', async function(){
          await insertDepartment($("#inputDepartment").val(), $("#createLocSelect").val())
          reset().then(() => {launchSearch()})
        })

      }
      break;
    case "location":
      {


        $("#portraitCreatePhoto").attr("src","./libs/css/images/iconLoc.svg");
        $("#portraitCreateName").html("New Location")

        $("#viewCreateFeaturesList").html("")

        $("#viewCreateFeaturesList").append('<li class="list-group-item"><p>Location Name</p><input type="text" id="inputLocation" value=""></li>')

        $("#saveCreateBtn").off("click");

        $("#saveCreateBtn").on('click', async function(){
          await insertLocation($("#inputLocation").val())
          reset().then(() => {launchSearch()})
        })
    }

  
    break;
    default:
      // code block
  } 

  currentDiv("viewerCreateScreen")
}


function populateListSearch(){

  //solo la lista
  //mirar la opcion: perNam perSur deps locs singleDep singleLoc

  //privateDB.searchSelection

  
  $( "#ListElementsBlock" ).html("")

  let mode = privateDB.searchSelection
  let input = $("#searchInput").val()
  let list = []


  
    if(mode == "perNam"){

      $("#searchInput").prop('disabled', false);
      privateDB.currentType = "personnel"
      $("#createBtn").attr("src","./libs/css/images/iconUserNew.svg");
      list = getAllPerFilter("firstName", input)
      list.forEach(element => {
        $( "#ListElementsBlock" ).append( '<div data-id="' + element.personnelID + '" data-type="personnel" class="elementBlock"><img class="logo" src="./libs/css/images/iconUser.svg"><h6>' + element.firstName + " " + element.lastName + '</h6></div>' );
      });
    }

    if(mode == "perSur"){

      $("#searchInput").prop('disabled', false);
      privateDB.currentType = "personnel"
      $("#createBtn").attr("src","./libs/css/images/iconUserNew.svg");
      list = getAllPerFilter("lastName", input)
      list.forEach(element => {
        $( "#ListElementsBlock" ).append( '<div data-id="' + element.personnelID + '" data-type="personnel" class="elementBlock"><img class="logo" src="./libs/css/images/iconUser.svg"><h6>' + element.firstName + " " + element.lastName + '</h6></div>' );
      });
    }

    if(mode == "deps"){

      $("#searchInput").prop('disabled', true);
      privateDB.currentType = "department"
      $("#createBtn").attr("src","./libs/css/images/iconDepNew.svg");
      list = getAllDepFilter("department", "")

      list.forEach(element => {
        $( "#ListElementsBlock" ).append( '<div data-id="' + element.departmentID + '"data-type="department" class="elementBlock"><img class="logo" src="./libs/css/images/iconDep.svg"><h6>' + element.Department + '</h6></div>' );
      });
      
    }
  
    if(mode == "locs"){

      $("#searchInput").prop('disabled', true);
      privateDB.currentType = "location"
      $("#createBtn").attr("src","./libs/css/images/iconLocNew.svg");
      list = getAllLocFilter("location", "")

      list.forEach(element => {
        $( "#ListElementsBlock" ).append( '<div data-id="' + element.locationID + '"data-type="location" class="elementBlock"><img class="logo" src="./libs/css/images/iconLoc.svg"><h6>' + element.Location + '</h6></div>' );
      })
    }
}

async function reset(){

  //Fix this, if getAll dosent succedd it breaks

  console.log("before getAll")
  privateDB.data = await getAll()
  console.log("after getAll")


  launchSearch()
  //privateDB.searchSelection = $("#selectTypeDrop").val()

 //es aqui donde metemos todo?

}

/************************/

//Because this event occurs after the document is ready, it is a good place to have all other 
//jQuery events and functions. Like in the example above.

reset()

$(document).ready(function() {

  $("#selectTypeDrop").change(function() {
    privateDB.searchSelection = $(this).val()
    launchSearch()

  });

  $( ".backBtn" ).click(function() {
    
    launchSearch()

  });

})
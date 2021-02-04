<?php


	// example use from browser
	// http://localhost/companydirectory/libs/php/getDepartmentByID.php?id=2
	
	// remove next two lines for production

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];
		
		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}	

	// $_REQUEST used for development / debugging. Remember to cange to $_POST for production

	$query = 'SELECT d.id as departmentID, d.name as Department, d.locationID, l.name as Location FROM department d LEFT JOIN location l ON (d.locationID = l.id) WHERE d.id = ' . $_REQUEST['id'];

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

	}

    // second query

    $queryDep = 'SELECT COUNT(id) as NumbPers from personnel WHERE departmentID ='. $_REQUEST['id'];

    $resultDep = $conn->query($queryDep);

    if (!$resultDep) {

        $output['status']['code'] = "400";
        $output['status']['name'] = "executed";
        $output['status']['description'] = "query failed";	
        $output['data'] = [];

        mysqli_close($conn);

        echo json_encode($output); 

        exit;

    }

    $numDep = mysqli_fetch_assoc($resultDep);


	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['departments'] = $data;
	$output['data']['NumDep'] = $numDep;

	header('Content-Type: application/json; charset=UTF-8');
	
	mysqli_close($conn);

	echo json_encode($output); 

?>
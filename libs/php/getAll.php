<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/getAll.php

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

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


	$query = 'SELECT p.lastName, p.firstName, p.jobTitle, p.email, p.id as personnelID, d.name as department, d.id as departmentID, l.name as location, l.id as locationID FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) ORDER BY p.lastName, p.firstName, d.name, l.name';

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

   	$dataPersonnel = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($dataPersonnel, $row);

	}


	$query = 'SELECT d.id as departmentID, d.name as Department, d.locationID, l.name as Location, 
	COUNT(p.id) as dependency FROM department d LEFT JOIN location l ON (d.locationID = l.id) 
	LEFT JOIN personnel p ON (d.id = p.departmentID) 
	GROUP BY d.id
	ORDER BY d.name';

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

   	$dataDepartment = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($dataDepartment, $row);

	}





	$query = 'SELECT l.id as locationID, l.name as Location, COUNT(d.id) as dependency  FROM location l LEFT JOIN department d ON (d.locationID = l.id) GROUP BY l.id';

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

   	$dataLocation = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($dataLocation, $row);

	}





	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['dataPersonnel'] = $dataPersonnel;
	$output['data']['dataDepartment'] = $dataDepartment;
	$output['data']['dataLocation'] = $dataLocation;

	
	mysqli_close($conn);

	echo json_encode($output); 

?>
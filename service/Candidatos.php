<?php 

include 'conexion.php';

$my_query = "SELECT * FROM candidatos ";

$json = json_decode(file_get_contents("php://input"));


$data = ((array) $json->data);

if(count($data) != 0){
	$my_query .= " where ";
	
	foreach ($data as $key => $value) {
		$my_query .= $key . " = '" . $value . "' and ";
	}

	$my_query = preg_replace('/\W\w+\s*(\W*)$/', '$1', $my_query);
}

	// echo $my_query;

	// return;;
$data = Conexion::getInstance()->query($my_query);
$json = array();

while ($read = (mysqli_fetch_array($data))) {

	$json_data = array(
		'candidato_id' 	=> $read['candidato_id'],
		'nombre' 		=> $read['nombre'],
		'apellido' 		=> $read['apellido'],
		'edad' 			=> $read['edad'],
		'foto' 			=> $read['foto'],
		'posicion_id' 	=> $read['posicion_id'],
		'salario' 		=> $read['salario'],
		'experiencia' 	=> $read['experiencia']);

	$json[] = $json_data;
}
echo json_encode($json);
?>
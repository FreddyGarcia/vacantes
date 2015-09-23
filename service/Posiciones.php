<?php 

include 'conexion.php';

$my_query = "SELECT * FROM posiciones";
$data = Conexion::getInstance()->query($my_query);
$json = array();

while ($read = (mysqli_fetch_array($data))) {

	$json_data = array(
		'posicion_id' 	=> $read['posicion_id'],
		'descripcion'	=> $read['descripcion']);

	$json[] = $json_data;
}
echo json_encode($json);
?>
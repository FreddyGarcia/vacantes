<?php
	define('HOST', 'localhost');
	define('USER', 'root');
	define('PASS', 'toor');
	define('DB', 'rh');

	// local settings
	// define('HOST', 'localhost');
	// define('USER', 'root');
	// define('PASS', 'toor');
	// define('DB', 'rh');


	class Conexion
	{
		public static $instance = NULL;
		public static $obj = NULL;

		public static function getInstance()
		{
			if (self::$instance == NULL) {
				self::$obj = new Conexion();
				self::$instance = @mysqli_connect(HOST, USER, PASS, DB) or die("Error .-."); 
			}
			return self::$instance;
		}

		public function __destruct(){
			mysqli_close(self::getInstance());
		}

	}
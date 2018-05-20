<?php

include "bdconfig.php";

$conn = null;

function dbConnect() {
    global $conn, $bd_host, $bd_user, $bd_password, $bd_name;
	$conn = new mysqli($bd_host, $bd_user, $bd_password, $bd_name);
    return $conn;
}

function dbClose() {
	global $conn;
    $conn->close();
}

function nullOut($command) {
    $nullo = 'COMMAND IS UNDEFINED '.$command;
    return '{ "result": '.$nullo.'}';
}

function executeSQlCommand($sql, $needFetch, $fetchArray) {
   global $conn;
   $outp = "";
   if ($sql!='') {

		$result = $conn->query($sql);

		# формируем ответ в json
		if ($needFetch == true) {
			$outp = "";
			while($rs = $result->fetch_array(MYSQL_ASSOC)) {
			    if ($outp != "") {$outp .= ",";}

				$outp .= '{';
				foreach ($fetchArray as $i => $value) {
					if ($i!=0) {
						$outp .=',';	
					}					
				    $outp .= '"'.$value.'":"'  . $rs[$value] . '"';
				}
				$outp .= '}';			    
			}
			$outp ='{"rec":['.$outp.']}';			
		} else {
			if(!$result) {
				$outp = '{ "result": "'.addslashes($conn->error).'"}';
			} else {
				$outp = '{ "result": "DONE"}';
			}
		}

		//echo($outp);
	} else {
        $outp = 'COMMAND IS UNDEFINED '.$_POST['cmd'];
		//echo('COMMAND IS UNDEFINED '.$_POST['cmd']);
	}

    return $outp;
}

function execute($sql) {
    return executeSQlCommand($sql, false, array('id'));
}

function query($sql, $fetchArray) {
    return executeSQlCommand($sql, true, $fetchArray);
}

?>
<?php

include "blbasic.php";

# разбор параметров
$_POST = json_decode(stripslashes(file_get_contents("php://input")), true);

if (!empty($_POST) && $_POST["cmd"]) {
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	#echo('POST3_'.json_encode($_POST));
	
	# работа с sql		
	dbConnect();
	
	$out = nullOut($_POST["cmd"]);

	switch ($_POST["cmd"]) {
		case 'question.add':
			$text = addslashes($_POST["text"]);	    		        
			$out = execute("insert into question (text) values ('".$text."')");
			break;
	    case "question.list":	        
			$out = query('select text, createdate, anscounter, fixed from question order by createdate', array('text', 'createdate', 'anscounter', 'fixed'));
	        break;	    
	    case "deleteQuestion":
	    	$id = $_POST["id"];
	    	$out = execute("delete from question where id=".$id);
	    	break;	    
	    case "update":
	    	$id = $_POST["id"];
	    	$link = $_POST["link"];
	    	$out = execute("update candidates set link='".$link."' where id=".$id);
	    	break;
	}
	

	echo($out);
	dbClose();
} else {
	echo('NO COMMAND (is empty:'.empty($_POST).")");	
}


?>

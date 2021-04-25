<?php
$method = $_SERVER["REQUEST_METHOD"];
include('./class/Student.php');
$student = new Student();

switch($method) {
  case 'GET':
    $id = $_GET['id'];
    if (isset($id)){
      $student = $student->find($id);
      $js_encode = json_encode(array('state'=>TRUE, 'student'=>$student),true);
    }else{
      $students = $student->all();
      $js_encode = json_encode(array('state'=>TRUE, 'students'=>$students),true);
    }
    header("Content-Type: application/json");
    echo($js_encode);
    break;

  case 'POST':
    // TODO
    $student = new Student();
    echo "<html><head></head><body><form method='post'><input type='text' name='name'><input type='text' name='surname'><input type='text' name='sidi'><input type='text' name='tax'></form></body></html>";
    $student->_name = $_POST["name"];
    $student->_surname = $_POST["surname"];
    $student->_sidicode = $_POST["sidi"];
    $student->_taxCode = $_POST["tax"];

      $student->post($student);
      $js_encode = json_encode(array('state'=>TRUE, 'student'=>$student),true);
      header("Content-Type: application/json");
      echo($js_encode);
    
    break;

  case 'DELETE':
    // TODO
    $id = $_GET['id'];
    if(isset($id))
    {
      $student = $student->find($id);
      if($student!=null)
      {
        $student->delete($id);
        $js_encode = json_encode(array('state'=>TRUE, 'student'=>$student),true);
      }
      header("Content-Type: application/json");
      HTTP_RESPONSE_CODE(204);
      echo($js_encode);
    }
    break;

  case 'PUT':
    // TODO
    $student = new Student();
    echo "<html><head></head><body><form method='post'><input type='text' name='id'><input type='text' name='name'><input type='text' name='surname'><input type='text' name='sidi'><input type='text' name='tax'></form></body></html>";
    $student->_id = $_POST["id"];
    $student->_name = $_POST["name"];
    $student->_surname = $_POST["surname"];
    $student->_sidicode = $_POST["sidi"];
    $student->_taxCode = $_POST["tax"];
    $student->put($student);
    $js_encode = json_encode(array('state'=>TRUE, 'student'=>$student),true);
    header("Content-Type: application/json");
    echo($js_encode);
    break;

  default:
    break;
}


?>

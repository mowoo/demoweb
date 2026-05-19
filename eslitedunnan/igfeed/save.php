<?php
$data = $_POST['data'];
if( file_put_contents("../ig/data.json", $data) ) {
    echo 'success';
}
?>
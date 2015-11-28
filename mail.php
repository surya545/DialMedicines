<?php
if(isset($_POST['commit']))
{
echo $to = "dial@dialmedicines.com";
echo $txt = $_POST['name'], $_POST['mob'];
echo $headers = "From: ".$_POST['email'] . "\r\n" ;
mail($to,$txt,$headers);
header("Location: index.html");
}
?>
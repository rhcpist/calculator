<?php
if($_GET['file'])
{
 $file=$_GET['file'];
 if (file_exists($file))
 {
  header("Content-type:application/pdf");
  header("Content-Disposition:attachment;filename='bausystem.pdf'");
  header('Content-Transfer-Encoding: binary');
  header('Expires: 0');
  header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
  header('Pragma: public');
  header('Content-Length: ' . filesize($file));
  ob_clean();
  flush();
  readfile($file);
  unlink($file);
  exit;
 }
}

if($_POST['data'])
{
 $data = $_POST['data'];
 $file = md5(uniqid()) . '.pdf';
 $uri =  substr($data,strpos($data,",")+1);
 file_put_contents('./'.$file, base64_decode($uri));
 echo $file;
 exit();
}
?>
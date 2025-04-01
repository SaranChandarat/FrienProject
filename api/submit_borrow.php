<?php
$servername = "db";
$username = "root";
$password = "your_root_password";
$dbname = "your_database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$tableId = $_POST['tableId'];
$quantity = $_POST['quantity'];
$borrowTime = $_POST['borrowTime'];

$sql = "INSERT INTO table_borrow (table_id, quantity, borrow_time) VALUES ('$tableId', $quantity, '$borrowTime')";

if ($conn->query($sql) === TRUE) {
  echo "บันทึกข้อมูลสำเร็จ";
} else {
  echo "เกิดข้อผิดพลาด: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
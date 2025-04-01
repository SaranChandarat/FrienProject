<?php
$servername = "db"; // ชื่อ service ใน docker-compose.yml
$username = "root";
$password = "your_root_password";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// รับข้อมูลจากฟอร์ม
$parcel_id = $_POST['parcel_id'];
$parcel_name = $_POST['parcel_name'];
$parcel_weight = $_POST['parcel_weight'];

// คำสั่ง SQL สำหรับแก้ไขข้อมูล
$sql = "UPDATE parcel SET parcel_name = '$parcel_name', parcel_weight = $parcel_weight WHERE parcel_id = '$parcel_id'";

if ($conn->query($sql) === TRUE) {
  echo "Record updated successfully";
} else {
  echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
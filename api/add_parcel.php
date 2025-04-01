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

// คำสั่ง SQL สำหรับเพิ่มข้อมูล
$sql = "INSERT INTO parcel (parcel_id, parcel_name, parcel_weight) VALUES ('$parcel_id', '$parcel_name', $parcel_weight)";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
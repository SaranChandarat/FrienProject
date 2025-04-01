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

// คำสั่ง SQL สำหรับดึงข้อมูล
$sql = "SELECT * FROM parcel";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // แสดงข้อมูลในรูปแบบตาราง
  echo "<table><tr><th>Parcel ID</th><th>Parcel Name</th><th>Parcel Weight</th></tr>";
  while($row = $result->fetch_assoc()) {
    echo "<tr><td>" . $row["parcel_id"]. "</td><td>" . $row["parcel_name"]. "</td><td>" . $row["parcel_weight"]. "</td></tr>";
  }
  echo "</table>";
} else {
  echo "0 results";
}

$conn->close();
?>
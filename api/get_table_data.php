<?php
$servername = "db";
$username = "root";
$password = "your_root_password";
$dbname = "your_database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM table_borrow";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "<table><tr><th>รหัสโต๊ะ</th><th>จำนวน</th><th>เวลายืม</th><th>การดำเนินการ</th></tr>";
  while($row = $result->fetch_assoc()) {
    echo "<tr><td>" . $row["table_id"]. "</td><td>" . $row["quantity"]. "</td><td>" . $row["borrow_time"]. "</td><td><button class='editButton' data-id='" . $row["table_id"] . "'>แก้ไข</button></td></tr>";
  }
  echo "</table>";
} else {
  echo "ไม่มีข้อมูล";
}

$conn->close();
?>
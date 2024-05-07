<?php 
    header('Access-Control-Allow-Origin: *');
    $conn = new mysqli("localhost", "root", "", "react_php");

    if (mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else {
        $name = $_POST['name'];
        $mobile = $_POST['mobile'];
        $email = $_POST['email'];

        // $sql = "INSERT INTO enquiry(name, mobile, email) VALUES('$name', '$mobile', '$email');";
        // $res = mysqli_query($conn, $sql);

        $sql2 = "SELECT * FROM enquiry WHERE name='$name'";
        $res2 = mysqli_query($conn, $sql2);
        $raw = mysqli_fetch_assoc($res2);
        


        if($res2) {
            echo "Success!<br>";
            echo "Imię: ", $raw['name'], "<br>";
            echo "Telefon: ", $raw['mobile'], "<br>";
            echo "Email: ", $raw['email'];
            
        }
        else {
            echo "Error!";
        }

        $conn->close();
    }

?> 
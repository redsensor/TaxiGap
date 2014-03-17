<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="TaxiGap">
    <meta name="author" content="Vladislav Gasan">

    <title>TaxiGap Panel</title>
	
    <link href="css/bootstrap.css" rel="stylesheet">
	<link href="css/custom/layout.css" rel="stylesheet">

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
	  <?php
		ini_set('display_errors',1);
		error_reporting(E_ALL);

		require "config.php";
		?>
		
      <!-- Fixed navbar -->
      <div class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="index.php">TaxiGap Panel</a>
          </div>
          </div>
        </div>
      

      <!-- Page content -->
      <div class="container">
        <div class="page-header">
          <h2>Drivers tracks info</h2>
        </div>
        <p class="lead">
			<ul class="toc">
				 <li>Track ID</li> 
				 <li>Date</li>
				 <li>Time In Minutes</li>
				 <li>Time In Seconds</li>
				 <li>AverageSpeed</li>
				 <li>Distance</li>
			</ul>
		
		<?php
			$result = mysql_query("SELECT * FROM trackdata ORDER BY `AverageSpeed` ASC");
			if (!$result) {
				echo 'Could not run query: ' . mysql_error();
				exit;
			}
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)){
			
			
			
			/*echo "<b>Track ID: ", $row["trackID"], "</b>";
			echo "Date: ", $row["dateC"] ;
			echo "Time In Minutes: ", $row["timeInMinutes"] ;
			echo "Time In Seconds: ", $row["timeInSeconds"] ;
			echo "AverageSpeed : ", $row["averageSpeed"];
			echo "Distance: ", $row["distance"];
			echo "</br>";*/
			echo "<b>",$row["trackID"],"</b>";
			echo "<div class='cont'>",$row["dateC"],"</div>";
			echo "<div class='cont'>",$row["timeInMinutes"],"</div>";
			echo "<div class='cont'>",$row["timeInSeconds"],"</div>";
			echo "<div class='cont'>",$row["averageSpeed"],"</div>";
			echo "<div class='cont'>",$row["distance"],"</div>";
			echo "</br>";
			}
			mysql_free_result($result);
			?>
		</p>
        
		
      </div>
  <!-- Fixed footer -->
    <div id="footer">
      <div class="container">
        <p class="text-muted">TaxiGap © 2014</p>
      </div>
    </div>
	
  </body>
</html>
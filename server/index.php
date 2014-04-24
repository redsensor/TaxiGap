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
	<link href="css/tablesorter/jquery.tablesorter.css" rel="stylesheet">
	<link href="css/tablesorter/jquery.tablesorter.pager.css" rel="stylesheet">
	<link href="css/custom/layout.css" rel="stylesheet">
	
	<script src="js/jquery-1.8.3.min.js" charset="utf-8"></script>
	<script src="js/tablesorter/jquery.metadata.js" charset="utf-8"></script>
	<script src="js/tablesorter/jquery.tablesorter.js" charset="utf-8"></script>
	<script src="js/tablesorter/jquery.tablesorter.pager.js" charset="utf-8"></script>
	<script type="text/javascript">
	$(function() {
		$("table")
			.tablesorter({widthFixed: true, widgets: ['zebra']})
			.tablesorterPager({container: $("#pager")});
	});
	</script>
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
          <h2>Сводная таблица информации о маршрутах</h2>
        </div>
        <div class="lead">
			<div id="pager" class="pager">
				<form>
					<img src="css/tablesorter/first.png" class="first">
					<img src="css/tablesorter/prev.png" class="prev">
					<input type="css/text" class="pagedisplay">
					<img src="css/tablesorter/next.png" class="next">
					<img src="css/tablesorter/last.png" class="last">
					<select class="pagesize">
						<option value="10" selected="selected">10</option>
						<option value="20">20</option>
						<option value="30">30</option>
						<option value="40">40</option>
						<option value="40">50</option>
					</select>
				</form>
			</div>
				<?php 
																	//Обработчик кнопки удаления
					function TableTruncate() {
					$trunc = mysql_query("TRUNCATE TABLE trackdata");
					header("Location: index.php");
					}
					if (isset($_GET['truncate'])) {
						TableTruncate();
					}
				?>
					<div class="intrunc">
						<a href="index.php?truncate" class="intruncbtn">Очистить таблицу</a>
					</div>
		<table cellspacing="1" class="tablesorter">
			<thead>
				<tr> 
					<th>Маршрут</th> 
					<th>Идентификатор</th>
					<th>Дата</th> 
					<th>Время в минутах</th> 
					<th>Время в секундах</th> 
					<th>Средняя скорость</th> 
					<th>Расстояние</th> 
				</tr> 
			</thead> 		
		<?php
			$result = mysql_query("SELECT * FROM trackdata ORDER BY `dateC` DESC");
			if (!$result) {
				echo 'Could not run query: ' . mysql_error();
				exit;
			}
			echo "<tbody>";
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)){
			echo "<tr>";
			echo "<td>",$row["trackID"],"</td>";
			echo "<td>",$row["uuid"],"</td>";
			echo "<td>",$row["dateC"],"</td>";
			echo "<td>",$row["timeInMinutes"],"</td>";
			echo "<td>",$row["timeInSeconds"],"</td>";
			echo "<td>",$row["averageSpeed"],"</td>";
			echo "<td>",$row["distance"],"</td>";
			echo "</tr>";
			}
			echo "</tbody>";
			mysql_free_result($result);
			
		?>
			<tfoot>
				<tr> 
					<th>Маршрут</th> 
					<th>Идентификатор</th>
					<th>Дата</th> 
					<th>Время в минутах</th> 
					<th>Время в секундах</th> 
					<th>Средняя скорость</th> 
					<th>Расстояние</th> 
				</tr> 
			</tfoot> 
		</table>
		</div>
  <!-- Fixed footer -->
    <div id="footer">
      <div class="container">
        <p class="text-muted">TaxiGap © 2014</p>
      </div>
    </div>
	
  </body>
</html>
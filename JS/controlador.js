$(document).ready(function () {

    $('#txt-valor-porcentaje-natalidad').val(`${40}%`);
    $('#txt-valor-porcentaje-mortalidad').val(`${31}%`);
    $('#txt-poblacion').val(10000);

    $('#txt-porcentaje-natalidad').change(function() { 
        porcentajeNatalidad = $('#txt-porcentaje-natalidad').val();
        $('#txt-valor-porcentaje-natalidad').val(`${porcentajeNatalidad}%`)
    });

    $('#txt-porcentaje-mortalidad').change(function() { 
        porcentajemortalidad = $('#txt-porcentaje-mortalidad').val();
        $('#txt-valor-porcentaje-mortalidad').val(`${porcentajemortalidad}%`)
    });

    $('#btn-limpiar').click(function(){ 
        $('#txt-porcentaje-natalidad').val();
        $('#txt-porcentaje-mortalidad').val();
        $('#txt-valor-porcentaje-natalidad').val($('#txt-porcentaje-natalidad').val()+"%");
        $('#txt-valor-porcentaje-mortalidad').val( $('#txt-porcentaje-mortalidad').val()+"%");
        $('#txt-poblacion').val(10000);
        $('#txt-anios').val(1);
    });

    function dibujarGraficoGeneral(){
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Año', 'Poblacion', 'Mortalidad','Natalidad'],
              ['2',  1000,      400, 200],
              ['3',  1170,      460, 250],
              ['4',  660,       1120, 1170],
              ['5',  1030,      540, 600]
            ]);
            
            var options = {
              title: 'Crecimiento Poblacional',
              hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
              vAxis: {minValue: 0}
            };

            var chart = new google.visualization.AreaChart(document.getElementById('grafico-area'));
            chart.draw(data, options);
        }
    }

    function dibujarGraficoNatalidad(){
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Año', 'Hombres', 'Mujeres'],
              ['1', 1000, 400],
              ['2', 1170, 460],
              ['3', 660, 1120],
              ['4', 1030, 540]
            ]);

            var options = {
                height: 300,
                chart: {
                  title: 'Gráfico de Natalidad'
                }
            };

            var chart = new google.charts.Bar(document.getElementById('grafico-natalidad'));

            chart.draw(data, google.charts.Bar.convertOptions(options));
      }
    }
    
    function dibujarGraficoMortalidad(){
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Año', 'Hombre', 'Mujer'],
              ['1', 1000, 400],
              ['2', 1170, 460],
              ['3', 660, 1120],
              ['4', 1030, 540]
            ]);

            var options = {
                height: 300, 
                chart: {
                  title: 'Grafico de Mortalidad'
                }
            };

            var chart = new google.charts.Bar(document.getElementById('grafico-mortalidad'));
            
            chart.draw(data, google.charts.Bar.convertOptions(options));
      }
    }

    function dibujarGraficoDiscapacidad(){
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Discapacidades', 'Fisicas', 'Mentales', 'Ambas'],
              ['1', 1000, 400, 200],
              ['2', 1170, 460, 250],
              ['3', 660, 1120, 300],
              ['4', 1030, 540, 350]
            ]);

            var options = {
                height: 300,
                chart: {
                  title: 'Gráfica de Natalidad con Discapacidad'
                }
            };

            var chart = new google.charts.Bar(document.getElementById('grafico-discapacidad'));
            
            chart.draw(data, google.charts.Bar.convertOptions(options));
      }
    }

    $('#btn-simular').click(function(){

        document.getElementById('card-discapacidad').classList.remove('d-none');
        document.getElementById('card-mortalidad').classList.remove('d-none');
        document.getElementById('card-natalidad').classList.remove('d-none');


        dibujarGraficoGeneral();
        dibujarGraficoNatalidad();
        dibujarGraficoMortalidad();
        dibujarGraficoDiscapacidad();
    });

});
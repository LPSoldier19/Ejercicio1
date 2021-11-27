

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

      function drawChart() {
        var data = google.visualization.arrayToDataTable(pFinal);
        
        var options = {
          title: 'Crecimiento Poblacional',
          hAxis: {title: 'Año',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('grafico-area'));
        chart.draw(data, options);
      }
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
          
        
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

      var poblacion = $('#txt-poblacion').val();
      var años = $('#txt-anios').val();
      var porcentajeNatalidad = $('#txt-porcentaje-natalidad').val();
      var porcentajeMortalidad = $('#txt-porcentaje-mortalidad').val();

        // document.getElementById('card-discapacidad').classList.remove('d-none');
        // document.getElementById('card-mortalidad').classList.remove('d-none');
        // document.getElementById('card-natalidad').classList.remove('d-none');
      pFinal=[];
      dibujarGraficoGeneral();
        // dibujarGraficoNatalidad();
        // dibujarGraficoMortalidad();
        // dibujarGraficoDiscapacidad();
      valoresEstadisticos(poblacion,años,porcentajeMortalidad,porcentajeNatalidad);
      console.log(pFinal);
    });

});

var pFinal=[];

function valoresEstadisticos(poblacion,numeroAnios,porcentajeMortalidad,porcentajeNatalidad){
  var poblacionAuxiliar = Number(poblacion);
  pFinal.push(['Año','Poblacion','Mortalidad','Natalidad'])
  for(i=1;i<=numeroAnios;i++){
    var natalidad=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var x1=poblacionAuxiliar+(natalidad)-(mortalidad);
    pFinal.push([String(i),x1,natalidad,mortalidad]);
    poblacionAuxiliar=x1;
  }
}


  
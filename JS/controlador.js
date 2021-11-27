

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
            var data = google.visualization.arrayToDataTable(pGeneroNatalidad);

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
            var data = google.visualization.arrayToDataTable(pGeneroMortalidad);

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
            var data = google.visualization.arrayToDataTable(pNatalidadesTiposDiscapacidad);

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

      document.getElementById('card-discapacidad').classList.remove('d-none');
      document.getElementById('card-mortalidad').classList.remove('d-none');
      document.getElementById('card-natalidad').classList.remove('d-none');
      pFinal=[];
      pGeneroNatalidad=[];
      pGeneroMortalidad=[];
      pNatalidadesTiposDiscapacidad=[];
      dibujarGraficoGeneral();
      dibujarGraficoNatalidad();
      dibujarGraficoMortalidad();
      dibujarGraficoDiscapacidad();
      valoresEstadisticos(poblacion,años,porcentajeMortalidad,porcentajeNatalidad);
      console.log(pFinal);
    });

});

var pFinal=[];

var pGeneroNatalidad=[];

var pGeneroMortalidad=[];

var pNatalidadesTiposDiscapacidad = [];

function valoresEstadisticos(poblacion,numeroAnios,porcentajeMortalidad,porcentajeNatalidad){
  var poblacionAuxiliar = Number(poblacion);
  pFinal.push(['Año','Poblacion','Mortalidad','Natalidad']);
  pGeneroNatalidad.push(['Año', 'Hombres', 'Mujeres']);
  pGeneroMortalidad.push(['Año', 'Hombres', 'Mujeres']);
  pNatalidadesTiposDiscapacidad.push(['Año', 'Motriz','Mental','Ambas']);
  for(i=1;i<=numeroAnios;i++){
    var natalidad=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var x1=poblacionAuxiliar+(natalidad)-(mortalidad);
    pFinal.push([String(i),x1,natalidad,mortalidad]);
    poblacionAuxiliar=x1;
  }

  for(j=1;j<=numeroAnios;j++){
    var natalidadGeneral=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var natalidadHombres=natalidadGeneral*((50.41)/100);
    var natalidadMujeres=natalidadGeneral*((49.58)/100);
    var x1=poblacionAuxiliar+(natalidad)-(mortalidad);
    pGeneroNatalidad.push([String(j),natalidadHombres,natalidadMujeres]);
    poblacionAuxiliar=x1;
  }

  for(k=1;k<=numeroAnios;k++){
    var mortalidadGeneral=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var mortalidadHombres=mortalidadGeneral*((50.41)/100);
    var mortalidadMujeres=mortalidadGeneral*((49.58)/100);
    var x1=poblacionAuxiliar+(natalidad)-(mortalidad);
    pGeneroMortalidad.push([String(k),mortalidadHombres,mortalidadMujeres]);
    poblacionAuxiliar=x1;
  }

  for(m=1;m<=numeroAnios;m++){
    var natalidadGeneral2=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var natalidadDiscapacidad=natalidadGeneral2*(0.05);
    var discapacidadMotrices=natalidadDiscapacidad*(0.6);
    var discapacidadMentales=natalidadDiscapacidad*(0.4);
    var discapacidadAmbas=natalidadDiscapacidad*(0.2);
    var x1=poblacionAuxiliar+(natalidad)-(mortalidad);
    pNatalidadesTiposDiscapacidad.push([String(m),discapacidadMotrices,discapacidadMentales,discapacidadAmbas]);
    poblacionAuxiliar=x1;
  }

}


  
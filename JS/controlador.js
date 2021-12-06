$(document).ready(function () {

    $('#txt-valor-porcentaje-natalidad').val(`${40}%`);
    $('#txt-valor-porcentaje-mortalidad').val(`${31}%`);
    $('#valor-porcentaje-hombre').val(`${50}%`)
    $('#valor-porcentaje-mujer').val(`${50}%`)
    $('#txt-poblacion').val(10000);
    $('#txt-valor-porcentaje-natalidad-discapacidad').val(`${2.5}%`)

    $('#txt-porcentaje-natalidad').change(function() { 
        porcentajeNatalidad = $('#txt-porcentaje-natalidad').val();
        $('#txt-valor-porcentaje-natalidad').val(`${porcentajeNatalidad}%`)
    });

    $('#txt-porcentaje-natalidad-discapacidad').change(function() { 
      porcentajeNatalidadDiscapacidad = $('#txt-porcentaje-natalidad-discapacidad').val();
      $('#txt-valor-porcentaje-natalidad-discapacidad').val(`${porcentajeNatalidadDiscapacidad}%`)
  });

    $('#txt-porcentaje-natalidad-genero').change(function() { 
      var porcentajeNatalidadHombre = $('#txt-porcentaje-natalidad-genero').val();
      var porcentajeNatalidadMujer = 100-Number(porcentajeNatalidadHombre);
      $('#valor-porcentaje-hombre').val(`${porcentajeNatalidadHombre}%`);
      $('#valor-porcentaje-mujer').val(`${porcentajeNatalidadMujer}%`);
    });

    $('#txt-porcentaje-mortalidad').change(function() { 
        porcentajemortalidad = $('#txt-porcentaje-mortalidad').val();
        $('#txt-valor-porcentaje-mortalidad').val(`${porcentajemortalidad}%`)
    });

    $('#btn-limpiar').click(function(){ 
        $('#txt-porcentaje-natalidad').val(40);
        $('#txt-porcentaje-mortalidad').val(31);
        $('#txt-porcentaje-natalidad-genero').val(50);
        $('#txt-porcentaje-natalidad-discapacidad').val(2.5);
        
        $('#txt-valor-porcentaje-natalidad').val($('#txt-porcentaje-natalidad').val()+"%");
        $('#valor-porcentaje-hombre').val($('#txt-porcentaje-natalidad-genero').val()+"%");
        $('#valor-porcentaje-mujer').val((100-$('#txt-porcentaje-natalidad-genero').val())+"%");
        $('#txt-valor-porcentaje-mortalidad').val( $('#txt-porcentaje-mortalidad').val()+"%");
        $('#txt-valor-porcentaje-natalidad-discapacidad').val($('#txt-porcentaje-natalidad-discapacidad').val()+"%");
        $('#txt-poblacion').val(10000);
        $('#txt-anios').val(2);

        document.getElementById('card-discapacidad').classList.add('d-none');
        document.getElementById('card-mortalidad').classList.add('d-none');
        document.getElementById('card-natalidad').classList.add('d-none');
        document.getElementById('grafico-area').classList.add('d-none');
        pFinal=[];
        pGeneroNatalidad=[];
        pGeneroMortalidad=[];
        pNatalidadesTiposDiscapacidad=[];

    });

    function dibujarGraficoGeneral(){

      function drawChart() {
        var data = google.visualization.arrayToDataTable(pFinal);
        
        var options = {
          title: 'Crecimiento Poblacional',
          hAxis: {title: 'Año',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0, format:'0'}
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
      var porcentajeNatalidadHombre = Number($('#txt-porcentaje-natalidad-genero').val());
      var porcentajeNatalidadMujer = 100 - porcentajeNatalidadHombre;
      var porcentajeNatalidadDiscapacidad = $('#txt-porcentaje-natalidad-discapacidad').val();

      if(años>1){
        if(poblacion>=10000){
          document.getElementById('card-discapacidad').classList.remove('d-none');
          document.getElementById('card-mortalidad').classList.remove('d-none');
          document.getElementById('card-natalidad').classList.remove('d-none');
          document.getElementById('grafico-area').classList.remove('d-none');
          pFinal=[];
          pGeneroNatalidad=[];
          pGeneroMortalidad=[];
          pNatalidadesTiposDiscapacidad=[];
          dibujarGraficoGeneral();
          dibujarGraficoNatalidad();
          dibujarGraficoMortalidad();
          dibujarGraficoDiscapacidad();
          valoresEstadisticos(poblacion,años,porcentajeMortalidad,porcentajeNatalidad, porcentajeNatalidadHombre, porcentajeNatalidadMujer, porcentajeNatalidadDiscapacidad);
        }
        else{
          alert('Los datos ingresados no son validos');
          document.getElementById('card-discapacidad').classList.add('d-none');
          document.getElementById('card-mortalidad').classList.add('d-none');
          document.getElementById('card-natalidad').classList.add('d-none');
          document.getElementById('grafico-area').classList.add('d-none');
          pFinal=[];
          pGeneroNatalidad=[];
          pGeneroMortalidad=[];
          pNatalidadesTiposDiscapacidad=[];
        }
      }
      else{
        alert('Los datos ingresados no son validos');
        document.getElementById('card-discapacidad').classList.add('d-none');
        document.getElementById('card-mortalidad').classList.add('d-none');
        document.getElementById('card-natalidad').classList.add('d-none');
        document.getElementById('grafico-area').classList.add('d-none');
        pFinal=[];
        pGeneroNatalidad=[];
        pGeneroMortalidad=[];
        pNatalidadesTiposDiscapacidad=[];
      }
    });

    $('#btn-detener').click(function(){
      document.getElementById('card-discapacidad').classList.add('d-none');
      document.getElementById('card-mortalidad').classList.add('d-none');
      document.getElementById('card-natalidad').classList.add('d-none');
      document.getElementById('grafico-area').classList.add('d-none');
      pFinal=[];
      pGeneroNatalidad=[];
      pGeneroMortalidad=[];
      pNatalidadesTiposDiscapacidad=[];

    });

});

var pFinal=[];

var pGeneroNatalidad=[];

var pGeneroMortalidad=[];

var pNatalidadesTiposDiscapacidad = [];

function valoresEstadisticos(poblacion,numeroAnios,porcentajeMortalidad,porcentajeNatalidad, porcentajeNatalidadHombre, porcentajeNatalidadMujer, porcentajeNatalidadDiscapacidad){
  var poblacionAuxiliar = Number(poblacion);
  pFinal.push(['Año','Poblacion','Mortalidad','Natalidad']);
  pFinal.push(['0',poblacionAuxiliar,0,0])
  pGeneroNatalidad.push(['Año', 'Hombres', 'Mujeres']);
  pGeneroNatalidad.push(['0', 0, 0]);
  pGeneroMortalidad.push(['Año', 'Hombres', 'Mujeres']);
  pGeneroMortalidad.push(['0', 0, 0]);
  pNatalidadesTiposDiscapacidad.push(['Año', 'Motriz','Mental','Ambas']);
  pNatalidadesTiposDiscapacidad.push(['0', 0, 0,0]);

  for(i=1;i<=numeroAnios;i++){
    var natalidad=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var x1=poblacionAuxiliar+(natalidad)-(mortalidad);
    pFinal.push([String(i),Math.round(x1),Math.round(natalidad),Math.round(mortalidad)]);
    poblacionAuxiliar=x1;
  }

  for(j=1;j<=numeroAnios;j++){
    var natalidadGeneral=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var natalidadHombres=natalidadGeneral*(porcentajeNatalidadHombre/100);
    var natalidadMujeres=natalidadGeneral*(porcentajeNatalidadMujer/100);
    var x1=poblacionAuxiliar+(natalidadGeneral)-(mortalidad);
    pGeneroNatalidad.push([String(j),Math.round(natalidadHombres),Math.round(natalidadMujeres)]);
    poblacionAuxiliar=x1;
  }

  for(k=1;k<=numeroAnios;k++){
    var mortalidadGeneral=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var natalidad=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var mortalidadHombres=mortalidadGeneral*((17)/100);
    var mortalidadMujeres=mortalidadGeneral*((12)/100);
    var x1=poblacionAuxiliar+(natalidad)-(mortalidadGeneral);
    pGeneroMortalidad.push([String(k),Math.round(mortalidadHombres),Math.round(mortalidadMujeres)]);
    poblacionAuxiliar=x1;
  }

  for(m=1;m<=numeroAnios;m++){
    var natalidadGeneral2=poblacionAuxiliar*(Number(porcentajeNatalidad)/100);
    var mortalidad=poblacionAuxiliar*(Number(porcentajeMortalidad)/100);
    var natalidadDiscapacidad=natalidadGeneral2*(porcentajeNatalidadDiscapacidad);
    var discapacidadMotrices=natalidadDiscapacidad*(0.6);
    var discapacidadMentales=natalidadDiscapacidad*(0.4);
    var discapacidadAmbas=natalidadDiscapacidad*(0.2);
    var x1=poblacionAuxiliar+(natalidadGeneral)-(mortalidad);
    pNatalidadesTiposDiscapacidad.push([String(m),Math.round(discapacidadMotrices),Math.round(discapacidadMentales),Math.round(discapacidadAmbas)]);
    poblacionAuxiliar=x1;
  }

}


  
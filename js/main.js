// main js
jQuery(document).ready(function(){
    var file = 'https://surfline.mjof.xyz/584204204e65fad6a77096d4.csv';
    var cdat;
    $.get(file, function(csv) {
        var data = $.csv.toArrays(csv, {
          onParseValue: $.csv.hooks.castToScalar
        });
        var weathers = [];
        var c = 0;
        var i = 0;
        $.each(data, function(index, value){
          if(index > 0 && value[1] != null) {
            if(c == 24) {
              c = 0;              
              i++;
            }
            if(c == 0) {
              weathers.push({
                'date' : value[1].substring(0,10),
                'items' : []
              });
            }
            weathers[i].items.push(value);
            c++;
          }          
        });
        $.each(weathers, function(index, value) {
          // if(index == 0) {
            console.log(value);
            var dt = new Date();
            var cda = dt.getDate(); 
            var h = dt.getHours();
            var d = value['date'].substring(8,10);
            var m = value['date'].substring(5,7);
            var items = value['items'];
            var cols = '';
            if(items[0][4] == null) {
              rh = 4;
            } else {
              var rh = new Date(items[0][4]).getHours();
              rh = rh < 10 ? '0' + rh : rh;
            }
            var rm = new Date(items[0][4]).getMinutes();
            rm = rm < 10 ? '0'+rm : rm;
            if(items[0][4] == null) {
              sh = 16;
            } else {
              var sh = new Date(items[10][5]).getHours();
              sh = parseInt(sh, 10) + 12;
            }
            var sm = new Date(items[10][5]).getMinutes();
            sm = sm < 10 ? '0' + sm : sm;
            var asurt = [];
            var c = 0;
            var ss = '';
            var msurt = 0;
            var line = [];
            var cwicon, ctemp, csurt, cdirec, cwind, cvsurt, misurt, masurt, cls;
            if(cda == d) cdat = index;
            $.each(items, function(id, vl){
              c++;
              var vsurt = vl[11].split(',');
              var surt = parseFloat(vsurt[1].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
              asurt.push(surt);
              msurt = Math.max(...asurt);
              if($.inArray(c, [3, 6, 9, 12, 15, 18, 20]) !== -1) {
                line.push(vl[14]);
              }
              if(c == 24) asurt = [];
            });
            $.each(items, function(id, vl){
              // console.log(vl);
              if(vl[3] != null) {
                var img = 'https://wa.cdn-surfline.com/quiver/0.21.2/weathericons/'+vl[3]+'.svg';
              } else {
                var img = 'https://wa.cdn-surfline.com/quiver/0.21.2/weathericons/'+vl[3]+'.svg';
              }

              var temp = Math.round(vl[2] * 10) / 10;

              if (vl[9] == "Offshore" ){
                var onoff = ' color:#7fffd4';
              } else if (vl[9] == "Onshore" ){
                var onoff = ' color:#ffa500';
              } else {
                var onoff = ' color:#fff';
              }
              var wind = '<span style="transform:rotate(-225deg);"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(vl[8])+'deg);'+onoff+'"></i></span>';

              var vsurt = vl[11].split(',');
              var surt = parseFloat(vsurt[1].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);

              if(surt == msurt) {
                ss = 'style="height: 100%"';
              } else {
                var pc = surt * 100 / 1.9;
                ss = 'style="height: '+pc+'%"';
              }

              if(id == h) {
                cwicon = img;
                ctemp = temp;
                csurt = Math.round(surt / 3.6 * 10) /10;
                cdirec = angleToDirection(vl[8]);
                cwind = '<span style="transform:rotate(-225deg);"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(vl[8])+'deg);'+onoff+';font-size: 55px;"></i></span>';
                cvsurt = vl[11].split(',');
                misurt = parseFloat(vsurt[0].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                masurt = parseFloat(vsurt[1].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                switch(vl[9]) {
                  case 'Offshore':
                    ctype = 'オンショア';
                    break;
                  case 'Onshore':
                    ctype = 'オフショア';
                    break;
                  default:
                    ctype = 'サイド';
                }
                cls = 'act';

                var vswell = vl[12].split(',');
                s11 = parseFloat(vswell[0].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                s12 = parseFloat(vswell[1].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                s13 = parseFloat(vswell[3].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                s21 = parseFloat(vswell[4].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                s22 = parseFloat(vswell[5].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                s23 = parseFloat(vswell[7].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                s31 = parseFloat(vswell[8].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                s32 = parseFloat(vswell[9].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                s33 = parseFloat(vswell[11].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                if(s11 > 0) {
                  a1 = angleToDirection(s13);
                  ico1 = '<span style="transform:rotate(-225deg);margin-left:15px;"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(s13)+'deg);font-size: 25px;color:#01cffe;"></i></span>';
                  ts1 = '<p>'+s11+'m '+s12+'s <span class="direction">'+a1+'</span>'+ico1+'</p>';
                } else {
                  ts1 = '';
                }
                if(s21 > 0) {
                  a2 = angleToDirection(s23);
                  ico2 = '<span style="transform:rotate(-225deg);margin-left:15px;"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(s23)+'deg);font-size: 25px;color:#01cffe;"></i></span>';
                  ts2 = '<p>'+s21+'m '+s22+'s <span class="direction">'+a2+'</span>'+ico2+'</p>';
                } else {
                  ts2 = '';
                }
                if(s31 > 0) {
                  a3 = angleToDirection(s33);
                  ico3 = '<span style="transform:rotate(-225deg);margin-left:15px;"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(s33)+'deg);font-size: 25px;color:#01cffe;"></i></span>';
                  ts3 = '<p>'+s31+'m '+s32+'s <span class="direction">'+a3+'</span>'+ico3+'</p>';
                } else {
                  ts3 = '';
                }
              } else {
                cls = '';
              }

              cols += '<div id="col-'+d+'-'+id+'" class="'+cls+'"> <div class="wicon"><img src="'+img+'"></div> <div class="temp">'+temp+'</div> <div class="wind">'+wind+'</div> <div class="time">1.9</div> <div><span class="chart" '+ss+'></span></div> </div>';
            });
            $('.slider-nav').append('<div class="wrap-weather"> <h2>'+m+'/'+d+'(月)<span>'+formatAMPM(new Date)+'</span></h2> <p><span class="sunny icon-time"><img src="images/sunny.png" alt="">日の出'+rh+':'+rm+'</span> <span class="night icon-time"><img src="images/night-mode.png" alt="">日の入り'+sh+':'+sm+'</span></p> </div>');
            $('.slider-for').append('<div> <div class="sec1 d-flex r-center"> <div class="gap1"> <div> <img src="'+cwicon+'" alt=""> <div><span>'+ctemp+'</span>&deg;C</div> </div> </div> <div  class="gap2"> <span>風向.風速(m/s)</span> <strong><big>'+csurt+'</big> m/s</strong> </div> <div  class="gap3"> '+cwind+' </div> <div  class="gap4"> <strong>'+cdirec+'</strong> <span>'+ctype+'</span> </div> </div> <div class="sec2 d-flex r-center"> <div class="item gap2"> <span>波高(m)</span> <h4><big>'+misurt+'-'+masurt+'</big>m</h4> </div> <div class="item"> '+ts1+ts2+ts3+' </div> </div> <div class="sec3"> <div class="d-flex tbl"> '+cols+' <div class="line-chart"> <div class="aspect-ratio"> <canvas id="charts-'+d+'"></canvas> </div> </div> </div> </div> </div>');
            
            var ctx = document.getElementById('charts-'+d).getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 450);
            gradient.addColorStop(0, 'rgba(255, 250,0, 0.5)');
            gradient.addColorStop(0.5, 'rgba(255, 250, 0, 0.25)');
            gradient.addColorStop(1, 'rgba(255, 250, 0, 0)');
            var data  = {
                labels: ['3h', '6h', '9h', '12h', '15h', '18h', '20h'],
                datasets: [{
                        label: '',
                        backgroundColor: gradient,
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: '#efef00',
                        data: line
                }]
            };
            var chartInstance = new Chart(ctx, {
              type: 'line',
              data: data,
              options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    easing: 'easeInOutQuad',
                    duration: 450,
                    onComplete: function(animation) {
                      var configOptions = this.chart.config.options;
                      var ctx = this.chart.ctx;
                      var scales = this.chart.scales;
                      var datasets = this.chart.config.data.datasets;
                      for(var i = 0; i< datasets.length; i++){
                        var meta = this.chart.getDatasetMeta(i);
                        var elements = meta.data;
                        for (var j = 0; j < elements.length; j++) {
                          var view = elements[j]._view;                  
                          var text = configOptions.barGoals ? datasets[i].rawData[j] : datasets[i].data[j];
                          var textWidth = ctx.measureText(text).width;
                          var x = view.x - (textWidth / 2) + 5;
                          var y = view.y;
                          ctx.save();
                          ctx.fillText(text + 'm', x, y);
                          ctx.restore();
                        }
                      }
                    }
                },
                scales: {
                  xAxes: [{
                      gridLines: {
                          color: 'rgba(200, 200, 200, 0.05)',
                          lineWidth: 1
                      },
                      ticks: {
                        fontColor: "#fff"
                      }
                  }],
                  yAxes: [{
                    //display: false,
                    gridLines: {
                        color: 'rgba(200, 200, 200, 0.08)',
                        lineWidth: 1
                    },
                    ticks: {
                      fontColor: "#fff",
                      display: false
                    }
                  }]
                },
                elements: {
                    line: {
                        tension: 0.5
                    }
                },
                legend: {
                    display: false
                },
                point: {
                    backgroundColor: 'white'
                }
              }
            });
            line = [];
          // }
        });
    });
    $(window).load(function(){
      setTimeout(() => {
        $('.slider-for').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          asNavFor: '.slider-nav',
          rows: 0,
          infinite: false,
          swipe: false,
          swipeToSlide: false,
          touchMove: false,
          draggable: false,
          accessibility: false
        });
        $('.slider-nav').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: '.slider-for',
          dots: false,
          rows: 0,
          infinite: false,
          swipe: false,
          swipeToSlide: false,
          touchMove: false,
          draggable: false,
          accessibility: false
        });
        $('.slider-for').slick('slickGoTo', cdat);
      }, 1000);
      setTimeout(() => {
        $('body').removeClass('loading');
        $('.overlay').hide();
      }, 2000);
    });
});

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = ampm + ' ' +hours + ':' + minutes ;
  return strTime;
}
function angleToDirection(angle) {
  const directions = ['北', '北北東', '北東', '東北東', '東', '東南東', '南東', '南南東', '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西'];
  const index = Math.round(angle / 22.5) % 16;
  return directions[index];
}

// main js
jQuery(document).ready(function($){
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
            //console.log(value);
            var dt = new Date();
            var cda = dt.getDate(); 
            var h = dt.getHours();
            var d = value['date'].substring(8,10);
            var m = value['date'].substring(5,7);
            var items = value['items'];
            var cols = '';
            var today = new Date(value['date']);
            var day = today.getDay();
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
              //console.log(vl);
              if(vl[3] != null) {
                var img = 'https://wa.cdn-surfline.com/quiver/0.21.2/weathericons/'+vl[3]+'.svg';
              } else {
                var img = 'https://wa.cdn-surfline.com/quiver/0.21.2/weathericons/'+vl[3]+'.svg';
              }

              var temp = Math.round(vl[2] * 10) / 10;
              var swind = Math.round(vl[7] / 3.6 * 10) /10;

              if (vl[9] == "Offshore" ){
                var onoff = ' color:#7fffd4';
                var txt2 = 'オンショア';
              } else if (vl[9] == "Onshore" ){
                var onoff = ' color:#ffa500';
                var txt2 = 'オフショア';
              } else {
                var onoff = ' color:#fff';
                var txt2 = 'サイド';
              }

              var sls = '', tls = '';

              if(swind >= 0 && swind <= 2) {
                sls = 'lv1';
              } else if (swind >= 3 && swind <= 5) {
                sls = 'lv2';
              } else if (swind >= 6 && swind <= 8) {
                sls = 'lv3';
              } else if (swind >= 9 && swind <= 11) {
                sls = 'lv4';
              } else {
                sls = 'lv5';
              }

              if(temp > 10) {
                tls = 'style="color: red;"';
              }


              var wind = '<span style="transform:rotate(-225deg);" class="'+sls+'"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(vl[8])+'deg);'+onoff+'"></i></span>';

              var vsurt = vl[11].split(',');
              var surt = parseFloat(vsurt[1].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);

              var pc = surt * 100 / 1.9;
              if(surt >= 2.0 && surt <= 2.5) {
                ss = 'style="height: '+pc+'%;background-color: blue;background-image: linear-gradient(blue, #000);"';
              } else if (surt >= 2.6) {
                ss = 'style="height: '+pc+'%;background-color: red;background-image: linear-gradient(red, #000);"';
              } else {
                ss = 'style="height: '+pc+'%"';
              }

              var svswell = vl[12].split(',');
              var ss11 = parseFloat(svswell[0].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
              var ss12 = parseFloat(svswell[1].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
              var ss13 = parseFloat(svswell[3].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
              var ss21 = parseFloat(svswell[4].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
              var ss22 = parseFloat(svswell[5].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
              var ss23 = parseFloat(svswell[7].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
              var ss31 = parseFloat(svswell[8].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
              var ss32 = parseFloat(svswell[9].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
              var ss33 = parseFloat(svswell[11].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);   

              if(id == h) {
                cwicon = img;
                ctemp = temp;
                csurt = swind;
                cdirec = angleToDirection(vl[8]);
                cwind = '<span style="transform:rotate(-225deg);"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(vl[8])+'deg);'+onoff+';"></i></span>';
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
                if(d == cda) {
                  cls = 'act';
                } else {
                  cls = '';
                }

                var vswell = vl[12].split(',');
                var s11 = parseFloat(vswell[0].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                var s12 = parseFloat(vswell[1].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                var s13 = parseFloat(vswell[3].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                var s21 = parseFloat(vswell[4].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                var s22 = parseFloat(vswell[5].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                var s23 = parseFloat(vswell[7].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                var s31 = parseFloat(vswell[8].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                var s32 = parseFloat(vswell[9].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);
                var s33 = parseFloat(vswell[11].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);

                a1 = angleToDirection(s13);
                ico1 = '<span style="transform:rotate(-225deg);margin-left:15px;"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(s13)+'deg);font-size: 25px;color:#01cffe;"></i></span>';
                ts1 = '<p>'+s11+'m '+s12+'s <span class="direction">'+a1+'</span>'+ico1+'</p>';

                a2 = angleToDirection(s23);
                ico2 = '<span style="transform:rotate(-225deg);margin-left:15px;"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(s23)+'deg);font-size: 25px;color:#01cffe;"></i></span>';
                ts2 = '<p>'+s21+'m '+s22+'s <span class="direction">'+a2+'</span>'+ico2+'</p>';

                a3 = angleToDirection(s33);
                ico3 = '<span style="transform:rotate(-225deg);margin-left:15px;"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(s33)+'deg);font-size: 25px;color:#01cffe;"></i></span>';
                ts3 = '<p>'+s31+'m '+s32+'s <span class="direction">'+a3+'</span>'+ico3+'</p>';

              } else {
                cls = '';
              }
              var txt1 = angleToDirection(vl[8]);
              var txt3 = parseFloat(vsurt[0].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]) + '-' + parseFloat(vsurt[1].match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)[0]);

              sa1 = angleToDirection(ss13);
              sico1 = '<span style="transform:rotate(-225deg);margin-left:15px;"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(ss13)+'deg);font-size: 25px;color:#01cffe;"></i></span>';
              sts1 = '<p>'+ss11+'m '+ss12+'s <span class="direction">'+sa1+'</span>'+sico1+'</p>';

              sa2 = angleToDirection(ss23);
              sico2 = '<span style="transform:rotate(-225deg);margin-left:15px;"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(ss23)+'deg);font-size: 25px;color:#01cffe;"></i></span>';
              sts2 = '<p>'+ss21+'m '+ss22+'s <span class="direction">'+sa2+'</span>'+sico2+'</p>';

              sa3 = angleToDirection(ss33);
              sico3 = '<span style="transform:rotate(-225deg);margin-left:15px;"><i class="fa-solid fa-location-arrow" style="transform:rotate('+Math.round(ss33)+'deg);font-size: 25px;color:#01cffe;"></i></span>';
              sts3 = '<p>'+ss31+'m '+ss32+'s <span class="direction">'+sa3+'</span>'+sico3+'</p>';

              if($.inArray(id, [0,1,2,21,22,23]) === -1) {
                cols += '<div id="col-'+d+'-'+id+'" class="'+cls+'" onClick="changeinfo(this);" data-main="'+fmAMPM(id)+', '+img+','+temp+','+swind+',,'+txt1+','+txt2+','+txt3+'"> <div class="wicon"><img src="'+img+'"></div> <div class="temp" '+tls+'>'+temp+'</div> <div class="wind">'+wind+'</div> <div class="time">'+surt+'</div> <div><span class="chart" '+ss+'></span></div> <div class="sts" style="display: none;">'+sts1+sts2+sts3+'</div> </div>';
              }
            });
            $('.slider-nav').append('<div class="wrap-weather"> <h2>'+m+'/'+d+'('+getdayofweek(day)+')<span>'+formatAMPM(new Date)+'</span></h2> <p><span class="sunny icon-time"><img src="images/sunny.png" alt="">日の出'+rh+':'+rm+'</span> <span class="night icon-time"><img src="images/night-mode.png" alt="">日の入り'+sh+':'+sm+'</span></p> </div>');
            $('.slider-for').append('<div> <div class="sec1 d-flex r-center"> <div class="gap1"> <div> <img src="'+cwicon+'" alt=""> <div><span>'+ctemp+'</span>&deg;C</div> </div> </div> <div  class="gap2"> <span>風向.風速(m/s)</span> <strong><big>'+csurt+'</big> m/s</strong> </div> <div  class="gap3"> '+cwind+' </div> <div  class="gap4"> <strong>'+cdirec+'</strong> <span>'+ctype+'</span> </div> </div> <div class="sec2 d-flex r-center"> <div class="item gap1"> <span>波高(m)</span> <h4><big>'+misurt+'-'+masurt+'</big>m</h4> </div> <div class="item gap2"> '+ts1+ts2+ts3+' </div> </div> <div class="sec3"> <div class="d-flex tbl"> <p><span>オン</span>/<span>サイド</span>/<span>オフ</span></p> '+cols+' <div class="line-chart"> <div class="aspect-ratio"> <canvas id="charts-'+d+'"></canvas> </div> </div> </div> </div> </div>');
            
            var ctx = document.getElementById('charts-'+d).getContext('2d'),
            gradient = ctx.createLinearGradient(255, 255, 255, 1);
            gradient.addColorStop(1, 'rgba(157, 126, 5, 1)');
            gradient.addColorStop(0.5, 'rgba(157, 126, 5, 0)');
            gradient.addColorStop(0, 'rgba(157, 126, 5, 0)');
            var data  = {
                labels: ['3', '6', '9', '12', '15', '18', '20'],
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
                layout: {
                  padding: {
                    top: 20,
                    left: 5,
                    right: 25
                  }
                },
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
                          var x = view.x - (textWidth / 2);
                          var y = view.y - 10;
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
                },
                tooltips: {
                  enabled: false
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
      }, 2000);
      setTimeout(() => {
        $('body').removeClass('loading');
        $('.overlay').hide();
      }, 3000);
    });
});

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = ampm + ' ' +hours + ':' + minutes ;
  return strTime;
}
function fmAMPM(time) {
  var ampm = time >= 12 ? 'pm' : 'am';
  time = time % 12;
  time = time ? time : 12;
  var strTime = ampm + ' ' + time + ':00';
  return strTime;
}
function angleToDirection(angle) {
  const directions = ['北', '北北東', '北東', '東北東', '東', '東南東', '南東', '南南東', '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西'];
  const index = Math.round(angle / 22.5) % 16;
  return directions[index];
}
function getdayofweek(num) {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return days[num];
}
function changeinfo(elm) {
  var obj = jQuery(elm).data('main').split(',');
  console.log(obj);
}

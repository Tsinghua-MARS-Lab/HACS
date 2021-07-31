
function bindButtonAction() {
    $('.refreshButton').click(populateClips);
    $('.refreshButton2').click(populateSegments);
}

function populateClips(){
  var all_str = '';
  var cur_str = '';
  // randomly select N videos to show
  for (var i = 0; i < 3; i++){
    var randomOffset = Math.floor(Math.random() * clip_samples.length);
    cur_str = '<tr><td width="50">' + clip_samples[randomOffset].classname + '</td>';

    var num_gifs = Math.min(clip_samples[randomOffset].gifs.length, 5);
    for (var j = 0; j < num_gifs; j++){
      gif_name = clip_samples[randomOffset].gifs[j].gif;
      start = clip_samples[randomOffset].gifs[j].start;
      end = clip_samples[randomOffset].gifs[j].end;
      if (clip_samples[randomOffset].gifs[j].label > 0){
        label = "Positive";
        label_color = "green";
      }
      else {
        label = "Negative";
        label_color = "red";
      }

      cur_str += '<td><span style="color:' + label_color + '; font-weight:bold">' + label + '</span>';
      cur_str += '</span> (' + start + ', ' + end + ')<br>';
      cur_str += '<img src="' + gif_name + '" max-width="150"max-height="120"></td>';
    }
    cur_str += '</tr>';
    all_str += cur_str;
  }
  $("#clipSamples").empty();
  $('#clipSamples').append(all_str);
}

function populateSegments(v1="none", v2="none"){
  if ((v1 == "none") || (v2 == "none")){
    console.log("randomly select videos");

    // randomly select N videos to show
    v1 = segment_samples[Math.floor(Math.random() * segment_samples.length)];
    v2 = segment_samples[Math.floor(Math.random() * segment_samples.length)];
  }

  // console.log(v1);
  // console.log(v2);

  // add HTML
  var all_str = '';
  all_str += '<div class="col-lg-1 text-center"></div>';
  all_str += '<div class="col-lg-5 text-center"><div style="height:320px;margin-left:auto;margin-right:auto;"><div id="videoPlayer1"></div></div><div id="timeline1"></div></div>';
  all_str += '<div class="col-lg-5 text-center"><div style="height:320px;margin-left:auto;margin-right:auto;"><div id="videoPlayer2"></div></div><div id="timeline2"></div></div>';
  $('#segmentSamples').html(all_str);

  // add videos
  $( function () {
    $( "#videoPlayer1" ).mediaPlayer( {
        autoplay : false,
        defaultVolume: 10,
        src : "segments/" + v1.video + ".mp4",
        controlBar :
            {
                sticky : true,
                height: 75,
            },
        plugins : {
            dataServices : [
                "segments/" + v1.video + '.json'
            ],
            list : [
                {
                    'className' : 'fr.ina.amalia.player.plugins.TimelinePlugin',
                    'container' : '#timeline1',
                    'parameters' : {
                        timeaxis: false,
                        displayLines: 1,
                        listOfLines : [
                            {
                                title : v1.classname,
                                type : 'segment',
                                metadataId : 'annotated-segments',
                                color : '#0F0'
                            },
                        ]
                    }
                }
            ]
        }
      } );
    } );

    $( function () {
      $( "#videoPlayer2" ).mediaPlayer( {
          autoplay : false,
          defaultVolume: 10,
          src : "segments/" + v2.video + ".mp4",
          controlBar :
              {
                  sticky : true,
                  height: 75,
              },
          plugins : {
              dataServices : [
                  "segments/" + v2.video + '.json'
              ],
              list : [
                  {
                      'className' : 'fr.ina.amalia.player.plugins.TimelinePlugin',
                      'container' : '#timeline2',
                      'parameters' : {
                          timeaxis: false,
                          displayLines: 1,
                          listOfLines : [
                              {
                                  title : v2.classname,
                                  type : 'segment',
                                  metadataId : 'annotated-segments',
                                  color : '#0F0'
                              },
                          ]
                      }
                  }
              ]
          }
        } );
      } );

}

$(document).ready(function() {
    bindButtonAction();
    populateClips();
    populateSegments(
      {video:"v_-4Q-AbO8YZE", classname:"Shoveling Snow"},
      {video:"v_-3jHv_c1LKU", classname:"Pole Vault"});
});

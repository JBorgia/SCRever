window.addEventListener('load', function() {
  var logStopWatch;
  var entryNum;
  // add action to "new log" button
  $('#newLog').click(function(e){
    newLog(e);
  });

  $('#viewLogs').click(function(e){
    listLogs(e);
  });
// YOU DIDN'T HAVE THIS
});

function addEntry(){
    console.error('Text field length is: ' + $("#entryText").length);
    if( $('#entryText').length == 0 ){
      setTimeout(function(){
        addEntryField();
      }, 300);
      $('#addEntry').text("Save Entry");
    } else if( $("#entryText").val().length > 1 ){
      console.log('Text being added. Text field value is: ' + $("#entryText").val());
      saveEntry();
      $('entry-box').html("");
      $('#addEntry').text("Add Entry");
    } else {
      console.error('Text field value is: ' + $("#entryText").val());

      $('entry-box').html("");

      console.log('Text field removed.');
      $('#addEntry').text("Add Entry");
    }
  }

  function newLog(){
    // $('#newLog').off('click');
    // $('#viewLogs').on('click',listLogs);
    $('#entries').html(""); // reset field
    console.log("new log clicked!");
    entryNum = 0;
    $.get( "recorder.html", function( data ) {
      $( "#recorder" ).html( data );
      console.log( "recorder.html load was performed." );

      document.getElementById("date").value = formatDate(new Date());
      logStopWatch = new stopwatch();
      // add action to "new entry" button
      console.log("ADDED add entry");
      $('#addEntry').click(function(e){
        addEntry(e);
      });

      // add action to "save log" button
      $('#saveLog').click(function(e){
        saveLog(e);
      });
    });

  }

function saveLog(){
    function entry(timeStamp, entryText) {
      this.timeStamp = timeStamp;
      this.entryText = entryText;
    }

    var entriesArr = [];
    for(var i=1; i<=entryNum; i++){
      var entryHMS = $('#entryTime'+ i).text().slice(12).split(':'); // split it at the colons
      console.log("The entryHMS: " + $('#entryTime'+ i).text());
      var entrySeconds = ((+entryHMS[0]) * 60 * 60 + (+entryHMS[1]) * 60 + (+entryHMS[2]));
      entriesArr[i-1] = new entry(new Date(entrySeconds*1000),$('#entryBody'+ i).text());
    }

    var logHMS = $('#time').text().split(':');
    var logSeconds = ((+logHMS[0]) * 60 * 60 + (+logHMS[1]) * 60 + (+logHMS[2]));

    var obj = { date : $('#date').val(),
                time : new Date(logSeconds*1000),
                quality : $('#quality').val(),
                entries : entriesArr
               };

		var jsonString = JSON.stringify(obj);

    console.log(jsonString);

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'api/log');
		xhr.onreadystatechange = function() {
			if (xhr.status < 400 && xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        console.log("readying export");

			} else if (xhr.readyState === 4 && xhr.status >= 400) {
				console.error('ERROR saving to database');
			}
		}
		xhr.send(jsonString);
    //reset fields
    $('#entries').html(""); // reset field
    entryNum = 0;
    logStopWatch.stop();
    logStopWatch.reset();
    newLog();
}

var addEntryField = function(e){
  // insert code to test for user login

  var todayDate = new Date();
  $entryText = $( '<textarea id="entryText" placeholder="...enter your dream.\r\n(select the quality of sleep from the drop down menu.)" style="margin-top:15px;width:100%;background-color:#222222;border-radius:0px;border:0px;font-size:16px;text-justify:left;color:#bababa;padding-left:0.4em;padding-top:0;padding-bottom:16.5em;padding-right:0.4em;width:100%;"></textarea>');
  if( $('#entry-box').has('textarea') ){
    console.log("ADDING entryText to entryBox");
    $('#entry-box').find('textarea#entryText').remove()
    $('#entry-box').append($entryText);
  } else {
    $('#entry-box').append($entryText);
  }
}

var editEntry = function(e){
  // insert code to test for user login
  console.log("The entry number is " + e);
  var todayDate = new Date();
  $entryText = $( '<textarea id="entryText" style="margin-top:15px;width:100%;background-color:#222222;border-radius:0px;border:0px;font-size:16px;text-justify:left;color:#bababa;padding-left:0.4em;padding-top:0;padding-bottom:16.5em;padding-right:0.4em;"></textarea>');

  $('#entry-box').append($entryText);
  console.log("Current contents of entryText " + $('#entryBody'+ e).html() )
  $('#entryText').html($('#entryBody'+ e).html());
  $('#editEntry'+ e).remove();
  $('#addEntry').text("Save Entry");
}

function saveEntry(){
  entryNum++;
  var $newEntry = $('<div id="editEntry'+ entryNum +'" >'
                    + '<div class="container" style="padding-top:15px">'
                        + '<div class="row">'
                            +'<div class="col-md-2 col-sm-2 col-xs-4" style="background:transparent;">'
                            // + '<h6 id="entryNum'+ entryNum +'" style="color:#0fbcb2;">Entry: </h6></div>'
                                +'<button id="entryNum'+ entryNum +'" class="btn btn-default" type="button" style="text-align:center;margin:auto;padding-left:3px;padding-right:3px;color:#0fbcb2;">Entry:</button>'
                            +'</div>'
                            +'<div class="col-md-10 col-sm-10 col-xs-8">'
                            // + '<h6 id="entryTime'+ entryNum +'" style="color:#0fbcb2;">Sleep Time: </h6></div>'
                                +'<button id="entryTime'+ entryNum +'" class="btn btn-default" type="button" style="text-align:center;margin:auto;padding-left:3px;padding-right:3px;color:#0fbcb2;">Sleep Time: </button>'
                            +'</div>'
                        +'</div>'
                    + '</div>'
                    + '<div class="container">'
                        + '<div class="row">'
                            + '<div class="col-md-12">'
                                + '<p id="entryBody'+ entryNum +'"></p>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>');

  $('#entries').append($newEntry);

  $('#entryNum'+ entryNum).html($('#entryNum'+ entryNum).text() + entryNum);
  $('#entryTime'+ entryNum).html($('#entryTime'+ entryNum).text() + $('#time').text());
  $('#entryBody'+ entryNum).html($('#entryText').val());


  $('#editEntry' + entryNum).click(function(){
    editEntry(entryNum);
  });
  $('#entry-box').html("");
}

function listLogs(){
  console.log("LISTLOGS CALLED")
  // $('#viewLogs').off('click');
  // $('#newLog').on('click', newLog);

  console.log("view logs clicked!");
  entryNum = 0;
  $('#recorder').html("");
  $('#entry-box').html("");
  $('#entries').html("");
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'api/log');
  xhr.onreadystatechange = function() {
    if (xhr.status < 400 && xhr.readyState === 4) {
      var logEntryData = JSON.parse(xhr.responseText);
      console.log("The number of returned results is: " + logEntryData.length);

      for(var i = 0; i < logEntryData.length ; i++){
        console.log("Log: " + logId + "/ itteration: "+i);
        console.log();
        var logId = logEntryData[i].id;
	      var logEntryDate = new Date(logEntryData[i].date);
	      var logEntryTime = logEntryData[i].time;
        if(logEntryData[i].entries.length > 0){
          var logEntryText = logEntryData[i].entries[0].entryText;
        }

	      var $logEntry = $('<div id="logEntryNum' + logId + '">'
                            + '<div class="container" style="padding-top:15px">'
                              + '<div class="row">'
                                  + '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="background:transparent;">'
                                      + '<h6 id="entryNum'+ logId +'" style="color:#0fbcb2;"></h6></div>'
                                  + '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
                                      + '<h6 id="entryTime'+ logId +'" style="color:#0fbcb2;"></h6></div>'
                                  + '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">'
                                      + '<div class="btn-group" role="group" style="width:100%;">'
                                          + '<button id="viewButton'+ logId +'" class="btn btn-default" type="button" style="width:50%;">Edit </button>'
                                          + '<button id="deleteButton'+ logId +'" class="btn btn-default" type="button" style="width:50%;">Delete </button>'
                                      + '</div>'
                                  + '</div>'
                              + '</div>'
                              + '<div class="row">'
                                  + '<div class="col-md-12">'
                                      + '<p id="entryBody'+ logId +'"></p>'
                                  + '</div>'
                              + '</div>'
                          + '</div>'
                      + '</div>');

        $('#entries').append($logEntry);

	      $('#entryNum'+ logId).html( (logEntryDate.getMonth() + 1) + '-' + logEntryDate.getDate() + '-' +  logEntryDate.getFullYear());
	      $('#entryTime'+ logId).html( msToTime(logEntryTime));
	      $('#entryBody'+ logId).html(logEntryText);

	      $('#viewButton' + logId).click(function(e){
	        viewLog(e.target.id.slice(10));
	      });

	      $('#deleteButton' + logId).click(function(e){
	        deleteLog(e.target.id.slice(12));
	      });
      }
    }else if (xhr.readyState === 4 && xhr.status >= 400) {
      console.error('ERROR: inside list quizes button click');
    }
  }
  xhr.send();
}

function viewLog(id){

  var myReq = $.ajax({
      type: "GET",
      url: "api/log/"+id,
      dataType: "json"
  });

  myReq.done(function( viewLogData ) {

    $('#recorder-contents').remove();
    $('#entry-box').html("");
    $('#entries').html("");

    var viewLogDate = new Date(viewLogData.date)

    $singleEntryControls =  $(`<div class="container">
                              <div class="row">
                                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="background:transparent;text-align:left;">
                                      <h6 id="" style="color:#0fbcb2;">${(viewLogDate.getMonth() + 1) + '-' + viewLogDate.getDate() + '-' +  viewLogDate.getFullYear()}</h6></div>
                                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="text-align:center;">
                                      <h6 style="color:#0fbcb2;">${msToTime(viewLogData.time)}</h6></div>
                                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="text-align:center;">
                                      <button id="deleteButton${id}" class="btn btn-default" type="button" style="text-align:center;margin:auto;padding-left:3px;padding-right:3px;color:#0fbcb2;">Delete Log</button>
                                  </div>
                              </div>`);


    $('#recorder').append($singleEntryControls);

    $('#deleteButton' + id).click(function(e){
      deleteLog(e.target.id.slice(12));
    });

    populateEntry(viewLogData);
  });
}

function populateEntry(viewLogData){
  // start looping in entries
  if(viewLogData.entries.length > 0){
    for(var i = 0 ; i < viewLogData.entries.length ; i++){
      var entryId = viewLogData.entries[i].id;
      var entryTime = viewLogData.entries[i].timeStamp;
      var entryBody = viewLogData.entries[i].entryText;

      var $singleEntryView = $('<div id="editEntry'+ entryId +'" >'
                                  + '<div class="container" style="padding-top:15px">'
                                      + '<div class="row">'
                                          +'<div class="col-md-2 col-sm-2 col-xs-4" style="background:transparent;">'
                                          // + '<h6 id="entryNum'+ entryNum +'" style="color:#0fbcb2;">Entry: </h6></div>'
                                              +'<button id="entryNum'+ entryId +'" class="btn btn-default" type="button" style="text-align:center;margin:auto;padding-left:3px;padding-right:3px;color:#0fbcb2;">Entry: </button>'
                                          +'</div>'
                                          +'<div class="col-md-10 col-sm-10 col-xs-8">'
                                          // + '<h6 id="entryTime'+ entryNum +'" style="color:#0fbcb2;">Sleep Time: </h6></div>'
                                              +'<button id="entryTime'+ entryId +'" class="btn btn-default" type="button" style="text-align:center;margin:auto;padding-left:3px;padding-right:3px;color:#0fbcb2;">Sleep Time: </button>'
                                          +'</div>'
                                      +'</div>'
                                  + '</div>'
                                  + '<div class="container">'
                                      + '<div class="row">'
                                          + '<div class="col-md-12">'
                                              + '<p id="entryBody'+ entryId +'"></p>'
                                          + '</div>'
                                      + '</div>'
                                  + '</div>'
                              + '</div>');

      $('#entries').append($singleEntryView);

      $('#entryNum'+ entryId).html($('#entryNum'+ entryId).text() + i + 1);
      console.log("in entry value of entryTime: "+entryTime);
      $('#entryTime'+ entryId).html($('#entryTime'+ entryId).text() + msToTime(entryTime));
      $('#entryBody'+ entryId).html(entryBody);


      $('#editEntry' + entryId).click(function(){
        editEntry(entryNum);
      });
    }
  }
}

function deleteLog(e){
  $.ajax({
      type: "DELETE",
      url: "api/log/" + e,
      success: function(){
        console.log("Log " + e + " was successfully deleted");
        listLogs();
      }
  });
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  function msToTime(duration) {
      var   seconds = parseInt((duration/1000)%60)
          , minutes = parseInt((duration/(1000*60))%60)
          , hours = parseInt((duration/(1000*60*60))%24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
  }

	//Start timer code

function stopwatch(){
  var sw = this;

  var $time = $('#time'),
      $start = $('#start'),
      $stop = $('#stop'),
      $clear = $('#clear'),
      seconds = 0, minutes = 0, hours = 0,
      t;

  function add(timeout) {
      seconds++;
      if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
              minutes = 0;
              hours++;
          }
      }

      if (document.getElementById('time')) {
        document.getElementById('time').textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
      } else {
        clearTimeout(timeout);
        return;
      }

      timer();
  }

  var timer = function() {
      console.log("INSIDE TIMER" + $time.text());
      t = setTimeout(function(){
        add(this)
      }, 1000);
  }
  timer();

  /* Start button */
  $start.click(timer);

  /* Stop button */
  $stop.click(function() {
    sw.stop();
  });


  /* Clear button */
  $clear.click(function() {
    sw.reset();
  });

  this.reset = function(){
    $time.text("00:00:00");
    seconds = 0; minutes = 0; hours = 0;
  }

  this.stop = function(){
    clearTimeout(t);
  }
}

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SCR&#234;V&#201;R</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700">
    <link rel="stylesheet" href="assets/css/Navigation-Clean1.css">
    <link rel="stylesheet" href="assets/css/Navigation-with-Search1.css">
    <link rel="stylesheet" href="assets/css/styles.css">
    <script src="jQuery/jquery-3.1.1.min.js"></script>
    <script src="screver.js"></script>
</head>

<body>
    <div>
        <nav class="navbar navbar-inverse navigation-clean-search">
            <div class="container">
                <div class="navbar-header"><a class="navbar-brand navbar-link" href="index.jsp">SCR&#234;V&#201;R</a>
                    <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                </div>
                <div class="collapse navbar-collapse" id="navcol-1">
                    <ul class="nav navbar-nav">
                        <li id="newLog" role="presentation"><a href="#">New Log</a></li>
                        <li id="viewLogs" role="presentation"><a href="#">View Logs</a></li>
                    </ul>
                    <form class="navbar-form navbar-left" target="_self">
                        <div class="form-group">
                            <label class="control-label" for="search-field"><i style="margin:7px 10px 0px 0px" class="glyphicon glyphicon-search"></i></label>
                            <input class="form-control search-field" id="search" style="background-color:#016565;border-radius:3px;" type="search" name="search" id="search-field">
                        </div>
                    </form><a class="btn btn-default navbar-btn navbar-right action-button" role="button" href="#"><strong>Sign In</strong></a></div>
            </div>
        </nav>
    </div>
    <%-- <div class="btn-group" role="group"></div>
    <div></div> --%>
    <div id="recorder">
        <%-- <div class="container">
            <div class="row">
                <div class="col-md-3 col-sm-3 col-xs-12">
                    <div class="btn-group" role="group" style="width:100%;">
                        <button id="start" class="btn btn-default" type="button" style="padding-left: 5px; padding-right: 5px; width:30%;">Start </button>
                        <button id="stop" class="btn btn-default" type="button" style="padding-left: 5px; padding-right: 5px; width:33%;margin:0px 5px 0px 5px;">Stop </button>
                        <button id="clear" class="btn btn-default" type="button" style="padding-left: 5px; padding-right: 5px; width:30%;">Reset </button>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 col-xs-4">
                    <div>
                        <time><h6 id="time" style="color:#0fbcb2;text-align:center;">00:00:00 </h6></time></div>
                    </div>
                <div class="col-md-3 col-sm-3 col-xs-8" style="text-align:center;">
                    <input type="date" id="date" name="date"  style="background-color:#2f2f2f;color:#0fbcb2;margin:4px 0px 5px 0px;border:#222;padding:3px;text-align:center;">
                </div>
                <div class="col-md-1 col-sm-1 col-xs-2" style="text-align:center;padding-left:5px;padding-right:5px;">
                    <select id="quality" style="padding:0px;font-size:1.2em;margin:7px 0px 6px 0px;border:0px solid #ccc;border-radius:3px;overflow:hidden;color:#888888;background-color:#222;">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="col-md-3 col-sm-3 col-xs-10">
                    <div class="btn-group" role="group" style="width:100%;">
                        <button id="addEntry" class="btn btn-default" type="button" style="width:50%; padding-left: 5px; padding-right: 5px;">Add Entry</button>
                        <button id="saveLog" class="btn btn-default" type="button" style="width:45%;margin:0px 0px 0px 3px; padding-left: 5px; padding-right: 5px;">Save Log</button>
                    </div>
                </div>
            </div>
        </div> --%>
    </div>
    <div>
        <div class="container">
            <div class="row">
                <div id="entry-box" class="col-lg-12">

                </div>
            </div>
        </div>
    </div>
    <div id="entries">
        <%-- <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-6" style="background:transparent;">
                    <h6 style="color:#0fbcb2;text-align:center;">01-22-2012 </h6></div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                    <h6 style="color:#0fbcb2;text-align:center;">00:00:00 AM</h6></div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <p>Paragraph</p>
                </div>
            </div>
        </div> --%>
    </div>
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
</body>

</html>
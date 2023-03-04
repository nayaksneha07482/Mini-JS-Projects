var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var seconds = document.getElementById("seconds");

var set_clock = setInterval(
    function clock(){
        var date_now = new Date();
        var hr = date_now.getHours();
        var min = date_now.getMinutes();
        var sec = date_now.getSeconds();

        var calc_hr = (hr * 30) + (min / 2);
        var calc_min =    (min * 6)  ;
        var calc_sec = sec * 6 ;

        hour.style.transform = "rotate(" + calc_hr + "deg)";
        minute.style.transform = "rotate(" + calc_min + "deg)";
        seconds.style.transform = "rotate(" + calc_sec + "deg)";
    }, 1000);
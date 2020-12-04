var exec = require('child_process').execFile;
exec('./client/dist_electron/win-unpacked/WatchTower.exe', function(err, data) {  
    console.log(err)
    console.log(data.toString());                       
});  
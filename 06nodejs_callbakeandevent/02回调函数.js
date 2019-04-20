var fs=require('fs');
function getMime(callback) {

    fs.readFile('06nodejs_callbakeandevent/mime.json',function (err,data) {
     //console.log(data.toString());
    //return data;
    callback(data);
 })
}
getMime(function (result) {
    console.log(result.toString());
})

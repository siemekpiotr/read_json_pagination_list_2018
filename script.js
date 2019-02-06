function readJSONFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readJSONFile("dane.json", function(text){
    myData =  JSON.parse(text);
    appendToTableFromJSON();
});

function appendToTableFromJSON() {
    moment.locale('pl');
    $("#myTable").append("<tbody>");
    for(var i = 0;i<myData.length;i++){
        $("#myTable").append("<tr><td id='table-bold'>" +  myData[i].id
            + "</td><td id='table-regular'>" + myData[i].firstName + "</td>"
            + "</td><td id='table-bold'>" + myData[i].lastName + "</td>"
            + "</td><td id='table-regular'>" + moment(myData[i].dateOfBirth, 'L').format('D  MMMM YYYY') + "</td>"
            + "</td><td id='table-bold'>" + myData[i].company.toLowerCase() + "</td>"
            + "</td><td id='table-regular'>" + myData[i].note + "</td>");
    }
    $("#myTable").append("</tbody>");
    configDataTables();
}

function configDataTables() {
    $.extend( true, $.fn.dataTable.defaults, {
        "searching": false,
        "lengthMenu": false,
    } );
    $(document).ready(function() {
        $.fn.dataTable.moment( 'D  MMMM YYYY' );
        $('#myTable').DataTable( {
            responsive: true,
            "lengthMenu": [[6], [6]],
            "dom": '<"top">rt<"bottom"p><"clear">',
            "language": {
                "paginate": {
                    "previous": "< back",
                    "next": "next >"
                }
            }
        } );
    } );
}
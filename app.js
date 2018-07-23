const express = require('express');
const app = express();
const cors = require('cors');
const csvToJson = require('convert-csv-to-json');
app.use(cors());
const instructors = csvToJson.fieldDelimiter(',').getJsonFromCsv('instructors.csv');

function findById(data, id) {
    console.log("ID: ", id);
    
    for (let i = 0; i < data.length; i++) {
        let holder = data[i].id.toString();
        if (holder === id) {
            console.log("data[i]:", data[i]);
            
            return data[i];
        }
    }
}

app.get('/', (request, response) => {
    response.json(instructors);
})

app.get("/:id", function (request, response) {
    var record = findById(instructors, request.params.id);
    if (!record){
        response.status = 404;
        response.json({
            error: {
                message: "No record found!"
            }
        });
    } else {
        response.json({instructors: record});
    }
});

app.listen(9000);
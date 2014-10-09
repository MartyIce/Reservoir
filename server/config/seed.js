/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Reservation = require('../api/reservation/reservation.model');
var Customer = require('../api/customer/customer.model');
var Table = require('../api/table/table.model');
var Employee = require('../api/employee/employee.model');
var q = require('q');

String.prototype.shortDateFormat = function() {
    return this.substr(0, this.indexOf('T'));
};
Number.prototype.padLeft = function(pad) {
    return pad.substring(0, pad.length - this.toString().length) + this.toString();
};
Date.prototype.shortDateFormat = function(){
    return this.getFullYear() +
        '-' +  (this.getMonth()+1).padLeft('00') +
        '-' +  this.getDate().padLeft('00');
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function makeId(min, max)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < getRandomInt(min, max); i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function getRandomIntString(ln)
{
    var text = "";
    var possible = "0123456789";

    for( var i=0; i < ln; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function pad(n, width, z) {
    z = z ||'0';
    n = n +'';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function makeBirthDate() {
    var year = getRandomInt(1910, 1960);
    var month = pad(getRandomInt(1, 12), 2);

    var day = pad(getRandomInt(1, 28), 2);
    return year +'-' + month +'-' + day;

}

function getRandomDate(daysToAdd) {
    var timeToAdd = daysToAdd * 24 * 60 * 60000;
    var todayInTime = (new Date((new Date()).toDateString())).getTime();
    var returnVal = new Date(todayInTime + (timeToAdd));
    return returnVal;
}
function getFirstName() {
    var firstNames = ['Sophia','Emma','Olivia','Isabella','Mia','Ava','Lily','Zoe','Emily','Chloe','Layla','Madison','Madelyn','Abigail','Aubrey','Charlotte','Amelia','Ella','Kaylee','Avery','Aaliyah','Hailey','Hannah','Addison','Riley','Harper','Aria','Arianna','Mackenzie','Lila','Evelyn','Adalyn','Grace','Brooklyn','Ellie','Anna','Kaitlyn','Isabelle','Sophie','Scarlett','Natalie','Leah','Sarah','Nora','Mila','Elizabeth','Lillian','Kylie','Audrey','Lucy','Maya','Annabelle','Makayla','Gabriella','Elena','Victoria','Claire','Savannah','Peyton','Maria','Alaina','Kennedy','Stella','Liliana','Allison','Samantha','Keira','Alyssa','Reagan','Molly','Alexandra','Violet','Charlie','Julia','Sadie','Ruby','Eva','Alice','Eliana','Taylor','Callie','Penelope','Camilla','Bailey','Kaelyn','Alexis','Kayla','Katherine','Sydney','Lauren','Jasmine'
        ,'London','Bella','Adeline','Caroline','Vivian','Juliana','Gianna','Skyler','Jordyn','Jackson','Aiden','Liam','Lucas','Noah','Mason','Jayden','Ethan','Jacob','Jack','Caden','Logan','Benjamin'
        ,'Michael','Caleb','Ryan','Alexander','Elijah','James','William','Oliver','Connor','Matthew','Daniel','Luke','Brayden','Jayce','Henry','Carter','Dylan','Gabriel','Joshua','Nicholas','Isaac','Owen','Nathan','Grayson','Eli','Landon','Andrew','Max','Samuel','Gavin','Wyatt','Christian'
        ,'Hunter','Cameron','Evan','Charlie','David','Sebastian','Joseph','Dominic','Anthony','Colton','John','Tyler','Zachary','Thomas','Julian','Levi','Adam','Isaiah','Alex','Aaron','Parker','Cooper','Miles','Chase','Muhammad','Christopher','Blake','Austin','Jordan','Leo','Jonathan','Adrian','Colin','Hudson','Ian','Xavier','Camden','Tristan','Carson','Jason','Nolan','Riley','Lincoln','Brody','Bentley','Nathaniel','Josiah','Declan','Jake','Asher','Jeremiah','Cole','Mateo','Micah','Elliot'];


    return firstNames[getRandomInt(0, firstNames.length - 1)]
}
function getLastName() {
    var lastNames = ['Smith','Johnson','Williams','Jones','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Garcia','Martinez','Robinson','Clark','Rodriguez','Lewis','Lee','Walker','Hall','Allen','Young','Hernandez',
        'King','Wright','Lopez','Hill','Scott','Green','Adams','Baker','Gonzalez','Nelson','Carter','Mitchell','Perez','Roberts','Turner','Phillips','Campbell','Parker','Evans','Edwards','Collins','Stewart','Sanchez','Morris','Rogers','Reed','Cook',
        'Morgan','Bell','Murphy','Bailey','Rivera','Cooper','Richardson','Cox','Howard','Ward','Torres','Peterson','Gray','Ramirez','James','Watson','Brooks','Kelly','Sanders','Price','Bennett','Wood','Barnes','Ross','Henderson','Coleman','Jenkins','Perry','Powell','Long','Patterson','Hughes','Flores','Washington','Butler','Simmons','Foster','Gonzales','Bryant','Alexander','Russell','Griffin','Diaz','Hayes'];
    return lastNames[getRandomInt(0, lastNames.length - 1)]
}
function getMiddleInitial()
{
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return possible.charAt(Math.floor(Math.random() * possible.length));
}
function getFullName() {
    return getFirstName() + ' ' + getLastName();
}
function getPhone() {
    return getRandomIntString(10);
}
function getRandomStreet() {
    var streets = [
        'Huckleberry Ln',
        'Main St',
        'Ocean Dr',
        'Desert Pt',
        'Wonderful Way',
        'Lucid Lane',
        'Dead Mans Curve Pkwy',
        'Anvil Dr',
        'Beach St',
        'Carolina Way',
        'Duncan Blvd',
        'Ellen Dr',
        'Funkytown Blvd',
        'Gulf St',
        'Hair Lane',
        'Indiana Rd',
        'Juniper Dr',
        'Kite Ln',
        'Lucky Park',
        'Mountain View St',
        'North Ave',
        'Ontario Ct'
    ];
    return streets[getRandomInt(0, streets.length - 1)];
}
function getRand(array) {
    return array[getRandomInt(0, array.length - 1)];
}
function makeEmail(name) {
    return name.split(' ')[0] + '@' + getRand(['gmail.com', 'aol.com', 'bb.net', 'yahoo.com', 'msn.com']);
}
function getLoremIpsum(len) {

    var chunks = ['lorem ipsum dolor sit amet',
        'consectetur adipiscing elit',
        'nunc in tellus convallis enim',
        'facilisis vehicula ac et nunc',
        'fusce sem est',
        'egestas eu dignissim in',
        'congue quis nunc',
        'duis lobortis',
        'magna et faucibus consequat',
        'nunc nunc pulvinar ligula',
        'in volutpat lectus lectus id sem',
        'in consequat eu mi sed tincidunt',
        'nullam varius scelerisque velit',
        'in porta sem tincidunt sed',
        'aenean luctus nibh ut nisi posuere',
        'vitae scelerisque ex semper',
        'quisque risus libero',
        'vehicula sit amet urna id',
        'viverra euismod arcu',
        'morbi pretium imperdiet aliquam',
        'nullam eu quam vitae nulla sollicitudin finibus',
        'ut condimentum libero sit amet pellentesque eleifend',
        'nulla facilisis est sed velit tincidunt lobortis',
        'etiam ut scelerisque massa',
        'mauris commodo tortor sed tortor gravida venenatis',
        'morbi id fringilla enim',
        'sed nec lacus est',
        'donec sed auctor magna',
        'pellentesque ac enim convallis',
        'tincidunt purus vitae',
        'dapibus lectus'
    ];

    String.prototype.capitalizeFirstLetter = function()
    {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    var ret = '';
    var wasPeriod = false, wasComma = false;
    for(var i = 0; i < len; i++) {
        var chunk = null;
        if(i === 0)
            chunk = chunks[getRandomInt(0, chunks.length - 1)].capitalizeFirstLetter();
        else if(wasPeriod)
            chunk = '  ' + chunks[getRandomInt(0, chunks.length - 1)].capitalizeFirstLetter();
        else if(wasComma)
            chunk = ' ' + chunks[getRandomInt(0, chunks.length - 1)];
        ret = ret + chunk;

        wasPeriod = false;
        wasComma = false;
        if(getRandomInt(0, 1) === 1) {
            wasPeriod = true;
            ret = ret + '.';
        } else {
            wasComma = true;
            ret = ret + ',';
        }
    }
    return ret;
}

Table.find().remove().exec().then(function() {
    return Table.create(
        {name: 'Main Room 1', capacity: 4, row: 5, col: 2},
        {name: 'Main Room 2', capacity: 4, row: 6, col: 2},
        {name: 'Main Room 3', capacity: 4, row: 5, col: 3},
        {name: 'Main Room 4', capacity: 4, row: 6, col: 3},
        {name: 'Main Room 5', capacity: 4, row: 5, col: 4},
        {name: 'Main Room 6', capacity: 4, row: 6, col: 4},
        {name: 'Main Room 7', capacity: 6, row: 5, col: 5},
        {name: 'Main Room 8', capacity: 6, row: 6, col: 5},
        {name: 'Main Room 9', capacity: 8, row: 5, col: 6},
        {name: 'Main Room 10', capacity: 8, row: 6, col: 6},
        {name: 'Main Room 11', capacity: 8, row: 5, col: 7},
        {name: 'Main Room 12', capacity: 8, row: 6, col: 7},
        {name: 'Bar 1', capacity: 4, row: 0, col: 2},
        {name: 'Bar 2', capacity: 4, row: 0, col: 3},
        {name: 'Bar 3', capacity: 4, row: 0, col: 4},
        {name: 'Bar 4', capacity: 4, row: 0, col: 5},
        {name: 'Bar 5', capacity: 4, row: 0, col: 6},
        {name: 'Bar 6', capacity: 4, row: 0, col: 7});
});
var addEmployees = Employee.find().remove().exec().then(function() {
    return Employee.create(
        {name: 'Flo Carter'},
        {name: 'Frannie Smith'},
        {name: 'Betty Moore'},
        {name: 'Mildred Anderson'},
        {name: 'Gertrude Doolittle'},
        {name: 'Agatha Yord'},
        {name: 'Harriet North'},
        {name: 'Era King'},
        {name: 'Florence Lee'},
        {name: 'Corynth Wilson'},
        {name: 'Henrietta Veech'},
        {name: 'Steve Jenkins'}
        );
});


var addCustomers = Customer.find({}).remove(function() {
    var customers = [];
    for(var i = 0; i < 50; i++){
        var name = getFullName();
        customers.push({name: name, email: makeEmail(name)});
    }
    return Customer.create(customers);
});

function addReservations(employees, customers, tables) {

    // create random combinations of reservations
    for(var i = 0; i < 500; i++){
        var c = getRand(customers);

        var schedDate = getRandomDate(getRandomInt(-7, 14));

        var hour = getRandomInt(19, 23);
        if(getRandomInt(0, 1) === 1) {
            hour = getRandomInt(11, 14); // lunch
        }
        hour += 5;

        // 2014-09-20T16:30:00.000Z


        var timeValue = (hour * 60) + (getRandomInt(0, 3) * 15);

//        var schedDate = getRandomDate(0, 0);
//        var hour = 11; // lunch
//        var timeValue = (hour * 60);


        var r = {
            customer: c._id.toString(),
            //scheduled_datetime: new Date(2014, 8, 18, 11, 0, 0).getTime(),
            scheduled_datetime: new Date(schedDate.getTime() + (timeValue * 60000)).toISOString(),
            notes: getLoremIpsum(getRandomInt(3, 20)),
            status: 'Open'
        };
        // we'll seat most of hte past reservations
        var isPrior = new Date(r.scheduled_datetime).getTime() < new Date().getTime();
        if(isPrior) {
            console.log('prior: ' + new Date(r.scheduled_datetime));
        } else {
            console.log('later: ' + new Date(r.scheduled_datetime) + ' today: ' + new Date());
        }

        if(isPrior && getRandomInt(0, 8) < 6) {
            r.seated_datetime = r.scheduled_datetime + (getRandomInt(-10, 30) * 60000);
            r.seated_by = getRand(employees)._id.toString();
            r.server = getRand(employees)._id.toString();
            r.status = 'Seated';
            var t1 = getRand(tables);
            r.tables = [t1];
        }


        Reservation.create(r);

    }

}


Reservation.find({}).remove(function() {
    // q.all([addEmployees, addCustomers]).then(function() {
    //     console.log('all added');


    //     q.all([Employee.find().exec(), Customer.find().exec(), Table.find().exec()]).then(function () {
    //         console.log('inside find return');
    //         addReservations(arguments[0][0], arguments[0][1], arguments[0][2]);
    //         //console.log(arguments[0][0], arguments[0][1]);
    //     });
    // });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
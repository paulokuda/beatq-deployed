var util = require("util");
var mongoClient = require('mongodb').MongoClient;
/*
 * This is the connection URL
 * Give the IP Address / Domain Name (else localhost)
 * The typical mongodb port is 27012
 * The path part (here "fallTest") is the name of the database
 */



var musicQueue = [];


var Message = {
    // this.x = x;    
                      

    getSoundcloudUrl : function(msg) {
        
    }
    // getPlayer : function(tennis_name) {
    //     console.log("get player method was hit in tennis.js");
    //     // if (!tennis_name){
    //     //     console.log("THE PARAMETER IS UNDEFINED");
    //     //     return tennisCollection;
    //     // }
    //     // else{
    //         for (i = 0; i < tennisCollection.length; i++) {
    //             if (tennisCollection[i].tennis_name === tennis_name) {
    //                 console.log("got to the getPlayer method we wanted");
    //                 return tennisCollection[i];
    //             }
    //         }
    //         // // var notFound = "No players match that search";
    //         // return notFound;

    //     // }
    //     console.log(tennisCollection);
    //     return tennisCollection;
    // },
    // deletePlayer : function(tennis_name) {
    //     for (i = 0; i < tennisCollection.length; i++) {
    //         if (tennisCollection[i].tennis_name === tennis_name) {
    //             tennisCollection.splice(i, 1);
    //             return tennisCollection;
    //         }
    //     }
    //     return tennisCollection;
    // },
    // updatePlayer : function(tennis_name, handed, ranking, callback) {
    //     for (i = 0; i < tennisCollection.length; i++) {
    //         console.log("the handed we are looking for is: " + tennisCollection[i].handed);
    //         console.log("the search query is: " + handed);
    //         if (tennisCollection[i].tennis_name === tennis_name) {
    //             // tennisCollection[i][0] = tennis_name;

    //             tennisCollection[i].handed = handed;
    //             tennisCollection[i].ranking = ranking;
    //             return tennisCollection;
    //         }
    //     }
    // },
    // getArray : function(){
    //     return tennisCollection;
    // }
}




 
module.exports = Message;
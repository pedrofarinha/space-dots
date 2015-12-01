"use strict";

$(function init() {

    generateAsteroids();

    generatePlanets()
    
});



function generatePlanets(){
    var planetOrbit

    /*set properties for each planet using data in data.js*/
    for (var p in data.planets){

        //select the planet elements: Orbit, Rotation, Shape
        var planetOrbit = $("."+data.planets[p].name+"-orbit");
        var planetRotation = $("."+data.planets[p].name+"-rotation");
        var planetShape = $("."+data.planets[p].name+"-shape");

        /*get data from data.js*/
        //distance: distance from the center of the sun;
        //diameter: planet diameter;
        //color: planet color;
        //orbit: orbit line color;
        //speed: orbital period(seconds)
        var distance = data.planets[p].distance;
        var diameter = data.planets[p].diameter;
        var color = data.planets[p].color;
        var orbit = data.planets[p].orbit;
        var speed = data.planets[p].speed;

        //center orbit and planet with negative margin.
        //add 1px to marginPlanet to compensate for orbit border
        var marginOrbit = -distance/2;
        var marginPlanet = -diameter/2 + 1;

        //set orbit, rotation and shape elements properties
        planetOrbit.add(planetRotation).css({
            "margin-top": marginOrbit +"px",
            "margin-left": marginOrbit +"px",
            "width": distance + "px",
            "height": distance + "px",
            "animationDuration": speed + "s"
        });

        planetOrbit.css({
            "border-color": orbit, 
            "border-width":"1px", 
            "border-style":"solid"
        });

        planetShape.css({
            "width": diameter + "px",
            "height": diameter + "px",
            "margin-top": marginPlanet + "px", 
            "margin-left": marginPlanet +"px",
            "background": color,
        }); 

        /*DEBUG-----------------------------------------*/

        console.log(
            "planet: "+ data.planets[p].name +"\n",
            "distance: "+ distance + "px" + "\n",
            "diameter: "+ diameter + "px" +"\n",
            "speed: "+ speed + "s" + "\n"
            );

    }
};

function generateAsteroids(){

    var asteroidCount = 0;

    /*create 8 disks with different rotation speeds and a certain number 
    of asteroids each*/
    for(var d = 0; d < 8; d++){

        //append new disk
        var diskNumber = "d" + d;
        var newDisk ='<div class="asteroid-disk '+ diskNumber +'"></div>';
        $(".asteroid-belt").append(newDisk);
        var diskClass = $("." + diskNumber);

        //set a random speed for the disk in a given range
        var speed = Math.floor(Math.random()*130 + 70);

        //distance from the center of the sun
        var distance = data.asteroids.distance;

        diskClass.css({
            "animationDuration": speed + "s",
            "margin-left": -distance/2 +"px",
            "margin-top": -distance/2 +"px",
            "width": distance+"px",
            "height": distance+"px"
        });

        //populate the disk with a certain amount of asteroids
        //each asteroid has its properties
        var asteroidAmount = data.asteroids.amount/8
        for (var a = 0; a < asteroidAmount; a++){
            asteroidCount++;

            //append new asteroid
            var asteroidNumber = "a" + asteroidCount;
            var newAsteroid = '<div class="asteroid '+ asteroidNumber +'"></div>'
            diskClass.append(newAsteroid);

            var asteroidClass = $("." + asteroidNumber);

            /*distribute asteroids around a circle and vary the radius to change 
            the asteroid belt width using beltWidth. set a random beltPosition*/
            var beltWidth = data.asteroids.beltWidth;
            var beltPosition = Math.random()*beltWidth + 0;

            //calculate a point in the circle using a random angle
            var center = distance/2;
            var radius = (center - beltWidth/2) + beltPosition;
            var angle = Math.random()*360 + 0;
            var posX = center + radius * Math.cos(angle);
            var posY = center + radius * Math.sin(angle);

            /*creat an index from 0 to 10 based on the asteroid distance from the 
            center of the belt. the higher the index is, the smaller the asteroids get*/
            var beltIndex = Math.abs(1-beltPosition/(beltWidth/2))*10;

            if (beltIndex > 7) {
                var size = Math.random()*0.75 + 0.5;

            }else if (beltIndex > 3) {
                var size = Math.random()*1.5 + 0.75;

            }else if (beltIndex > 4) {
                var size = Math.random()*2.2 + 0.9;

            }else {
                var size = Math.random()*2 + 0.9;
            }

            //correct asteroid position relative to the containing div
            var margin = -size;

            //select a random asteroid color
            var colors = ["#D5D5D5"];
            var color = colors[Math.floor(Math.random()*colors.length)];

            //set the new asteroid properties
            $(asteroidClass).css({
                "top": posY + 'px',
                "left": posX + 'px',
                "margin-top": margin,
                "margin-left": margin,
                "border-radius": "50%",
                "width": size,
                "height": size,
                "background": color
            });
        };
    };

    /*DEBUG-----------------------------------------*/

    console.log(
        "number of disks: "+ d +"\n",
        "number of asteroids: "+ asteroidCount +"\n",
        "belt width: "+ beltWidth +"\n",
        "center: "+ center +"\n"
        );
};






/*testing. This changes the color and size of the asteroid on mouse hover
    $(".asteroid-belt").on("mouseover", ".asteroid", function(){
      $(this).addClass("highlight");
    }).on("mouseout",function(){
      $(this).removeClass("highlight");
    });
*/

/*functions to create a trail  
    function draw(){
    var canvas, c;
    c = document.getElementById("space");
    canvas = c.getContext("2d");
    canvas.beginPath();
    canvas.moveTo(1000,1000);
    var myVar = setInterval(test, 1);
    test(canvas)
    }
    function test(canvas){
        var canvas = c.getContext("2d");
        var sunleft = $(".trail").offset().left
        var suntop = $(".trail").offset().top;
        canvas.lineWidth=1;
        canvas.lineTo(sunleft,suntop);
        canvas.stroke();
    }
*/
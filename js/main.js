"use strict";

$(function init() {
    generateAsteroids();

    generatePlanets()
    
});



function generatePlanets(){

     for (var p in data.planets){
        var planetOrbit = $(
            "."+data.planets[p].name+"-orbit ", 
            "."+data.planets[p].name+"-rotation"
        );

        var distance = data.planets[p].distance;
        var color = data.planets[p].color;
        var speed = data.planets[p].speed;

        planetOrbit.css({
                top: "50%",
                left: "0",
                marginTop: -(distance/2),
                marginLeft: -(distance/2),
                borderRadius: "50%",
                width: distance,
                height: distance,
                background: color,
                animationDuration: speed
        });

        console.log(planetOrbit.html())
    }

};





function generateAsteroids(){

    var asteroidCount = 0;

    //is this correct?
    var diskNumber, newDisk, diskClass, diskSpeed, asteroidNumber,
    newAsteroid, asteroidClass, beltWidth, beltPosition, center,
    radius, angle, posX, posY, beltIndex, size, margin, colors, color;

    /*create 8 disks with different rotation speeds and a certain number 
    of asteroids each*/
    for(var d = 0; d < 9; d++){

        //append new disk
        diskNumber = "d" + d;
        newDisk ='<div class="asteroid-disk '+ diskNumber +'"></div>';
        $(".asteroid-belt").append(newDisk);
        diskClass = $("." + diskNumber);

        //set a random speed for the disk
        diskSpeed = (Math.random()*100 + 100) + "s";
        diskClass.css("animationDuration", diskSpeed);

        //populate the disk with 170 asteroids. each one has its properties
        for (var a = 0; a < 300; a++){
            asteroidCount++;

            //append new asteroid
            asteroidNumber = "a" + asteroidCount;
            newAsteroid = '<div class="asteroid '+ asteroidNumber +'"></div>'
            diskClass.append(newAsteroid);
            asteroidClass = $("." + asteroidNumber);

            /*distribute asteroids around a circle and vary the radius to change 
            the asteroid belt width using beltWidth. set a random beltPosition*/
            beltWidth = 60;
            beltPosition = Math.random()*beltWidth + 0;

            //calculate a point in the circle using a random angle
            center = 212;
            radius = (center - beltWidth / 2) + beltPosition;
            angle = Math.random()*360 + 0;
            posX = center + radius * Math.cos(angle);
            posY = center + radius * Math.sin(angle);

            /*creat an index from 0 to 10 based on the asteroid distance from the 
            center of the belt. the higher the index is, the smaller the asteroids get*/
            beltIndex = Math.abs(1-beltPosition/(beltWidth/2))*10;

            if (beltIndex > 7) {
                size = Math.random()*(0.75) + 0.5;

            }else if (beltIndex > 3) {
                size = Math.random()*1.5 + 0.75;

            }else if (beltIndex > 4) {
                size = Math.random()*2.2 + 0.9;

            }else {
                size = Math.random()*2 + 0.9;
            }

            //correct asteroid position relative to the containing div
            margin = -size;

            //select a random asteroid color
            colors = ["#D5D5D5"];
            color = colors[Math.floor(Math.random()*colors.length)];

            //set the new asteroid properties
            $(asteroidClass).css({
                top: posY + 'px',
                left: posX + 'px',
                marginTop: margin,
                marginLeft: margin,
                borderRadius: "50%",
                width: size,
                height: size,
                background: color
            });
        };
    };

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
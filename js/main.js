$(function () {
    var $clockUnit = $('<div></div>')
    $clockUnit.addClass('clockUnit')
    $clockUnit.insertBefore('.clock')

    for(let i=0; i<=59; i++){
        let $unit = $('<div></div>')
        $unit.addClass('unit')
        $unit.appendTo($clockUnit)
    }

    var width = window.screen.width
    var $units = $('.unit')
    if(width > 415){
        $clockUnit.css({
            position: 'absolute',
            width: '400px',
            height: '400px'
        })

        $units.css({
            width: '360px',
            height: '3px',
            borderTop: '0px solid transparent',
            borderRight: '3px solid transparent',
            borderBottom: '0px solid transparent',
            borderLeft: '15px solid #fff',
            backgroundColor: 'transparent',
            position: 'absolute',
            top: '50%',
            marginTop: '-1.5px',
            marginLeft: '5px',
            transformOrigin: '195px 50%',
            transition: 'all .5s'
        })
    }else {
        $clockUnit.css({
            position: 'absolute',
            width: '80vw',
            height: '80vw'
        })

        $units.css({
            width: '72vw',
            height: '0.6vw',
            borderTop: '0 solid transparent',
            borderRight: '0.6vw solid transparent',
            borderBottom: '0px solid transparent',
            borderLeft: '3vw solid #fff',
            backgroundColor: 'transparent',
            position: 'absolute',
            top: '50%',
            marginTop: '-0.3vw',
            marginLeft: '1vw',
            transformOrigin: '39vw 50%',
            transition: 'all .5s'
        })
    }

    for(let i = 0; i<=59; i++){
        $units[i].style.transform = `rotate(${i*6-90}deg`
    }

    var secondHand = document.querySelector('.secondHand');
    var second, minute, hour, time

    function setTime(){
        getDate()
        var secondDeg = second/60*360
        var minuteDeg = minute/60*360 + secondDeg/360*6
        var hourDeg = hour/12*360 + minuteDeg/60*6

        secondHand.style.transform = `rotate(${-90+secondDeg}deg)`
        document.querySelector('.minuteHand').style.transform= `rotate(${-90+minuteDeg}deg)`
        document.querySelector('.hourHand').style.transform= `rotate(${-90+hourDeg}deg)`

        flashSecond()
    }
    
    function step() {
        getDate()
        var secondDeg = second/60*360
        var minuteDeg = minute/60*360 + secondDeg/360*6
        var hourDeg = hour/12*360 + minuteDeg/60*6

        var secondString = secondHand.style.transform
        console.log(secondString)
        var index = secondString.indexOf('(')
        var index2 = secondString.lastIndexOf('deg)')
        var numberString = secondString.substring(index+1, index2)
        console.log(numberString);

        secondHand.style.transform = `rotate(${parseInt(numberString)+6}deg)`
        document.querySelector('.minuteHand').style.transform= `rotate(${-90+minuteDeg}deg)`
        document.querySelector('.hourHand').style.transform= `rotate(${-90+hourDeg}deg)`

        flashSecond()
    }

    function getDate() {
        time = new Date()

        hour = time.getHours()
        minute = time.getMinutes()
        second = time.getSeconds()
        if(hour > 12){
            hour = hour - 12
        }
    }

    function flashSecond() {
        for(let i = 0; i<60; i++){
            if(secondHand.style.transform === $units[i].style.transform){
                if(i<=29){
                    $units[i+30].style.borderLeftColor = 'red'
                }else{
                    $units[i-30].style.borderLeftColor = 'red'
                }
            }
            else{
                if(i<=29){
                    $units[i+30].style.borderLeftColor = 'white'
                }else{
                    $units[i-30].style.borderLeftColor = 'white'
                }
            }
        }
    }

    setTime()
    setInterval(function(){
        step()
    },1000)
})
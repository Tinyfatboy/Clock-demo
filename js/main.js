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
        $units[i].style.transform = `rotate(${i*6+90}deg`
    }

    var secondHand = document.querySelector('.secondHand');
    var second, minute, hour, time, status

    function setTime(){
        getDate()
        var secondDeg = second/60*360
        var minuteDeg = minute/60*360 + secondDeg/360*6
        var hourDeg = hour/12*360 + minuteDeg/60*6

        secondHand.style.transform = `rotate(${-90+secondDeg}deg)`
        document.querySelector('.minuteHand').style.transform= `rotate(${-90+minuteDeg}deg)`
        document.querySelector('.hourHand').style.transform= `rotate(${-90+hourDeg}deg)`

        flashSecond(secondDeg)
        displayTime()
    }
    
    function step() {
        getDate()
        var secondDeg = second/60*360
        var minuteDeg = minute/60*360 + secondDeg/360*6
        var hourDeg = hour/12*360 + minuteDeg/60*6

        var secondString = secondHand.style.transform
        var index = secondString.indexOf('(')
        var index2 = secondString.lastIndexOf('deg)')
        var numberString = secondString.substring(index+1, index2)

        secondHand.style.transform = `rotate(${parseInt(numberString)+6}deg)`
        document.querySelector('.minuteHand').style.transform= `rotate(${-90+minuteDeg}deg)`
        document.querySelector('.hourHand').style.transform= `rotate(${-90+hourDeg}deg)`

        flashSecond(secondDeg)
        displayTime()
    }

    function getDate() {
        time = new Date()
        status = 'AM'

        hour = time.getHours()
        minute = time.getMinutes()
        second = time.getSeconds()
        if(hour > 12){
            hour = hour - 12
            status = 'PM'
        }
    }

    function flashSecond(Deg) {
        var  fixDeg= `rotate(${Deg+90}deg)`
        for(let i = 0; i<60; i++){
            if(fixDeg === $units[i].style.transform){
                    $units[i].style.borderLeftColor = 'red'
            }
            else{
                    $units[i].style.borderLeftColor = 'white'
            }
        }
    }

    function checkTime(time) {
        if(time < 10){
            time = '0' + time
        }else {
            time = time.toString()
        }
        return time
    }

    function displayTime() {
        var fixSecond = checkTime(second)
        var fixMinute = checkTime(minute)
        var fixHour = checkTime(hour)

        var $display = $('.time-display')
        $display.text(`${fixHour}:${fixMinute}:${fixSecond}`)

        var $status = $('<span></span>')
        $status.text(status)
        $status.appendTo($display)
    }

    setTime()
    setInterval(function(){
        step()
    },1000)
})
$(function () {
    var $clockUnit = $('<div></div>')
    $clockUnit.addClass('clockUnit')
    $clockUnit.insertBefore('.clock')

    for (let i = 0; i <= 59; i++) {
        let $unit = $('<div></div>')
        $unit.addClass('unit')
        $unit.appendTo($clockUnit)
    }

    var width =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    var $units = $('.unit')
    resizeUnits()

    window.onresize = function () {
        resizeUnits()
    }

    function resizeUnits() {
        width =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (width > 415) {
            $clockUnit.css({
                position: 'absolute',
                width: '400px',
                height: '400px',
                top: '0px'
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
        } else {
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
    }

    for (let i = 0; i <= 59; i++) {
        let deg = i * 6 + 90
        $units[i].style.transform = 'rotate(' + deg + 'deg)'
    }

    var second, minute, hour, time, status

    function setTime() {
        getDate()
        var secondDeg = second / 60 * 360
        var minuteDeg = minute / 60 * 360 + secondDeg / 360 * 6
        var hourDeg = hour / 12 * 360 + minuteDeg / 60 * 6

        var secDeg = secondDeg - 90
        var minDeg = minuteDeg - 90
        var houDeg = hourDeg - 90

        $('.secondHand')[0].style.transform = 'rotate(' + secDeg +'deg)'
        $('.minuteHand')[0].style.transform = 'rotate(' + minDeg +'deg)'
        $('.hourHand')[0].style.transform = 'rotate(' + houDeg +'deg)'

        if (secondDeg === 0) {
            $('.secondHand').css('transition', 'all 0s')
        } else {
            $('.secondHand').css('transition', 'all .5s')
        }

        flashSecond(secondDeg)
        displayTime()
    }

    function getDate() {
        time = new Date()
        status = 'AM'

        hour = time.getHours()
        minute = time.getMinutes()
        second = time.getSeconds()
        if (hour > 12) {
            hour = hour - 12
            status = 'PM'
        }
    }

    function flashSecond(Deg) {
        let deg = Deg + 90
        var fixDeg = 'rotate(' + deg + 'deg)'
        for (let i = 0; i < 60; i++) {
            if (fixDeg === $units[i].style.transform) {
                $units[i].style.borderLeftColor = 'red'
            }
            else {
                $units[i].style.borderLeftColor = 'white'
            }
        }
    }

    function checkTime(time) {
        if (time < 10) {
            time = '0' + time
        } else {
            time = time.toString()
        }
        return time
    }

    function displayTime() {
        var fixSecond = checkTime(second)
        var fixMinute = checkTime(minute)
        var fixHour = checkTime(hour)

        var $display = $('.time-display')
        $display.text(fixHour + ':' + fixMinute + ':' + fixSecond)

        var $status = $('<span></span>').addClass('status')
        $status.text(status)
        $status.appendTo($display)
    }

    setTime()
    setInterval(function () {
        setTime()
    }, 1000)
})
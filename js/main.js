$(function () {
    var $clockUnit = $('<div></div>')
    $clockUnit.addClass('clockUnit')
    $clockUnit.insertBefore('.clock')

    for(let i=0; i<=59; i++){
        let $unit = $('<div></div>')
        $unit.addClass('unit')
        $unit.appendTo($clockUnit)
    }

    $clockUnit.css({
        position: 'absolute',
        width: '400px',
        height: '400px'
    })

    var $units = $('.unit')
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

    for(let i = 0; i<=59; i++){
        $units[i].style.transform = `rotate(${i*6-90}deg`
    }


    function step(){
        var time = new Date()

        var hour = time.getHours()
        var minute = time.getMinutes()
        var second = time.getSeconds()

        if(hour > 12){
            hour = hour - 12
        }

        var secondDeg = second/60*360
        var minuteDeg = minute/60*360 + secondDeg/360*6
        var hourDeg = hour/12*360 + minuteDeg/60*6

        var secondHand = document.querySelector('.secondHand');

        document.querySelector('.secondHand').style.transform = `rotate(${-90+secondDeg}deg)`
        document.querySelector('.minuteHand').style.transform= `rotate(${-90+minuteDeg}deg)`
        document.querySelector('.hourHand').style.transform= `rotate(${-90+hourDeg}deg)`


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

    setInterval(function(){
        step()
    },1000)
})
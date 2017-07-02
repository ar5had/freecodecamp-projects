
var data = {
    labels: [
        "Red",
        "Blue",
        "Yellow"
    ],
    datasets: [
    {
        data: [300, 100, 100],
        backgroundColor: backgroundColors,
        hoverBorderColor: [
            "#eee","#eee","#eee"														
        ]
    }]
};

var ctx = document.getElementById("myChart").getContext("2d");

var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: { 
        animation: {
        animateRotate: false,
        animateScale: false
        }, 
        elements: {
            arc: {
                borderColor: "#fff"
            }
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                boxWidth: 25,
                fontStyle: "Normal",
                fontColor: "#999",
                fontSize: 13,
                fontFamily: "Source Sans Pro",
                fullWidth: true
            } 
        },
        tooltips: {
            bodyFontColor: "#999",
            bodyFontFamily: "Source Sans Pro",
            fontStyle: 'Normal',
            cornerRadius: 2,
            backgroundColor: "#fefefe",
            xPadding: 7,
            yPadding: 7,
        }
    }
});

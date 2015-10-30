var margin = {t:50,r:125,b:50,l:125};
var width = document.getElementById('plot').clientWidth - margin.r - margin.l,
height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var canvas = d3.select('.plot')
    .append('svg')
    .attr('width',width+margin.r+margin.l)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','canvas')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Scale for the size of the circles
var scaleR = d3.scale.sqrt().domain([5,100]).range([5,120]);


d3.csv('data/olympic_medal_count.csv', parse, dataLoaded);

function dataLoaded(err,rows) {

    /*var year = 1900;
     rows.sort(function(a,b){
     //Note: this is called a "comparator" function
     //which makes sure that the array is sorted from highest to lowest
     return b[year] - a[year];
     });

     //Note: this returns "top5" as a subset of the larger array "rows", containing positions 0,1,2,3,4
     var top5 = rows.slice(0,5);

     //Call the draw function
     draw(top5, year)*/

    //TODO: fill out this function
    d3.selectAll('.btn-group .year').on('click', function () {

        var year = d3.select(this).attr('id');
        //console.log(year+'  0')
        if (year == 'year-1900') {
            var year = 1900;
            rows.sort(function (a, b) {
                return b[year] - a[year]
            });
            var top5 = rows.slice(0, 5);
            draw(top5, year)
            console.log(top5+'  1');

        } else if (year == 'year-2012') {

            var year = 2012;
            rows.sort(function (a, b) {
                return b[year] - a[year]
            });
            var top5 = rows.slice(0, 5);
            draw(top5, year)
        } else if (year == 'year-1960') {
            var year = 1960;
            rows.sort(function (a, b) {
                return b[year] - a[year]
            });
            var top5 = rows.slice(0, 5);
            draw(top5, year);

        }
        console.log(top5);
        console.log("Show top 5 medal count for: " + year);

    });
}

function draw(rows, year){
    //TODO: Complete drawing function, accounting for enter, exit, update

    var nodes = canvas.selectAll('.country')
     .data(rows, function(d){
          return d.country;
     });

    var nodesEnter = nodes.enter()
        .append('g')
        .attr('class','country')
        .attr('transform',function(d,i){
            return 'translate(' + i*(width/3) + ',' + 0 + ')';
        })
        .style('opacity',0)
        .attr('text-anchor','middle');
    nodesEnter
        .append('circle')
        .attr('r',function(d){scaleR[d.year]})
        .style('fill','rgba(80,80,80,0.1)')
        .style('stroke','rgb(50,50,50)')
        .style('stroke-width','2px')
        .attr('text-anchor','middle');


    nodesEnter
        //.append('g')
        .append('text')
        .text(function(d){
            return d.country;
        })
        .attr('text-anchor','middle');

    var nodesExit = nodes.exit()
        .transition()
        .duration(200)
        .attr('transform',function(d,i){
            return 'translate(' + i*(width/3) + ',' + height/2 + ')';
        })
        .style('opacity',0)
        .remove();

     //update
    var nodesupdate = nodes.transition().duration(1000)
        .attr('transform',function(d,i){
            return 'translate(' + i*(width/3) + ',' + height/2 + ')';
        })
        .style('opacity',1);

    nodesupdate
        .select('circle')
        .attr('r',function(d){
            return scaleR(d[year])

        })

    nodesupdate
        . select('text')
        .text(function(d){
            return d.country;
        });


//
//   nodes
//      // .transition()
//      //.duration(1000)
//       .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');
//
//
////

    //Note that this function requires two parameters
    //The second parameter, "year", determines which one of the three years (1900,1960,2012) to draw the medal counts based on
}


function parse(row) {
    //@param row is each unparsed row from the dataset
    return {
        country: row['Country'],
        1900: +row['1900'],
        1960: +row['1960'],
        2012: +row['2012']
    }
}
var popularityChart = dc.pieChart("#test");
//d3.csv("morley.csv", function(error, experiments) {
d3.json("data.json", function(error, data) {
    console.log(error);
    console.log(data);
// normalize/parse data
    data.forEach(function (x) {
//var experiments = d3.csv.parse(d3.select('pre#data').text());
//  experiments.forEach(function(x) {
        x.artist = x.artist;
        x.liked = x.liked;
        x.count = +x.count;
        x.popularity = Math.floor(+x.popularity / 10) * 10;
    });

    var ndx = crossfilter(data);

    var artistDimension = ndx.dimension(function (d) {return d.artist;});

    var popularityDimension = ndx.dimension(function(d) {return d.popularity;});

    var likedDimension = ndx.dimension(function (d) {
            return d.liked = "yes" ? 'Liked' : 'Disliked'
        });

    var likedGroup = likedDimension.group();
    var countPerArtist = artistDimension.group().reduceCount();

    var countPerPopularity = popularityDimension.group().reduceCount();

    var allDim = ndx.dimension(function(d) {return d;});

    var all = ndx.groupAll();
    popularityChart
      .width(800)
      .height(800)
      .dimension(artistDimension)
      .group(countPerArtist)
      .innerRadius(100);

    //chart
    //    .width(480)
    //    .height(480)
    //    ////.x(d3.scale.linear().domain([6, 20]))
    //    //.x(d3.scale.ordinal().domain(["", "Liked", "Disliked", "c"]))
    //    //.brushOn(false)
    //    //.yAxisLabel("This is the Y Axis!")
    //    .dimension(artistDimension)
    //    .group(countPerArtist)
    //    .innerRadius(60);
    //
    //    //.on('renderlet', function (chart) {
    //    //    chart.selectAll('rect').on("click", function (d) {
    //    //        console.log("click!", d);
    //    //    });
    //    //});
    dc.renderAll();
});
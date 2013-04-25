var Dusk = function(target) {

  this.target = target
  this.delay  = 10000    // allow 10 seconds of collection lag
  this.step   = 10000    // 10 seconds per value
  this.width  = 940      // 940 grid

  this.colors = [ '#08519c', '#*82bd', '#6baed6', '#fee6ce', '#fdae6b', '#e6550d' ]

  this.context = cubism.context().serverDelay(this.delay).step(this.step).size(this.width)
  this.graphite = this.context.graphite(window.location.origin)
  this.horizon = this.context.horizon().height(10).colors(this.colors)
  
  this.generateAxis = function() {
    var myContext = this.context
    d3.select('div.wrapper').selectAll('.axis')
      .data(['top', 'bottom'])
      .enter().append('div').attr('class', 'fluid-row')
      .attr('class', function(d) { return d + ' axis' })
      .each(function(d) {
        d3.select(this).call(myContext.axis().ticks(12).orient(d))
      })
  }

  this.generateRule = function() {
    d3.select('div.wrapper').append('div')
      .attr('class', 'rule')
      .call(this.context.rule())
  }
  
  this.generateHorizons = function() {
    var myGraphite = this.graphite
    var myHorizon = this.horizon
    var myContext = this.context
    myGraphite.find(this.target, function(error, results) {
      console.log(error)
      var metrics = []
      for (var i=0; i<results.length; i++) {
        var metric = myGraphite.metric(results[i])
        metric.alias(results[i].replace(/_rs_github_com/, '').split('.')[1])
        metrics.push(metric)
      }
      d3.select('div.wrapper').selectAll('.horizon')
        .data(metrics)
        .enter().insert('div', '.bottom')
        .attr('class', 'horizon').call(myHorizon)
      $('div.horizon').hover(function() {
        $(this).addClass('hover')
        $(this).find('canvas').addClass('hover')
      }, function() {
        $(this).removeClass('hover')
        $(this).find('canvas').removeClass('hover')
      })
    })
  }

  this.favorite = function(cb) {
    $.ajax({
      accepts: {json: 'application/json'},
      cache: false,
      dataType: 'json',
      error: function(xhr, textStatus, errorThrown) { console.log(errorThrown) },
      type: 'POST',
      url: window.location.href.replace(/metrics/, 'favorites')
    }).done(function(d) {
      console.log('favorite successful')
      console.log(d)
      cb(d)
    })
  }
}


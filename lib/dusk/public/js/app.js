var dashboard = new Dusk(myTarget)

dashboard.setFavoriteStatus()
dashboard.generateAxis()
dashboard.generateRule()
dashboard.generateHorizons()

// bind the favorite() action to an inactive star
$('span.star').on('click', 'a.inactive', function() {
  $('.star a').addClass('active')
  $('.star a').removeClass('inactive')
  dashboard.favorite(function() {
    dashboard.setFavoriteStatus()
  })
})

// bind the unfavorite() action to an active star
$('span.star').on('click', 'a.active', function() {
  $('.star a').addClass('inactive')
  $('.star a').removeClass('active')
  dashboard.unfavorite(function() {
    dashboard.setFavoriteStatus()
  })
})

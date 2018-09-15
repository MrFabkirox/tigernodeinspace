suite('"about" Page Tests', function(){
  test('page should contain link to the about page', function(){
    assert($('a[href="/about"]').length)
  })
})
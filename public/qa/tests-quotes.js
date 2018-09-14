suite("\"quotes\" Page Tests", function(){
  test("page should contain link to the quotes page", function(){
    assert($("a[href=\"/quotes\"]").length)
  })
})

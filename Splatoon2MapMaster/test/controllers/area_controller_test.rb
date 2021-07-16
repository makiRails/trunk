require "test_helper"

class AreaControllerTest < ActionDispatch::IntegrationTest
  test "should get display" do
    get area_display_url
    assert_response :success
  end
end

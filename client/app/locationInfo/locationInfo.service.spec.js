'use strict';

describe('Service: locationInfo', function () {

  // load the service's module
  beforeEach(module('nightOwlApp'));

  // instantiate service
  var locationInfo;
  beforeEach(inject(function (_locationInfo_) {
    locationInfo = _locationInfo_;
  }));

  it('should do something', function () {
    expect(!!locationInfo).toBe(true);
  });

});

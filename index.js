var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

exports.handler = function(event, context, callback) {   
  var requestSettings = {
    method: 'GET',
    url: process.env.FEED_URL,
    encoding: null
  };
  request(requestSettings, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
      feed.entity.forEach(function(entity) {
        if (entity.trip_update) {
            console.log('trip_id', entity.trip_update.trip.trip_id);
            console.log('route_id', entity.trip_update.trip.route_id);
            console.log('start_time', entity.trip_update.trip.start_time);
            console.log('start_date', entity.trip_update.trip.start_date);
            console.log('vehicle', entity.trip_update.vehicle);
            if (entity.trip_update.stop_time_update.length > 0) {
                console.log('Stop time updates: ');
                entity.trip_update.stop_time_update.forEach(function(update) {
                  console.log('stop_sequence', update.stop_sequence);
                  console.log('stop_id', update.stop_id);
                  console.log('arrival', update.arrival);
                  console.log('departure', update.departure);
                  console.log('schedule_relationship', update.schedule_relationship);
                });
            }
        }
      });
    }
  });

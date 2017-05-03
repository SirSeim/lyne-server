(($) => {
  const updateLiveCount = () => {
    const end = moment();
    const start = moment(end).subtract(5, 'minutes');
    const url = `/api/locations/1/count?start=${start.utc().toISOString()}&end=${end.utc().toISOString()}&slice=5`;
    $.ajax({
      dataType: 'json',
      url,
    }).then((data) => {
      $('#live-count').text(data.result[0].count);
    }, (error) => {
      console.log(error);
    });
  };

  const updateInterval = 1000 * 30;
  let updateTimer$ = 0;
  const updateTimer = () => {
    updateLiveCount();
    updateTimer$ = setTimeout(updateTimer, updateInterval);
  };
  updateTimer();

  $('#live-count-toggle').click(() => {
    if (updateTimer$) {
      console.log('Stopping Live Count');
      clearTimeout(updateTimer$);
      updateTimer$ = 0;
    } else {
      console.log('Coninuing Live Count');
      updateTimer();
    }
  });
})($);
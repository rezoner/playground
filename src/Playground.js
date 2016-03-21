PLAYGROUND = {};

PLAYGROUND.MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function playground(args) {

  return new PLAYGROUND.Application(args);

};
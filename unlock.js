$(document).ready(function () {
  unlockTorrentButton();
});
function unlockTorrentButton() {
  var pane = $('.overlay-pane');
  if (pane.find('.external-btn2').length === 1) {
    var torrentButton = pane.find('.external-btn2')[0];
    if (torrentButton.getAttribute('onclick') == "copyrightedEpisode()") {
      torrentButton.toggleAttribute('onclick');
      var dataEpisode = $('.isawthat-btn ')[0].getAttribute("data-episode");
      torrentButton.setAttribute('onclick',
          'PlayEpisode("' + dataEpisode + '")');
    }
  }
}
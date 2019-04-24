$(document).ready(function () {
  unlockTorrentButtonOnConcretizedEpisodePage();
  unlockTorrentButtonsForFullSeasonDownloadOnSeasonsPage();
  unlockTorrentButtonsForSingleEpisodesOnSeasonsPage();
});
function unlockTorrentButtonOnConcretizedEpisodePage() {
  var pane = $('.overlay-pane');
  if (pane.find('.external-btn2').length === 1) {
    var torrentButton = pane.find('.external-btn2')[0];
    var dataEpisode = $('.isawthat-btn ')[0].getAttribute("data-episode");
    setCorrectEventForTorrentButton(torrentButton, dataEpisode);
  }
}
function unlockTorrentButtonsForSingleEpisodesOnSeasonsPage() {
  var seasonsTablesArray = $('.movie-parts-list');
  var blockedButton = 'external-btn2';
  var haveSeenButton = 'haveseen-btn';
  var notAvailableEpisodeRow = 'not-available';
  var columnWithDataEpisodeForCorrectEvent = 'alpha';
  var columnWithTorrentButton = 'zeta';
  for (var i = 0; i < seasonsTablesArray.length; i++) {
    var seasonTable = seasonsTablesArray[i];
    for (var j = 0; j < seasonTable.rows.length; j++) {
      var seasonTableRow = seasonTable.rows[j];
      if (seasonTableRow.className === notAvailableEpisodeRow) {
        continue;
      }
      var dataEpisode = null;
      var torrentButton = null;
      for (var k = 0; k < seasonTableRow.children.length; k++) {
        var rowColumn = seasonTableRow.children[k];
        if (rowColumn.className === columnWithDataEpisodeForCorrectEvent) {
          for (var l = 0; l < rowColumn.children.length; l++) {
            var divWithDataEpisodeNumber = rowColumn.children[l];
            if (divWithDataEpisodeNumber.className === haveSeenButton) {
              dataEpisode = getDataEpisode(divWithDataEpisodeNumber);
              break;
            }
          }
        }
        if (rowColumn.className === columnWithTorrentButton) {
          for (var m = 0; m < rowColumn.children.length; m++) {
            if (rowColumn.children[m].className === blockedButton) {
              torrentButton = rowColumn.children[m];
              break;
            }
          }
        }
      }
      if (!isNullOrNotUndefined(torrentButton) && !isNullOrNotUndefined(
              dataEpisode)) {
        setCorrectEventForTorrentButton(torrentButton, dataEpisode);
      } else {
        console.log("torrentButton or dataEpisode is null or undefined")
      }
    }
  }
}
function unlockTorrentButtonsForFullSeasonDownloadOnSeasonsPage() {
  var fullSeasonBlocksArray = $('.movie-details-block');
  var fullSeasonDownloadNotAvailable = 'external-btn inactive';
  var fullSeasonDownloadAvailableButBlocked = 'external-btn2';
  var haveSeenButton = 'haveseen-btn';
  for (var i = 0; i < fullSeasonBlocksArray.length; i++) {
    var fullSeasonBlock = fullSeasonBlocksArray[i];
    var dataEpisode = null;
    var torrentButton = null;
    for (var j = 0; j < fullSeasonBlock.children.length; j++) {
      var tempClassName = fullSeasonBlock.children[j].className;
      if (tempClassName === fullSeasonDownloadNotAvailable) {
        break;
      }
      switch (tempClassName) {
        case fullSeasonDownloadAvailableButBlocked:
          torrentButton = fullSeasonBlock.children[j];
          break;
        case haveSeenButton:
          dataEpisode = getDataEpisode(fullSeasonBlock.children[j]);
          break;
      }
    }
    if (!isNullOrNotUndefined(torrentButton) && !isNullOrNotUndefined(
            dataEpisode)) {
      setCorrectEventForTorrentButton(torrentButton, dataEpisode);
    }
  }
}
function setCorrectEventForTorrentButton(torrentButton, dataEpisode) {
  var onClickAttribute = 'onclick';
  var blockedDownloadEvent = 'copyrightedEpisode()';
  if (torrentButton.getAttribute(onClickAttribute) === blockedDownloadEvent) {
    torrentButton.setAttribute(onClickAttribute,
        'PlayEpisode("' + dataEpisode + '")');
    torrentButton.setAttribute('class', 'external-btn');
  }
}
function isNullOrNotUndefined(element) {
  return element === null || element === undefined;
}
function getDataEpisode(element) {
  return element.getAttribute('data-episode');
}
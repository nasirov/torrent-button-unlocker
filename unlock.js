/**
 * Created by nasirov.yv
 */
$(document).ready(function () {
  console.log("TorrentButtonUnlocker");
  unlockTorrentButtonOnConcretizedEpisodePage();
  unlockFullSeasonDownloadTorrentButtonsOnSeasonsPage();
  unlockSingleEpisodesTorrentButtonsOnSeasonsPage();
});

function unlockTorrentButtonOnConcretizedEpisodePage() {
  var blockedTorrentButtons = $('.overlay-pane .external-btn2');
  if (blockedTorrentButtons.length === 1) {
    var blockedTorrentButton = blockedTorrentButtons[0];
    var isawthatBtnArray = $('.isawthat-btn');
    var dataEpisode = null;
    if (isawthatBtnArray.length === 1) {
      dataEpisode = getDataEpisode(isawthatBtnArray[0]);
    }
    unlockTorrentButton(blockedTorrentButton, dataEpisode);
  }
}

function unlockFullSeasonDownloadTorrentButtonsOnSeasonsPage() {
  var fullSeasonBlocksArray = $(
      "div.movie-details-block:has('div.external-btn2')");
  var buttonsWithDataEpisodes = fullSeasonBlocksArray.find('div.haveseen-btn');
  var blockedTorrentButtons = fullSeasonBlocksArray.find('div.external-btn2');
  handleTorrentButtons(buttonsWithDataEpisodes, blockedTorrentButtons);
}

function unlockSingleEpisodesTorrentButtonsOnSeasonsPage() {
  var buttonsWithDataEpisodes = $(
      "table.movie-parts-list tr:not('.not-available') .haveseen-btn");
  var blockedTorrentButtons = $(
      "table.movie-parts-list tr:not('.not-available') .external-btn2");
  handleTorrentButtons(buttonsWithDataEpisodes, blockedTorrentButtons);
}

function handleTorrentButtons(buttonsWithDataEpisodes, blockedTorrentButtons) {
  if (buttonsWithDataEpisodes.length === blockedTorrentButtons.length) {
    for (var i = 0; i < buttonsWithDataEpisodes.length; i++) {
      var dataEpisode = getDataEpisode(buttonsWithDataEpisodes[i]);
      var blockedTorrentButton = blockedTorrentButtons[i];
      unlockTorrentButton(blockedTorrentButton, dataEpisode);
    }
  }
}

function unlockTorrentButton(torrentButton, dataEpisode) {
  if (!isNullOrUndefined(torrentButton) && !isNullOrUndefined(
      dataEpisode)) {
    var onClickAttribute = 'onclick';
    var blockedDownloadEvent = 'copyrightedEpisode()';
    if (torrentButton.getAttribute(onClickAttribute) === blockedDownloadEvent) {
      torrentButton.setAttribute(onClickAttribute,
          'PlayEpisode("' + dataEpisode + '")');
      torrentButton.setAttribute('class', 'external-btn');
    }
  }
}

function isNullOrUndefined(element) {
  return element === null || element === undefined;
}

function getDataEpisode(element) {
  return element.getAttribute('data-episode');
}
const youtubeIFrameAPI = (() => {

    let makePlayer = (playerId, videoId) =>
        new YT.Player(playerId, {
            height: '390',
            width: '640',
            videoId: videoId,
        });

    return { makePlayer };

})();

function Video(id) {
    this.id = id;
}

function Player(id, video) {

    this.id = id;
    this.video = video;

    this.initialize = function() {
        this.player = youtubeIFrameAPI.makePlayer(this.id, this.video.id);
    }

    this.play = function() {
        if (this.player.getPlayerState() == YT.PlayerState.PAUSED || this.player.getPlayerState() == YT.PlayerState.CUED) {
            this.player.playVideo();
        }
    }

    this.pause = function() {
        if (this.player.getPlayerState() == YT.PlayerState.PLAYING) {
            this.player.pauseVideo();
        }
    }

}

const musicVideo = new Video('MkNeIUgNPQ8');
const movieVideo = new Video('_WWEOCQGxSw');
const showVideo = new Video('mt8rFlBOkTw');

const musicPlayer = new Player('musica', musicVideo);
const moviePlayer = new Player('pelicula', movieVideo);
const showPlayer = new Player('serie', showVideo);
const players = [musicPlayer, moviePlayer, showPlayer];

function onYouTubeIframeAPIReady() {
    players.forEach(player => player.initialize());
}

const buttons = document.getElementsByTagName('button');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (event) {
        let player = players[i];
        if (!event.target.classList.contains('collapsed')) { player.pause(); }
        if (event.target.classList.contains('collapsed')) { player.play(); }
    });
}

const collapsibles = document.getElementsByClassName('collapse');

for (let i = 0; i < collapsibles.length; i++) {
    $(collapsibles[i]).on('hidden.bs.collapse', function () {
        players[i].pause();
    })
}

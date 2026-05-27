AFRAME.registerComponent('sync-video-hls', {
    init: function () {
        const video = document.querySelector('#video-textura');
        // Caminho para o seu arquivo de índice gerado pelo FFmpeg
        const videoSrc = '/videos/stream.m3u8';

        // 1. SE FOR ANDROID / PC (Usa a biblioteca hls.js)
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                this.sincronizeVideo(video);
            });
        }
        // 2. SE FOR IOS / SAFARI (Suporte nativo da Apple)
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', () => {
                this.sincronizeVideo(video);
            });
        }
    },

    sincronizeVideo: function (video) {
        const videoDurationInSeconds = video.duration;

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Converte hora atual em segundos
        const currentTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
        console.log("Tempo atual: " + hours + " horas " + minutes + " minutos " + seconds + " segundos")
        console.log("Quantidade de segundos do tempo atual: " + currentTimeInSeconds);

        const minDayTime = 28800; // Quando a exposição abre: 8h00
        const maxDayTime = 86340; // Quando a exposição fecha (na abertura): 23h59

        // Duração do dia em segundos: 86400
        const currentTimeRemappedInSeconds = mapRange(currentTimeInSeconds, 0, 86400, minDayTime, maxDayTime, true);

        const videoStartTimeInSeconds = (currentTimeRemappedInSeconds) % videoDurationInSeconds;
        console.log("Segundo de início do vídeo: " + videoStartTimeInSeconds);

        video.currentTime = videoStartTimeInSeconds;

        video.play().catch(err => {
            console.log("Interação do usuário necessária para tocar o vídeo:", err);
        });
    }

});
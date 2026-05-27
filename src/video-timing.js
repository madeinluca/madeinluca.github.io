AFRAME.registerComponent('video-sync-time', {
            init: function () {
                
                const video = document.querySelector('#seg01');

                
                if (video.readyState >= 1) {
                    this.sincronizar(video);
                } else {
                    video.addEventListener('loadedmetadata', () => {
                        this.sincronizar(video);
                    });
                }
                    
            },

            sincronizar: function (video) {
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



function mapRange (value, inputMin, inputMax, outputMin, outputMax, clamp) {
  // Reference:
  // https://github.com/mattdesl/canvas-sketch-util/blob/master/math.js de Matt DesLauriers
  if (Math.abs(inputMin - inputMax) < Number.EPSILON) {
    return outputMin;
  } else {
    var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
    if (clamp) {
      if (outputMax < outputMin) {
        if (outVal < outputMax) outVal = outputMax;
        else if (outVal > outputMin) outVal = outputMin;
      } else {
        if (outVal > outputMax) outVal = outputMax;
        else if (outVal < outputMin) outVal = outputMin;
      }
    }
    return outVal;
  }
}

async function autorizarEIniciar() {
    const gate = document.getElementById('camera-gate');
    const game = document.getElementById('game-container');

    const constraints = { 
            video: {
                facingMode: "environment" // Garante a câmera frontal em celulares
            },
            audio: false
    };

    try {
        // Tenta acessar a câmera
        const stream = await navigator.mediaDevices.getUserMedia(constraints);


        // 1. Faz a overlay sumir suavemente
        gate.style.opacity = '0';
        gate.style.display = 'none';
        
        // 2. Remove do DOM após a animação para não ser mais acessível
        setTimeout(() => {
            gate.remove();
            //game.style.display = 'block'; // Mostra o jogo
        }, 500);

        console.log("Acesso à câmera concedido!");

    } catch (err) {
        handleError(err);
    }

    function handleError(error) {
        if (error.name === 'NotAllowedError') {
            alert("Permissão negada. Por favor, Por favor, recarregue a página e permita o acesso.");
        } else if (error.name === 'NotFoundError') {
            alert("Nenhuma câmera encontrada no seu dispositivo.");
        } else {
            alert("Erro ao acessar a câmera: " + error.message);
        }
    }
}
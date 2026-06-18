window.addEventListener('DOMContentLoaded', (event) => {
    const textureList = [
        'images/1.jpg',
        'images/2.jpg',
        'images/3.jpg',
        'images/4.jpg',
        'images/5.jpg'
        ];

    let textureIndex = textureList.length;

    const button = document.getElementById('change-texture-btn');
    const apple  = document.getElementById('apple');
    
    apple.addEventListener("loaded", () => {
        changeTexture(textureList[textureList.length - 1]);
    });
    
    button.addEventListener('click', () => {
        textureIndex = (textureIndex + 1) % textureList.length;
        let newTexturePath = textureList[textureIndex];
        changeTexture(newTexturePath);
    });
});

function changeTexture(newTexturePath) {
    
    const textureLoader = new THREE.TextureLoader();
    
    textureLoader.load(newTexturePath, function(loadedTexture) {

            loadedTexture.flipY = true;

            const appleMesh = apple.getObject3D('mesh');

            if (appleMesh) {
                appleMesh.traverse(function(node) {
                    if (node.isMesh && node.material) {

                        node.material.map = loadedTexture;

                        node.material.needsUpdate = true;
                    }
                });
                console.log(`Textura alterada para: ${newTexturePath}`);
            } else {
                console.warn("O modelo 3D ainda não foi totalmente carregado na cena.");
            }
        });
}


function init() {
    // Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 15);
    camera.lookAt(new THREE.Vector3(0, 2.5, 0));

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Bright directional light
    directionalLight.position.set(5, 10, 5); // Position the light to illuminate the cone
    scene.add(directionalLight);

    // Load textures for base and cone
    const textureLoader = new THREE.TextureLoader();
    const baseTexture = textureLoader.load('texture2.jpg'); // Path to base texture
    const coneTexture = textureLoader.load('texture.jpg'); // Path to cone texture

    // White square base for the cone
    const baseGeometry = new THREE.BoxGeometry(3.8, 0.23, 4); // Create a square base (width, height, depth)
    const baseMaterial = new THREE.MeshPhongMaterial({ map: baseTexture, shininess: 20 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.7; // Position at the bottom
    scene.add(base);

    // Safety Cone (the triangular point with texture)
    const coneGeometry = new THREE.ConeGeometry(1.5, 4, 64); // Cone for the triangular part
    const coneMaterial = new THREE.MeshPhongMaterial({ map: coneTexture, shininess: 20 });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.y = 3; // Position it above the base
    scene.add(cone);

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        cone.rotation.y += 0.001; // Rotate the cone for visual effect
        base.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animate();
}

window.addEventListener('load', init);

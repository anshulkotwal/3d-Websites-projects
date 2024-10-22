import "./style.css";
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { gsap } from 'gsap'; 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});

const loader = new RGBELoader();
loader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/kloppenheim_02_1k.hdr', 
  (texture) => {
    texture.mapping = THREE.EquirectangularRefractionMapping;
    scene.environment = texture;
});
renderer.setSize(window.innerWidth, window.innerHeight);

const radius = 1.26;
const segments = 64;
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffffff];
const textures = ["./csilla/color.png", './earth/map.jpg', './venus/map.jpg', './volcanic/color.png'];

const starTexture = new THREE.TextureLoader().load("./stars.jpg");
starTexture.colorSpace = THREE.SRGBColorSpace;
const starGeometry = new THREE.SphereGeometry(50, 64, 64);
const starMaterial = new THREE.MeshStandardMaterial({
  map: starTexture,
  side: THREE.BackSide,
});

const starSphere = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starSphere);

const spheres = new THREE.Group();
const orbitRadius = 4.5;

for(let i = 0; i < 4; i++){
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(textures[i]);
  texture.colorSpace = THREE.SRGBColorSpace;
  
  const geometry = new THREE.SphereGeometry(radius, segments, segments);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);

  const angle = (i / 4) * (Math.PI * 2);
  sphere.position.x = orbitRadius * Math.cos(angle);
  sphere.position.z = orbitRadius * Math.sin(angle);

  spheres.add(sphere);
}

spheres.rotation.x = 0.1;
spheres.position.y = -0.8;
scene.add(spheres);

camera.position.z = 9;

let lastWheelEventTime = 0;
const throttleDelay = 2000; 
let scrollCount = 0;

function throttledWheelHandler(event) {
  const currentTime = Date.now();
  if (currentTime - lastWheelEventTime >= throttleDelay) {
    lastWheelEventTime = currentTime;

    const headings = document.querySelectorAll(".heading"); 
    gsap.to(headings, {
      duration: 1,
      y: `-=${100}%`,
      ease: "power2.inOut",
    });
    
    gsap.to(spheres.rotation, {
      duration: 1,
      y: `-=${Math.PI / 2}`,
      ease: "power2.inOut",
    });

    scrollCount++;
    if (scrollCount >= 4) {
      scrollCount = 0; // Reset scrollCount after 4 scrolls
      gsap.to(headings, {
        duration: 1,
        y: `0`,
        ease: "power2.inOut",
      });
    }
  }
}

window.addEventListener("wheel", throttledWheelHandler);

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  spheres.children.forEach(sphere => {
    sphere.rotation.y = clock.getElapsedTime() * 0.2;
  });
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

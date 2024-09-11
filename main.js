import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
//import { GUI } from 'dat.gui';

import slonceTextura from '/img/sun.jpg';
import gwiazdyTextura from '/img/stars.avif';
import merkuryTextura from '/img/merkury.webp';
import wenusTextura from '/img/wenus.webp';
import ziemiaTextura from '/img/ziemia.jpg';
import marsTextura from '/img/mars.webp';
import jowiszTextura from '/img/jowisz.jpg';
import saturnTextura from '/img/saturn.jpg';
import uranTextura from '/img/uran.jpg';
import neptunTextura from '/img/neptun.jpg';
import plutonTextura from '/img/pluton.jpg';
import saturnRingTextura from '/img/saturn_ring.png';
import uranRingTextura from '/img/uran_ring.png';



const renderer = new THREE. WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//const gui = new GUI();

const textureLoader = new THREE.TextureLoader();


//dodanie tekstu do ekranu
var infoDiv = document.getElementById('info');

//ustawienie sceny, kamery i rotacji kamery
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();



//ustawianie tła
const CubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = CubeTextureLoader.load([
    gwiazdyTextura,
    gwiazdyTextura,
    gwiazdyTextura,
    gwiazdyTextura,
    gwiazdyTextura,
    gwiazdyTextura
]);


//swiatlo ogólne
const ambient = new THREE.AmbientLight(0x333333, 5);
scene.add(ambient);
ambient.castShadow = true;

//swiatlo punktowe
const pointLight = new THREE.PointLight(0xFFFFFF, 8000);
scene.add(pointLight);
pointLight.castShadow = true;


//tworzenie slonca
const sunGeometry = new THREE.SphereGeometry(16, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(slonceTextura)
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

//funkcja tworzaca planety
function createPlanet(size, texture, position){
    const geometry = new THREE.SphereGeometry(size, 30, 30);
    const material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);
    planet.position.x = position;
    planet.receiveShadow = true;
    planet.castShadow = true;
    return planet;
}

//funkcja tworzaca orbite
function createOrbit(promien){
    const OrbitGeo = new THREE.RingGeometry(promien - 0.3, promien, 300);
    const OrbitMat = new THREE.MeshBasicMaterial({
        color: 0x8F9699,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });
    const orbit = new THREE.Mesh(OrbitGeo, OrbitMat);
    scene.add(orbit);
    orbit.rotation.x = Math.PI / 2;
    return orbit;
}

//tworzenie planet
const merkury = createPlanet(3.2, merkuryTextura, 28);
const wenus = createPlanet(5.8, wenusTextura, 44);
const ziemia = createPlanet(5, ziemiaTextura, 62);
const mars = createPlanet(4, marsTextura, 78);
const jowisz = createPlanet(12, jowiszTextura, 100);
const saturn = createPlanet(10, saturnTextura, 138);
const uran = createPlanet(7, uranTextura, 176);
const neptun = createPlanet(7, neptunTextura, 200);
const pluton = createPlanet(2.8, plutonTextura, 216);

//tworzenie orbit
const Me_orbita = createOrbit(28);
const W_orbita = createOrbit(44);
const Z_orbita = createOrbit(62);
const Ma_orbita = createOrbit(78);
const J_orbita = createOrbit(100);
const S_orbita = createOrbit(138);
const U_orbita = createOrbit(176);
const N_orbita = createOrbit(200);
const P_orbita = createOrbit(216);

//pierscien saturna
const saturnRingGeo = new THREE.RingGeometry(10, 20, 32);
const saturnRingMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(saturnRingTextura),
    side: THREE.DoubleSide
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
scene.add(saturnRing);
saturnRing.position.x = 138;
saturnRing.rotation.x = -0.5 * Math.PI;

//pierscien uranu
const uranRingGeo = new THREE.RingGeometry(10, 14, 32);
const uranRingMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(uranRingTextura),
    side: THREE.DoubleSide
});
const uranRing = new THREE.Mesh(uranRingGeo, uranRingMat);
scene.add(uranRing);
uranRing.position.x = 176;
uranRing.rotation.x = -0.5 * Math.PI;


//animacja obracania planet

function animate(){

    sun.rotateY(0.004);
    merkury.rotateY(0.004);
    merkury.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.04);
    wenus.rotateY(0.002);
    wenus.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.015);
    ziemia.rotateY(0.02);
    ziemia.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.01);
    mars.rotateY(0.018);
    mars.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.008);
    jowisz.rotateY(0.04);
    jowisz.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.002);
    saturn.rotateY(0.038);
    saturn.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0009);
    uran.rotateY(0.03);
    uran.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0004);
    neptun.rotateY(0.032);
    neptun.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0001);
    pluton.rotateY(0.008);
    pluton.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.00007);

    saturnRing.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0009);
    uranRing.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0004);

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

var isAnimating = false;
function startAnimation(){
    if (!isAnimating){
        isAnimating = true;
        animate();
    }
}
/*
function stopAnimation(){
    isAnimating = false;
}

const animationUtils = {
    startAnimation: startAnimation,
    stopAnimation: stopAnimation
};

gui.add(animationUtils, 'startAnimation').name('Start animacji');
gui.add(animationUtils, 'stopAnimation').name('Zatrzymaj animację');
*/
startAnimation();



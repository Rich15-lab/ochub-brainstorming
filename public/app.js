const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 
window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('3d-container').appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

const socket = io();

const input = document.getElementById('messageInput');
const button = document.getElementById('sendButton');
const messages = document.getElementById('messages');

button.addEventListener('click', () => {
  const msg = input.value;
  socket.emit('chat message', msg);
  input.value = '';
});

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});


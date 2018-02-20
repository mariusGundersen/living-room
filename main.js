function Viewport(data) {
  const self = this;

  const element = data.element;
  const sensivity = data.sensivity;
  const speed = data.speed;

  let mouseX = 0;
  let mouseY = 0;
  let posX = 90;
  let posY = 177;
  let posZ = 300;
  let rotationX = 0;
  let rotationY = 180;

  let keys = [];

  document.addEventListener('mousedown', function() {
    if(document.pointerLockElement !== element){
      element.requestPointerLock();
    }else{
      document.exitPointerLock();
    }
  });

  document.addEventListener('mousemove', function(e) {
    mouseX = e.movementX;
    mouseY = e.movementY;
  });

  document.addEventListener('keydown', function(e) {
    keys[e.which] = true;
  });

  document.addEventListener('keyup', function(e) {
    keys[e.which] = false;
  });

  requestAnimationFrame(animate);

  function animate(){
    requestAnimationFrame(animate);

    const walk = keys[38] || keys[188] ? 1 : keys[40] || keys[79] ? -1 : 0;
    const strafe = keys[37] || keys[65] ? 1 : keys[39] || keys[69] ? -1 : 0;

    const radians = rotationX/180*Math.PI;

    posX += Math.cos(radians)*strafe + Math.sin(radians)*walk*speed;
    posZ += Math.sin(radians)*strafe - Math.cos(radians)*walk*speed;

    posX = minmax(10, posX, 490);
    posZ = minmax(10, posZ, 430);

    if(document.pointerLockElement) {
      const torqueX = mouseX * sensivity;
      const torqueY = mouseY * sensivity;
      mouseX = mouseY = 0;

      rotationY -= torqueY;

      if(rotationY > 225) {
        rotationY = 225;
      } else if(rotationY < 135) {
        rotationY = 135;
      }

      rotationX -= torqueX;

      while(rotationX > 360) {
        rotationX -= 360;
      }

      while(rotationX < 0) {
        rotationX += 360;
      }
    }

    element.style['transform'] = ' translateZ(800px) rotateX(' + rotationY + 'deg) rotateY(' + rotationX + 'deg)';
    element.firstElementChild.style['transform'] = `translate3d(${posX-50}px, ${-posY-50}px, ${posZ}px)`;
  }
}

const viewport = new Viewport({
  element: document.getElementsByClassName('world')[0],
  sensivity: .1,
  speed: 2
});

function minmax(min, v, max){
  return Math.max(min, Math.min(v, max));
}
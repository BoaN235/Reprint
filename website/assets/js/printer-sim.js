(function(){
  // Stats-only simulator: no printer movement
  function clamp(v, min, max){ return Math.min(max, Math.max(min, v)); }
  function round2(v){ return Math.round(v * 100) / 100; }

  var dom = {
    extruderState: document.getElementById('extruderState'),
    extruderTemp: document.getElementById('extruderTemp'),
    extruderTarget: document.getElementById('extruderTarget'),
    bedState: document.getElementById('bedState'),
    bedTemp: document.getElementById('bedTemp'),
    bedTarget: document.getElementById('bedTarget'),
    posX: document.getElementById('posX'),
    posY: document.getElementById('posY'),
    posZ: document.getElementById('posZ'),
    speed: document.getElementById('speed'),
    flow: document.getElementById('flow'),
    filament: document.getElementById('filament'),
    layer: document.getElementById('layer')
  };
  var hasStats = Object.values(dom).every(function(n){ return !!n; });
  if(!hasStats){ return; }

  var bedSize = { x: 235, y: 235, z: 250 };
  var printing = true;
  var extruder = { target: 195, temp: 140, power: 0 };
  var bed = { target: 55, temp: 24, power: 0 };
  var motion = { x: 20, y: 20, z: 0, speed: 0, flow: 0, filament: 0, layerIdx: 0, layerMax: 150 };

  function rndInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
  function resetLayers(){
    motion.layerMax = rndInt(90, 280);  // different total layers each time
    motion.layerIdx = 0;
    motion.z = 0;
    motion.filament = 0;                // new print, reset usage
    printing = true;                    // start printing again
  }

  function stepTemps(){
    var eErr = extruder.target - extruder.temp;
    extruder.power = clamp(Math.abs(eErr) * 1.6 + (printing ? 20 : 0) + (Math.random()*6 - 3), 0, 100);
    extruder.temp = clamp(extruder.temp + eErr * 0.08 + (Math.random()*2 - 1), 20, 260);

    var bErr = bed.target - bed.temp;
    bed.power = clamp(Math.abs(bErr) * 1.2 + (Math.random()*4 - 2), 0, 100);
    bed.temp = clamp(bed.temp + bErr * 0.05 + (Math.random()*1.2 - 0.6), 20, 110);
  }

  function stepMotion(){
    var targetSpeed = printing ? 40 + Math.sin(Date.now()/2000)*20 + (Math.random()*15 - 7.5) : 0;
    motion.speed = clamp(motion.speed + (targetSpeed - motion.speed)*0.25 + (Math.random()*4 - 2), 0, 150);

    if(printing && motion.speed > 2){
      motion.x = clamp(motion.x + (Math.random()*4 - 2), 0, bedSize.x);
      motion.y = clamp(motion.y + (Math.random()*4 - 2), 0, bedSize.y);
      var zStep = 0.02 + (motion.speed/150)*0.03;
      motion.z = clamp(motion.z + zStep, 0, bedSize.z);
      motion.layerIdx = clamp(Math.floor((motion.z / bedSize.z) * motion.layerMax), 0, motion.layerMax);

      // If we reached or exceeded total layers, start a new job with a new layer count
      if (motion.layerIdx >= motion.layerMax) {
        resetLayers();
      }

      var extruding = Math.random() > 0.15;
      motion.flow = extruding ? round2(motion.speed * 0.06 + (Math.random()*0.1)) : 0;
      motion.filament = round2(motion.filament + (extruding ? motion.flow * 0.5 : 0));
    } else {
      motion.flow = 0;
    }

    if(Math.random() < 0.002){ printing = !printing; }
  }

  function render(){
    dom.extruderState.textContent = Math.round(extruder.power) + '%';
    dom.extruderTemp.textContent = round2(extruder.temp);
    dom.extruderTarget.textContent = extruder.target;

    dom.bedState.textContent = Math.round(bed.power) + '%';
    dom.bedTemp.textContent = round2(bed.temp);
    dom.bedTarget.textContent = bed.target;

    dom.posX.textContent = round2(motion.x);
    dom.posY.textContent = round2(motion.y);
    dom.posZ.textContent = round2(motion.z);

    dom.speed.textContent = round2(motion.speed);
    dom.flow.textContent = round2(motion.flow);
    dom.filament.textContent = round2(motion.filament);
    dom.layer.textContent = motion.layerIdx + ' of ' + motion.layerMax;
  }

  function tick(){
    stepTemps();
    stepMotion();
    render();
  }

  render();
  setInterval(tick, 250);
})();

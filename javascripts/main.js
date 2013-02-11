var Util = {
  each : function(array, block){
    var i = array.length; while (i--) {
      block(array[i]);
    }
  },
  volume : function(radius){
    return 4/3 * Math.PI * Math.pow(radius, 3);
  },
  rand : function(n){
    return Math.random() * n;
  }
}

var Sketch = function(P) {
  var canvas = P.externals.canvas,
      framerate = 30;
      width = canvas.offsetWidth,
      height = canvas.offsetHeight;

  var Oscillator = function() {
    var freq = 1.2,
        stepSize = P.TWO_PI / (framerate / freq),
        radius = 50,
        posX = width / 2,
        posY = height / 2;

    var cyclePos = 0;

    var waveVerts = [],
        maxWaveVerts = radius;

    this.draw = function() {
      P.noFill();

      P.stroke(255);
      P.fill(255);

      P.text("Frequency :  " + freq, posX, posY - (radius * 2 - 20));

      P.noFill();

      cyclePos = (cyclePos + stepSize) % P.TWO_PI;

      var y = posY + Math.sin(cyclePos) * radius;
      var x = posX + Math.cos(cyclePos) * radius;

      P.stroke(255, 75);
      P.ellipse(posX, posY, radius * 2, radius * 2);

      // waveform container
      var wy = posY + radius * 2;
      P.rect(posX, wy, radius * 2, radius);

      P.stroke(0, 150, 255);

      P.fill(0, 150, 255);

      // angle indicator
      P.ellipse(x, y, 5, 5);

      P.noFill();

      // sin
      P.line(posX, posY, posX, y);

      // cos
      P.line(posX, posY, x, posY);

      P.stroke(0, 150, 255);

      waveVerts.push(wy + Math.sin(cyclePos) * (radius / 2.7));

      if (waveVerts.length > maxWaveVerts) {
        waveVerts.shift();
      }
      P.beginShape();
      var wx = posX;
      Util.each(waveVerts, function(vert) {
        P.vertex(wx, vert);
        wx -= 1;
      });
      P.endShape();

      // voltage indicator
      var vy = waveVerts[waveVerts.length - 1];
      P.line(posX + 10, vy, posX + radius - 5, vy);
    }
  };

  var osc;

  P.setup = function() {
    P.smooth();
    P.frameRate(framerate);
    P.size(width, height);

    P.textAlign(P.CENTER);
    P.rectMode(P.CENTER);

    osc = new Oscillator();
  }

  P.draw = function() {
    P.background(0);

    osc.draw();

  }
};



function loadUniverse() {
  new Processing('canvas', Sketch);
}



window.onload = loadUniverse;









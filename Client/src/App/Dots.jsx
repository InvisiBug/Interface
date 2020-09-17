// Components
import React from "react";

class Dots extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    var canvas = this.canvasRef.current;
    var ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var stars = []; // Array that contains the stars
    var total = (canvas.width * canvas.height) / 20000; // Number of stars
    var speed = 10; // Speed of start

    var starColour = "white";
    var lineColour = "white";
    var lineLength = 100;
    var lineWidth = 0.05;

    // Create array of stars
    for (var i = 0; i < total; i++) {
      stars.push({
        x: Math.random() * canvas.width, // Positions
        y: Math.random() * canvas.height,

        radius: Math.random() * 1 + 1, // Star sizes

        vx: Math.floor(Math.random() * speed) - speed / 2, // Star velocities
        vy: Math.floor(Math.random() * speed) - speed / 2
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "lighter";

      // Draw stars
      for (var i = 0; i < total; i++) {
        ctx.beginPath();
        ctx.arc(stars[i].x, stars[i].y, stars[i].radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = starColour;
        ctx.stroke();
      }

      ctx.beginPath();
      for (var a = 0; a < total; a++) {
        ctx.moveTo(stars[a].x, stars[a].y); // Move to a star

        for (var j = 0; j < total; j++) {
          if (distance(stars[a], stars[j]) < lineLength) {
            ctx.lineTo(stars[j].x, stars[j].y);
          }
        }
      }

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColour;
      ctx.stroke();
    }

    function distance(point1, point2) {
      var xs = point2.x - point1.x;
      var ys = point2.y - point1.y;

      xs = xs * xs;
      ys = ys * ys;

      return Math.sqrt(xs + ys);
    }

    function update() {
      for (var i = 0; i < total; i++) {
        stars[i].x += stars[i].vx / 100;
        stars[i].y += stars[i].vy / 100;

        if (stars[i].x < 0 || stars[i].x > canvas.width)
          stars[i].vx = -stars[i].vx;
        if (stars[i].y < 0 || stars[i].y > canvas.height)
          stars[i].vy = -stars[i].vy;
      }
    }

    function tick() {
      draw();
      update();
      requestAnimationFrame(tick);
    }

    tick();
  }

  render() {
    return <canvas ref={this.canvasRef} className="dotsCanvas" />;
  }
}

export default Dots;

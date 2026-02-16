// // space particles background

// const canvas = document.getElementById("space");
// const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// window.addEventListener("resize",()=>{
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });

// let particles = [];

// class Particle{
//   constructor(){
//     this.x = Math.random()*canvas.width;
//     this.y = Math.random()*canvas.height;
//     this.size = Math.random()*2;
//     this.speedX = (Math.random()-.5)*0.3;
//     this.speedY = (Math.random()-.5)*0.3;
//     this.opacity = Math.random();
//   }

//   update(){
//     this.x += this.speedX;
//     this.y += this.speedY;

//     if(this.x<0 || this.x>canvas.width) this.speedX *= -1;
//     if(this.y<0 || this.y>canvas.height) this.speedY *= -1;
//   }

//   draw(){
//     ctx.fillStyle = `rgba(180, 80, 255, ${this.opacity})`;
//     ctx.beginPath();
//     ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
//     ctx.fill();
//   }
// }

// function init(){
//   particles=[];
//   for(let i=0;i<140;i++){
//     particles.push(new Particle());
//   }
// }

// function connect(){
//   for(let a=0;a<particles.length;a++){
//     for(let b=a;b<particles.length;b++){
//       let dx = particles[a].x - particles[b].x;
//       let dy = particles[a].y - particles[b].y;
//       let dist = dx*dx + dy*dy;

//       if(dist < 9000){
//         ctx.strokeStyle="rgba(160,60,255,0.08)";
//         ctx.lineWidth=1;
//         ctx.beginPath();
//         ctx.moveTo(particles[a].x,particles[a].y);
//         ctx.lineTo(particles[b].x,particles[b].y);
//         ctx.stroke();
//       }
//     }
//   }
// }

// function animate(){
//   ctx.clearRect(0,0,canvas.width,canvas.height);

//   particles.forEach(p=>{
//     p.update();
//     p.draw();
//   });

//   connect();
//   requestAnimationFrame(animate);
// }

// init();
// animate();

// // space particles background



document.getElementById("page2test").addEventListener("click", function () {
    window.location.href = "../test-page/index.html";
});


document.getElementById("page2pracice").addEventListener("click", function () {
    window.location.href = "../Levels_page/index.html";
});

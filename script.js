const canvas = document.getElementById('JogoCanvas')
const ctx = canvas.getContext('2d')


const teclasPressionadas = {
   KeyW: false,
   KeyS: false,
   KeyD: false,
   KeyA: false
};
document.addEventListener('keydown', (e) => {
   for (let tecla in teclasPressionadas) {
       if (teclasPressionadas.hasOwnProperty(e.code)) {
           teclasPressionadas[tecla] = false;
       }
   }
   if (teclasPressionadas.hasOwnProperty(e.code)) {
       teclasPressionadas[e.code] = true;
   }
});


class Entidade {
   constructor(x, y, largura, altura) {
       this.x = x
       this.y = y
       this.largura = largura
       this.altura = altura
   }
   desenhar (ctx,cor){
     ctx.fillStyle = cor
       ctx.fillRect(this.x, this.y, this.largura, this.altura)
   }
   
}


class Cobra extends Entidade {
   constructor(x, y, largura, altura) {
       super(x, y, largura, altura)
   }
   atualizar() {
       if (teclasPressionadas.KeyW) {
           this.y -= 7
       } else if (teclasPressionadas.KeyS) {
           this.y += 7
       } else if (teclasPressionadas.KeyA) {
           this.x -= 7
       } else if (teclasPressionadas.KeyD) {
           this.x += 7
       }
   }

   verificarColisao(comida){
       
       if(
           this.x < comida.x + comida.largura &&
           this.x + this.largura > comida.x &&
           this.y < comida.y + comida.altura &&
           this.y + this.altura > comida.y
       ){ 
           this.#houveColisao(comida)
           this.pontuacao()
          
           
       }
   }
   #houveColisao(comida){
       comida.x = Math.random()*canvas.width-10
       comida.y = Math.random()*canvas.height-10
   }
   verificarColidion(){
    if(cobra.x > canvas.width || cobra.y > canvas.height || cobra.y> canvas.width 
    || cobra.x < canvas.width -800 || cobra.y < canvas.height -400){
       this.houveColidion()
    }
   }
   houveColidion(){
    teclasPressionadas.KeyA = false
    teclasPressionadas.KeyW = false
    teclasPressionadas.KeyD = false
    teclasPressionadas.KeyS = false
    
    ctx.fillStyle = 'red'
    ctx.fillRect((canvas.width/2) -200,(canvas.height/2)-50, 400, 100)
    ctx.fillStyle='black'
    ctx.font = '50px Arial Bold'
    ctx.fillText('GAME OVER',(canvas.width/2) -150,(canvas.height/2) +0, 400, 100 )

   }

   
}
class Comida extends Entidade {
   constructor() {
       super(Math.random()*canvas.width-10,    Math.random()*canvas.height-10, 20, 20)
   }
}

function pontuacao(){
        ctx.fillStyle='black'
        ctx.font = '20px Arial Bold'
        ctx.fillText('Pontuação',(canvas.width/2) -400,(canvas.height/2) -150, 400, 100 )
        
    
}



const cobra = new Cobra(100, 200, 20, 20)
const comida = new Comida()


function loop() {
   ctx.clearRect(0, 0, canvas.width, canvas.height)
   cobra.desenhar(ctx,'black')
   cobra.atualizar()
   comida.desenhar(ctx, 'red')
   cobra.verificarColisao(comida)
   cobra.verificarColidion()
   pontuacao()
   requestAnimationFrame(loop)
}
loop()


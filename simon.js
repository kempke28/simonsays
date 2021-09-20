    //elements got by Id inside of the html page
    const celeste = document.getElementById('celeste')
    const violeta = document.getElementById('violeta')
    const naranja = document.getElementById('naranja')
    const verde = document.getElementById('verde')
    const btnEmpezar = document.getElementById('btnEmpezar')
    const ultimoNivel = 15                                          //Total of levels to achive



    swal('Lets do this')

      class Juego {
        //builds up specific parts of the game (prototype)
        //this refers to the constructor class
        constructor() {
          this.inicializar = this.inicializar.bind(this)
          this.inicializar()
          this.generarSecuencia()
          setTimeout(this.siguienteNivel, 1000)
          
        }

        //first element of constructor will have some properties inside
        inicializar() {
          //this refers to class juego or still the prototype
          this.siguienteNivel = this.siguienteNivel.bind(this)
          this.elegirColor = this.elegirColor.bind(this)            //down is a function called "elegirColor", bind force the "colors.this" to keep being part of "juego"
          this.toggleBtnEmpezar()
          this.nivel = 1
          this.colores = {
              celeste,
              violeta,
              naranja,
              verde
          }
        }

        toggleBtnEmpezar() {
            if (btnEmpezar.classList.contains('hide')) {
              btnEmpezar.classList.remove('hide')
            } else {
              btnEmpezar.classList.add('hide')
            }
          }

        //random secuence of numbers which represent the colors in the circle
        //fill function give a value in this case "0"
        //map function only works with defined elements inside of  an Array
        //math floor function rounds down the value number
        //math  random function will rearrange Array randomly with each click by multiplying between 0 and .9
        //the end multiply by 4 is the 4 pieces of the cake of the game.    
        generarSecuencia() {
            this.secuencia = new Array(ultimoNivel).fill(0).map(n => Math.floor(Math.random() *4))
        }

        //Wil return the player to the level that is playing in, without restarting from 0
        siguienteNivel() {
            this.subnivel = 0
            this.iluminarSecuencia()
            this.agregarEventosClick()
        }

        //function to change result number of the secuence to a color with switch function
        //function basically transforms what the browsers sees as colors to human colors.
        transformarNumeroAColor(numero) {
            switch (numero) {
                case 0:
                    return "celeste"
                case 1:
                    return "violeta"
                case 2:
                    return "naranja"
                case 3:
                    return "verde"
            }
        }

        //function will be executed when we click, we tell tell the browser to see our color as nunber that it can understand
        transformarColorANumero(color) {
            switch (color) {
                case 'celeste':
                    return 0
                case 'violeta':
                    return 1
                case 'naranja':
                    return 2
                case 'verde':
                    return 3
            }
        }



        //Secuence will be iluminated according to the level game, this made with a loop to add
        //1 number to the constructor level
        iluminarSecuencia() {
            for (let i = 0; i < this.nivel; i++) {
                const color = this.transformarNumeroAColor(this.secuencia[i])
                setTimeout(() => this.iluminarColor(color), 1000 * i)
            }
        }

        //this function inside 'iluminarSecuencia' replaces the color for certain amount of time
            iluminarColor(color) {
                this.colores[color].classList.add('light')
        //'this' refers to a new function created for "juego" inside of another "iluminarColor" function
        // using the 'color" variable from "iluminarSecuencia"
            setTimeout(() => this.apagarColor(color), 350)
            }
        
        //turns off the light color with remove JS function
            apagarColor(color) {
                this.colores[color].classList.remove('light')
            }



        //Adding some actions when clicking over the color with JS function "addEventlistener"
        agregarEventosClick() {
            this.colores.celeste.addEventListener('click', this.elegirColor)
            this.colores.violeta.addEventListener('click', this.elegirColor)
            this.colores.naranja.addEventListener('click', this.elegirColor)
            this.colores.verde.addEventListener('click', this.elegirColor)
        }

        //Deletes all events
        eliminarEventosClick() {
            this.colores.celeste.removeEventListener('click', this.elegirColor)
            this.colores.violeta.removeEventListener('click', this.elegirColor)
            this.colores.naranja.removeEventListener('click', this.elegirColor)
            this.colores.verde.removeEventListener('click', this.elegirColor)
        }

        //When choosing a color, there will be conditionals
        elegirColor(ev) {
            const nombreColor = ev.target.dataset.color                         //Depends on the color, browser redirects to the url
            const numeroColor = this.transformarColorANumero(nombreColor)       //takes the clicked color and makes a number so the function secuence undestands.
            this.iluminarColor(nombreColor)                                     
          if (numeroColor === this.secuencia[this.subnivel]) {                  //if the right color is clicked you get the level plus 1.
            this.subnivel++
            if (this.subnivel === this.nivel) {                                 //if the next next level is equal to the level you are in +1, you go to the next level
              this.nivel++
              if (this.nivel === (ultimoNivel + 1)) {                           //if the level is 1 more than the number of levels listed on "ultimo nivel" you win
                this.ganoElJuego()
              } else {                                                          //if not, you go to the next level and keep playing.
                setTimeout(this.siguienteNivel, 1500)
              }
            }
          } else {
            this.perdioElJuego()
          }
        }


        //alert of winning game on the ultimo nivel + 1
        ganoElJuego() {
            swal('Awesome', 'You won, you deserve a fucking cookie, hell yeah', 'success')
                .then(this.inicializar)
            }

        //alert of losing game if the condition of the level you are in is not equal to the level you are going and events are deleted.
        perdioElJuego() {
            swal(':(', 'Oh! I think you can do better, you chimp-face', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
        }
    }
    

      function empezarJuego() {
        juego = new Juego()
      }
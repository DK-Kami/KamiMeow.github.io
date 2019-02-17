class CardComments extends HTMLElement {
  
}
CardComments.createdCallback
customElements.define('card-comments', CardComments);



// class CoffeeMachine {
//   constructor(power) {
//     const WATER_HEAT_CAPACITY = 4200;
//     const self = this;
//     let timer;
//     function getBoilTime() {
//       return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
//     }
//     function onReady() {
//       console.log('coffee is gone');
//     }
//     ;
//     this.waterAmount = 0;
//     this.run = function () {
//       timer = setTimeout(onReady, getBoilTime());
//     };
//     this.stop = function () {
//       clearTimeout(timer);
//     };
//   }
// }

// const coffeeMachine = new CoffeeMachine(100000);
// coffeeMachine.waterAmount = 200;
// coffeeMachine.run();
// coffeeMachine.stop();


async function start() {
    console.log('Start !');
    await attendre(5000)
    console.log('5 seconde plus tard')
  }
  
function attendre(ms) {
   return new Promise ((resolve, reject) => {
       setTimeout (() => {
           resolve ()}, ms
       )

   })
  }
  
  
  start();
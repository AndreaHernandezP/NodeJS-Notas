const command = process.argv[2]     //Acceder a argumentos de la linea de comandos a partir del tercer item en el array [ruta al ejecutable Node.js, ruta al archivo JS ejecutado, command line argument]
if (command === 'add') {            //$node node.js add
//console.log('Adding note!')
} else if (command === 'remove') {  //$node node.js add
//console.log('Removing note!')       
}


//Yargs - Configura un conjunto de argumentos
const yargs = require('yargs')
yargs.version('1.1.0')              //Config versión
//fs Module - provides methods to read, write, watch files.
//Es un módulo nativo, por lo cual no se instala, sólo se importa:
const fs = require('fs');           //fs.readFile(), fs.readFileSync(), fs.writeFile(), fs.writeFileSync()


const CargarNotas = () => {
    /*fs.readFile('./Notas.json', 'utf8', (err,data) => {   //Asíncrono
        if (err) {
          console.log(`Error reading file: ${err}`)
        }else{
            console.log('Leyendo');
            //console.log(data);
            let NotasObj = JSON.parse(data)
            //console.log(NotasObj[0]);

            if(NotasObj.length>0){
                console.log('JSON con notas');
                //console.log(NotasObj);
                return NotasObj;
            } else{
                console.log('JSON vacío');
                return [];
            }
        }
    })*/
    let notaCargadaJSON = fs.readFileSync('./Notas.json', 'utf8');
    console.log('Nota Cargada JSON '+notaCargadaJSON);
    if(notaCargadaJSON.length==0){              //Si el JSON está vacío
        return [];
    }else{
        let NotasObj = JSON.parse(notaCargadaJSON);
        //console.log('Nota Cargada '+ NotasObj[0].title);
        if(NotasObj.length>0){
            console.log('JSON con notas');
            //console.log(NotasObj);
            return NotasObj;
        } else{
            console.log('JSON vacío');          //Si el JSON no tiene notas
            return [];
        }
    }
}

const AgregarNotas = (titulo,cuerpo) => {
    let notas = CargarNotas();
    console.log('Agregando notas');
    //console.log(notas);
    notas.push(
        {
            title: titulo,
            body: cuerpo
        }
    );
    let dataJSON = JSON.stringify(notas)
    fs.writeFile('./Notas.json', dataJSON, 'utf8', err => {
        if (err) {
          console.log(`Error writing file: ${err}`)
        } else {
          console.log(`File is written successfully!`)
        }
      })
}


const EliminarNotas = (titulo) => {
    let notas = CargarNotas();
    console.log('Eliminando notas');
    //console.log(notas);
    let indexEliminado = notas.find((value, index) => {             //array.find - returns the first element in the provided array that satisfies the provided testing function
        console.log("Visited index", index, "with note", value);
        if(notas[index].title === titulo){
            return index;
        }
      });
        notas.splice(indexEliminado, 1);
        console.log(notas);
      
    let dataJSON = JSON.stringify(notas)
    fs.writeFile('./Notas.json', dataJSON, 'utf8', err => {
        if (err) {
          console.log(`Error writing file: ${err}`)
        } else {
          console.log(`File is written successfully!`)
        }
      })
}

const ListaNotas = () => {
    let notas = CargarNotas();
    console.log('Desplegando Lista');
    notas.find((value, index) => {                                  
        console.log("Título: ", notas[index].title, " Contenido: ", notas[index].body);
      });
}

const ConsultarNotas = (titulo) => {
    let notas = CargarNotas();
    console.log('Consultando Nota');
    notas.find((value, index) => {                                 
        if(notas[index].title === titulo){
            console.log("Título: ", notas[index].title, " Contenido: ", notas[index].body);
        }
      });
}


//$ node node.js add --title="Buy" --body="Note body here"  
yargs.command({                     //Agregar soporte para un nuevo comando.
command: 'add',
describe: 'Agregando una Nota',
handler: function () {
console.log('Agregando una Nota!')
console.log('Title: ' + yargs.argv.title)
console.log('Body: ' + yargs.argv.body)
AgregarNotas(yargs.argv.title, yargs.argv.body)
}
})
//console.log(yargs.argv)

//$ node node.js remove --title="Buy"
yargs.command({                     
    command: 'remove',
    describe: 'Eliminando una Nota',
    handler: function () {
    console.log('Eliminando una Nota!')
    console.log('Title: ' + yargs.argv.title)
    EliminarNotas(yargs.argv.title)
    }
})

//$ node node.js lista
yargs.command({                     
    command: 'lista',
    describe: 'Observar lista',
    handler: function () {
    console.log('Desplegando Lista!')
    ListaNotas()
    }
})

//$ node node.js consultar --title="Buy"
yargs.command({                     
    command: 'consultar',
    describe: 'Consultar nota',
    handler: function () {
    console.log('Consultando Nota!')
    ConsultarNotas(yargs.argv.title)
    }
})

yargs.parse();                      //Si no se pone, no lee la función dentro del handler. Parsing means analyzing and converting a program into an internal format that a runtime environment can actually run

/*
    yargs.command({
        command: 'add',
        describe: 'Add a new note',
        builder: {                          //Propiedad para configurar opciones
            title: {
                describe: 'Note title',
                demandOption: true,                 //Opción necesaria cuando es true
                type: 'string'  
            },
            body: {
                describe: 'Note body',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            console.log('Handler del comando add')
            console.log('Title: ' + argv.title)
            console.log('Body: ' + argv.body)
            
        }
        })*/


        /*let nota = {
            title: yargs.argv.title,
            body: yargs.argv.body,
          }*/

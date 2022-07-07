const logger= require('../logger/logger');



const indexController = {};



indexController.renderIndex =(req, res)=> {
    res.render ('index')
};

indexController.renderAbout =(req, res)=> {
    res.render ('about')
};

const resultado1= `${process.platform}`
const resultado2= `${process.version}`
const resultado3= `${process.memoryUsage}`
const resultado4= `${process.execPath}`
const resultado5 = `${process.pid}`
const resultado6= `${process.cwd()}`



indexController.renderInfo =(req, res)=> {
    
    if (resultado1 && resultado2 && resultado3 && resultado4 && resultado5 && resultado6){
        logger.info('Información ingresada correcta')
        // console.log(info)
        res.render('info', {resultado1,resultado2, resultado3,resultado4,resultado5, resultado6})
    }else {
        logger.error ('Parametro incorrecto')
        res.end ('Paràmetro invàlido')
    }
 
     
}


module.exports = indexController
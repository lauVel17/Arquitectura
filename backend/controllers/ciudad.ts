import ciudad from "../models/ciudad";
import { Request, Response } from "express";
//Crear ciudad
export const createCity = async(req:Request, resp:Response)=>{
    const{body}=req;
  try{
    console.log("Datos recibidos ",body);
    const ciudadC =await ciudad.create({
        idciudad: body.idciudad,
        iddepartamento: body.iddepartamento,
        nombre: body.nombre,
    });
    resp.status(200).json({
        msg:"El usuario ha sido creado exitosamente,ciudad",ciudadC,
    });
    }catch(error){
        console.log("Error al crear la ciudad",error);
        resp.status(500).json({
            msg:"No se logró completar la creación de la ciudad",
        });
    }
    
};

//Consultar ciudad
export const  consulCity= async( req:Request, res: Response)=>{
        const {id} = req.params;
        const ciudadc= await ciudad.findByPk(id);
            if (!ciudadc){
                res.json(ciudadc); 
            }else{
                res.status(400).json({
                msg:"No se encontro la ciudad especificada",
                });     
      }
     };
      
//Actualizar ciudad
export const updateCity =async (req: Request,res: Response)=>{
const{id} =req.params;
const{body}=req;
try{
    const updatecity=await ciudad.findByPk(id);
    if(!updatecity){
      return
        res.status(404).json({
        msg:"No se encontro la ciudad ",
        });
    }
    console.log("Datos recibidos para proceder la actualización",body);
    await updatecity.update({
        
    });
    res.status(200).json({
        msg:"La ciudad se ha actualizado correctamente",updatecity,
    });
} catch(error){
    console.log(error);
    res.status(500).json({
        msg:"No se pudo completar la actualización de la ciudad, intente nuevamente más tarde.",
    });
}
};


//Eliminar ciudad
export const delateCity =async(req: Request, res: Response)=>{
const{id}=req.params;
const deletecit= await ciudad.findByPk(id);
if(!ciudad){
    return
res.status(404).json({
    msg:"No se encontro el usuario"
});
}
 await ciudad.destroy();
 res.status(200).json({
    msg:"La ciudad ha sido eliminada de forma correcta",ciudad,
 });
};
   
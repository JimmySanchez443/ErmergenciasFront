import React, { useState, useEffect } from "react";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';


const AddPersona = () => {

    let[cedula,setCedula]=useState("");
    let[nombres,setNombres]=useState("");
    let[apellidos,setApellidos]=useState("");
    let[tipo,setTipo]=useState("");
   
 
    const[data,setData] =useState([]);

    const [showDialog1, setShowDialog1] = useState(false);

   //seteo a vacio cuando guardo un usario

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/v1/persona');
      const json = await response.json();
      setData(json); 
      
    };
    fetchData();
  }, []);


    const handleBorrar=(event)=>{
        setCedula("");
        setNombres("");
        setApellidos("");
        setTipo("");
        }
        // evento cuando envio una solicitud post para guaradar un usuario
    function SendRequest(){
       
  
                    const requestBody={
                        cedula: cedula,
                        nombres: nombres,
                        apellidos: apellidos,
                        tipo:tipo
                    };
                    fetch("/api/v1/persona",{
                        headers:{
                            "Content-type":"application/json",
                        },
                        method: "post",
                        body: JSON.stringify(requestBody),
                    })
                      .then(response=>{
                        if(response.status == 200){
                            setShowDialog1(true);
                            handleBorrar();
                        }
                      })
                      .then(data => console.log(data));
               
            
    }


  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a través de una petición AJAX
    // o utilizarlos para actualizar el estado del componente padre
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="p-fluid">
        <h1>Ingrese una nueva Persona</h1>
        <div className={classNames('p-field')}>
          <label htmlFor="cedula">Cedula:</label>
          <InputText id="cedula" name="cedula" value={cedula} onChange={(event)=>setCedula(event.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="nombres">Nombres:</label>
          <InputText id="nombres" name="nombres" value={nombres} onChange={(event)=>setNombres(event.target.value)}/>
        </div>
        <div className="p-field">
          <label htmlFor="apellidos">Apellidos:</label>
          <InputText type="apellidos" name="apellidos" value={apellidos} onChange={(event)=>setApellidos(event.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="tipo">Tipo:</label>
          <InputText type="tipo"  name="tipo" value={tipo} onChange={(event)=>setTipo(event.target.value)} />
        </div>
       
        <div className="p-field">
          <Button label="Guardar" onClick={()=>SendRequest()}  />
        </div>
       
        <div>
        <Dialog
             visible={showDialog1}
             onHide={() => setShowDialog1(false)}
                header="Persona Creada"
>
                 <p>Persona creada correctamenete.</p>
        </Dialog>
        </div>
      
       
      </div>
    </form>
  );
};

export default AddPersona;
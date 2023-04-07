import React, { useState, useEffect } from "react";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';



const AddEmergencia = () => {
    
    let [fecha, setFecha] = useState("");
    let [codigo, setCodigo] = useState("");
    let [titulo, setTitulo] = useState("");
    let [descripcion, setDescripcion] = useState("");
    let [latitud, setlatitud] = useState("");
    let [longitud, setlongitud] = useState("");
    let [temperatura, setTemperatura] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState([]);
    const [showDialog1, setShowDialog1] = useState(false);

    
    function ObtenerL(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setlatitud(position.coords.latitude);
                setlongitud(position.coords.longitude);
                console.log(latitud);
            },
            (error) => {
                console.log(error);
            }
        );
        }

        function ObtenerDatos(){
        const apiKey = 'bf1242fc7d2e816b9451a7382c1c754b';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTemperatura(data.main.temp);
            })
            .catch(error => console.error(error));
 
        }
   //seteo a vacio cuando guardo un usario

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/v1/emergencia');
      const json = await response.json();
      setData(json); 
      
    };
    fetchData();
  }, []);


    const handleBorrar=(event)=>{
        setFecha("");
        setCodigo("");
        setTitulo("");
        setlatitud("");
        setlongitud("");
        setDescripcion("");
        setTemperatura("");
        }
        // evento cuando envio una solicitud post para guaradar un usuario
    function SendRequest(){
       
  
                    const requestBody={
                        fecha: fecha,
                        codigo: codigo,
                        tituloEmergencia: titulo,
                        descripcion:descripcion,
                        latitud:latitud,
                        longitud:longitud,
                        temperatura:temperatura
                    };
                    fetch("/api/v1/emergencia",{
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
        <div className="p-field">
          <label htmlFor="fecha">Fecha:</label>
          <Calendar value={fecha} onChange={(e) => setFecha(e.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="codigo">Codigo de la Emergencia:</label>
          <InputText id="nombres" name="nombres" value={codigo} onChange={(event)=>setCodigo(event.target.value)}/>
        </div>
        <div className="p-field">
          <label htmlFor="titulo">Titulo de la Emergencia:</label>
          <InputText id="titulo" name="titulo" value={titulo} onChange={(event)=>setTitulo(event.target.value)}/>
        </div>
        <div className="p-field">
          <label htmlFor="descripcion">Descripcion:</label>
          <InputText id="descripcion" name="descripcion" value={descripcion} onChange={(event)=>setDescripcion(event.target.value)}/>
        </div>
       
        <div className="p-field">
          <Button label="Obtener Latitud y Longitud" onClick={()=>ObtenerL()}  />
        </div>
        <div className="p-field">
          <label htmlFor="latitud">latitud:</label>
          <InputText id="latitud" name="latitud" value={latitud} onChange={(event)=>setlatitud(event.target.value)}/>
        </div>
        <div className="p-field">
          <label htmlFor="lonhitud">longitud:</label>
          <InputText id="longitud" name="longitud" value={longitud} onChange={(event)=>setlongitud(event.target.value)}/>
        </div>
        <div className="p-field">
          <Button label="Obtener Temperatura" onClick={()=>ObtenerDatos()}  />
        </div>
        <div className="p-field">
          <label htmlFor="temperatura">temperatura:</label>
          <InputText id="temperatura" name="temperatura" value={temperatura} onChange={(event)=>setTemperatura(event.target.value)}/>
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

export default AddEmergencia;
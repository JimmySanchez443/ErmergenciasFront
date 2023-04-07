
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Modal } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

function ListarEmergencias() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    let[idEmergencia,setIdEmergencia] = useState(false);
    let [fecha, setFecha] = useState("");
    let [codigo, setCodigo] = useState("");
    let [titulo, setTitulo] = useState("");
    let [descripcion, setDescripcion] = useState("");
    let [latitud, setlatitud] = useState("");
    let [longitud, setlongitud] = useState("");
    let [temperatura, setTemperatura] = useState("");
   
    useEffect(() => {
        fetch('/api/v1/emergencia')
         .then(response => response.json())
         .then(data => setData(data));
         console.log(data);
     }, []);

      
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
     function idLog(rowData) {
       if (window.confirm('¿Está seguro de eliminar esta Emergencia?')) {
         fetch('/api/v1/emergencia/'+rowData.idEmergencia, {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json'
           }
         })
           .then(() => {
             // Si la solicitud DELETE es exitosa, actualiza los datos de la tabla
             fetch('/api/v1/emergencia')
               .then(response => response.json())
               .then(data => setData(data));
               
           })
           .catch(error => {
             console.log(error);
           });
       }
     }
     
     function idLog1() {
       
        
            const requestBody={
                idEmergencia:idEmergencia, 
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
                    
                    setShowModal(false);
                }
              })
              .then(data => console.log(data));
        
      }
 
     
     const deleteButton = (rowData) => {
       return (
         <Button
           icon="pi pi-trash"
           onClick={()=>idLog(rowData)}
         />
       );
     };

     const updateButton = (rowData) => {
        setIdEmergencia(rowData.idEmergencia);
    

        return (
            
          <Button
            icon="pi pi-refresh"
            onClick={() => setShowModal(true)}
          />
        );
      };
 return (

   <div>
       <div>
           <h1>Tabla de Personas</h1>

       </div>

   <div>
   <div className="p-fluid">

   <DataTable value={data}>
 <Column field="fecha" header="fecha"></Column>
 <Column field="codigo" header="codigo"></Column>
 <Column field="tituloEmergencia" header="Titulo"></Column>


 <Column field={deleteButton} header="Eliminar"></Column>
 <Column field={updateButton} header="Actualziar"></Column>
</DataTable>
</div>
<div>
<Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese sus datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="p-field">
          <label htmlFor="id">id:</label>
          <InputText id="cedula" name="cedula" value={idEmergencia}  />
        </div>
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
        
       
        
       
          
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShowModal(false)}>Cerrar</button>
          <button onClick={()=>idLog1()}>Guardar</button>
        </Modal.Footer>
      </Modal>
</div>
   </div>
   </div>

 );
};

export default ListarEmergencias;
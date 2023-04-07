
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Modal } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';


function ListarPersonas() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    let[id,setId]=useState("");
    let[cedula,setCedula]=useState("");
    let[nombres,setNombres]=useState("");
    let[apellidos,setApellidos]=useState("");
    let[tipo,setTipo]=useState("");
   
    useEffect(() => {
        fetch('/api/v1/persona')
         .then(response => response.json())
         .then(data => setData(data));
         console.log(data);
     }, []);

     
     function idLog(rowData) {
       if (window.confirm('¿Está seguro de eliminar esta Persona?')) {
         fetch('/api/v1/persona/'+rowData.id, {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json'
           }
         })
           .then(() => {
             // Si la solicitud DELETE es exitosa, actualiza los datos de la tabla
             fetch('/api/v1/persona')
               .then(response => response.json())
               .then(data => setData(data));
               
           })
           .catch(error => {
             console.log(error);
           });
       }
     }
     const handleBorrar=(event)=>{
        setCedula("");
        setNombres("");
        setApellidos("");
        setTipo("");
        }
     function idLog1() {
       
        
            const requestBody={
                id:id,
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
                    handleBorrar();
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
        setId(rowData.id);
        console.log(id);
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
 <Column field="cedula" header="Cedula"></Column>
 <Column field="nombres" header="Nombres"></Column>
 <Column field="apellidos" header="Apellidos"></Column>
 <Column field="tipo" header="Tipo"></Column>
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
          <InputText id="cedula" name="cedula" value={id}  />
        </div>
        <div className="p-field">
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

export default ListarPersonas;
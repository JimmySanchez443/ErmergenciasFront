import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import ListarPersonas from '../Persona/ListarPersonas';
import AddPersona from '../Persona/AñadirPersonas';
import AddEmergencia from '../EmergenciaAdd/ErmergenciaAdd';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";         

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ListarEmergencias from '../Emergencia';


const Dashboard = () => {      
  
   
    const [activeItem, setActiveItem] = useState("home");
    
  
    
        
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => setActiveItem('home'),
            key:'Home'
          },
      {
        label: 'Persona',
        icon: 'pi pi-fw pi-user',
        items: [
            {
              label: 'Listar Personas',
              command: () => setActiveItem('inicio-1') ,
              
              key:'Textil',
          
            },
            {
              label: 'Agregar Personas',
              command: () => setActiveItem('inicio-2'),
              key:'Accesorios'
            },
        ]
      },
      {
        label: 'Emergencia',
        key:'Anexo',
        icon:  'pi pi-fw pi-home',
   
        items: [
            {
              label: 'Listar Emergencias',
              command: () => setActiveItem('inicio-3') ,
              
       
          
            },
            {
              label: 'Agregar Emergencias',
              command: () => setActiveItem('inicio-4'),
            
            },
        ]
      },

    ];
  
    
  
   
    return (
      <>
        
          
        <div>
        <Menubar model={items}   />
        {activeItem === 'home' && (
          <div>
            <h1>Bienvenido a la app de Emergencia</h1>
            <h1> </h1>
         
          </div>
        )}
      {activeItem === 'Persona' && (
          <div>
            <h1>Persona</h1>
            <h1> </h1>
         
          </div>
        )}
  
        {activeItem === 'inicio-1' && (
        
        <div>
          <h1>Listar Personas</h1>
    
          <ListarPersonas/>
   
        </div>
      )}
      {activeItem === 'inicio-2' && (
        <div>
          <h1>Agregar Personas</h1>
          <AddPersona/>
        </div>
      )}
      
        {activeItem === 'Emergencia' && (
          <div>
            <h1>Emergencia</h1>
            <p>Somos una empresa dedicada a crear aplicaciones web increíbles.</p>
          </div>
        )}
   
      </div>
      {activeItem === 'inicio-3' && (
        
        <div>
          <h1>Listar Emergencias</h1>
      
              <ListarEmergencias/>
   
        </div>
      )}
      {activeItem === 'inicio-4' && (
        <div>
          <h1>Agregar Emergencia</h1>
          <AddEmergencia/>
        </div>
      )}
  
      </>
      
      
    );
  };
  
  export default Dashboard;
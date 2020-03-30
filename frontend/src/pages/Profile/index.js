import React, {useState, useEffect} from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';


import logoImg from '../../assets/logo.svg';

export default function Logon(){
    
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();

    const nameONG = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', { headers: {Authorization: ongId }})
           .then(response => {
               setIncidents(response.data);
           })
    }, [ongId])


    async function handleDeleteIncidents(id){
        try {
            await api.delete(`incidents/${id}`, { headers: {Authorization: ongId }});
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert(`Erro ao deletar caso, tente novamente`)  
        }
    }


    function handleLogout (){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">

            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {nameONG}</span>

                <Link className="button" to="/incidents/new">Cadastar Novo Cadastro</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incidents => (
                <li key={incidents.id}>
                    <strong>CASO:</strong>
                    <p>{incidents.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incidents.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncidents(incidents.id)}>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}
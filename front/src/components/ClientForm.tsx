import React, { useState, useEffect, FormEvent } from "react";
import {
  getAllClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../services/api";

import IncludeClientForm from "./IncludeClientForm";
import EditClientForm from "./EditClientForm"; // Importa el componente EditClientForm

interface Client {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  ruc: string;
  ci: string;
}

const ClientForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [editingClientId, setEditingClientId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editClientData, setEditClientData] = useState<Client | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  // Función para cargar los datos del cliente en el formulario de edición
  const loadEditData = (client: Client) => {
    setEditClientData(client);
    setNombreCliente(client.nombre);
    setDireccionCliente(client.direccion);
    setTelefonoCliente(client.telefono);
    setEmailCliente(client.email);
    setRucCliente(client.ruc);
    setCiCliente(client.ci);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmitAddForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombreCliente || !direccionCliente) {
      setSuccessMessage("Los campos Nombre y Dirección son obligatorios.");
      return;
    }

    try {
      const newClient: Omit<Client, "id"> = {
        nombre: nombreCliente,
        direccion: direccionCliente,
        telefono: telefonoCliente,
        email: emailCliente,
        ruc: rucCliente,
        ci: ciCliente,
      };

      await createCliente(newClient);

      // Actualizar la lista de clientes y limpiar los campos del formulario
      fetchClients();
      resetForm();

      // Mostrar el mensaje de éxito
      setSuccessMessage("Cliente incluido correctamente.");
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
      setSuccessMessage("Ocurrió un error al agregar el cliente.");
    }

  };

  const fetchClients = async () => {
    try {
      const clients: Client[] = await getAllClientes();
      setFilteredClients(clients);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  const [nombreCliente, setNombreCliente] = useState<string>("");
  const [direccionCliente, setDireccionCliente] = useState<string>("");
  const [telefonoCliente, setTelefonoCliente] = useState<string>("");
  const [emailCliente, setEmailCliente] = useState<string>("");
  const [rucCliente, setRucCliente] = useState<string>("");
  const [ciCliente, setCiCliente] = useState<string>("");

  const resetForm = () => {
    setNombreCliente("");
    setDireccionCliente("");
    setTelefonoCliente("");
    setEmailCliente("");
    setRucCliente("");
    setCiCliente("");
  };

  // Función para mostrar el formulario de agregar cliente
  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleSearch = async () => {
    try {
      const clients: Client[] = await getAllClientes();

      if (!clients) {
        setFilteredClients([]);
        return;
      }

      const filtered: Client[] = clients.filter((client) => {
        const clientNameLowerCase: string = client.nombre
          ? client.nombre.toLowerCase()
          : "";
        const searchTermLowerCase: string = searchTerm.toLowerCase();
        return (
          clientNameLowerCase.includes(searchTermLowerCase) ||
          client.ruc.includes(searchTerm) ||
          client.ci.includes(searchTerm)
        );
      });

      setFilteredClients(filtered);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  const handleEditClient = (client: Client) => {
    setEditingClientId(client.id);
    setEditClientData(client); // Nueva función para establecer los datos del cliente a editar
  };

  const handleDeleteClient = async (id: number) => {
    try {
      await deleteCliente(id);
      fetchClients();
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      setSuccessMessage("Ocurrió un error al eliminar el cliente.");
    }
  };

  const handleCancelEdit = () => {
    setEditingClientId(null);
  };

  const handleSuccess = () => {
    setEditingClientId(null);
    fetchClients();
  };

  return (
    <div>
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}

      <form onSubmit={handleSubmitAddForm}>
        <div className="mb-3">
          <label>Buscar Cliente:</label>
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="RUC, CI o Nombre del Cliente"
          />
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
        {filteredClients.map((client) => (
          <div key={client.id} className="mb-3">
            <p>
              <strong>Nombre del Cliente:</strong> {client.nombre}
            </p>
            <p>
              <strong>Dirección del Cliente:</strong> {client.direccion}
            </p>
            <p>
              <strong>Teléfono del Cliente:</strong> {client.telefono}
            </p>
            <p>
              <strong>Correo Electrónico del Cliente:</strong> {client.email}
            </p>
            <p>
              <strong>RUC del Cliente:</strong> {client.ruc}
            </p>
            <p>
              <strong>CI del Cliente:</strong> {client.ci}
            </p>

            <button
              className="btn btn-primary"
              onClick={() => handleEditClient(client)}
            >
              Editar
            </button>

            <button
              className="btn btn-danger"
              onClick={() => handleDeleteClient(client.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
        {!showAddForm && (
           <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
            Agregar Cliente
          </button>
        )}
      </form>

      {showAddForm && <IncludeClientForm onCancel={() => setShowAddForm(false)} onSuccess={fetchClients} />}

      {editingClientId && (
        <EditClientForm
        clientId={editingClientId}
          onCancel={() => setEditingClientId(null)}
          onSuccess={() => {
            setEditingClientId(null);
            setEditClientData(null); // Limpiamos los datos del cliente cuando se guarda con éxito
            fetchClients();
          }}
          editClientData={editClientData}
          />
      )}
    </div>
  );
};

export default ClientForm;

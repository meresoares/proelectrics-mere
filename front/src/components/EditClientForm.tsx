import React, { useState, useEffect, FormEvent } from "react";
import { updateCliente } from "../services/api";

interface EditClientFormProps {
  clientId: number;
  onCancel: () => void;
  onSuccess: () => void;
  editClientData: Client | null;

}

interface Client {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  ruc: string;
  ci: string;
}


const EditClientForm: React.FC<EditClientFormProps> = ({
  clientId,
  onCancel,
  onSuccess,
  editClientData,
}) => {
  const [editNombreCliente, setEditNombreCliente] = useState<string>(editClientData?.nombre || "");
  const [editDireccionCliente, setEditDireccionCliente] = useState<string>(editClientData?.direccion || "");
  const [editTelefonoCliente, setEditTelefonoCliente] = useState<string>(editClientData?.telefono || "");
  const [editEmailCliente, setEditEmailCliente] = useState<string>(editClientData?.email || "");
  const [editRucCliente, setEditRucCliente] = useState<string>(editClientData?.ruc || "");
  const [editCiCliente, setEditCiCliente] = useState<string>(editClientData?.ci || "");
  const [errorMessage, setErrorMessage] = useState<string>("");

  //const { nombre, direccion, telefono, email, ruc, ci } = editClientData;

  const fetchClientData = async () => {
    // Lógica para obtener los datos del cliente a editar usando el clientId
    // Reemplaza la siguiente línea por tu lógica de obtención de datos
    const clientData: Client = {
      id: clientId,
      nombre: "Nombre del Cliente",
      direccion: "Dirección del Cliente",
      telefono: "Teléfono del Cliente",
      email: "Correo Electrónico del Cliente",
      ruc: "RUC del Cliente",
      ci: "CI del Cliente",
    };

    // Actualiza los estados con los datos del cliente
    setEditNombreCliente(clientData.nombre);
    setEditDireccionCliente(clientData.direccion);
    setEditTelefonoCliente(clientData.telefono);
    setEditEmailCliente(clientData.email);
    setEditRucCliente(clientData.ruc);
    setEditCiCliente(clientData.ci);
  };

  const editExistingClient = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editNombreCliente || !editDireccionCliente) {
      setErrorMessage("Los campos Nombre y Dirección son obligatorios.");
      return;
    }

    try {
      const clientToUpdate: Client = {
        id: clientId,
        nombre: editNombreCliente,
        direccion: editDireccionCliente,
        telefono: editTelefonoCliente,
        email: editEmailCliente,
        ruc: editRucCliente,
        ci: editCiCliente,
      };

      await updateCliente(clientId, clientToUpdate);

      // Limpiar el formulario y llamar a la función de éxito
      resetForm();
      onSuccess();
    } catch (error) {
      console.error("Error al editar el cliente:", error);
      setErrorMessage("Ocurrió un error al editar el cliente.");
    }
  };

  const resetForm = () => {
    setEditNombreCliente("");
    setEditDireccionCliente("");
    setEditTelefonoCliente("");
    setEditEmailCliente("");
    setEditRucCliente("");
    setEditCiCliente("");
    setErrorMessage("");
  };

  return (
    <form onSubmit={editExistingClient}>
      <div className="mb-3">
        <label>Nombre del Cliente:</label>
        <input
          type="text"
          className="transparent-input"
          value={editNombreCliente}
          onChange={(e) => setEditNombreCliente(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Dirección del Cliente:</label>
        <input
          type="text"
          className="transparent-input"
          value={editDireccionCliente}
          onChange={(e) => setEditDireccionCliente(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Teléfono del Cliente:</label>
        <input
          type="text"
          className="transparent-input"
          value={editTelefonoCliente}
          onChange={(e) => setEditTelefonoCliente(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Correo Electrónico del Cliente:</label>
        <input
          type="email"
          className="transparent-input"
          value={editEmailCliente}
          onChange={(e) => setEditEmailCliente(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>RUC del Cliente:</label>
        <input
          type="text"
          className="transparent-input"
          value={editRucCliente}
          onChange={(e) => setEditRucCliente(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>CI del Cliente:</label>
        <input
          type="text"
          className="transparent-input"
          value={editCiCliente}
          onChange={(e) => setEditCiCliente(e.target.value)}
        />
      </div>
      <div>
        <button className="btn btn-primary" type="submit">
          Guardar Cambios
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancelar Edición
        </button>
      </div>
    </form>
  );
};

export default EditClientForm;

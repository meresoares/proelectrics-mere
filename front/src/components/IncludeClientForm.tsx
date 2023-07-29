import React, { useState, FormEvent } from "react";
import { createCliente } from "../services/api";

interface IncludeClientFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

const IncludeClientForm: React.FC<IncludeClientFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [nombreCliente, setNombreCliente] = useState<string>("");
  const [direccionCliente, setDireccionCliente] = useState<string>("");
  const [telefonoCliente, setTelefonoCliente] = useState<string>("");
  const [emailCliente, setEmailCliente] = useState<string>("");
  const [rucCliente, setRucCliente] = useState<string>("");
  const [ciCliente, setCiCliente] = useState<string>("");

  const [successMessage, setSuccessMessage] = useState<string>("");

  const addNewClient = async () => {
    if (!nombreCliente || !direccionCliente) {
      setSuccessMessage("Los campos Nombre y Dirección son obligatorios.");
      return;
    }

    try {
      const newClient = {
        nombre: nombreCliente,
        direccion: direccionCliente,
        telefono: telefonoCliente,
        email: emailCliente,
        ruc: rucCliente,
        ci: ciCliente,
      };

      await createCliente(newClient);

      setSuccessMessage("Cliente incluido correctamente.");
      onSuccess(); // Call the callback to update the client list
    } catch (error) {
      console.error("Error al agregar el cliente:", error);
      setSuccessMessage("Ocurrió un error al agregar el cliente.");
    }
  };

  const handleSubmitAddForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewClient();
  };

  return (
    <form onSubmit={handleSubmitAddForm}>
      {successMessage && <p className="alert alert-success">{successMessage}</p>}
      <div className="mb-3">
        <label>Nombre del Cliente:</label>
        <input
          type="text"
          className="form-control"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Dirección del Cliente:</label>
        <input
          type="text"
          className="form-control"
          value={direccionCliente}
          onChange={(e) => setDireccionCliente(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Teléfono del Cliente:</label>
        <input
          type="text"
          className="form-control"
          value={telefonoCliente}
          onChange={(e) => setTelefonoCliente(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Correo Electrónico del Cliente:</label>
        <input
          type="email"
          className="form-control"
          value={emailCliente}
          onChange={(e) => setEmailCliente(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>RUC del Cliente:</label>
        <input
          type="text"
          className="form-control"
          value={rucCliente}
          onChange={(e) => setRucCliente(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>CI del Cliente:</label>
        <input
          type="text"
          className="form-control"
          value={ciCliente}
          onChange={(e) => setCiCliente(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Guardar Cliente
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default IncludeClientForm;

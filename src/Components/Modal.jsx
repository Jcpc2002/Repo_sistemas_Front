const Modal = ({ isOpen, onClose, onConfirm}) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl mb-4">¿Estás seguro?</h2>
          <p className="mb-4">¿Realmente deseas eliminar está categoría? Se perderan todos documentos enlazados a ella.</p>
          <div className="flex justify-end">
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">Cancelar</button>
            <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">Eliminar</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
export default function Input({ icon, type = "text", placeholder }) {
  return (
    <div className="flex items-center bg-white rounded-full shadow px-4 py-2 mb-4">
      <img src={icon} alt="ícone" className="w-5 h-5 mr-3" />
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent focus:outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
      />
    </div>
  );
}

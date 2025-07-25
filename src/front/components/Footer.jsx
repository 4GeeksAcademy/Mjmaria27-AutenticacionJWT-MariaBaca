export const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        &copy; {new Date().getFullYear()} MiApp. Todos los derechos reservados.
      </div>
    </footer>
  );
};

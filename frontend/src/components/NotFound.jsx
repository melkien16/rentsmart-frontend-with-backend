const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-black text-white">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-8">The page you are looking for does not exist.</p>
      <a href="/" className="text-emerald-400 underline">
        Go Home
      </a>
    </div>
  </div>
);

export default NotFound;
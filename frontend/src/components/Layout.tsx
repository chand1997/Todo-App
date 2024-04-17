export const Layout = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center font-mono">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Welcome to Your Todo App
        </h1>
        <p className="text-lg text-center mb-8">
          Organize your tasks and enhance your productivity!
        </p>
        <div className="flex justify-center items-center space-x-4">
          <a
            href="/signin"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </a>
          <span className="text-gray-500">or</span>
          <a
            href="/signup"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-800">
          Organiseer je favoriete recepten
        </h1>
        <div className="flex flex-col space-y-4">
          <Link
            className="text-lg text-blue-500 hover:text-blue-700"
            href="/recepten"
          >
            recepten
          </Link>
          <Link
            className="text-lg text-blue-500 hover:text-blue-700"
            href="/recept-toevoegen"
          >
            recept toevoegen
          </Link>
        </div>
      </div>
    </div>
  );
}

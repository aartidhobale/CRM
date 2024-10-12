import Menubar from './components/Menubar';

export default function Home() {
  return (
    <div>
      <Menubar />
      
      <main className="p-6">
        <h1 className="text-3xl font-bold">Welcome to WebShop</h1>
      </main>
    </div>
  );
}

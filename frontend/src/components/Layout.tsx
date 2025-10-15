import Header from './Header';
import Sidebar from './Sidebar';

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

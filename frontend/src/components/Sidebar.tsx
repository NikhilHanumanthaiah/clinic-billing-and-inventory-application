import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: <HomeIcon /> },
  { name: 'Medicines', href: '/medicines', icon: <PillIcon /> },
  { name: 'Add Medicine', href: '/add-medicine', icon: <PlusCircleIcon /> },
  { name: 'Bills', href: '/bills', icon: <DocumentTextIcon /> },
  { name: 'Create Bill', href: '/create-bill', icon: <DocumentAddIcon /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Clinic</h1>
            <p className="text-sm text-gray-500">Management</p>
          </div>
        </div>
        <nav>
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-light text-primary-dark'
                        : 'text-slate-700 hover:bg-primary-light hover:text-primary-dark'
                    }`
                  }
                >
                  <span className="w-6 h-6">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M2.25 12v10.5a.75.75 0 00.75.75h5.25a.75.75 0 00.75-.75V15a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v6.75a.75.75 0 00.75.75h5.25a.75.75 0 00.75-.75V12" />
    </svg>
  );
}

function PillIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 9.75h10.5v4.5H6.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a2.25 2.25 0 01-2.25-2.25v-1.5a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25M6.75 12v2.25a2.25 2.25 0 002.25 2.25h6a2.25 2.25 0 002.25-2.25V12" />
    </svg>
  );
}

function PlusCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DocumentTextIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function DocumentAddIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}
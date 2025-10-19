import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Submit', path: '/submit' },
    { label: 'Upload', path: '/upload' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav style={{
      background: '#1976d2',
      color: 'white',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        NGO Reporting System
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              padding: '8px 16px',
              fontSize: '16px',
              background: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: location.pathname === item.path ? 'bold' : 'normal'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

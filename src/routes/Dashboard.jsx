import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '../api/endpoints';

const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['dashboard', selectedMonth],
    queryFn: () => getDashboardData(selectedMonth),
    retry: false,
  });

  const isEmptyState = error?.response?.status === 404 || error?.response?.data?.status === 'empty';

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>

        {/* Header */}
        <h1 style={{ margin: '0 0 30px 0', fontSize: '28px', color: '#333' }}>
          Dashboard
        </h1>

        {/* Month Selector */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1
            }}
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
            Loading...
          </div>
        )}

        {/* Empty State */}
        {isEmptyState && (
          <div style={{
            padding: '16px',
            background: '#e3f2fd',
            border: '1px solid #90caf9',
            borderRadius: '4px',
            color: '#0d47a1'
          }}>
            No reports found for the selected month.
          </div>
        )}

        {/* Error State */}
        {isError && !isEmptyState && (
          <div style={{
            padding: '16px',
            background: '#ffebee',
            border: '1px solid #ef9a9a',
            borderRadius: '4px',
            color: '#c62828'
          }}>
            {error?.response?.data?.message || 'Failed to load dashboard data. Please try again.'}
          </div>
        )}

        {/* Stats Cards */}
        {data && !isLoading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              padding: '20px',
              background: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                Total NGOs Reporting
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                {data.total_ngos_reporting}
              </div>
            </div>

            <div style={{
              padding: '20px',
              background: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                Total People Helped
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                {data.total_people_helped.toLocaleString()}
              </div>
            </div>

            <div style={{
              padding: '20px',
              background: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                Total Events Conducted
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                {data.total_events_conducted}
              </div>
            </div>

            <div style={{
              padding: '20px',
              background: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                Total Funds Utilized
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                ₹{data.total_funds_utilized.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { VariantExplorer, Variant } from 'react-variant-explorer';

const sampleVariants: Variant[] = [
  {
    id: 'v1',
    rank: 1,
    frequency: 450,
    percentage: 45,
    duration: '2d 4h',
    cost: 1200,
    steps: [
      [
        { id: 'a1', label: 'Order Received', color: '#10b981' },
        { id: 'a2', label: 'Payment Confirmed', color: '#3b82f6' },
        { id: 'a3-1', label: 'Processing 1', color: '#f59e0b' },
        { id: 'a3-2', label: 'Processing 2', color: '#f59e0b' },
        { id: 'a3-3', label: 'Processing 3', color: '#f59e0b' },
        { id: 'a3-4', label: 'Processing 4', color: '#f59e0b' },
      ],
      { id: 'a4', label: 'Shipped', color: '#6366f1' },
      { id: 'a5', label: 'Delivered', color: '#8b5cf6' },
    ]
  },
  {
    id: 'v2',
    rank: 2,
    frequency: 320,
    percentage: 32,
    duration: '5d 12h',
    cost: 850,
    steps: [
      { id: 'a1', label: 'Order Received', color: '#10b981' },
      [
        { id: 'a2', label: 'Payment Confirmed', color: '#3b82f6' },
        { id: 'a3', label: 'Processing', color: '#f59e0b' },
      ],
      { id: 'a6', label: 'Refund Requested', color: '#ef4444' },
      { id: 'a7', label: 'Order Cancelled', color: '#6b7280' },
    ]
  },
  {
    id: 'v3',
    rank: 3,
    frequency: 180,
    percentage: 18,
    duration: '1d 2h',
    cost: 1500,
    steps: [
      { id: 'a1', label: 'Order Received', color: '#10b981' },
      { id: 'a3', label: 'Processing', color: '#f59e0b' },
      { id: 'a4', label: 'Shipped', color: '#6366f1' },
      { id: 'a5', label: 'Delivered', color: '#8b5cf6' },
    ]
  }
];

const columns = [
  { 
    key: 'duration', 
    header: 'Duration', 
    sortable: true,
    width: 100 
  },
  { 
    key: 'cost', 
    header: 'Cost', 
    sortable: true,
    width: 80,
    hiddenOnMobile: true,
    render: (v: Variant) => `$${v.cost.toLocaleString()}`
  }
];

function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [design, setDesign] = React.useState<'default' | 'minimal' | 'circles'>('default');
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      transition: 'all 0.3s ease',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.025em', margin: 0 }}>
              Variant Explorer
            </h1>
            <p style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: '1.125rem', marginTop: '8px' }}>
              Visualizing process mining variants with premium React components.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ 
              display: 'flex', 
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              padding: '4px',
              borderRadius: '10px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}>
              {(['default', 'minimal', 'circles'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDesign(d)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: design === d ? '#6366f1' : 'transparent',
                    color: design === d ? '#ffffff' : (theme === 'dark' ? '#94a3b8' : '#64748b'),
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
            <button 
              onClick={toggleTheme}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        <main>
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>
              Top Variants
            </h2>
            <div style={{ marginBottom: '16px', fontSize: '0.875rem', fontWeight: 500 }}>
              Selected: {selectedIds.length} variants
            </div>
            <VariantExplorer 
              variants={sampleVariants} 
              columns={columns}
              design={design}
              theme={theme}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onActivityClick={(a, v) => console.log('Clicked activity:', Array.isArray(a) ? a.map(x => x.label).join(' > ') : a.label, 'in variant:', v.rank)}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

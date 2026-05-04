# React Variant Explorer

A premium, high-performance React component for visualizing process mining variants with a modern, flat aesthetic.

[**Live Demo**](https://sina-asghari.github.io/react-variant-explorer/)

## Preview

### Default Design (Light Mode)
![Default Design Light](./1.jpg)

### Circle Design
![Circle Design](./2.jpg)

### Minimal Design
![Minimal Design](./3.jpg)

### Default Design (Dark Mode)
![Default Design Dark](./4.jpg)


## Features

- 🚀 **Grouped Activities**: Handle multiple activities in a single step with vertical stacking and smart truncation.
- 🗸 **Selection**: Integrated checkboxes for individual and "select all" functionality.
- 📊 **Custom Columns**: Add arbitrary data columns (e.g., duration, cost) with custom rendering and sorting.
- 🔄 **Dynamic Sorting**: Built-in sorting for any column (Count, Rank, or Custom).
- 🎨 **Multiple Designs**: Switch between `default` (chevrons), `minimal` (cubes), and `circles` (node-link) visualizations.
- 🌓 **Theming**: Full support for Light, Dark, and System modes.
- 🧩 **TypeScript**: Fully typed for a great developer experience.
- 📦 **Zero Config Styling**: Styles are automatically injected into the bundle.

## Installation

```bash
npm install react-variant-explorer
```

## Quick Start

```tsx
import { VariantExplorer } from 'react-variant-explorer';

const variants = [
  {
    id: 'v1',
    rank: 1,
    frequency: 450,
    duration: '2d 4h',
    cost: 1200,
    steps: [
      { id: 'a1', label: 'Order Received', color: '#10b981' },
      [
        { id: 'a2', label: 'Payment Confirmed', color: '#3b82f6' },
        { id: 'a3', label: 'Processing', color: '#f59e0b' },
      ],
      { id: 'a4', label: 'Shipped', color: '#6366f1' },
    ]
  }
];

const columns = [
  { key: 'duration', header: 'Duration', sortable: true },
  { 
    key: 'cost', 
    header: 'Cost', 
    sortable: true,
    render: (v) => `$${v.cost.toLocaleString()}`
  }
];

function App() {
  const [selected, setSelected] = useState([]);

  return (
    <VariantExplorer 
      variants={variants}
      columns={columns}
      design="circles"
      selectedIds={selected}
      onSelectionChange={setSelected}
      onActivityClick={(data, variant) => console.log(data)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variants` | `Variant[]` | `[]` | Array of variant data to display. |
| `columns` | `Column[]` | `[]` | Custom information columns to display. |
| `design` | `'default' \| 'minimal' \| 'circles'` | `'default'` | The visualization style. |
| `selectedIds` | `string[]` | `[]` | Array of currently selected variant IDs. |
| `onSelectionChange` | `(ids) => void` | `undefined` | Callback when selection changes. |
| `theme` | `'light' \| 'dark' \| 'system'` | `'system'` | The UI theme mode. |
| `onActivityClick` | `(data, variant) => void` | `undefined` | Callback when a step is clicked. |
| `className` | `string` | `''` | Custom CSS class for the container. |
| `style` | `React.CSSProperties` | `{}` | Custom styles for the container. |

---

## 📬 Contact

Feel free to reach out:

- 📸 Instagram: [@drsinaasghari](https://instagram.com/drsinaasghari)
- ✈️ Telegram: [@drsinaasghari](https://t.me/drsinaasghari)

## License

MIT © Sina Asghari

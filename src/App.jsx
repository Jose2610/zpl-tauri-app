import { Routes, Route } from '@solidjs/router';

// Routes available
import Barcode from './routes/Barcode';
import Quantity from './routes/Quantity';
import Settings from './routes/Settings';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" component={Barcode} />
        <Route path="/quantity" component={Quantity} />
        <Route path='/settings' component={Settings} />
      </Routes>
    </>
  )
}
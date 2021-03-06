import { Header } from '../components/Header/Header';
import { Content } from '../components/Content/Content';
import { Sidebar } from '../components/Sidebar/Sidebar';
import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Content />
    </div>
  );
}

export default App;

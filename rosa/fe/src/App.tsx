import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BoardCreatePage from './pages/board/BoardCreatePage';
import BoardDetailPage from './pages/board/BoardDetailPage';
import BoardEditPage from './pages/board/BoardEditPage';
import BoardPage from './pages/board/BoardPage';

function App() {
  return (
    <Router>
      <Route path="/" exact component={BoardPage} />
      <Route path="/board/:boardId" exact component={BoardDetailPage} />
      <Route path="/board/:boardId/edit" exact component={BoardEditPage} />
      <Route path="/createBoard" exact component={BoardCreatePage} />
    </Router>
  );
}

export default App;

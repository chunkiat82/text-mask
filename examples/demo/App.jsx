import React from 'react';
import Input from './input.jsx';

class App extends React.Component {

  render() {
    return (
    	<div>
			<Input placerholder="MM/DD/YY" maskPattern="99/99/99" maskPlaceholder="MM/DD/YY" />
    	</div>
    );
  };
}

export default App;
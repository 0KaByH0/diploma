import { Provider } from 'react-redux';
import { AppComponent } from './main/components/AppComponent/AppComponent';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import './App.styles.scss';

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </Provider>
  );
}

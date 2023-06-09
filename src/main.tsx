// ** React Imports
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/storeConfig/store'

// ** CASL
import ability from './configs/casl/ability'
import { AbilityContext } from './utility/context/Can'

import Spinner from './views/components/spinner'

import './index.scss'

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <LazyApp />
        </AbilityContext.Provider>
      </Suspense>
    </Provider>
  </React.StrictMode>
)

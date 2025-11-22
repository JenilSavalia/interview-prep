import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Toggle from './Toggle.jsx'
import Todo from './Todo.jsx'
import AutoSaveForm from './AutoSaveForm.jsx'
import LoocalStorage from './LoocalStorage.jsx'
import { Parent } from './Memo.jsx'
import { CallbackParent } from './useCallback.jsx'
import { UseMemoDemo } from './useMemo.jsx'
import Debounce from './Debounce.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <App />
    {/* <Toggle /> */}
    {/* <Todo /> */}
    {/* <AutoSaveForm /> */}
    {/* <LoocalStorage /> */}
    {/* <Parent /> */}
    <CallbackParent />
    <UseMemoDemo />
    <Debounce />

  </>
  // </StrictMode>,
)

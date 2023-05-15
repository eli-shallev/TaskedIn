import { HomePage } from './pages/home-page.jsx'

import { Workspace } from './pages/workspace'
import {BoardDetails} from './cmps/board-details.jsx';

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'TaskedIn',
    },
    {
        path: '/workspace',
        component: <Workspace />,
        label: 'Workspace'
    },
    {
        path: '/board/:boardId',
        component: <BoardDetails />,
        label: 'Board'
    }
    
]

export default routes
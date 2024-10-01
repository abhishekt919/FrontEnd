import { element } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const GamePage = lazy(() => import('./MainGame/index'));


const GameConfig = {
    settings: {
        layout: {},
      },
      routes: [
        {
          path: 'game',
          element: <GamePage />,
        }
    ]
}

export default GameConfig;
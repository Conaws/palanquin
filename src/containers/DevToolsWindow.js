import React              from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor         from 'redux-devtools-log-monitor';
import SliderMonitor 	  from 'redux-slider-monitor';

export default createDevTools(
  <LogMonitor />
);
